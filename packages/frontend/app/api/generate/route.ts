import { GenerateRequestSchema } from '@a11y/shared'
import { NextResponse } from 'next/server'

import { AgentOrchestrator } from '../../../lib/server/services/agent-orchestrator'

const agentOrchestrator = new AgentOrchestrator()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = GenerateRequestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid request' }, { status: 400 })
    }

    const result = await agentOrchestrator.generate(parsed.data)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Generation failed' }, { status: 500 })
  }
}
