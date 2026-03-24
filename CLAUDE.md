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

### Backend request flow

```
POST /api/analyze
  → ValidationService (Zod)
  → PatternClassifier  (regex → pattern names)
  → RuleEngine         (loads JSON rule files from src/rules/)
  → LLMOrchestrator    (Claude API call with rules as context)
  → ResponseComposer   (validates & enriches response)
  → AnalysisResponse
```

Key backend files:

- `packages/backend/src/config/claude.ts` — Anthropic SDK init, `SYSTEM_PROMPT`, `MODEL`
- `packages/backend/src/services/llm-orchestrator.ts` — Claude API call & prompt engineering
- `packages/backend/src/rules/*.json` — Declarative WCAG rule definitions per pattern

### Adding a new accessibility pattern

1. Create `packages/backend/src/rules/<pattern-name>.json` (follow existing structure)
2. Register in `packages/backend/src/rules/patterns.json`
3. No code changes needed — rule engine picks it up automatically

### Shared types

`packages/shared/src/types/analysis.ts` defines `AnalysisRequest`, `AnalysisResponse`, `ChecklistItem`, etc. Import from `@a11y/shared` in both frontend and backend. Zod schemas live alongside the types in `packages/shared/src/schemas/`.

## Tooling

- **Node 22.14.0 / pnpm 9.15.9** — managed via mise (`.mise.toml`)
- **Lefthook** — pre-commit: lint + format + type-check; pre-push: + build
- **ESLint 9 flat config** — base in `tools/eslint-config/base.js`, extended per package
- **Prettier** — single `.prettierrc.json` at root (print width 150, no trailing commas)
- **ANTHROPIC_API_KEY** — required env var for backend; set in `.env.local`
