import { z } from 'zod'

export const GenerateRequestSchema = z.object({
  description: z.string().min(10).max(2000),
  existingCode: z.string().max(5000).optional()
})

export const AgentStepSchema = z.object({
  tool: z.enum(['classify_pattern', 'get_rules', 'generate_component', 'validate_component']),
  status: z.enum(['running', 'done', 'failed']),
  result: z.string().optional()
})

export const GenerateResponseSchema = z.object({
  jsx: z.string(),
  patterns: z.array(z.string()),
  appliedRules: z.array(z.string()),
  violations: z.array(z.string()),
  steps: z.array(AgentStepSchema)
})
