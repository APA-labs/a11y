# @a11y/spec-transformer

W3C 스펙 HTML(spec-harvester 출력)을 백엔드 rule JSON으로 변환하는 CLI 도구.

## 전체 파이프라인

```
spec-harvester (Python)  →  spec-transformer (이 패키지)  →  backend/rules/*.json
W3C 스펙 크롤링             raw HTML → rule JSON 추출          Claude 컨텍스트로 사용
```

패턴 하나만 빠르게 추가할 때는 `/add-a11y-rule` 스킬을 쓰는 게 더 편합니다.

## 설치 전 준비

[spec-harvester](https://github.com/APA-labs/spec-harvester)를 로컬에 별도로 clone하고 실행합니다.

```bash
# spec-harvester 설치 (이 레포와 별개)
git clone https://github.com/APA-labs/spec-harvester ~/spec-harvester
cd ~/spec-harvester
python -m pip install -e .

# W3C ARIA APG 크롤링
python -m spec_harvester crawl --policy w3c --max-pages 100
# 결과: ~/spec-harvester/storage/raw/YYYY-MM-DD/
```

## 사용법

```bash
# 전체 패턴 변환
pnpm transform:rules -- \
  --input ~/spec-harvester/storage/raw/2026-06-01 \
  --output packages/backend/src/rules

# 특정 패턴만
pnpm transform:rules -- \
  --input ~/spec-harvester/storage/raw/2026-06-01 \
  --output packages/backend/src/rules \
  --patterns button,text-input,modal-dialog

# 먼저 dry-run으로 확인
pnpm transform:rules -- \
  --input ~/spec-harvester/storage/raw/2026-06-01 \
  --output packages/backend/src/rules \
  --dry-run
```

결과 확인 후 커밋:

```bash
git add packages/backend/src/rules/
git commit -m "chore: update a11y rules from W3C spec crawl ($(date +%Y-Q%q))"
```

## 지원 패턴

| 패턴 ID        | W3C ARIA APG URL             |
| -------------- | ---------------------------- |
| `button`       | `/apg/patterns/button`       |
| `toggle`       | `/apg/patterns/button`       |
| `text-input`   | `/apg/patterns/textbox`      |
| `modal-dialog` | `/apg/patterns/dialog-modal` |
| `tabs`         | `/apg/patterns/tabs`         |
| `tooltip`      | `/apg/patterns/tooltip`      |
| `disclosure`   | `/apg/patterns/disclosure`   |
| `combobox`     | `/apg/patterns/combobox`     |
| `accordion`    | `/apg/patterns/accordion`    |

새 패턴을 추가하려면 `src/index.ts`의 `PATTERN_URL_MAP`에 항목을 추가합니다.

## Rule JSON 스키마

변환 결과는 아래 구조를 따릅니다. `packages/backend`가 이 파일을 그대로 읽어 Claude 컨텍스트로 사용합니다.

```json
{
  "pattern": "Button",
  "wcagLevel": "A",
  "checklist": {
    "must": [
      { "id": "button-role", "title": "...", "description": "..." }
    ],
    "should": [...],
    "avoid":  [...]
  },
  "codeSamples": {
    "react": { "label": "...", "code": "..." },
    "html":  { "label": "...", "code": "..." }
  },
  "tests": [
    { "title": "...", "steps": [...], "tools": [...] }
  ],
  "references": ["https://www.w3.org/WAI/ARIA/apg/patterns/button/"]
}
```

## CLI 옵션

| 옵션             | 필수 | 설명                                                       |
| ---------------- | ---- | ---------------------------------------------------------- |
| `--input <dir>`  | ✓    | spec-harvester `storage/raw/YYYY-MM-DD` 디렉토리           |
| `--output <dir>` | ✓    | rule JSON을 저장할 디렉토리 (`packages/backend/src/rules`) |
| `--patterns`     |      | 콤마로 구분된 패턴 ID 목록. 생략하면 전체 패턴             |
| `--dry-run`      |      | 파일을 실제로 쓰지 않고 추출 결과만 출력                   |
