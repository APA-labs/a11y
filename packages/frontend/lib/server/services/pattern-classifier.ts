import fs from 'fs/promises'
import path from 'path'

import { claudeClient, CLAUDE_MODEL_FAST, SYSTEM_PROMPT } from '../claude.js'
import { logger } from '../logger.js'

import type { PatternRegistry } from '../internal.js'

export class PatternClassifier {
  private registry: PatternRegistry | null = null

  private async getRegistry(): Promise<PatternRegistry> {
    if (this.registry) return this.registry
    const filePath = path.join(process.cwd(), 'lib/server/rules', 'patterns.json')
    const content = await fs.readFile(filePath, 'utf-8')
    this.registry = JSON.parse(content) as PatternRegistry
    return this.registry
  }

  async classify(description: string): Promise<string[]> {
    const registry = await this.getRegistry()
    const patternNames = registry.patterns.map((p) => p.name).join(', ')

    const prompt = `Given this UI component description, identify which accessibility patterns apply.

Description: "${description}"

Available patterns: ${patternNames}

Return ONLY a JSON object:
{"patterns": ["Pattern Name 1", "Pattern Name 2"]}`

    try {
      const response = await claudeClient.messages.create({
        model: CLAUDE_MODEL_FAST,
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: prompt }]
      })

      const block = response.content[0]
      if (!block || block.type !== 'text') {
        throw new Error('Unexpected response type from Claude')
      }

      const parsed = JSON.parse(extractJSON(block.text)) as { patterns?: unknown }
      if (!Array.isArray(parsed.patterns)) return []
      return parsed.patterns.filter((p): p is string => typeof p === 'string')
    } catch (error) {
      logger.error('Pattern classification failed', error)
      return fallbackClassify(description, registry)
    }
  }
}

function extractJSON(text: string): string {
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (fenceMatch?.[1]) return fenceMatch[1].trim()
  const braceStart = text.indexOf('{')
  const braceEnd = text.lastIndexOf('}')
  if (braceStart !== -1 && braceEnd !== -1) return text.slice(braceStart, braceEnd + 1)
  return text.trim()
}

function fallbackClassify(description: string, registry: PatternRegistry): string[] {
  const lower = description.toLowerCase()
  return registry.patterns
    .filter((p) => p.keywords.some((kw) => lower.includes(kw)))
    .map((p) => p.name)
    .slice(0, 3)
}
