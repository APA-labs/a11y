import { parseArgs } from 'util'
import { readFile, writeFile } from 'fs/promises'
import { readSpecPages } from './reader.js'
import { extractRules } from './extractor.js'
import { extractDsVariant, type DsId } from './ds-extractor.js'
import { serializePattern } from './serialize.js'

// URL segments per pattern per source domain
const SOURCE_URL_MAP: Record<string, Record<string, string>> = {
  'www.w3.org': {
    button: 'apg/patterns/button',
    toggle: 'apg/patterns/button',
    'text-input': 'apg/patterns/textbox',
    'modal-dialog': 'apg/patterns/dialog-modal',
    tabs: 'apg/patterns/tabs',
    tooltip: 'apg/patterns/tooltip',
    disclosure: 'apg/patterns/disclosure',
    combobox: 'apg/patterns/combobox',
    accordion: 'apg/patterns/accordion'
  },
  'mui.com': {
    button: 'react-button',
    toggle: 'react-toggle-button',
    'text-input': 'react-text-field',
    'modal-dialog': 'react-dialog',
    tabs: 'react-tabs',
    tooltip: 'react-tooltip',
    accordion: 'react-accordion',
    disclosure: 'react-accordion'
  },
  'www.radix-ui.com': {
    'modal-dialog': 'components/dialog',
    toggle: 'components/toggle',
    tabs: 'components/tabs',
    tooltip: 'components/tooltip',
    disclosure: 'components/accordion',
    accordion: 'components/accordion'
  },
  'ant.design': {
    button: 'components/button',
    'text-input': 'components/input',
    'modal-dialog': 'components/modal',
    toggle: 'components/switch',
    tabs: 'components/tabs',
    tooltip: 'components/tooltip',
    disclosure: 'components/collapse',
    accordion: 'components/collapse'
  }
}

const DS_DOMAIN_MAP: Record<string, DsId> = {
  'mui.com': 'material',
  'www.radix-ui.com': 'radix',
  'ant.design': 'antd'
}

const WCAG_CRITERIA: Record<string, string[]> = {
  button: ['2.1.1 Keyboard', '2.4.7 Focus Visible', '4.1.2 Name, Role, Value', '1.4.3 Contrast'],
  toggle: ['2.1.1 Keyboard', '2.4.7 Focus Visible', '4.1.2 Name, Role, Value'],
  'text-input': [
    '1.3.1 Info and Relationships',
    '1.3.5 Identify Input Purpose',
    '2.1.1 Keyboard',
    '3.3.1 Error Identification',
    '4.1.2 Name, Role, Value'
  ],
  'modal-dialog': ['2.1.1 Keyboard', '2.1.2 No Keyboard Trap', '2.4.3 Focus Order', '4.1.2 Name, Role, Value'],
  tabs: ['2.1.1 Keyboard', '2.4.3 Focus Order', '4.1.2 Name, Role, Value'],
  tooltip: ['1.4.13 Content on Hover or Focus', '2.1.1 Keyboard', '4.1.2 Name, Role, Value'],
  disclosure: ['2.1.1 Keyboard', '4.1.2 Name, Role, Value'],
  accordion: ['2.1.1 Keyboard', '4.1.2 Name, Role, Value'],
  combobox: ['2.1.1 Keyboard', '4.1.2 Name, Role, Value', '3.3.1 Error Identification']
}

const TAGS: Record<string, string[]> = {
  button: ['interactive', 'form', 'action'],
  toggle: ['interactive', 'form', 'state'],
  'text-input': ['form', 'input', 'interactive'],
  'modal-dialog': ['overlay', 'focus-management', 'interactive'],
  tabs: ['navigation', 'interactive', 'layout'],
  tooltip: ['overlay', 'informational'],
  disclosure: ['content', 'interactive', 'navigation'],
  accordion: ['content', 'interactive', 'navigation'],
  combobox: ['form', 'input', 'interactive', 'overlay']
}

const { values } = parseArgs({
  options: {
    input: { type: 'string' },
    output: { type: 'string' },
    pattern: { type: 'string' },
    'dry-run': { type: 'boolean', default: false }
  }
})

const inputDir = values['input']
const outputFile = values['output']
const patternId = values['pattern']
const dryRun = values['dry-run'] ?? false

if (!inputDir || !outputFile || !patternId) {
  console.error('Usage: tsx src/patterns-cli.ts --input <dir> --output <patterns.ts> --pattern <id> [--dry-run]')
  process.exit(1)
}

console.log(`Building pattern: "${patternId}"`)
console.log(`Input: ${inputDir}`)
console.log(`Output: ${outputFile}`)

// 1. Read all pages grouped by source domain
const allUrlPatterns = Object.values(SOURCE_URL_MAP).flatMap((m) => Object.values(m))
const allPages = await readSpecPages(inputDir, allUrlPatterns)

function findPage(domain: string, pattern: string) {
  const urlSeg = SOURCE_URL_MAP[domain]?.[pattern]
  if (!urlSeg) return null
  return allPages.find((p) => p.url.includes(domain) && p.url.includes(urlSeg)) ?? null
}

// 2. Extract baseline from APG
const apgPage = findPage('www.w3.org', patternId)
if (!apgPage) {
  console.error(`✗ No APG page found for "${patternId}". Run: python -m spec_harvester crawl --policy apg`)
  process.exit(1)
}

process.stdout.write('Extracting baseline (W3C APG)... ')
const ruleSet = await extractRules(patternId, apgPage.url, apgPage.html)
console.log('✓')

const baseline = {
  checklist: {
    must: ruleSet.checklist.must.map((c) => ({ ...c, level: 'must' as const })),
    should: ruleSet.checklist.should.map((c) => ({ ...c, level: 'should' as const })),
    avoid: ruleSet.checklist.avoid.map((c) => ({ ...c, level: 'avoid' as const }))
  },
  codeSample: {
    language: 'tsx',
    label: 'Baseline (HTML)',
    code: ruleSet.codeSamples['html']?.code ?? ruleSet.codeSamples['react']?.code ?? ''
  }
}

// 3. Extract DS variants
const designSystems: Record<string, unknown> = {}

for (const [domain, dsId] of Object.entries(DS_DOMAIN_MAP)) {
  const page = findPage(domain, patternId)
  if (!page) {
    console.warn(`⚠ No ${dsId} page found for "${patternId}" — skipping`)
    continue
  }
  process.stdout.write(`Extracting ${dsId} variant... `)
  try {
    const variant = await extractDsVariant(dsId, patternId, page.url, page.html)
    designSystems[dsId] = variant
    console.log('✓')
  } catch (err) {
    console.error(`\n✗ ${err instanceof Error ? err.message : String(err)}`)
  }
}

// 4. Assemble Pattern
const pattern = {
  slug: patternId,
  name: ruleSet.pattern,
  description: ruleSet.checklist.must[0]?.description?.split('.')[0] ?? ruleSet.pattern,
  wcagCriteria: WCAG_CRITERIA[patternId] ?? [],
  tags: TAGS[patternId] ?? [],
  baseline,
  designSystems
}

const tsCode = serializePattern(pattern)

if (dryRun) {
  console.log('\n[dry-run] Generated pattern:\n')
  console.log(tsCode.slice(0, 600) + '...')
  process.exit(0)
}

// 5. Append to patterns.ts (before closing `]`)
const existing = await readFile(outputFile, 'utf-8')
const insertPoint = existing.lastIndexOf('\n]')
if (insertPoint === -1) {
  console.error('✗ Could not find closing `]` in patterns.ts')
  process.exit(1)
}

const updated = existing.slice(0, insertPoint) + ',\n' + tsCode + '\n]' + existing.slice(insertPoint + 2)
await writeFile(outputFile, updated, 'utf-8')
console.log(`\n✓ Pattern "${patternId}" added to ${outputFile}`)
