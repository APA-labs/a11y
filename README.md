# A11y Pattern Agent

WCAG 2.1 AA 접근성 패턴을 한곳에서 찾아볼 수 있는 **레퍼런스 사이트**이자, 필요할 때 **AI로 컴포넌트 설명을 분석**해 체크리스트·코드 샘플·테스트 가이드를 받을 수 있는 도구입니다.

- **패턴 허브**: 패턴별 체크리스트, 여러 디자인 시스템 예시 코드, Sandpack **라이브 미리보기**
- **WCAG**: 기준별 요약·외부 링크 (`/wcag`)
- **AI 분석** (선택): `ANTHROPIC_API_KEY`가 있을 때만 `/analyze` 및 사이드바 Tools 노출

## 시작하기

```bash
pnpm install
pnpm dev          # 프론트엔드 :3000 + 백엔드 :3001
```

환경 변수 (루트 또는 `packages/backend` 쪽 `.env.local` 등, 프로젝트 규칙에 맞게 설정):

| 변수                                   | 용도                                                                                   |
| -------------------------------------- | -------------------------------------------------------------------------------------- |
| `ANTHROPIC_API_KEY`                    | 백엔드 `/api/analyze` 및 콘텐츠 변환 스크립트에 필요. 없으면 프론트에서 AI 메뉴 비활성 |
| `SITE_URL` 또는 `NEXT_PUBLIC_SITE_URL` | 프로덕션 빌드 시 `next-sitemap`이 절대 URL 생성에 사용 (로컬은 생략 가능)              |

---

## 패키지 구조 및 관계

```
a11y/
├── packages/
│   ├── shared/          # 공유 타입 + Zod 스키마
│   ├── backend/         # Fastify API 서버 (:3001)
│   └── frontend/        # Next.js 15 앱 (:3000), React 19
└── tools/
    ├── spec-transformer/    # 크롤 HTML → rule JSON / 프론트 패턴 소스 변환
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
    ↓
    ├── packages/backend/src/rules/*.json
    └── packages/frontend/lib/patterns/*.ts, lib/patterns/index.ts (`lib/patterns.ts`는 index 재export)
```

### 각 패키지 역할

| 패키지             | 역할                                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| `shared`           | TypeScript 타입과 Zod 스키마의 단일 출처. backend·frontend가 import해서 사용                              |
| `backend`          | 분석 요청을 받아 패턴 분류 → rule JSON 로드 → Claude API 호출 → 응답 반환                                 |
| `frontend`         | 패턴 목록·상세(`/patterns/[slug]`), WCAG 레퍼런스(`/wcag`), 조건부 AI 분석(`/analyze`), Sandpack 미리보기 |
| `spec-transformer` | 크롤 결과를 처리해 rule JSON과 프론트 패턴 모듈을 생성·검증                                               |

### 프론트엔드 사이트 (요약)

| 경로               | 설명                                           |
| ------------------ | ---------------------------------------------- |
| `/`                | 패턴 카드 그리드, 반응형 레이아웃              |
| `/patterns/[slug]` | 패턴별 체크리스트, DS 탭, 코드·**미리보기** 탭 |
| `/wcag`            | WCAG 기준 요약 및 외부 문서 링크               |
| `/analyze`         | AI 분석 (API 키·빌드 플래그로 활성화 시)       |

- **모바일**: 상단 헤더 햄버거 메뉴로 패턴·Docs 내비게이션
- **데스크톱**: 접이식 사이드바; 접힌 상태에서는 아이콘에 **툴팁**으로 이름 표시
- **SEO**: `pnpm build` 후 `postbuild`에서 `next-sitemap`이 `public/sitemap.xml`, `public/robots.txt` 생성 (배포 시 `SITE_URL` 권장)

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
│                    │  --target patterns → (CLI별) 프론트 패턴 소스 — 아래 참고
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
#    → Claude Code 스킬: /add-a11y-rule (단일 패턴 빠른 추가)
pnpm transform:rules -- \
  --input ~/spec-harvester/storage/raw/2026-06-01 \
  --output packages/backend/src/rules

# 4. 프론트엔드 패턴 (spec-transformer patterns-cli)
#    → 자세한 플래그·지원 패턴 ID는 tools/spec-transformer/README.md 참고
#    → 이 레포는 패턴을 lib/patterns/<slug>.ts 모듈로 두므로,
#      CLI 출력과 구조가 다를 수 있음 — /add-a11y-rule 스킬 또는 생성 코드를 모듈로 옮겨 반영
pnpm transform:pattern -- \
  --input ~/spec-harvester/storage/raw/2026-06-01 \
  --output packages/frontend/lib/patterns.ts \
  --pattern tabs

# 5. 출력 검증
pnpm verify:rules      # rule JSON 스키마 검증
pnpm verify:patterns   # rule JSON + patterns(프론트) 구조 검증

# 6. 커밋
git add packages/backend/src/rules/ packages/frontend/lib/patterns/
git commit -m "chore: update a11y rules from W3C spec crawl (2026-Q2)"
```

### 지원 크롤 소스

| Policy  | 도메인       | 수집 내용                              |
| ------- | ------------ | -------------------------------------- |
| `apg`   | www.w3.org   | ARIA APG 패턴 페이지 (체크리스트 기반) |
| `mui`   | mui.com      | MUI 컴포넌트 접근성 문서               |
| `radix` | radix-ui.com | Radix UI 프리미티브 문서               |
| `antd`  | ant.design   | Ant Design 컴포넌트 문서               |

### 지원 패턴 (등록 기준)

`accordion`, `alert`, `breadcrumb`, `button`, `checkbox`, `combobox`, `date-picker`, `disclosure`, `drawer`, `form-validation`, `link`, `modal-dialog`, `navigation-menu`, `pagination`, `popover`, `radio-group`, `select`, `tabs`, `text-input`, `toggle`, `tooltip`

---

## 백엔드 요청 흐름

```
POST /api/analyze
  → ValidationService   (Zod 스키마 검증)
  → PatternClassifier   (정규식 등으로 패턴 이름 추출)
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

Claude Code 세션에서 `/add-a11y-rule` 실행. W3C URL 입력, HTML 붙여넣기, JSON 직접 입력 중 선택해 즉시 추가. 스킬에 따라 백엔드 rule과 프론트 `lib/patterns` 동기화 절차를 따릅니다.

### 크롤러 결과로 추가

```bash
# rule JSON만 (백엔드용)
pnpm transform:rules -- --input <크롤 디렉토리> --output packages/backend/src/rules --patterns <패턴명>

# 프론트엔드 패턴 (도구별 상세는 tools/spec-transformer)
pnpm transform:pattern -- --input <크롤 디렉토리> --output packages/frontend/lib/patterns.ts --pattern <패턴명>
```

### 수동 추가

1. `packages/backend/src/rules/<pattern-id>.json` 생성
2. `packages/backend/src/rules/patterns.json` 레지스트리에 항목 추가
3. `packages/frontend/lib/patterns/<slug>.ts` 패턴 정의 추가
4. `packages/frontend/lib/patterns/index.ts`의 `patterns` 배열에 등록

`lib/patterns.ts`는 `patterns/index`를 재export하는 진입점이며, `verify:patterns` 등에서 경로로 쓰일 수 있습니다.

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
                                   → Sandpack DS_DEPS 및 코드 샘플 훅 정합
                                   → type-check 실행
```

---

## 스크립트 전체 목록

```bash
# 개발
pnpm dev               # 전체 개발 서버 (backend :3001 + frontend :3000)
pnpm build             # 전체 빌드 (프론트는 build 후 postbuild로 sitemap/robots 생성)
pnpm lint              # ESLint 검사
pnpm format            # Prettier 포맷팅
pnpm type-check        # TypeScript 타입 검사

# 콘텐츠 파이프라인
pnpm transform:rules   # 크롤 결과 → backend rule JSON
pnpm transform:pattern # 크롤 결과 → 프론트 패턴(도구 구조 참고)

# 검증
pnpm verify:rules      # rule JSON 스키마 검증
pnpm verify:patterns   # rule JSON + 프론트 패턴 구조 검증
```

---

## Tooling

| 도구             | 역할                                                          |
| ---------------- | ------------------------------------------------------------- |
| **mise** (권장)  | Node 22.x / pnpm 9.x 버전 고정 (`package.json` engines 참고)  |
| **lefthook**     | pre-commit: lint·format·type-check / pre-push: +build         |
| **Turborepo**    | 빌드 캐싱, 패키지 간 task 의존성 관리                         |
| **ESLint 9**     | flat config, `@a11y/eslint-config`로 공유                     |
| **next-sitemap** | 프론트 `postbuild`에서 정적 `sitemap.xml` / `robots.txt` 생성 |
