#!/usr/bin/env node
/**
 * token-guard.js
 * Stop 훅: 컨텍스트 윈도우(200K) 사용량이 85% 이상이면 Claude에게 작업 중단 + 요약 작성 지시
 *
 * 토큰 추정 방식:
 *   JSONL의 마지막 assistant 메시지 usage 필드에서 실제 토큰 수 추출
 *   input_tokens + cache_read_input_tokens + cache_creation_input_tokens
 */

const fs = require('fs')
const path = require('path')

let input
try {
  const raw = fs.readFileSync('/dev/stdin', 'utf8')
  input = JSON.parse(raw)

  const logPath = path.join(process.env.HOME || '', '.claude', 'hooks-logs', 'token-guard-debug.json')
  try {
    fs.writeFileSync(logPath, raw, 'utf8')
  } catch {}
} catch {
  process.exit(0)
}

if (input.stop_hook_active) process.exit(0)

const CONTEXT_WINDOW = 200_000
const CONTEXT_THRESHOLD = 0.85

// 플랜 사용량 설정 (5시간 window)
// 실측값으로 보정: output_tokens 440K = 15% → 한도 ≈ 2,937,000
// 다른 플랜이라면 아래 값을 조정하세요
const PLAN_OUTPUT_LIMIT = 2_937_000
const PLAN_THRESHOLD = 0.8
const PLAN_WINDOW_HOURS = 5

// ── JSONL에서 마지막 assistant 메시지의 실제 context 토큰 추출 ────────────────
function getContextTokens(transcriptPath) {
  if (!transcriptPath || !fs.existsSync(transcriptPath)) return 0
  try {
    const content = fs.readFileSync(transcriptPath, 'utf-8')
    const lines = content.trimEnd().split('\n')
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i]
      if (!line.includes('"assistant"')) continue
      try {
        const d = JSON.parse(line)
        if (d.type !== 'assistant') continue
        const u = d.message?.usage
        if (!u) continue
        return (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0)
      } catch {}
    }
  } catch {}
  return 0
}

// ── 최근 5시간 output_tokens 합산 (플랜 사용량 추정) ─────────────────────────
function getPlanOutputTokens() {
  try {
    const glob = require('child_process')
      .execSync(
        `find "${path.join(process.env.HOME || '', '.claude', 'projects')}" -name "*.jsonl" -newer /tmp/.token-guard-window 2>/dev/null || find "${path.join(process.env.HOME || '', '.claude', 'projects')}" -name "*.jsonl"`,
        { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }
      )
      .trim()
      .split('\n')
      .filter(Boolean)

    const windowStart = Date.now() - PLAN_WINDOW_HOURS * 60 * 60 * 1000
    let total = 0

    for (const fpath of glob) {
      try {
        const content = fs.readFileSync(fpath, 'utf-8')
        for (const line of content.split('\n')) {
          if (!line.includes('"assistant"') || !line.includes('"output_tokens"')) continue
          try {
            const d = JSON.parse(line)
            if (d.type !== 'assistant') continue
            const ts = d.timestamp ? new Date(d.timestamp).getTime() : 0
            if (ts < windowStart) continue
            total += d.message?.usage?.output_tokens || 0
          } catch {}
        }
      } catch {}
    }
    return total
  } catch {}
  return 0
}

const transcriptPath = input.transcript_path
const contextTokens = getContextTokens(transcriptPath)
const planOutputTokens = getPlanOutputTokens()

const contextPercent = contextTokens / CONTEXT_WINDOW
const planPercent = planOutputTokens / PLAN_OUTPUT_LIMIT

// 둘 다 임계값 미만이면 종료
if (contextPercent < CONTEXT_THRESHOLD && planPercent < PLAN_THRESHOLD) process.exit(0)
// transcript 못 찾고 플랜도 낮으면 종료
if (contextTokens === 0 && planPercent < PLAN_THRESHOLD) process.exit(0)

// ── 85% 초과: CLAUDE.local.md에 구분 헤더 작성 ──────────────────────────────
const cwd = input.cwd || process.cwd()
const localMdPath = path.join(cwd, 'CLAUDE.local.md')

const now = new Date()
const timestamp = now.toLocaleString('ko-KR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
})

const contextPct = Math.round(contextPercent * 100)
const planPct = Math.round(planPercent * 100)
const separator = '\n\n' + '='.repeat(60) + '\n'
const header = [
  `## 🔄 세션 요약 — ${timestamp}`,
  `> 컨텍스트: **${contextPct}%** (${contextTokens.toLocaleString()} / ${CONTEXT_WINDOW.toLocaleString()} tokens)`,
  `> 플랜 사용량: **${planPct}%** (output ${planOutputTokens.toLocaleString()} / ${PLAN_OUTPUT_LIMIT.toLocaleString()} tokens, 최근 5h)`,
  `> 새 세션을 시작하면 컨텍스트가 초기화됩니다.`,
  '',
  '<!-- AUTO-GENERATED: Claude가 아래에 세션 요약을 작성합니다 -->',
  ''
].join('\n')

try {
  if (fs.existsSync(localMdPath)) {
    fs.appendFileSync(localMdPath, separator + header, 'utf8')
  } else {
    const intro = [
      '# CLAUDE.local.md',
      '',
      '> 이 파일은 Claude Code가 세션 컨텍스트 한계에 도달했을 때 자동으로 기록합니다.',
      '> 직접 메모나 설정을 추가할 때는 `=` 구분선 위에 작성하세요.',
      ''
    ].join('\n')
    fs.writeFileSync(localMdPath, intro + separator + header, 'utf8')
  }
} catch {}

const warnings = []
if (contextPercent >= CONTEXT_THRESHOLD)
  warnings.push(`🧠 컨텍스트 **${contextPct}%** (${contextTokens.toLocaleString()} / ${CONTEXT_WINDOW.toLocaleString()} tokens)`)
if (planPercent >= PLAN_THRESHOLD)
  warnings.push(
    `📊 플랜 사용량 **${planPct}%** (output ${planOutputTokens.toLocaleString()} / ${PLAN_OUTPUT_LIMIT.toLocaleString()} tokens, 최근 5h)`
  )

const reason = [
  `⚠️  한계에 근접했습니다:`,
  ...warnings.map((w) => `  ${w}`),
  `새 세션을 시작하면 컨텍스트가 초기화됩니다.`,
  '',
  '📝 종료 전에 `CLAUDE.local.md` 파일의 "AUTO-GENERATED" 주석 아래에 다음 내용을 작성해주세요:',
  '- ✅ 이번 세션에서 완료한 작업',
  '- 🔄 진행 중이었던 작업 및 현재 상태',
  '- ⏭️  다음 세션에서 이어해야 할 것 (구체적으로)',
  '- ⚠️  주의사항 또는 알아야 할 컨텍스트',
  '',
  '작성이 끝나면 "컨텍스트가 가득 찼습니다. 새 세션을 시작해주세요." 라고 말하고 멈춰주세요.'
].join('\n')

console.log(JSON.stringify({ decision: 'block', reason }))
process.exit(0)
