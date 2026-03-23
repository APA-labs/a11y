import { LLMOrchestrator } from '../services/llm-orchestrator.js'
import { PatternClassifier } from '../services/pattern-classifier.js'
import { ResponseComposer } from '../services/response-composer.js'
import { RuleEngine } from '../services/rule-engine.js'
import { ValidationService } from '../services/validation.js'

import type { AnalysisRequest } from '@a11y/shared'
import type { FastifyInstance } from 'fastify'

export async function analyzeRoutes(fastify: FastifyInstance): Promise<void> {
  const patternClassifier = new PatternClassifier()
  const ruleEngine = new RuleEngine()
  const llmOrchestrator = new LLMOrchestrator()
  const responseComposer = new ResponseComposer()
  const validationService = new ValidationService()

  fastify.post<{ Body: AnalysisRequest }>('/api/analyze', async (request, reply) => {
    try {
      const validated = validationService.validateRequest(request.body)

      fastify.log.info(`Analyzing: "${validated.description.slice(0, 60)}..."`)

      const patterns = await patternClassifier.classify(validated.description)
      fastify.log.info(`Patterns: ${patterns.join(', ') || '(none)'}`)

      const rules = await ruleEngine.loadRules(patterns)
      fastify.log.info(`Rules loaded: ${rules.length}`)

      let analysis = await llmOrchestrator.generateChecklist(validated.description, patterns, rules)

      if (!validationService.validateResponse(analysis)) {
        fastify.log.warn('Response validation failed, attempting repair...')
        const repaired = await llmOrchestrator.repairJSON(JSON.stringify(analysis))
        analysis = responseComposer.validate(repaired)
      }

      const finalResponse = responseComposer.addFollowUpQuestions(analysis)
      return reply.code(200).send(finalResponse)
    } catch (error) {
      fastify.log.error(error)
      return reply.code(400).send({
        error: error instanceof Error ? error.message : 'Analysis failed'
      })
    }
  })
}
