export interface ChecklistItem {
  id: string
  title: string
  description: string
  level: 'must' | 'should' | 'avoid'
}

export interface CodeSample {
  language: string
  label: string
  code: string
}

export type DesignSystemId = 'material' | 'radix' | 'antd' | 'shadcn' | 'chakra' | 'spectrum'

export interface DesignSystemVariant {
  id: DesignSystemId
  name: string
  color: string
  additionalChecks: ChecklistItem[]
  codeSample: CodeSample
  notes: string[]
}

export interface Pattern {
  slug: string
  name: string
  description: string
  wcagCriteria: string[]
  tags: string[]
  baseline: {
    checklist: {
      must: ChecklistItem[]
      should: ChecklistItem[]
      avoid: ChecklistItem[]
    }
    codeSample: CodeSample
  }
  designSystems: Partial<Record<DesignSystemId, DesignSystemVariant>>
}
