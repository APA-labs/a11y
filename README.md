# A11y Pattern Agent

AI 기반 접근성 디자인 어시스턴트. UI 컴포넌트 설명을 입력하면 WCAG 기준의 체크리스트, 코드 샘플, 테스트 가이드를 생성합니다.

## Stack

- **Frontend** — Next.js 14, React 18, TypeScript
- **Backend** — Fastify 4, TypeScript
- **Shared** — Zod 스키마 + 공유 타입
- **Monorepo** — pnpm workspaces + Turborepo

## Getting Started

```bash
# 의존성 설치
pnpm install

# git hooks 등록
lefthook install

# 개발 서버 실행 (백엔드 :3001 + 프론트엔드 :3000)
pnpm dev
```

## Project Structure

```
a11y/
├── packages/
│   ├── shared/       # 공유 타입 및 Zod 스키마
│   ├── backend/      # Fastify API 서버 (:3001)
│   └── frontend/     # Next.js 앱 (:3000)
└── tools/
    ├── eslint-config/      # @a11y/eslint-config
    └── typescript-config/  # @a11y/typescript-config
```

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | 헬스 체크 |
| POST | `/api/analyze` | 접근성 분석 요청 |

### POST /api/analyze

**Request**
```json
{
  "description": "드롭다운 메뉴 컴포넌트",
  "context": "모바일 네비게이션용"
}
```

**Response**
```json
{
  "patterns": ["disclosure", "listbox"],
  "checklist": {
    "must": [{ "id": "...", "title": "...", "description": "...", "level": "must" }],
    "should": [],
    "avoid": []
  },
  "codeSamples": [{ "language": "react", "label": "...", "code": "..." }],
  "tests": [{ "title": "...", "steps": ["..."], "tools": ["axe"] }],
  "questions": ["..."],
  "references": ["https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/"]
}
```

## Scripts

```bash
pnpm dev          # 전체 개발 서버
pnpm build        # 전체 빌드
pnpm lint         # ESLint 검사
pnpm format       # Prettier 포맷팅
pnpm type-check   # TypeScript 타입 검사
```

## Development

### 패키지 간 import

```ts
import type { AnalysisRequest } from '@a11y/shared'
```

### 새 패키지 추가

`packages/` 또는 `tools/` 하위에 디렉토리 생성 후 `package.json` 작성. pnpm workspace가 자동으로 인식합니다.

### 공유 타입 변경

`packages/shared/src/types/analysis.ts`와 `packages/shared/src/schemas/analysis.ts`를 함께 수정하세요.

## Tooling

| 도구 | 역할 |
|------|------|
| **mise** | Node.js 버전 관리 (`node 22`) |
| **lefthook** | Git hooks (pre-commit: lint·format·type-check / pre-push: +build) |
| **Prettier** | 코드 포맷팅 |
| **ESLint 9** | 린팅 (flat config) |
| **Turborepo** | 빌드 캐싱 및 태스크 오케스트레이션 |

### Claude Code Hooks

| 이벤트 | 동작 |
|--------|------|
| `Write` / `Edit` | 저장 즉시 Prettier + ESLint --fix 자동 실행 |
| `Stop` (작업 완료) | `type-check` + `lint` 검증 후 결과 출력 |

### Claude Commands

```bash
/commit   # staged 변경사항 분석 → conventional commit 자동 생성 및 실행
/pr       # 브랜치 push → PR 자동 생성 (gh CLI 필요)
```
