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

환경 변수 (`packages/backend/.env.local`, `packages/frontend/.env.local`):

| 변수                   | 용도                                                                      |
| ---------------------- | ------------------------------------------------------------------------- |
| `ANTHROPIC_API_KEY`    | 백엔드 `/api/analyze` 필요. 없으면 프론트에서 AI 메뉴 비활성              |
| `NEXT_PUBLIC_SITE_URL` | 프로덕션 빌드 시 `next-sitemap`이 절대 URL 생성에 사용 (로컬은 생략 가능) |
| `NEXT_PUBLIC_GA_ID`    | Google Analytics 4 측정 ID (`G-XXXXXXXXXX`). 없으면 GA 스크립트 미로드    |

---

## 패키지 구조

```
a11y/
├── packages/
│   ├── shared/          # 공유 타입 + Zod 스키마
│   ├── backend/         # Fastify API 서버 (:3001)
│   └── frontend/        # Next.js 15 앱 (:3000), React 19
└── tools/
    ├── spec-transformer/    # 크롤 MD → rule JSON / 프론트 패턴 소스 변환 및 검증
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
    └── packages/frontend/lib/patterns/*.ts
```

### 각 패키지 역할

| 패키지             | 역할                                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| `shared`           | TypeScript 타입과 Zod 스키마의 단일 출처                                                                  |
| `backend`          | 분석 요청을 받아 패턴 분류 → rule JSON 로드 → Claude API 호출 → 응답 반환                                 |
| `frontend`         | 패턴 목록·상세(`/patterns/[slug]`), WCAG 레퍼런스(`/wcag`), 조건부 AI 분석(`/analyze`), Sandpack 미리보기 |
| `spec-transformer` | 크롤 결과를 처리해 rule JSON과 프론트 패턴 모듈을 생성·검증                                               |

### 프론트엔드 페이지

| 경로               | 설명                                       |
| ------------------ | ------------------------------------------ |
| `/`                | 패턴 카드 그리드                           |
| `/patterns/[slug]` | 패턴별 체크리스트, DS 탭, 코드·미리보기 탭 |
| `/wcag`            | WCAG 기준 요약 및 외부 문서 링크           |
| `/analyze`         | AI 분석 (API 키 설정 시 활성화)            |

---

## 콘텐츠 파이프라인

```
┌──────────────────────┐
│    spec-harvester    │  W3C·디자인시스템 문서 크롤 (분기 1회)
│   (별도 Python 레포) │  → storage/raw/YYYY-MM-DD/{ds}.com/{hash}.md
└──────────┬───────────┘
           │ 크롤 결과 디렉토리 경로
           ▼
┌──────────────────────┐
│   spec-transformer   │  MD에서 rule 추출 및 프론트 패턴 생성
│   (tools/)           │  --target rules    → packages/backend/src/rules/*.json
│                      │  --target patterns → packages/frontend/lib/patterns/*.ts
└──────────┬───────────┘
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
# ... (지원 policy 목록은 아래 참고)

# 2. 백엔드 rule JSON 생성
pnpm transform:rules -- \
  --input ~/spec-harvester/storage/raw/2026-06-01 \
  --output packages/backend/src/rules

# 3. 프론트엔드 패턴 생성
pnpm transform:pattern -- \
  --input ~/spec-harvester/storage/raw/2026-06-01 \
  --output packages/frontend/lib/patterns \
  --pattern tabs

# 4. 검증
pnpm verify:rules      # rule JSON 스키마 검증
pnpm verify:patterns   # rule JSON + 프론트 패턴 구조 검증
```

### 지원 크롤 소스

| Policy     | 도메인                   | 수집 내용                              |
| ---------- | ------------------------ | -------------------------------------- |
| `apg`      | www.w3.org               | ARIA APG 패턴 페이지 (체크리스트 기반) |
| `mui`      | mui.com                  | MUI 컴포넌트 접근성 문서               |
| `radix`    | radix-ui.com             | Radix UI 프리미티브 문서               |
| `antd`     | ant.design               | Ant Design 컴포넌트 문서               |
| `baseui`   | base-ui.com              | Base UI 컴포넌트 문서                  |
| `chakra`   | chakra-ui.com            | Chakra UI 컴포넌트 문서                |
| `spectrum` | react-spectrum.adobe.com | React Spectrum 문서                    |

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

### Claude Code 스킬 (권장)

Claude Code 세션에서 `/add-a11y-rule` 실행. W3C URL·HTML·JSON 중 하나를 입력하면 백엔드 rule JSON 저장, `patterns.json` 등록, 프론트 패턴 파일 생성을 자동으로 처리합니다.
신규로 추가하고 싶은 디자인시스템 데이터가 있으면 `/register-design-system`에 위임해 디자인 시스템 코드 샘플·번역·QA까지 일괄 처리합니다.

### 수동 추가

1. `packages/backend/src/rules/<pattern-id>.json` 생성
2. `packages/backend/src/rules/patterns.json` 레지스트리에 항목 추가
3. `packages/frontend/lib/patterns/<slug>.ts` 패턴 정의 추가
4. `packages/frontend/lib/patterns/index.ts`의 `patterns` 배열에 등록
5. `packages/frontend/lib/pattern-icons.tsx` ICON_MAP에 아이콘 추가

### 등록된 패턴 (21개)

`accordion`, `alert`, `breadcrumb`, `button`, `checkbox`, `combobox`, `date-picker`, `disclosure`, `drawer`, `form-validation`, `link`, `modal-dialog`, `navigation-menu`, `pagination`, `popover`, `radio-group`, `select`, `tabs`, `text-input`, `toggle`, `tooltip`

---

## 디자인 시스템 추가

새 DS를 전체 스택에 추가하려면 `/register-design-system` 스킬을 사용합니다.

```bash
# Claude Code 세션에서
/register-design-system [ds-id] [spec-harvester-path]

# 예시
/register-design-system baseui /Users/.../storage/raw/2026-03-26/base-ui.com
```

스킬이 `ds-code-writer` → `i18n-translator` → `frontend-qa` 에이전트를 순서대로 호출해 types.ts, SandpackPreview.tsx, 각 패턴 파일, translations.en.ts를 자동으로 업데이트합니다.

### 등록된 디자인 시스템 (6개)

| ID         | 이름                  | 색상      |
| ---------- | --------------------- | --------- |
| `material` | Material Design (MUI) | `#1976d2` |
| `radix`    | Radix UI              | `#6e56cf` |
| `antd`     | Ant Design            | `#1677ff` |
| `chakra`   | Chakra UI             | `#319795` |
| `spectrum` | React Spectrum        | `#e03`    |
| `baseui`   | Base UI               | `#18181b` |

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
pnpm transform:rules   # 크롤 MD → backend rule JSON
pnpm transform:pattern # 크롤 MD → 프론트 패턴

# 검증
pnpm verify:rules      # rule JSON 스키마 검증
pnpm verify:patterns   # rule JSON + 프론트 패턴 구조 검증
```

---

## Tooling

| 도구             | 역할                                                          |
| ---------------- | ------------------------------------------------------------- |
| **mise** (권장)  | Node 22.x / pnpm 9.x 버전 고정                                |
| **lefthook**     | pre-commit: lint·format·type-check / pre-push: +build         |
| **Turborepo**    | 빌드 캐싱, 패키지 간 task 의존성 관리                         |
| **ESLint 9**     | flat config, `@a11y/eslint-config`로 공유                     |
| **next-sitemap** | 프론트 `postbuild`에서 정적 `sitemap.xml` / `robots.txt` 생성 |
