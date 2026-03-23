export interface PatternEntry {
  id: string
  name: string
  description: string
  keywords: string[]
}

export interface PatternRegistry {
  patterns: PatternEntry[]
}

export interface RuleCodeSample {
  label: string
  code: string
}

export interface RuleChecklistItem {
  id: string
  title: string
  description: string
}

export interface RuleSet {
  pattern: string
  wcagLevel: string
  checklist: {
    must: RuleChecklistItem[]
    should: RuleChecklistItem[]
    avoid: RuleChecklistItem[]
  }
  codeSamples: Record<string, RuleCodeSample>
  tests: Array<{
    title: string
    steps: string[]
    tools?: string[]
  }>
  references: string[]
}
