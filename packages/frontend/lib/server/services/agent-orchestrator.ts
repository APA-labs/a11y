import { ComponentValidator } from './component-validator.js'
import { PatternClassifier } from './pattern-classifier.js'
import { RuleEngine } from './rule-engine.js'
// CLAUDE_MODEL_FAST = tool dispatch loop (Haiku), CLAUDE_MODEL = code generation (Sonnet)
import { claudeClient, CLAUDE_MODEL, CLAUDE_MODEL_FAST } from '../claude.js'
import { logger } from '../logger.js'

import type { RuleSet } from '../internal.js'
import type { GenerateRequest, GenerateResponse, AgentStep } from '@a11y/shared'
import type Anthropic from '@anthropic-ai/sdk'

const TOOLS: Anthropic.Tool[] = [
  {
    name: 'classify_pattern',
    description: 'Classify the UI description into known accessibility patterns',
    input_schema: {
      type: 'object',
      properties: { description: { type: 'string' } },
      required: ['description']
    }
  },
  {
    name: 'get_rules',
    description: 'Get WCAG accessibility rules for the given patterns',
    input_schema: {
      type: 'object',
      properties: { patterns: { type: 'array', items: { type: 'string' } } },
      required: ['patterns']
    }
  },
  {
    name: 'generate_component',
    description: 'Generate an accessible React JSX component based on rules and description',
    input_schema: {
      type: 'object',
      properties: {
        rules: { type: 'array' },
        description: { type: 'string' },
        existingCode: { type: 'string' },
        violations: { type: 'array', items: { type: 'string' } }
      },
      required: ['rules', 'description']
    }
  },
  {
    name: 'validate_component',
    description: 'Validate the generated JSX for accessibility violations',
    input_schema: {
      type: 'object',
      properties: {
        jsx: { type: 'string' },
        rules: { type: 'array' }
      },
      required: ['jsx', 'rules']
    }
  }
]

const AGENT_SYSTEM_PROMPT = `You are an accessibility expert that generates accessible React components.

Your workflow MUST follow this exact sequence using the provided tools:
1. Call classify_pattern to identify what UI patterns are needed
2. Call get_rules to load WCAG accessibility rules for those patterns
3. Call generate_component to create the accessible React JSX
4. Call validate_component to check for violations
5. If violations are found, call generate_component again with the violations to fix them (max 3 attempts)
6. Once validation passes (or max attempts reached), respond with the final JSX component code

Always follow WCAG 2.1 AA standards. Generate complete, working React components.`

export class AgentOrchestrator {
  private patternClassifier = new PatternClassifier()
  private ruleEngine = new RuleEngine()
  private componentValidator = new ComponentValidator()

  async generate(request: GenerateRequest): Promise<GenerateResponse> {
    const steps: AgentStep[] = []
    const messages: Anthropic.MessageParam[] = [
      {
        role: 'user',
        content: `Generate an accessible React component for: "${request.description}"${
          request.existingCode ? `\n\nExisting code to improve:\n${request.existingCode}` : ''
        }`
      }
    ]

    let loadedRules: RuleSet[] = []
    let detectedPatterns: string[] = []
    let finalJsx = ''
    let lastViolations: string[] = []
    let toolCallCount = 0
    const MAX_TOOL_CALLS = 10

    while (toolCallCount < MAX_TOOL_CALLS) {
      const response = await claudeClient.messages.create({
        model: CLAUDE_MODEL_FAST,
        max_tokens: 4096,
        system: AGENT_SYSTEM_PROMPT,
        tools: TOOLS,
        messages
      })

      messages.push({ role: 'assistant', content: response.content })

      if (response.stop_reason === 'end_turn') {
        const textBlock = response.content.find((b) => b.type === 'text')
        if (textBlock && textBlock.type === 'text') {
          finalJsx = extractCode(textBlock.text)
        }
        break
      }

      if (response.stop_reason !== 'tool_use') break

      const toolResults: Anthropic.ToolResultBlockParam[] = []

      for (const block of response.content) {
        if (block.type !== 'tool_use') continue

        toolCallCount++
        const toolName = block.name as AgentStep['tool']
        const input = block.input as Record<string, unknown>

        steps.push({ tool: toolName, status: 'running' })
        const stepIndex = steps.length - 1

        try {
          let result: string

          if (toolName === 'classify_pattern') {
            const patterns = await this.patternClassifier.classify(input.description as string)
            detectedPatterns = patterns
            result = JSON.stringify(patterns)
            logger.info('Agent: classified patterns', { patterns })
          } else if (toolName === 'get_rules') {
            const rules = await this.ruleEngine.loadRules(input.patterns as string[])
            loadedRules = rules
            result = JSON.stringify(rules)
            logger.info('Agent: loaded rules', { count: rules.length })
          } else if (toolName === 'generate_component') {
            const jsx = await this.generateComponent(
              input.rules as RuleSet[],
              input.description as string,
              input.existingCode as string | undefined,
              input.violations as string[] | undefined
            )
            finalJsx = jsx
            result = jsx
            logger.info('Agent: generated component')
          } else if (toolName === 'validate_component') {
            const validation = await this.componentValidator.validate(input.jsx as string, input.rules as RuleSet[])
            lastViolations = validation.violations
            result = JSON.stringify(validation)
            logger.info('Agent: validated component', { passed: validation.passed, violations: validation.violations.length })
          } else {
            result = 'Unknown tool'
          }

          steps[stepIndex] = { tool: toolName, status: 'done', result }
          toolResults.push({ type: 'tool_result', tool_use_id: block.id, content: result })
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Tool execution failed'
          steps[stepIndex] = { tool: toolName, status: 'failed', result: errorMsg }
          toolResults.push({ type: 'tool_result', tool_use_id: block.id, content: `Error: ${errorMsg}`, is_error: true })
        }
      }

      messages.push({ role: 'user', content: toolResults })
    }

    const appliedRules = loadedRules.flatMap((r) => r.checklist.must).map((item) => item.title)

    return {
      jsx: finalJsx,
      patterns: detectedPatterns,
      appliedRules,
      violations: lastViolations,
      steps
    }
  }

  private async generateComponent(rules: RuleSet[], description: string, existingCode?: string, violations?: string[]): Promise<string> {
    const rulesContext = rules
      .map(
        (r) =>
          `Pattern: ${r.pattern}\n` +
          `Must: ${r.checklist.must.map((i) => `${i.title} - ${i.description}`).join('; ')}\n` +
          `Should: ${r.checklist.should.map((i) => i.title).join(', ')}`
      )
      .join('\n\n')

    const violationsContext = violations?.length
      ? `\nFix these violations from the previous attempt:\n${violations.map((v) => `- ${v}`).join('\n')}`
      : ''

    const existingCodeContext = existingCode
      ? `\nExisting code to improve (add missing ARIA attributes, roles, keyboard handlers):\n${existingCode}`
      : ''

    const prompt = `Generate a complete, accessible React component for: "${description}"

WCAG Rules to implement:
${rulesContext}
${violationsContext}
${existingCodeContext}

Requirements:
- Use import './index.css' for styles, use semantic className like .app, .btn, .dialog etc
- Import React hooks at the top (useState, useRef, useEffect as needed)
- Export as: export default function App() { ... }
- Include all required ARIA attributes, roles, and keyboard handlers
- Use useRef<HTMLElement>(null) with proper TypeScript generics
- Declare all event handlers as const before JSX

Return ONLY the complete JSX code, no explanation.`

    const response = await claudeClient.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 2048,
      system: 'You are an accessibility expert. Generate complete, working React components with proper ARIA attributes. Return ONLY the code.',
      messages: [{ role: 'user', content: prompt }]
    })

    const block = response.content[0]
    if (!block || block.type !== 'text') throw new Error('No code generated')
    return extractCode(block.text)
  }
}

function extractCode(text: string): string {
  const tsxMatch = text.match(/```(?:tsx|jsx|typescript|javascript)?\s*([\s\S]*?)```/)
  if (tsxMatch?.[1]) return tsxMatch[1].trim()
  return text.trim()
}
