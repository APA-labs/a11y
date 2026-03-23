import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: true,
});

fastify.get('/health', async (request, reply) => {
  return { status: 'ok' };
});

fastify.post<{ Body: any }>('/api/analyze', async (request, reply) => {
  // TODO: Implement analysis logic
  return {
    patterns: [],
    checklist: { must: [], should: [], avoid: [] },
    codeSamples: [],
    tests: [],
    questions: [],
    references: [],
  };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    console.log('Backend running on http://localhost:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
