## 패턴 작성 가이드 (요약)

정답(Source of Truth)은 `.claude/rules/pattern-style.md` 입니다. 아래는 빠른 체크용 요약.

### 폴더 구조

각 패턴은 폴더 한 개.

```
lib/patterns/<slug>/
  index.ts           # Pattern 객체. 샘플 코드는 ?raw 임포트
  samples/
    index.css        # Sandpack placeholder
    baseline.tsx     # (또는 baseline.html)
    material.tsx / radix.tsx / antd.tsx / chakra.tsx / spectrum.tsx / baseui.tsx
```

- 샘플은 실제 `.tsx` 파일 → IDE/ESLint/Prettier 지원을 받습니다.
- `index.ts`는 `import materialCode from './samples/material.tsx?raw'` 형태로 각 샘플을 문자열로 임포트해 `Pattern` 객체에 주입합니다.
- 런타임/번들에는 실행되지 않습니다 (Next webpack의 `resourceQuery: /raw/` rule이 `asset/source`로 처리).

### 빠른 체크

1. 샘플 내 `style={{...}}` 금지 — `className` + `./index.css` 사용.
2. 최상단 `import './index.css'` + 상태/핸들러는 함수 내부에서 `useState`/`const`로 선언.
3. `useRef`에 제네릭 타입 명시 (`useRef<HTMLButtonElement>(null)`).
4. 신규 DS/라이브러리 추가 시 `components/pattern/SandpackPreview.tsx`의 `DS_DEPS`와 `.claude/hooks/validate-code-samples.js`의 `KNOWN_DEPS`를 **동시에** 동기화.

검증 실패 조건 전체는 `.claude/rules/pattern-style.md` 참고.
