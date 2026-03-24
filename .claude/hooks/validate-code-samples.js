// PostToolUse hook: rule JSON 파일 저장 시 코드 샘플의 미선언 변수를 검사합니다.
const fs = require('fs')

let inputData = ''
process.stdin.on('data', (c) => {
  inputData += c
})
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(inputData)

    if (!['Write', 'Edit'].includes(input.tool_name)) process.exit(0)

    const filePath = input.tool_input?.file_path
    if (!filePath) process.exit(0)

    // rule JSON 파일만 검사 (patterns.json 제외)
    if (!filePath.match(/\/rules\/[^/]+\.json$/) || filePath.endsWith('patterns.json')) {
      process.exit(0)
    }

    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const issues = []

    if (content.codeSamples) {
      for (const [key, sample] of Object.entries(content.codeSamples)) {
        const code = sample?.code
        if (!code || typeof code !== 'string') continue

        // boolean prop 에 사용된 변수 중 선언되지 않은 것을 찾음
        // e.g. checked={emailChecked}, open={isOpen}, value={selected}
        const propVarRe = /(?:checked|open|selected|enabled|visible|value|active|disabled)=\{([a-z][a-zA-Z0-9]*)\}/g
        let m
        while ((m = propVarRe.exec(code)) !== null) {
          const varName = m[1]
          if (['true', 'false', 'null', 'undefined', 'e', 'event', 'value'].includes(varName)) continue

          const isDeclared =
            new RegExp(`\\b(const|let|var)\\s+\\[?${varName}[,\\] ]`).test(code) ||
            new RegExp(`\\b(const|let|var)\\s+${varName}\\b`).test(code) ||
            new RegExp(`function\\s+${varName}\\b`).test(code) ||
            new RegExp(`\\(.*\\b${varName}\\b.*\\)\\s*=>`).test(code)

          if (!isDeclared) {
            issues.push(`codeSamples.${key}: \`${varName}\` 가 선언되지 않았습니다`)
          }
        }

        // onChange 핸들러에서 참조하는 setter 이름이 state 변수명과 일치하는지도 확인
        // e.g. onChange={(e) => setEmail(e.target.checked)} → 실제 변수는 emailChecked 인데 setEmail 사용
        const setterRe = /set([A-Z][a-zA-Z0-9]*)\s*\(/g
        while ((m = setterRe.exec(code)) !== null) {
          const stateName = m[1].charAt(0).toLowerCase() + m[1].slice(1)
          // state 변수 선언이 있는지만 확인 (없으면 자동 생성되므로 skip)
        }
      }
    }

    if (issues.length > 0) {
      process.stdout.write(
        `\n⚠️  코드 샘플 검증 — 미선언 변수 발견:\n` +
          issues.map((i) => `  - ${i}`).join('\n') +
          `\n\n위 변수들이 SandpackPreview에서 자동 감지되려면 변수명이 다음 패턴 중 하나여야 합니다:\n` +
          `  is*, has*, show*, *Checked, *Open, *Visible, *Selected, *Enabled, *Active\n` +
          `  또는 코드 샘플 내에 직접 const/let 선언을 포함시켜 주세요.\n`
      )
    }
  } catch (_) {
    // silent
  }
  process.exit(0)
})
