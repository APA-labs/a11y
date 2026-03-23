import { AnalysisResponseSchema } from '@a11y/shared'

import type { AnalysisResponse } from '@a11y/shared'

const FOLLOW_UP_QUESTIONS = [
  'Are there specific browser and screen reader combinations you need to support?',
  'Do you have existing design system constraints (color tokens, spacing)?',
  'Will this component be used in a mobile context?'
]

export class ResponseComposer {
  validate(data: unknown): AnalysisResponse {
    return AnalysisResponseSchema.parse(data)
  }

  addFollowUpQuestions(data: AnalysisResponse): AnalysisResponse {
    const combined = [...data.questions, ...FOLLOW_UP_QUESTIONS]
    const unique = [...new Set(combined)]
    return { ...data, questions: unique.slice(0, 5) }
  }

  merge(base: AnalysisResponse, extra: Partial<AnalysisResponse>): AnalysisResponse {
    return {
      patterns: [...new Set([...base.patterns, ...(extra.patterns ?? [])])],
      checklist: {
        must: [...base.checklist.must, ...(extra.checklist?.must ?? [])],
        should: [...base.checklist.should, ...(extra.checklist?.should ?? [])],
        avoid: [...base.checklist.avoid, ...(extra.checklist?.avoid ?? [])]
      },
      codeSamples: [...base.codeSamples, ...(extra.codeSamples ?? [])],
      tests: [...base.tests, ...(extra.tests ?? [])],
      questions: [...base.questions, ...(extra.questions ?? [])],
      references: [...new Set([...base.references, ...(extra.references ?? [])])]
    }
  }
}
