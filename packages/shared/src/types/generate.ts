export interface GenerateRequest {
  description: string
  existingCode?: string
}

export interface AgentStep {
  tool: 'classify_pattern' | 'get_rules' | 'generate_component' | 'validate_component'
  status: 'running' | 'done' | 'failed'
  result?: string
}

export interface GenerateResponse {
  jsx: string
  patterns: string[]
  appliedRules: string[]
  violations: string[]
  steps: AgentStep[]
}
