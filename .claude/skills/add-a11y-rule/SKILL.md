# add-a11y-rule

**Name:** `add-a11y-rule`
**Description:** 접근성 패턴 rule JSON을 백엔드에 추가하는 스킬. W3C URL 입력, HTML 붙여넣기, 또는 완성된 JSON 직접 붙여넣기를 모두 지원. 새 패턴을 빠르게 추가할 때 사용.

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

확인 후 두 파일을 수정한다.

**1. rule 파일 저장**

`packages/backend/src/rules/{pattern-id}.json`에 저장.
파일이 이미 있으면 덮어씌울지 확인한다.

**2. patterns.json 레지스트리 업데이트**

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

---

### Step 4 — 완료 메시지

저장한 파일 경로와 추가된 keywords를 요약해서 알려준다.
