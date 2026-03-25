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
3. Add pattern entry to `packages/frontend/lib/patterns/<pattern-name>.ts` (see existing files for structure)
4. Export it in `packages/frontend/lib/patterns/index.ts` and add to the `patterns` array
5. No other code changes needed — rule engine and frontend pick it up automatically

### Frontend key files

```
packages/frontend/lib/patterns/           → Individual pattern definitions (one file per pattern)
packages/frontend/lib/patterns/index.ts   → Aggregates all patterns into the exported array
packages/frontend/lib/types.ts            → Pattern, ChecklistItem, DesignSystem types
packages/frontend/lib/build-preview-code.ts → Sandpack App wrapper generator (buildAppCode)
packages/frontend/lib/sandpack-shadcn.ts  → shadcn/ui component stubs for Sandpack preview
packages/frontend/components/SandpackPreview.tsx → Live preview component
  - DS_DEPS: dependency map per design system (add new DS packages here)
  - detectDeps(): scans code for known DS imports
  - hasShadcn / hasChakra: provider injection logic
packages/frontend/components/CodeBlock.tsx → Code display + preview tab toggle
```

### Sandpack dependency map

When adding a new design system or library to code samples, register it in **two places**:

1. `packages/frontend/components/SandpackPreview.tsx` → `DS_DEPS` (detection key → package versions)
2. `.claude/hooks/validate-code-samples.js` → `KNOWN_DEPS` Set (same packages)

Detection key in `DS_DEPS` must appear as a substring of the `import ... from '...'` path in user code (e.g. key `@mui/material` matches `from '@mui/material'`).

### Shared types

`packages/shared/src/types/analysis.ts` defines `AnalysisRequest`, `AnalysisResponse`, `ChecklistItem`, etc. Import from `@a11y/shared` in both frontend and backend. Zod schemas live alongside the types in `packages/shared/src/schemas/`.

## Tooling

- **Node 22.14.0 / pnpm 9.15.9** — managed via mise (`.mise.toml`)
- **Lefthook** — pre-commit: lint + format + type-check; pre-push: + build
- **ESLint 9 flat config** — base in `tools/eslint-config/base.js`, extended per package
- **Prettier** — single `.prettierrc.json` at root (print width 150, no trailing commas)
- **ANTHROPIC_API_KEY** — required env var for backend; set in `.env.local`
