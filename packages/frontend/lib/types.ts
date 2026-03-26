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

export type DesignSystemId = 'material' | 'radix' | 'antd' | 'chakra' | 'spectrum' | 'baseui'

export const DS_META: Record<DesignSystemId, { name: string; color: string }> = {
  material: { name: 'Material (MUI)', color: '#1976d2' },
  radix: { name: 'Radix UI', color: '#6e56cf' },
  antd: { name: 'Ant Design', color: '#1677ff' },
  chakra: { name: 'Chakra UI', color: '#319795' },
  spectrum: { name: 'React Spectrum', color: '#e03' },
  baseui: { name: 'Base UI', color: '#18181b' }
}

export const DS_ORDER: DesignSystemId[] = ['material', 'radix', 'antd', 'chakra', 'spectrum', 'baseui']

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
