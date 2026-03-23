import { AnalysisRequestSchema, AnalysisResponseSchema } from '@a11y/shared'

import type { AnalysisRequest, AnalysisResponse } from '@a11y/shared'

export class ValidationService {
  validateRequest(data: unknown): AnalysisRequest {
    return AnalysisRequestSchema.parse(data)
  }

  validateResponse(data: unknown): data is AnalysisResponse {
    return AnalysisResponseSchema.safeParse(data).success
  }

  getValidationErrors(data: unknown): string[] {
    const result = AnalysisResponseSchema.safeParse(data)
    if (result.success) return []
    return result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`)
  }
}
