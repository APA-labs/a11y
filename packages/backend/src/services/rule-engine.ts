import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

import { logger } from '../utils/logger.js'

import type { RuleSet } from '../types/internal.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export class RuleEngine {
  private readonly rulesDir: string
  private readonly cache = new Map<string, RuleSet>()

  constructor() {
    this.rulesDir = path.join(__dirname, '..', 'rules')
  }

  async loadRule(patternName: string): Promise<RuleSet | null> {
    if (this.cache.has(patternName)) return this.cache.get(patternName)!

    try {
      const filename = patternName.toLowerCase().replace(/\s+/g, '-') + '.json'
      const filePath = path.join(this.rulesDir, filename)
      const content = await fs.readFile(filePath, 'utf-8')
      const rule = JSON.parse(content) as RuleSet
      this.cache.set(patternName, rule)
      return rule
    } catch {
      logger.warn(`No rule file for pattern: ${patternName}`)
      return null
    }
  }

  async loadRules(patternNames: string[]): Promise<RuleSet[]> {
    const results = await Promise.all(patternNames.map((name) => this.loadRule(name)))
    return results.filter((r): r is RuleSet => r !== null)
  }
}
