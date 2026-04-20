---
path:
  - packages/frontend/lib/patterns/**/samples/**
  - packages/frontend/lib/patterns/**/index.ts
---

## 패턴 코드 샘플 작성 스타일 가이드

이 문서는 `packages/frontend/lib/patterns/` 아래 **각 패턴의 실제 샘플 파일**을 작성/수정할 때 적용됩니다.
`.claude/hooks/validate-code-samples.js`는 저장 시점마다 샘플을 스캔해 “미리보기 검증 실패”를 띄우므로, 아래 규칙을 벗어나면 경고가 뜹니다.

---

## 1. 폴더 구조 (SSOT)

각 패턴은 폴더 하나로 구성됩니다.

```
lib/patterns/<slug>/
  index.ts                  # Pattern 메타데이터 객체 (checklist, notes 등). 샘플 코드는 raw import
  samples/
    index.css               # Sandpack placeholder. 실제 스타일은 SandpackPreview의 buildIndexCss가 주입
    baseline.tsx            # (또는 baseline.html — baseline.language === 'html'일 때)
    material.tsx            # 이하 해당 DS가 정의된 경우에만
    radix.tsx
    antd.tsx
    chakra.tsx
    spectrum.tsx
    baseui.tsx
```

- `index.ts`는 각 샘플을 `?raw`로 임포트해 Pattern 객체의 `code` 필드에 주입합니다.
  ```ts
  import materialCode from './samples/material.tsx?raw'
  // ...
  codeSample: { language: 'tsx', label: 'MUI Button', code: materialCode }
  ```
- 샘플 파일은 실제 `.tsx`이므로 TypeScript/ESLint/Prettier/에디터 인텔리센스를 받습니다. `tsconfig.json`에서 `lib/patterns/**/samples/**`는 타입체크 대상에서 제외되어 있고, Next webpack의 `resourceQuery: /raw/` rule이 이들을 `asset/source`로 처리해 실행되지 않고 문자열로만 번들됩니다.
- 신규 패턴 추가 시에도 이 구조를 그대로 따라 주세요. 기존 패턴(`button/`)이 참고 예시로 완비되어 있습니다.

---

## 2. 샘플 파일 작성 스타일 (읽기/유지보수)

1. 인라인 스타일 금지
   - `style={{...}}` 금지. `className` + `./index.css`에서 제공되는 클래스를 사용하세요.
2. 의미론적 클래스 재사용
   - 샘플 최상단에 `import './index.css'`를 두고, `SandpackPreview.tsx`의 `buildIndexCss`(또는 `lib/sandpack/css/`)에 정의된 클래스를 사용합니다.
   - 예: `.app`, `.stack`, `.row`, `.center`, `.btn`, `.btn-primary`, `.btn-ghost`, `.dialog`, `.dialog-title`, `.overlay`, `.hint`, `.error`, `.sr-only` 등.
   - 필요한 클래스가 없다면 먼저 `SandpackPreview.tsx`의 `buildIndexCss`에 추가한 뒤 샘플에서 사용하세요.

---

## 3. 검증 로직 (반드시 통과해야 하는 규칙)

`.claude/hooks/validate-code-samples.js`는 `lib/patterns/<slug>/samples/*.tsx`(또는 `.html`) 저장 시 아래 규칙을 검사합니다.

### 0. DS 미등록 import 금지

샘플이 `import ... from '...'`로 가져오는 패키지 중,

- 상대경로(`.` 또는 `/`로 시작), shadcn 로컬(`@/components/ui`로 시작)
  을 제외한 모든 것은 아래 2곳에 등록돼 있어야 합니다.

1. `packages/frontend/components/pattern/SandpackPreview.tsx` → `DS_DEPS`
2. `.claude/hooks/validate-code-samples.js` → `KNOWN_DEPS` Set

신규 DS/라이브러리 추가 시 두 곳을 **반드시 동시에** 동기화하세요.

### 1. props 기반 함수 시그니처 주의

`function Something({ ... })` 형태에서 destructuring된 props 중 일부가 “자동 전달 가능한 이름”(label/title/id/href/legend/children/checked/disabled/... 또는 `onXxx`) 목록에 없으면 경고됩니다. 핸들러/상태 값은 함수 내부에서 `useState`/`const`로 선언하세요.

### 2. `useRef([])` / `useRef(null)` 제네릭 타입 필수

```ts
const triggerRef = useRef<HTMLButtonElement>(null)
```

### 3. JSX에서 참조하는 핸들러 변수 선언 누락 금지

`onClick={handleSave}`라면 `handleSave`가 `const/let/function`으로 선언돼 있어야 합니다.

### 4. `useState` 중복 선언 금지

### 5. “bare JSX” 방지 — 반드시 named function으로 감쌀 것

샘플이 JSX만 덩그러니 있으면 autowrap 단계에서 undeclared 변수 감지가 어렵습니다. 아래 중 하나의 형태를 지키세요.

- `export default function App() { return ( ... ) }`
- `export function ...() { ... }`
- `function ...() { return ( ... ) }`

### 6. `export default function App`에서 react hook import 누락 금지

`useState/useRef/useEffect/...`를 쓰면 `import { useState, ... } from 'react'`를 반드시 상단에 추가하세요.

### 7. import는 샘플 최상단에만

JSX/코드 뒤에 `import`가 오면 경고합니다.

---

## 4. 빠른 템플릿

```tsx
import './index.css'
import { useState } from 'react'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className='app'>
      <button
        className='btn btn-primary'
        onClick={() => setOpen(true)}>
        Open Modal
      </button>
      {open ? <div className='dialog'>...</div> : null}
    </div>
  )
}
```

---

## 5. 신규 패턴 추가 요약

1. `lib/patterns/<slug>/samples/index.css` 생성 (기존 button의 placeholder 복사)
2. `lib/patterns/<slug>/samples/baseline.tsx` 및 지원할 DS별 `<dsKey>.tsx` 작성
3. `lib/patterns/<slug>/index.ts`에 Pattern 객체 정의 — 각 `code` 필드는 `?raw` 임포트
4. `lib/patterns/index.ts`에 import 추가 및 `patterns` 배열에 등록
5. 번역 키는 `lib/patterns/translations.en.ts`에 추가
6. 새 DS/라이브러리가 생기면 `SandpackPreview.tsx` `DS_DEPS` + validator `KNOWN_DEPS` 동시 갱신
