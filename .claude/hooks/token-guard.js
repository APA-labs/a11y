#!/usr/bin/env node
/**
 * token-guard.js
 * Stop 훅: 토큰 사용량이 85% 이상이면 Claude에게 작업 중단 + 요약 작성 지시
 *
 * 토큰 추정 방식:
 *   1. input.usage 데이터가 있으면 직접 사용 (향후 Claude Code가 지원 시)
 *   2. 없으면 transcript 파일 크기로 추정 (4자 ≈ 1 토큰)
 */

const fs = require('fs')
const path = require('path')

let input
try {
  const raw = fs.readFileSync('/dev/stdin', 'utf8')
  input = JSON.parse(raw)

  // 디버그 로그 (처음 한 번만 확인용, 이후 삭제 가능)
  const logPath = path.join(process.env.HOME || '', '.claude', 'hooks-logs', 'token-guard-debug.json')
  try {
    fs.writeFileSync(logPath, raw, 'utf8')
  } catch {}
} catch {
  process.exit(0)
}

// 무한루프 방지
if (input.stop_hook_active) {
  process.exit(0)
}

const CONTEXT_WINDOW = 200_000
let inputTokens = 0
let estimatedMode = false

// ── 방법 1: usage 데이터 직접 사용 ──────────────────────────────────────────
const usage = input.usage || {}
inputTokens = (usage.input_tokens || 0) + (usage.cache_read_input_tokens || 0)

// ── 방법 2: transcript 파일 크기로 추정 ─────────────────────────────────────
if (inputTokens === 0) {
  estimatedMode = true

  // transcript_path 또는 session_id로 트랜스크립트 파일 찾기
  const transcriptPath = input.transcript_path
  const sessionId = input.session_id

  let transcriptSize = 0

  if (transcriptPath && fs.existsSync(transcriptPath)) {
    transcriptSize = fs.statSync(transcriptPath).size
  } else if (sessionId) {
    // Claude Code 트랜스크립트 기본 위치 탐색
    const candidates = [
      path.join(process.env.HOME || '', '.claude', 'transcripts', `${sessionId}.jsonl`),
      path.join(process.env.HOME || '', '.claude', 'projects', '-Users-ijihyeong-a11y', `${sessionId}.jsonl`)
    ]
    for (const p of candidates) {
      if (fs.existsSync(p)) {
        transcriptSize = fs.statSync(p).size
        break
      }
    }
  }

  // 파일도 못 찾으면 패스
  if (transcriptSize === 0) {
    process.exit(0)
  }

  // JSONL은 JSON 메타데이터 오버헤드가 크므로 약 20바이트 ≈ 1토큰으로 추정
  // (3.6MB 파일 → 실측 ~172K 토큰 기준으로 보정된 값)
  inputTokens = Math.round(transcriptSize / 20)
}

const usagePercent = inputTokens / CONTEXT_WINDOW

if (usagePercent < 0.85) {
  process.exit(0)
}

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

const nextReset = new Date(now)
nextReset.setHours(nextReset.getHours() + 1, 0, 0, 0)
const resetTime = nextReset.toLocaleString('ko-KR', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
})

const usedPct = Math.round(usagePercent * 100)
const modeNote = estimatedMode ? ' (추정값)' : ''
const separator = '\n\n' + '='.repeat(60) + '\n'
const header = [
  `## 🔄 세션 요약 — ${timestamp}`,
  `> 토큰 사용량: **${usedPct}%**${modeNote} (${inputTokens.toLocaleString()} / ${CONTEXT_WINDOW.toLocaleString()})`,
  `> 다음 리셋 예정: **${resetTime}**`,
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

const reason = [
  `⚠️  토큰 사용량이 **${usedPct}%**${modeNote}에 달했습니다.`,
  `컨텍스트 한계(${CONTEXT_WINDOW.toLocaleString()} 토큰)에 근접하여 이번 세션을 종료해야 합니다.`,
  `다음 리셋 예정 시각: **${resetTime}** (매 정각)`,
  '',
  '📝 종료 전에 `CLAUDE.local.md` 파일의 "AUTO-GENERATED" 주석 아래에 다음 내용을 작성해주세요:',
  '- ✅ 이번 세션에서 완료한 작업',
  '- 🔄 진행 중이었던 작업 및 현재 상태',
  '- ⏭️  다음 세션에서 이어해야 할 것 (구체적으로)',
  '- ⚠️  주의사항 또는 알아야 할 컨텍스트',
  '',
  `작성이 끝나면 "토큰이 부족하여 작업을 중단합니다. 다음 리셋 시간(${resetTime}) 이후 새 세션에서 이어주세요." 라고 말하고 멈춰주세요.`
].join('\n')

console.log(JSON.stringify({ decision: 'block', reason }))
process.exit(0)
