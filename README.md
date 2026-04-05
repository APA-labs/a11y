# A11y Pattern Agent

A **reference site** for WCAG 2.1 AA accessibility patterns, with an **AI-powered analyzer** that takes a component description and returns checklists, code samples, and test guides.

- **Pattern hub** — per-pattern checklists, multi design-system code examples, live Sandpack preview
- **WCAG reference** — criterion summaries and external links (`/wcag`)
- **AI analysis** (optional) — `/analyze` and the Tools sidebar appear only when `ANTHROPIC_API_KEY` is set

## Getting Started

```bash
pnpm install
pnpm dev          # frontend :3000 + backend :3001
```

Environment variables (`packages/backend/.env.local`, `packages/frontend/.env.local`):

| Variable               | Purpose                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `ANTHROPIC_API_KEY`    | Required for `POST /api/analyze`. AI menu is hidden in frontend without it.        |
| `NEXT_PUBLIC_SITE_URL` | Used by `next-sitemap` to generate absolute URLs in production builds.             |
| `NEXT_PUBLIC_GA_ID`    | Google Analytics 4 measurement ID (`G-XXXXXXXXXX`). GA script is skipped if unset. |

---

## Package Structure

```
a11y/
├── packages/
│   ├── shared/          # Shared types + Zod schemas (single source of truth)
│   ├── backend/         # Fastify API server (:3001)
│   └── frontend/        # Next.js 15 app (:3000), React 19
└── tools/
    ├── spec-transformer/    # Crawled MD → rule JSON / frontend pattern source
    ├── eslint-config/       # @a11y/eslint-config (shared lint config)
    └── typescript-config/   # @a11y/typescript-config (shared tsconfig)
```

### Dependency Graph

```
packages/shared
    ↑               ← shared types (AnalysisRequest, AnalysisResponse, …)
    ├── packages/backend
    └── packages/frontend

tools/spec-transformer
    ↓
    ├── packages/backend/src/rules/*.json
    └── packages/frontend/lib/patterns/*.ts
```

### Package Roles

| Package            | Role                                                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `shared`           | Single source of truth for TypeScript types and Zod schemas                                                             |
| `backend`          | Receives analysis requests → classifies patterns → loads rule JSON → calls Claude API → returns response                |
| `frontend`         | Pattern list/detail (`/patterns/[slug]`), WCAG reference (`/wcag`), optional AI analysis (`/analyze`), Sandpack preview |
| `spec-transformer` | Processes crawl output to generate and validate rule JSON and frontend pattern modules                                  |

### Frontend Pages

| Route              | Description                                         |
| ------------------ | --------------------------------------------------- |
| `/`                | Pattern card grid                                   |
| `/patterns/[slug]` | Per-pattern checklist, DS tabs, code + preview tabs |
| `/wcag`            | WCAG criterion summaries and external doc links     |
| `/analyze`         | AI analysis (activated when API key is configured)  |

---

## Content Pipeline

```
┌──────────────────────┐
│    spec-harvester    │  Crawls W3C & design system docs (quarterly)
│   (separate repo)    │  → storage/raw/YYYY-MM-DD/{ds}.com/{hash}.md
└──────────┬───────────┘
           │ crawl output directory path
           ▼
┌──────────────────────┐
│   spec-transformer   │  Extracts rules from MD, generates frontend patterns
│   (tools/)           │  --target rules    → packages/backend/src/rules/*.json
│                      │  --target patterns → packages/frontend/lib/patterns/*.ts
└──────────┬───────────┘
      ┌────┴────┐
      ▼         ▼
  backend    frontend
 (loads      (renders
  rules at    patterns
  runtime)    in UI)
```

### Running the Pipeline

```bash
# 1. Crawl with spec-harvester (separate Python environment)
cd ~/spec-harvester
python -m spec_harvester crawl --policy apg    # W3C ARIA APG
python -m spec_harvester crawl --policy mui    # MUI docs

# 2. Generate backend rule JSON
pnpm transform:rules -- \
  --input ~/spec-harvester/storage/raw/2026-06-01 \
  --output packages/backend/src/rules

# 3. Generate frontend patterns
pnpm transform:pattern -- \
  --input ~/spec-harvester/storage/raw/2026-06-01 \
  --output packages/frontend/lib/patterns \
  --pattern tabs

# 4. Validate
pnpm verify:rules      # validate rule JSON schema
pnpm verify:patterns   # validate rule JSON + frontend pattern structure
```

### Supported Crawl Sources

| Policy     | Domain                   | Content                                  |
| ---------- | ------------------------ | ---------------------------------------- |
| `apg`      | www.w3.org               | ARIA APG pattern pages (checklist-based) |
| `mui`      | mui.com                  | MUI component accessibility docs         |
| `radix`    | radix-ui.com             | Radix UI primitive docs                  |
| `antd`     | ant.design               | Ant Design component docs                |
| `baseui`   | base-ui.com              | Base UI component docs                   |
| `chakra`   | chakra-ui.com            | Chakra UI component docs                 |
| `spectrum` | react-spectrum.adobe.com | React Spectrum docs                      |

---

## Backend Request Flow

```
POST /api/analyze
  → ValidationService   (Zod schema validation)
  → PatternClassifier   (extracts pattern name via regex)
  → RuleEngine          (loads rules/*.json)
  → LLMOrchestrator     (calls Claude API with rules as context)
  → ResponseComposer    (post-processes and validates response)
  → AnalysisResponse
```

#### POST /api/analyze

```json
// Request
{ "description": "dropdown menu component", "context": "mobile navigation" }

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

## Adding Patterns

### Via Claude Code skill (recommended)

Run `/add-a11y-rule` in a Claude Code session. Provide a W3C URL, HTML snippet, or JSON — it automatically creates the backend rule JSON, registers it in `patterns.json`, and generates the frontend pattern file.

To add a new design system, use `/register-design-system` to handle code samples, translations, and QA in one pass.

### Manual

1. Create `packages/backend/src/rules/<pattern-id>.json`
2. Register in `packages/backend/src/rules/patterns.json`
3. Add pattern definition at `packages/frontend/lib/patterns/<slug>.ts`
4. Export from `packages/frontend/lib/patterns/index.ts` and add to the `patterns` array
5. Add icon to `ICON_MAP` in `packages/frontend/lib/pattern-icons.tsx`

### Registered Patterns (21)

`accordion`, `alert`, `breadcrumb`, `button`, `checkbox`, `combobox`, `date-picker`, `disclosure`, `drawer`, `form-validation`, `link`, `modal-dialog`, `navigation-menu`, `pagination`, `popover`, `radio-group`, `select`, `tabs`, `text-input`, `toggle`, `tooltip`

---

## Adding a Design System

Use the `/register-design-system` skill to add a new DS across the full stack.

```bash
# In a Claude Code session
/register-design-system [ds-id] [spec-harvester-path]

# Example
/register-design-system baseui /Users/.../storage/raw/2026-03-26/base-ui.com
```

The skill chains `ds-code-writer` → `i18n-translator` → `frontend-qa` agents to automatically update `types.ts`, `SandpackPreview.tsx`, pattern files, and `translations.en.ts`.

### Registered Design Systems (6)

| ID         | Name                  | Color     |
| ---------- | --------------------- | --------- |
| `material` | Material Design (MUI) | `#1976d2` |
| `radix`    | Radix UI              | `#6e56cf` |
| `antd`     | Ant Design            | `#1677ff` |
| `chakra`   | Chakra UI             | `#319795` |
| `spectrum` | React Spectrum        | `#e03`    |
| `baseui`   | Base UI               | `#18181b` |

---

## Scripts

```bash
# Development
pnpm dev               # all dev servers (backend :3001 + frontend :3000)
pnpm build             # full build
pnpm lint              # ESLint
pnpm format            # Prettier
pnpm type-check        # TypeScript type check

# Content pipeline
pnpm transform:rules   # crawled MD → backend rule JSON
pnpm transform:pattern # crawled MD → frontend pattern

# Validation
pnpm verify:rules      # validate rule JSON schema
pnpm verify:patterns   # validate rule JSON + frontend pattern structure
```
