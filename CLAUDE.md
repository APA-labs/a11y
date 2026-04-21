# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev            # Start all dev servers (frontend :3000, backend :3001)
pnpm build          # Build all packages
pnpm lint           # ESLint all packages
pnpm format         # Prettier all files
pnpm type-check     # TypeScript check all packages

# Per-package (cd into package first, or use --filter)
pnpm --filter @a11y/backend dev
pnpm --filter @a11y/frontend dev

# Run a single package's script
pnpm --filter @a11y/backend type-check
```

## Architecture

**pnpm monorepo + Turborepo** with three packages and two shared tools:

```
packages/shared    → Zod schemas + TypeScript types (single source of truth)
packages/backend   → Fastify API (port 3001) — AI orchestration
packages/frontend  → Next.js 14 app (port 3000)
tools/eslint-config       → @a11y/eslint-config (flat config v9)
tools/typescript-config   → @a11y/typescript-config
```

### Adding a new accessibility pattern

1. Create `packages/backend/src/rules/<pattern-name>.json` (follow existing structure)
2. Register in `packages/backend/src/rules/patterns.json`
3. Create `packages/frontend/lib/patterns/<slug>/` folder with `index.ts` (Pattern metadata) and `samples/` (actual `.tsx` sample files per DS + `index.css` placeholder). See `packages/frontend/lib/patterns/button/` as a reference.
4. Export it in `packages/frontend/lib/patterns/index.ts` and add to the `patterns` array
5. No other code changes needed — rule engine and frontend pick it up automatically

Sample files use `?raw` imports (see `.claude/rules/pattern-style.md` for style + validation rules).

## Session Wrap

세션 마무리 전에 `/wrap`을 실행하세요. 문서 업데이트, 자동화 기회, 학습 포인트, 다음 세션 우선순위를 분석해줍니다.

> session-wrap 플러그인이 설치되어 있지 않다면 `/wrap`은 동작하지 않습니다.
