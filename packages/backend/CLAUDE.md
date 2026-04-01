# Backend

## Request flow

```
POST /api/analyze
  → ValidationService (Zod)
  → PatternClassifier  (regex → pattern names)
  → RuleEngine         (loads JSON rule files from src/rules/)
  → LLMOrchestrator    (Claude API call with rules as context)
  → ResponseComposer   (validates & enriches response)
  → AnalysisResponse
```

## Key files

- `src/config/claude.ts` — Anthropic SDK init, `SYSTEM_PROMPT`, `MODEL`
- `src/services/llm-orchestrator.ts` — Claude API call & prompt engineering
- `src/rules/*.json` — Declarative WCAG rule definitions per pattern
