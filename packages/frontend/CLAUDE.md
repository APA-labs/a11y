# Frontend

## Key files

```
lib/patterns/           → Individual pattern definitions (one file per pattern)
lib/patterns/index.ts   → Aggregates all patterns into the exported array
lib/types.ts            → Pattern, ChecklistItem, DesignSystem types
lib/build-preview-code.ts → Sandpack App wrapper generator (buildAppCode)
lib/sandpack-shadcn.ts  → shadcn/ui component stubs for Sandpack preview
components/SandpackPreview.tsx → Live preview component
  - DS_DEPS: dependency map per design system (add new DS packages here)
  - detectDeps(): scans code for known DS imports
  - hasShadcn / hasChakra: provider injection logic
components/CodeBlock.tsx → Code display + preview tab toggle
```

## Sandpack dependency map

When adding a new design system or library to code samples, register it in **two places**:

1. `components/SandpackPreview.tsx` → `DS_DEPS` (detection key → package versions)
2. `.claude/hooks/validate-code-samples.js` → `KNOWN_DEPS` Set (same packages)

Detection key in `DS_DEPS` must appear as a substring of the `import ... from '...'` path in user code (e.g. key `@mui/material` matches `from '@mui/material'`).
