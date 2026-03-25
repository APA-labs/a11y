# add-a11y-rule

**Name:** `add-a11y-rule`
**Description:** 접근성 패턴 rule JSON을 백엔드에 추가하고 프론트엔드 patterns.ts에도 동기화하는 스킬. W3C URL 입력, HTML 붙여넣기, 또는 완성된 JSON 직접 붙여넣기를 모두 지원.

---

## 실행 방법

`/add-a11y-rule` 호출 시 아래 워크플로우를 따른다.

### Step 1 — 입력 방식 확인

사용자에게 세 가지 중 하나를 선택하게 한다:

**A. W3C URL 입력**

- 패턴 이름(kebab-case ID)과 W3C ARIA APG URL을 입력받는다
- WebFetch로 해당 URL을 가져온다
- Step 2로 진행

**B. HTML 붙여넣기**

- 패턴 이름과 W3C 스펙 페이지 HTML을 붙여넣게 한다
- Step 2로 진행

**C. JSON 직접 붙여넣기**

- 완성된 rule JSON을 붙여넣게 한다
- Step 3으로 바로 진행 (추출 과정 생략)

---

### Step 2 — Rule JSON 추출

아래 스키마에 맞는 JSON을 생성한다.

```json
{
  "pattern": "패턴 표시명 (예: Button)",
  "wcagLevel": "A",
  "checklist": {
    "must": [{ "id": "kebab-case-id", "title": "짧은 제목", "description": "구체적인 요구사항" }],
    "should": [{ "id": "kebab-case-id", "title": "짧은 제목", "description": "권장사항" }],
    "avoid": [{ "id": "kebab-case-id", "title": "짧은 제목", "description": "피해야 할 패턴" }]
  },
  "codeSamples": {
    "react": { "label": "React 예제", "code": "..." },
    "html": { "label": "HTML 예제", "code": "..." }
  },
  "tests": [{ "title": "테스트 제목", "steps": ["단계1", "단계2"], "tools": ["Keyboard only"] }],
  "references": ["https://www.w3.org/WAI/ARIA/apg/patterns/..."]
}
```

규칙:

- `checklist.must`: WCAG A/AA 필수 요구사항 2~4개
- `checklist.should`: 강력 권장 사항 2~4개
- `checklist.avoid`: 흔한 안티패턴 1~3개
- 모든 `id`는 `{패턴}-{설명}` 형식의 고유 kebab-case
- `codeSamples` 키는 `react`, `html`, `typescript` 중 하나
- `references`는 페이지에서 찾은 실제 W3C/MDN URL

추출한 JSON을 사용자에게 먼저 보여주고 확인을 받는다.

---

### Step 3 — 파일 저장

확인 후 **세 개** 파일을 수정한다. (백엔드 2개 + 프론트엔드 1개)

#### 3-A. 백엔드 rule 파일 저장

`packages/backend/src/rules/{pattern-id}.json`에 저장.
파일이 이미 있으면 덮어씌울지 확인한다.

#### 3-B. patterns.json 레지스트리 업데이트

`packages/backend/src/rules/patterns.json`의 `patterns` 배열에 항목을 추가하거나 업데이트한다.

```json
{
  "id": "pattern-id",
  "name": "패턴 표시명",
  "description": "한 줄 설명",
  "keywords": ["keyword1", "keyword2", "..."]
}
```

`keywords`는 `pattern-classifier.ts`가 사용자 설명에서 패턴을 감지할 때 쓰인다. 사용자가 컴포넌트를 묘사할 때 쓸 법한 단어들을 3~8개 포함한다.

#### 3-C. 프론트엔드 patterns.ts 업데이트 ← **필수, 누락 금지**

`packages/frontend/lib/patterns.ts`의 `patterns` 배열 끝(`]` 바로 앞)에 새 패턴을 추가한다.

프론트엔드 Pattern 타입은 백엔드 rule JSON과 **구조가 다르다**. 아래 매핑 규칙을 따른다:

| 프론트엔드 필드               | 출처                                        | 변환 규칙                                                               |
| ----------------------------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| `slug`                        | pattern-id                                  | kebab-case 그대로                                                       |
| `name`                        | `pattern` 필드                              | 그대로                                                                  |
| `description`                 | —                                           | 한국어로 한 줄 요약 작성                                                |
| `wcagCriteria`                | `wcagLevel` + checklist                     | WCAG 기준 ID 배열 (예: `['2.1.1 Keyboard', '4.1.2 Name, Role, Value']`) |
| `tags`                        | —                                           | 패턴 특성에 맞는 태그 (예: `['form', 'interactive']`)                   |
| `baseline.checklist.must[]`   | `checklist.must[]`                          | 각 아이템에 `level: 'must'` 필드 추가                                   |
| `baseline.checklist.should[]` | `checklist.should[]`                        | 각 아이템에 `level: 'should'` 필드 추가                                 |
| `baseline.checklist.avoid[]`  | `checklist.avoid[]`                         | 각 아이템에 `level: 'avoid'` 필드 추가                                  |
| `baseline.codeSample`         | `codeSamples.react` 또는 `codeSamples.html` | 첫 번째 코드 샘플 사용, `language`/`label`/`code` 구조                  |
| `designSystems.material`      | —                                           | MUI 구현 예시 생성 (없으면 생략)                                        |
| `designSystems.radix`         | —                                           | Radix UI 구현 예시 생성 (없으면 생략)                                   |
| `designSystems.antd`          | —                                           | Ant Design 구현 예시 생성 (없으면 생략)                                 |
| `designSystems.shadcn`        | —                                           | shadcn/ui 구현 예시 생성 (없으면 생략)                                  |
| `designSystems.chakra`        | —                                           | Chakra UI 구현 예시 생성 (없으면 생략)                                  |
| `designSystems.spectrum`      | —                                           | Adobe React Spectrum 구현 예시 생성 (없으면 생략)                       |

**중요**: `designSystems`는 이제 **옵셔널**이다. 해당 DS가 컴포넌트를 구현하지 않는다면 해당 키를 아예 포함하지 않는다.
예를 들어 shadcn이 특정 컴포넌트를 제공하지 않는다면 `shadcn` 키를 생략한다.

**designSystems 각 항목 구조:**

```typescript
{
  id: 'material' | 'radix' | 'antd' | 'shadcn' | 'chakra' | 'spectrum',
  name: string,
  // material='Material Design (MUI)', radix='Radix UI', antd='Ant Design'
  // shadcn='shadcn/ui', chakra='Chakra UI', spectrum='React Spectrum'
  color: string,
  // material='#1976d2', radix='#6e56cf', antd='#1677ff'
  // shadcn='#18181b', chakra='#319795', spectrum='#e03'
  additionalChecks: ChecklistItem[],  // DS 특화 주의사항 1~2개 (level 필드 포함)
  codeSample: { language: string, label: string, code: string },
  notes: string[]        // DS 특이사항 2~3개
}
```

**shadcn/ui 코드 샘플 주의**: shadcn은 `@/components/ui/...` 경로에서 import하므로 Sandpack 미리보기가 불가능하다. 코드 샘플은 language: 'tsx'로 설정하되 실제 렌더링은 안 되는 것이 정상이다.

**코드 샘플 작성 규칙** (미리보기 오류 방지):

1. **함수 래퍼 필수**: 모든 DS 코드 샘플은 `function FooDemo() { ... return (...) }` 형태로 감쌀 것. bare JSX(import 후 바로 JSX) 금지
2. **변수 자급자족**: 함수 내부에서 사용하는 모든 변수/상태는 함수 내에서 선언할 것 (props로 받지 말 것). `buildStateDecls`는 `is*`, `has*`, `*Checked`, `*Open`, `selected`, `loading` 등만 자동 감지함 — `date`, `value`, `page`, `currentKey`, `email` 등은 감지 안 됨
3. **import 완결성**: `export default function App`으로 시작하는 코드는 `buildAppCode`가 그대로 반환하므로, 사용하는 모든 훅(`useState`, `useRef` 등)을 직접 `import { useState } from 'react'`로 import할 것
4. **DS_DEPS 패키지만 사용**: import하는 외부 패키지는 반드시 `SandpackPreview.tsx`의 `DS_DEPS`에 등록된 것만 사용. 새 패키지 필요 시 DS_DEPS와 `.claude/hooks/validate-code-samples.js`의 `KNOWN_DEPS`에 함께 추가
5. **Chakra UI v3 API**: `@chakra-ui/react: 3.2.3` 사용 중. v2 API 금지:
   - `colorScheme` → `colorPalette`, `isLoading` → `loading`, `isChecked` → `checked`
   - `isExternal` 삭제됨 → `target="_blank" rel="noopener noreferrer"` 직접 지정
   - 단독 export (`BreadcrumbItem`, `Radio`, `Checkbox`) → 네임스페이스 패턴 (`Breadcrumb.Item`, `RadioGroup.Item`, `Checkbox.Root`)
   - `onChange` → `onValueChange` (RadioGroup, Select 등)
6. **react-aria-components 1.3.3**: `DisclosureGroup`은 미포함. `UNSTABLE_` 접두사 버전 사용
7. **import 위치**: 모든 import는 코드 최상단에. JSX 뒤에 import 금지
8. **useRef 제네릭 필수**: `useRef<HTMLButtonElement>(null)` 형태 사용
9. **side-effect import 주의**: `import 'dayjs/locale/ko'` 같은 from 없는 import는 `extractImports` 파서를 혼란시킬 수 있음 — 반드시 함수 래퍼 안에서 사용하거나 코드 최하단 배치

**체크리스트 아이템 description은 한국어로 작성한다.**

기존 패턴 예시(`packages/frontend/lib/patterns.ts`의 button, toggle 등)를 참고해 동일한 스타일로 작성한다.

패턴을 추가한 후 `packages/frontend/components/Sidebar.tsx`의 `ICON_MAP`에도 해당 slug의 아이콘을 추가한다 (lucide-react 아이콘 사용).

---

### Step 4 — 타입 체크 확인

세 파일 저장 후 타입 에러가 없는지 확인한다:

```bash
pnpm --filter @a11y/frontend type-check
```

오류가 있으면 수정한 뒤 Step 5로 진행한다.

---

### Step 5 — 완료 메시지

저장한 파일 경로 세 개와 추가된 keywords를 요약해서 알려준다.
