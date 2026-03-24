import { parseArgs } from 'util'
import { readSpecPages } from './reader.js'
import { extractRules } from './extractor.js'
import { writeRule, updatePatternsRegistry } from './writer.js'

// Maps pattern IDs to URL path segments found in W3C ARIA APG
const PATTERN_URL_MAP: Record<string, string> = {
  button: 'apg/patterns/button',
  toggle: 'apg/patterns/button',
  'text-input': 'apg/patterns/textbox',
  'modal-dialog': 'apg/patterns/dialog-modal',
  tabs: 'apg/patterns/tabs',
  tooltip: 'apg/patterns/tooltip',
  disclosure: 'apg/patterns/disclosure',
  combobox: 'apg/patterns/combobox',
  accordion: 'apg/patterns/accordion'
}

const { values } = parseArgs({
  options: {
    input: { type: 'string' },
    output: { type: 'string' },
    patterns: { type: 'string' },
    'dry-run': { type: 'boolean', default: false }
  }
})

const inputDir = values['input']
const outputDir = values['output']
const dryRun = values['dry-run'] ?? false

if (!inputDir || !outputDir) {
  console.error('Usage: spec-transform --input <dir> --output <dir> [--patterns button,modal-dialog,...] [--dry-run]')
  process.exit(1)
}

const requestedPatterns = values['patterns'] ? values['patterns'].split(',').map((p) => p.trim()) : Object.keys(PATTERN_URL_MAP)

console.log(`Transforming patterns: ${requestedPatterns.join(', ')}`)
console.log(`Input:  ${inputDir}`)
console.log(`Output: ${outputDir}`)
if (dryRun) console.log('(dry-run mode)')

const uniqueUrlPatterns = [...new Set(requestedPatterns.map((p) => PATTERN_URL_MAP[p]).filter((p): p is string => Boolean(p)))]

console.log(`\nScanning for pages matching: ${uniqueUrlPatterns.join(', ')}`)
const pages = await readSpecPages(inputDir, uniqueUrlPatterns)
console.log(`Found ${pages.length} matching spec page(s)\n`)

if (pages.length === 0) {
  console.warn('No matching pages found. Make sure spec-harvester has crawled the W3C ARIA APG site.')
  process.exit(0)
}

let success = 0
let failed = 0

for (const patternId of requestedPatterns) {
  const urlSegment = PATTERN_URL_MAP[patternId]
  if (!urlSegment) {
    console.warn(`⚠ Unknown pattern "${patternId}" — skipping`)
    continue
  }

  const page = pages.find((p) => p.url.includes(urlSegment))
  if (!page) {
    console.warn(`⚠ No crawled page found for "${patternId}" (looking for ${urlSegment})`)
    continue
  }

  process.stdout.write(`Extracting rules for "${patternId}"... `)
  try {
    const rule = await extractRules(patternId, page.url, page.html)
    await writeRule(outputDir, patternId, rule, dryRun)
    await updatePatternsRegistry(outputDir, patternId, rule, dryRun)
    success++
  } catch (err) {
    console.error(`\n✗ Failed: ${err instanceof Error ? err.message : String(err)}`)
    failed++
  }
}

console.log(`\nDone: ${success} succeeded, ${failed} failed`)
if (failed > 0) process.exit(1)
