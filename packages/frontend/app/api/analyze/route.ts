import { NextResponse } from 'next/server'

import { LLMOrchestrator } from '../../../lib/server/services/llm-orchestrator'
import { PatternClassifier } from '../../../lib/server/services/pattern-classifier'
import { ResponseComposer } from '../../../lib/server/services/response-composer'
import { RuleEngine } from '../../../lib/server/services/rule-engine'
import { ValidationService } from '../../../lib/server/services/validation'

const patternClassifier = new PatternClassifier()
const ruleEngine = new RuleEngine()
const llmOrchestrator = new LLMOrchestrator()
const responseComposer = new ResponseComposer()
const validationService = new ValidationService()

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown
    const validated = validationService.validateRequest(body)

    const patterns = await patternClassifier.classify(validated.description)
    const rules = await ruleEngine.loadRules(patterns)
    let analysis = await llmOrchestrator.generateChecklist(validated.description, patterns, rules)

    if (!validationService.validateResponse(analysis)) {
      const repaired = await llmOrchestrator.repairJSON(JSON.stringify(analysis))
      analysis = responseComposer.validate(repaired)
    }

    const finalResponse = responseComposer.addFollowUpQuestions(analysis)
    return NextResponse.json(finalResponse)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Analysis failed' }, { status: 400 })
  }
}
