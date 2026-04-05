import { GenerateRequestSchema } from '@a11y/shared'

import { AgentOrchestrator } from '../services/agent-orchestrator.js'

import type { GenerateRequest } from '@a11y/shared'
import type { FastifyInstance } from 'fastify'

export async function generateRoutes(fastify: FastifyInstance): Promise<void> {
  const agentOrchestrator = new AgentOrchestrator()

  fastify.post<{ Body: GenerateRequest }>('/api/generate', async (request, reply) => {
    try {
      const parsed = GenerateRequestSchema.safeParse(request.body)
      if (!parsed.success) {
        return reply.code(400).send({ error: parsed.error.issues[0]?.message ?? 'Invalid request' })
      }

      fastify.log.info(`Generating component: "${parsed.data.description.slice(0, 60)}..."`)

      const result = await agentOrchestrator.generate(parsed.data)
      return reply.code(200).send(result)
    } catch (error) {
      fastify.log.error(error)
      return reply.code(500).send({
        error: error instanceof Error ? error.message : 'Generation failed'
      })
    }
  })
}
