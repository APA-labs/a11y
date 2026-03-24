import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export type DsId = 'material' | 'radix' | 'antd'

export interface DsVariant {
  id: DsId
  name: string
  color: string
  additionalChecks: { id: string; title: string; description: string; level: 'must' | 'should' | 'avoid' }[]
  codeSample: { language: string; label: string; code: string }
  notes: string[]
}

const DS_META: Record<DsId, { name: string; color: string }> = {
  material: { name: 'Material Design (MUI)', color: '#1976d2' },
  radix: { name: 'Radix UI', color: '#6e56cf' },
  antd: { name: 'Ant Design', color: '#1677ff' }
}

const SYSTEM_PROMPT = `You are a WCAG accessibility expert who knows React design system libraries deeply.

Given a design system component documentation page, extract accessibility-specific information.

Return ONLY valid JSON — no markdown, no explanation — matching this exact schema:
{
  "additionalChecks": [
    { "id": "{pattern}-{ds}-{n}", "title": "short title", "description": "concrete guidance", "level": "must" | "should" | "avoid" }
  ],
  "codeSample": {
    "language": "tsx",
    "label": "{DS name} {Component}",
    "code": "..."
  },
  "notes": ["plain string", "..."]
}

Rules:
- additionalChecks: 2–3 items about what this DS handles automatically AND what devs must still do manually
- Focus on accessibility gaps, not general component usage
- codeSample: accessible usage with aria-* props, focus management, loading/disabled states as relevant
- notes: 2–3 short sentences about this DS's accessibility behavior (auto-handled attrs, known issues, tips)
- ID format: "{patternId}-{dsId}-{n}" (e.g. "tabs-mui-1")`

function extractMainContent(html: string): string {
  const mainMatch = html.match(/<main[\s\S]*?<\/main>/i)
  const content = mainMatch ? mainMatch[0] : html
  return content.slice(0, 30000)
}

export async function extractDsVariant(dsId: DsId, patternId: string, url: string, html: string): Promise<DsVariant> {
  const content = extractMainContent(html)
  const meta = DS_META[dsId]

  const message = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Extract accessibility info for the "${patternId}" pattern from this ${meta.name} docs page.\nSource: ${url}\n\n${content}`
      }
    ]
  })

  const text = message.content[0]?.type === 'text' ? message.content[0].text : ''

  try {
    const extracted = JSON.parse(text) as Omit<DsVariant, 'id' | 'name' | 'color'>
    return { id: dsId, ...meta, ...extracted }
  } catch {
    throw new Error(`Failed to parse Claude response for ${dsId}/${patternId}:\n${text.slice(0, 300)}`)
  }
}
