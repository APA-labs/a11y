import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'
import type { RuleSet } from './extractor.js'

interface PatternEntry {
  id: string
  name: string
  description: string
  keywords: string[]
}

interface PatternsRegistry {
  patterns: PatternEntry[]
}

export async function writeRule(outputDir: string, patternId: string, rule: RuleSet, dryRun: boolean): Promise<void> {
  const dest = join(outputDir, `${patternId}.json`)
  const content = JSON.stringify(rule, null, 2)

  if (dryRun) {
    console.log(`[dry-run] Would write ${dest}`)
    console.log(content.slice(0, 300) + (content.length > 300 ? '\n...' : ''))
    return
  }

  await writeFile(dest, content, 'utf-8')
  console.log(`✓ Written ${dest}`)
}

export async function updatePatternsRegistry(outputDir: string, patternId: string, rule: RuleSet, dryRun: boolean): Promise<void> {
  const registryPath = join(outputDir, 'patterns.json')

  let registry: PatternsRegistry = { patterns: [] }
  try {
    const raw = await readFile(registryPath, 'utf-8')
    registry = JSON.parse(raw) as PatternsRegistry
  } catch {
    // patterns.json doesn't exist yet
  }

  const existing = registry.patterns.findIndex((p) => p.id === patternId)
  const entry: PatternEntry = {
    id: patternId,
    name: rule.pattern,
    description: rule.checklist.must[0]?.description ?? rule.pattern,
    keywords: [patternId, rule.pattern.toLowerCase()]
  }

  if (existing >= 0) {
    registry.patterns[existing] = entry
  } else {
    registry.patterns.push(entry)
  }

  const content = JSON.stringify(registry, null, 2)

  if (dryRun) {
    console.log(`[dry-run] Would update ${registryPath}`)
    return
  }

  await writeFile(registryPath, content, 'utf-8')
  console.log(`✓ Updated ${registryPath}`)
}
