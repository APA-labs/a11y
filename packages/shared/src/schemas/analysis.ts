import { z } from 'zod';

export const AnalysisRequestSchema = z.object({
  description: z.string().min(10).max(2000),
  context: z.string().optional(),
});

export const AnalysisResponseSchema = z.object({
  patterns: z.array(z.string()),
  checklist: z.object({
    must: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      level: z.literal('must'),
    })),
    should: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      level: z.literal('should'),
    })),
    avoid: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      level: z.literal('avoid'),
    })),
  }),
  codeSamples: z.array(z.object({
    language: z.enum(['react', 'html', 'typescript']),
    label: z.string(),
    code: z.string(),
  })),
  tests: z.array(z.object({
    title: z.string(),
    steps: z.array(z.string()),
    tools: z.array(z.string()).optional(),
  })),
  questions: z.array(z.string()),
  references: z.array(z.string()),
});
