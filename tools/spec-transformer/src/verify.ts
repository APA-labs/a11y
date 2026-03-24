/**
 * Verify transformer output files:
 *   - packages/backend/src/rules/*.json  → RuleSet schema
 *   - packages/frontend/lib/patterns.ts  → type-check via tsc (run separately)
 *
 * Usage:
 *   tsx src/verify.ts --rules ../../packages/backend/src/rules
 *   tsx src/verify.ts --rules ../../packages/backend/src/rules --patterns ../../packages/frontend/lib/patterns.ts
 */

import { readdir, readFile } from 'fs/promises'
import { join, resolve } from 'path'
import { parseArgs } from 'util'

interface ChecklistItem {
  id: string
  title: string
  description: string
}

interface RuleSet {
  pattern: string
  wcagLevel: string
  checklist: {
    must: ChecklistItem[]
    should: ChecklistItem[]
    avoid: ChecklistItem[]
  }
  codeSamples: Record<string, { label: string; code: string }>
  tests: { title: string; steps: string[]; tools: string[] }[]
  references: string[]
}

const VALID_WCAG_LEVELS = new Set(['A', 'AA', 'AAA'])
const VALID_CODE_LANGS = new Set(['react', 'html', 'typescript'])
const KEBAB_CASE = /^[a-z][a-z0-9-]*$/

type Issue = { severity: 'error' | 'warn'; message: string }

function validateRuleSet(file: string, data: unknown): Issue[] {
  const issues: Issue[] = []
  const err = (msg: string) => issues.push({ severity: 'error', message: msg })
  const warn = (msg: string) => issues.push({ severity: 'warn', message: msg })

  if (!data || typeof data !== 'object') {
    err('Not a valid JSON object')
    return issues
  }

  const r = data as Partial<RuleSet>

  if (!r.pattern) err('Missing required field: pattern')
  if (!r.wcagLevel) err('Missing required field: wcagLevel')
  else if (!VALID_WCAG_LEVELS.has(r.wcagLevel)) err(`Invalid wcagLevel "${r.wcagLevel}" — must be A, AA, or AAA`)

  if (!r.checklist) {
    err('Missing required field: checklist')
  } else {
    for (const level of ['must', 'should', 'avoid'] as const) {
      const items = r.checklist[level]
      if (!Array.isArray(items)) {
        err(`checklist.${level} must be an array`)
        continue
      }
      if (items.length === 0) warn(`checklist.${level} is empty`)

      const ids = new Set<string>()
      for (const item of items) {
        if (!item.id) err(`checklist.${level}: item missing id`)
        else if (!KEBAB_CASE.test(item.id)) err(`checklist.${level}: id "${item.id}" is not kebab-case`)
        else if (ids.has(item.id)) err(`checklist.${level}: duplicate id "${item.id}"`)
        else ids.add(item.id)

        if (!item.title) err(`checklist.${level}[${item.id}]: missing title`)
        if (!item.description) err(`checklist.${level}[${item.id}]: missing description`)
      }
    }
  }

  if (!r.codeSamples || Object.keys(r.codeSamples).length === 0) {
    warn('codeSamples is empty')
  } else {
    for (const [lang, sample] of Object.entries(r.codeSamples)) {
      if (!VALID_CODE_LANGS.has(lang)) warn(`codeSamples: unknown language "${lang}"`)
      if (!sample?.code) err(`codeSamples.${lang}: missing code`)
      if (!sample?.label) warn(`codeSamples.${lang}: missing label`)
    }
  }

  if (!Array.isArray(r.tests) || r.tests.length === 0) warn('tests is empty')

  if (!Array.isArray(r.references) || r.references.length === 0) {
    warn('references is empty')
  } else {
    for (const ref of r.references) {
      if (!ref.startsWith('https://')) warn(`references: "${ref}" is not an https URL`)
    }
  }

  return issues
}

const { values } = parseArgs({
  options: {
    rules: { type: 'string' },
    patterns: { type: 'string' }
  }
})

const rulesDir = values['rules']
const patternsFile = values['patterns']

if (!rulesDir && !patternsFile) {
  console.error('Usage: tsx src/verify.ts --rules <dir> [--patterns <file>]')
  process.exit(1)
}

let totalErrors = 0
let totalWarns = 0

// ── Rule JSON validation ──────────────────────────────────────────────────────
if (rulesDir) {
  const absRulesDir = resolve(rulesDir)
  console.log(`\nVerifying rule JSON files in: ${absRulesDir}\n`)

  const files = (await readdir(absRulesDir)).filter((f) => f.endsWith('.json') && f !== 'patterns.json')

  for (const file of files.sort()) {
    const raw = await readFile(join(absRulesDir, file), 'utf-8')
    let data: unknown
    try {
      data = JSON.parse(raw)
    } catch {
      console.log(`  ✗ ${file}: invalid JSON`)
      totalErrors++
      continue
    }

    const issues = validateRuleSet(file, data)
    const errors = issues.filter((i) => i.severity === 'error')
    const warns = issues.filter((i) => i.severity === 'warn')

    if (issues.length === 0) {
      console.log(`  ✓ ${file}`)
    } else {
      console.log(`  ${errors.length > 0 ? '✗' : '⚠'} ${file}`)
      for (const issue of issues) {
        console.log(`      ${issue.severity === 'error' ? '✗' : '⚠'} ${issue.message}`)
      }
    }

    totalErrors += errors.length
    totalWarns += warns.length
  }

  console.log(`\n${files.length} files checked — ${totalErrors} errors, ${totalWarns} warnings`)
}

// ── patterns.ts type-check hint ───────────────────────────────────────────────
if (patternsFile) {
  console.log(`\npatterns.ts validation:`)
  console.log(`  Run type-check for full validation:`)
  console.log(`  pnpm --filter @a11y/frontend type-check\n`)

  // Basic structural check: count pattern entries
  const content = await readFile(resolve(patternsFile), 'utf-8')
  const slugMatches = content.match(/slug:\s*'[^']+'/g) ?? []
  const dsMatches = content.match(/designSystems:\s*\{/g) ?? []

  console.log(`  Patterns found:  ${slugMatches.length}`)
  console.log(`  With DS info:    ${dsMatches.length}`)

  const incomplete = slugMatches.length - dsMatches.length
  if (incomplete > 0) {
    console.log(`  ⚠ ${incomplete} pattern(s) missing designSystems block`)
    totalWarns += incomplete
  } else {
    console.log(`  ✓ All patterns have designSystems`)
  }
}

if (totalErrors > 0) process.exit(1)
