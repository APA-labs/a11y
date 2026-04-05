import cors from '@fastify/cors'
import Fastify from 'fastify'

import { analyzeRoutes } from './routes/analyze.js'
import { generateRoutes } from './routes/generate.js'
import { healthRoutes } from './routes/health.js'

const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL ?? 'info'
  }
})

await fastify.register(cors, { origin: true })
await fastify.register(healthRoutes)
await fastify.register(analyzeRoutes)
await fastify.register(generateRoutes)

const port = parseInt(process.env.PORT ?? '3001', 10)
const host = process.env.HOST ?? '0.0.0.0'

try {
  await fastify.listen({ port, host })
  console.log(`Backend running on http://localhost:${port}`)
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
