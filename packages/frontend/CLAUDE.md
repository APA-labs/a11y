# Frontend

## Key files

### Data layer (SSOT — do not edit when only touching UI)

```
lib/patterns/           → Individual pattern definitions (one file per pattern)
lib/patterns/index.ts   → Aggregates all patterns into the exported array
lib/types.ts            → Pattern, ChecklistItem, DesignSystem types, DS_META
lib/i18n/*              → ko / en translations (keep keys in sync)
```

### Sandpack live preview (feature-critical)

```
lib/sandpack/build-preview-code.ts → Sandpack App wrapper generator (buildAppCode)
components/pattern/SandpackPreview.tsx → Live preview component
  - DS_DEPS: dependency map per design system (add new DS packages here)
  - detectDeps(): scans code for known DS imports
  - hasShadcn / hasChakra: provider injection logic
components/pattern/CodeBlock.tsx → Code display + preview tab toggle
```

### UI layer (safe to redesign)

```
components/ui/MotionProvider.tsx       → LazyMotion + MotionConfig (reducedMotion: 'user')
components/home/Hero.tsx               → Serif h1 hero (only place where font-serif is used)
components/home/Aurora.tsx             → 3 conic orbs + SVG noise overlay
components/home/StatsCounter.tsx       → In-view count-up stats
components/home/WcagIntro.tsx          → WCAG explainer + POUR principles
components/home/PatternCardFancy.tsx   → Home pattern card (replaces old PatternCard)
components/pattern/ScrollProgress.tsx  → Top scroll progress bar
components/pattern/SectionHeader.tsx   → Section headers on pattern detail page
components/pattern/FloatingToc.tsx     → Right-side sticky TOC (lg+)
components/layout/DSLegendFloat.tsx    → Floating DS legend, visible only when #patterns is in view
lib/wcag/ds-swatch.ts                  → getDsSwatchColor(id) — maps 'baseui' to --ds-baseui-swatch CSS var
                                         for dark mode visibility (SSOT colors stay untouched)
app/globals.css                        → entrypoint (imports styles/* in order)
app/styles/tokens.css                  → semantic tokens (light + dark) in :root / .dark
app/styles/base.css                    → reset, heading/paragraph rules (word-break, text-wrap)
app/styles/utilities.css               → custom utility classes (.scrollbar-thin)
app/styles/animations.css              → @keyframes + prefers-reduced-motion overrides
app/styles/effects.css                 → aurora orbs, noise, text-gradient
```

### Folder layout

```
app/
  [lang]/          → localized route tree (ko/en)
  styles/          → CSS split by concern (tokens/base/utilities/animations/effects)
  globals.css      → entry point, imports styles/* then @tailwind directives
components/
  layout/          → Header, Sidebar, ThemeToggle, LanguageSwitcher, CommandPalette, DSLegendFloat
  home/            → Aurora, Hero, StatsCounter, WcagIntro, PatternCardFancy
  pattern/         → CodeBlock, SandpackPreview, DesignSystemTabs, ChecklistSection,
                     WcagBadge, PatternGrid, ScrollProgress, SectionHeader, FloatingToc
  analyze/         → AnalyzeForm
  previews/        → per-pattern preview components (button, dialog, etc.)
  ui/              → primitive providers (MotionProvider)
lib/
  i18n/            → ko/en translations + hooks
  patterns/        → individual pattern definitions + icons + translations
  sandpack/        → build-preview-code (Sandpack wrapper generator)
  seo/             → metadata (alternates, canonical)
  wcag/            → criteria, ds-swatch
  types.ts         → Pattern, ChecklistItem, DS_META, DS_ORDER
  inline-code.tsx  → renderWithCode (`…` → <code>)
```

TS path alias `@/*` resolves to `./*` — prefer `@/components/...` / `@/lib/...` over deep relative imports.

## UI conventions

- **Fonts**: `font-sans` (Inter) is the default. `font-serif` (Instrument Serif) is reserved for
  the home Hero `<h1>` only — do not scatter it across the app.
- **Aurora**: live only on the home page. It is rendered in `app/[lang]/page.tsx` as an absolute
  layer with a bottom `mask-image` fade so it blends into the Stats section. Do not put Aurora
  inside Hero (causes a visible seam).
- **Dark mode tokens**: `:root` and `.dark` in `globals.css` must keep
  `canvas/inset`, `surface/divider`, `float/outline` as distinct values in dark mode — collapsing
  them kills card layering and divider visibility.
- **Base UI swatch**: do not read `DS_META.baseui.color` or `variant.color` for `baseui` directly;
  use `getDsSwatchColor(id)` so it swaps to `#e4e4e7` in dark mode. SSOT values stay the same.
- **Motion**: always import from `motion/react` (not `framer-motion`). Wrap new motion components
  with the `m` namespace and respect `useReducedMotion()` / the global
  `@media (prefers-reduced-motion: reduce)` rule in `globals.css`.
- **Sidebar**: starts collapsed on every load (`useState(true)`) — intentionally does not persist
  to avoid the SSR→CSR width flash. Users toggle per-session.
- **Typography**: headings inherit `word-break: keep-all` + `text-wrap: balance` globally so
  Korean text breaks on word boundaries. For large display text, prefer `clamp(...)` over fixed
  `text-5xl sm:text-6xl` so long words (`Accessibility`) don't overflow narrow viewports.
- **Formatter quirk**: the project's formatter auto-removes unused imports. When adding a new
  import, always add its usage in the same edit or the import will be stripped on save.

## Adding a new accessibility pattern (UI side)

1. `lib/patterns/<slug>.ts` — follow existing files (see `.claude/rules/pattern-style.md`)
2. Register in `lib/patterns/index.ts` (both the import and the `patterns` array)
3. Frontend picks it up automatically — no grid/card/detail-page changes needed

For the backend / rule engine side, see the root `CLAUDE.md`.
