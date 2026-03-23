import { claudeClient, CLAUDE_MODEL, SYSTEM_PROMPT } from '../config/claude.js'
import { logger } from '../utils/logger.js'

import type { RuleSet } from '../types/internal.js'
import type { AnalysisResponse } from '@a11y/shared'

export class LLMOrchestrator {
  async generateChecklist(description: string, patterns: string[], rules: RuleSet[]): Promise<AnalysisResponse> {
    const rulesContext = rules
      .map(
        (r) =>
          `Pattern: ${r.pattern}\n` +
          `Must: ${r.checklist.must.map((i) => i.title).join(', ')}\n` +
          `Should: ${r.checklist.should.map((i) => i.title).join(', ')}\n` +
          `References: ${r.references.slice(0, 2).join(', ')}`,
      )
      .join('\n\n')

    const prompt = `Analyze this UI component for WCAG 2.1 AA accessibility requirements.

UI Description: "${description}"
Identified Patterns: ${patterns.join(', ')}

Rule context:
${rulesContext || 'No specific rules loaded — use your accessibility expertise.'}

Return ONLY valid JSON matching this exact structure:
{
  "patterns": ["Pattern1"],
  "checklist": {
    "must": [{"id": "unique-id", "title": "Title", "description": "Description", "level": "must"}],
    "should": [{"id": "unique-id", "title": "Title", "description": "Description", "level": "should"}],
    "avoid": [{"id": "unique-id", "title": "Title", "description": "Description", "level": "avoid"}]
  },
  "codeSamples": [{"language": "react", "label": "Example", "code": "..."}],
  "tests": [{"title": "Test Name", "steps": ["step1"], "tools": ["axe"]}],
  "questions": ["Clarifying question?"],
  "references": ["https://www.w3.org/WAI/ARIA/apg/patterns/..."]
}`

    const stream = claudeClient.messages.stream({
      model: CLAUDE_MODEL,
      max_tokens: 4096,
      thinking: { type: 'adaptive' },
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    })

    const response = await stream.finalMessage()

    const textBlock = response.content.find((b) => b.type === 'text')
    if (!textBlock || textBlock.type !== 'text') {
      throw new Error('No text content in Claude response')
    }

    logger.info('LLM generation complete', { usage: response.usage })

    try {
      return JSON.parse(extractJSON(textBlock.text)) as AnalysisResponse
    } catch {
      logger.error('Failed to parse analysis JSON', { raw: textBlock.text.slice(0, 500) })
      throw new Error('Invalid JSON in analysis response')
    }
  }

  async repairJSON(invalidJSON: string): Promise<Record<string, unknown>> {
    const response = await claudeClient.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 2048,
      system: 'You are a JSON repair expert. Return ONLY valid JSON, nothing else.',
      messages: [
        {
          role: 'user',
          content: `Fix this invalid JSON and return only the corrected version:\n\n${invalidJSON}`,
        },
      ],
    })

    const block = response.content[0]
    if (!block || block.type !== 'text') throw new Error('Unexpected response type')
    return JSON.parse(extractJSON(block.text)) as Record<string, unknown>
  }
}

function extractJSON(text: string): string {
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (fenceMatch?.[1]) return fenceMatch[1].trim()
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start !== -1 && end !== -1) return text.slice(start, end + 1)
  return text.trim()
}
