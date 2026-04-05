import { claudeClient, CLAUDE_MODEL_FAST } from '../claude'

import type { RuleSet } from '../internal'

interface ValidationResult {
  passed: boolean
  violations: string[]
}

export class ComponentValidator {
  async validate(jsx: string, rules: RuleSet[]): Promise<ValidationResult> {
    const mustRules = rules
      .flatMap((r) => r.checklist.must)
      .map((item) => `- ${item.title}: ${item.description}`)
      .join('\n')

    const response = await claudeClient.messages.create({
      model: CLAUDE_MODEL_FAST,
      max_tokens: 512,
      system:
        'You are an accessibility expert. Analyze the JSX code and return ONLY a JSON array of violation strings. Return [] if no violations found.',
      messages: [
        {
          role: 'user',
          content: `Check this React JSX for accessibility violations against these must-have rules:\n\n${mustRules}\n\nJSX:\n${jsx}\n\nReturn ONLY a JSON array like: ["violation1", "violation2"] or [] if none.`
        }
      ]
    })

    const block = response.content[0]
    if (!block || block.type !== 'text') {
      return { passed: true, violations: [] }
    }

    try {
      const text = block.text.trim()
      const arrayMatch = text.match(/\[[\s\S]*\]/)
      const violations: string[] = arrayMatch ? JSON.parse(arrayMatch[0]) : []
      return { passed: violations.length === 0, violations }
    } catch {
      return { passed: true, violations: [] }
    }
  }
}
