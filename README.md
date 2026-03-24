# A11y Pattern Agent

AI 기반 접근성 디자인 어시스턴트. UI 컴포넌트 설명을 입력하면 WCAG 2.1 AA 기준의 체크리스트, 코드 샘플, 테스트 가이드를 생성합니다.

## 시작하기

```bash
pnpm install
pnpm dev          # 프론트엔드 :3000 + 백엔드 :3001
```

환경 변수 설정 (`.env.local`):

```
ANTHROPIC_API_KEY=sk-ant-...
```

---

## 패키지 구조 및 관계

```
a11y/
├── packages/
│   ├── shared/          # 공유 타입 + Zod 스키마
│   ├── backend/         # Fastify API 서버 (:3001)
│   └── frontend/        # Next.js 앱 (:3000)
└── tools/
    ├── spec-transformer/    # W3C·DS 크롤 결과 → rule JSON / patterns.ts 변환
    ├── eslint-config/       # @a11y/eslint-config (공유 린트 설정)
    └── typescript-config/   # @a11y/typescript-config (공유 tsconfig)
```

### 패키지 간 의존 관계

```
packages/shared
    ↑               ← 공유 타입(AnalysisRequest, AnalysisResponse 등)
    ├── packages/backend
    └── packages/frontend

tools/spec-transformer
    ↓               ← 크롤 결과를 변환해 아래 파일을 생성
    ├── packages/backend/src/rules/*.json
    └── packages/frontend/lib/patterns.ts
```

### 각 패키지 역할

| 패키지             | 역할                                                                         |
| ------------------ | ---------------------------------------------------------------------------- |
| `shared`           | TypeScript 타입과 Zod 스키마의 단일 출처. backend·frontend가 import해서 사용 |
| `backend`          | 분석 요청을 받아 패턴 분류 → rule JSON 로드 → Claude API 호출 → 응답 반환    |
| `frontend`         | 패턴 허브 UI (`/patterns/[slug]`) + AI 분석 페이지 (`/analyze`)              |
| `spec-transformer` | 크롤 결과 HTML을 Claude로 처리해 rule JSON과 patterns.ts 항목 생성           |

---

## 콘텐츠 파이프라인

접근성 규칙 데이터가 어떻게 만들어지고 서빙되는지 전체 흐름입니다.

```
┌────────────────────┐
│   spec-harvester   │  W3C·디자인시스템 문서 크롤 (분기 1회)
│   (별도 Python 레포) │  → storage/raw/YYYY-MM-DD/*.html
└────────┬───────────┘
         │ 크롤 결과 디렉토리 경로
         ▼
┌────────────────────┐
│  spec-transformer  │  Claude API로 HTML에서 규칙 추출
│  (tools/)          │
│                    │  --target rules    → packages/backend/src/rules/*.json
│                    │  --target patterns → packages/frontend/lib/patterns.ts
└────────┬───────────┘
         │
    ┌────┴────┐
    ▼         ▼
backend    frontend
(런타임에   (UI에서
 rule 로드)  패턴 렌더링)
```

### 크롤 → 변환 실행 방법

```bash
# 1. spec-harvester로 크롤 (별도 Python 환경)
cd ~/spec-harvester
python -m spec_harvester crawl --policy apg    # W3C ARIA APG
python -m spec_harvester crawl --policy mui    # MUI 문서
python -m spec_harvester crawl --policy radix  # Radix UI 문서
python -m spec_harvester crawl --policy antd   # Ant Design 문서

# 2. 크롤 결과 검증
python scripts/verify_crawl.py --input storage/raw/2026-06-01

# 3. 백엔드 rule JSON 생성 (Claude API 사용)
#    → 크롤 결과에서 패턴별 접근성 규칙을 추출해 packages/backend/src/rules/*.json 에 저장
#    → Claude Code 스킬: /add-a11y-rule (단일 패턴 빠른 추가)
pnpm transform:rules -- \
  --input ~/spec-harvester/storage/raw/2026-06-01 \
  --output packages/backend/src/rules

# 4. 프론트엔드 패턴 생성 (패턴 하나씩, Claude API 사용)
#    → W3C 베이스라인 + DS 변형(material/radix/antd)을 하나의 Pattern 객체로 합쳐 patterns.ts에 추가
#    → --pattern 옵션으로 한 번에 하나씩 처리 (Claude API 비용 및 오류 범위 최소화)
pnpm transform:pattern -- \
  --input ~/spec-harvester/storage/raw/2026-06-01 \
  --output packages/frontend/lib/patterns.ts \
  --pattern tabs

# 5. 출력 검증
pnpm verify:rules      # rule JSON 스키마 검증
pnpm verify:patterns   # rule JSON + patterns.ts 구조 검증

# 6. 커밋
git add packages/backend/src/rules/ packages/frontend/lib/
git commit -m "chore: update a11y rules from W3C spec crawl (2026-Q2)"
```

### 지원 크롤 소스

| Policy  | 도메인       | 수집 내용                              |
| ------- | ------------ | -------------------------------------- |
| `apg`   | www.w3.org   | ARIA APG 패턴 페이지 (체크리스트 기반) |
| `mui`   | mui.com      | MUI 컴포넌트 접근성 문서               |
| `radix` | radix-ui.com | Radix UI 프리미티브 문서               |
| `antd`  | ant.design   | Ant Design 컴포넌트 문서               |

### 지원 패턴

`button`, `toggle`, `text-input`, `modal-dialog`, `tabs`, `tooltip`, `disclosure`, `accordion`, `combobox`

---

## 백엔드 요청 흐름

```
POST /api/analyze
  → ValidationService   (Zod 스키마 검증)
  → PatternClassifier   (Claude or 키워드로 패턴 분류)
  → RuleEngine          (rules/*.json 로드)
  → LLMOrchestrator     (Claude API + 규칙을 컨텍스트로 호출)
  → ResponseComposer    (응답 후처리·검증)
  → AnalysisResponse
```

#### POST /api/analyze

```json
// Request
{ "description": "드롭다운 메뉴 컴포넌트", "context": "모바일 네비게이션용" }

// Response
{
  "patterns": ["disclosure"],
  "checklist": {
    "must":   [{ "id": "...", "title": "...", "description": "...", "level": "must" }],
    "should": [...],
    "avoid":  [...]
  },
  "codeSamples": [{ "language": "react", "label": "...", "code": "..." }],
  "tests":       [{ "title": "...", "steps": ["..."], "tools": ["axe"] }],
  "questions":   ["..."],
  "references":  ["https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/"]
}
```

---

## 패턴 추가하기

### 빠른 추가 (Claude Code 스킬)

Claude Code 세션에서 `/add-a11y-rule` 실행. W3C URL 입력, HTML 붙여넣기, JSON 직접 입력 중 선택해 즉시 추가.

### 크롤러 결과로 추가

```bash
# rule JSON만 (백엔드용)
pnpm transform:rules -- --input <크롤 디렉토리> --output packages/backend/src/rules --patterns <패턴명>

# 프론트엔드 패턴 포함 (W3C + 3개 DS 동시 처리)
pnpm transform:pattern -- --input <크롤 디렉토리> --output packages/frontend/lib/patterns.ts --pattern <패턴명>
```

### 수동 추가

`packages/backend/src/rules/` 에 `{pattern-id}.json` 파일 생성:

```json
{
  "pattern": "패턴명",
  "wcagLevel": "A",
  "checklist": {
    "must":   [{ "id": "kebab-id", "title": "...", "description": "..." }],
    "should": [...],
    "avoid":  [...]
  },
  "codeSamples": { "react": { "label": "...", "code": "..." } },
  "tests":     [{ "title": "...", "steps": [...], "tools": [...] }],
  "references": ["https://..."]
}
```

`packages/backend/src/rules/patterns.json` 레지스트리에도 항목 추가.

---

## 디자인 시스템 추가

새 DS를 전체 스택에 추가하려면 두 레포 작업이 필요합니다.

```
[spec-harvester 세션]                    [a11y 세션]
/add-design-system
  → policy JSON 생성
  → DS 등록 정보 출력 ──복사──▶  /register-design-system
  → crawl 실행 안내                → SOURCE_URL_MAP 추가
                                   → DsId 타입 확장
                                   → DS_META 추가
                                   → type-check 실행
```

---

## 스크립트 전체 목록

```bash
# 개발
pnpm dev               # 전체 개발 서버 (backend :3001 + frontend :3000)
pnpm build             # 전체 빌드
pnpm lint              # ESLint 검사
pnpm format            # Prettier 포맷팅
pnpm type-check        # TypeScript 타입 검사

# 콘텐츠 파이프라인
pnpm transform:rules   # 크롤 결과 → backend rule JSON
pnpm transform:pattern # 크롤 결과 → frontend patterns.ts 항목 추가

# 검증
pnpm verify:rules      # rule JSON 스키마 검증
pnpm verify:patterns   # rule JSON + patterns.ts 구조 검증
```

---

## Tooling

| 도구          | 역할                                                  |
| ------------- | ----------------------------------------------------- |
| **mise**      | Node 22.14.0 / pnpm 9.15.9 버전 고정                  |
| **lefthook**  | pre-commit: lint·format·type-check / pre-push: +build |
| **Turborepo** | 빌드 캐싱, 패키지 간 task 의존성 관리                 |
| **ESLint 9**  | flat config, `@a11y/eslint-config`로 공유             |
