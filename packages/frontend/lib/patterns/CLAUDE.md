## 패턴 작성 가이드 (요약)

이 문서는 `packages/frontend/lib/patterns/*.ts`의 Sandpack 코드 샘플 작성 시 참고용 요약본입니다.

정답(Source of Truth)은 아래 문서입니다.

- `.claude/rules/pattern-style.md`

### 빠른 체크

1. Sandpack 코드 샘플은 인라인 `style={{...}}` 금지
2. 코드 샘플 최상단에 `import './index.css'` + 의미론적 `className` 사용
3. 신규 DS/라이브러리 추가 시 `SandpackPreview.tsx`의 `DS_DEPS`와 `.claude/hooks/validate-code-samples.js`의 `KNOWN_DEPS`를 **동시에** 동기화

검증기가 실제로 어떤 규칙으로 실패를 판정하는지(0~8)는 `.claude/rules/pattern-style.md`를 그대로 보세요.
