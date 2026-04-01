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
3. Add pattern entry to `packages/frontend/lib/patterns/<pattern-name>.ts` (see existing files for structure)
4. Export it in `packages/frontend/lib/patterns/index.ts` and add to the `patterns` array
5. No other code changes needed — rule engine and frontend pick it up automatically

## Tooling

- **Node 22.14.0 / pnpm 9.15.9** — managed via mise (`.mise.toml`)
- **Lefthook** — pre-commit: lint + format + type-check; pre-push: + build
- **ESLint 9 flat config** — base in `tools/eslint-config/base.js`, extended per package
- **Prettier** — single `.prettierrc.json` at root (print width 150, no trailing commas)
- **ANTHROPIC_API_KEY** — required env var for backend; set in `.env.local`
