import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

const EXAMPLE_RULE = `{
  "pattern": "Button",
  "wcagLevel": "A",
  "checklist": {
    "must": [
      { "id": "button-role", "title": "Proper semantic HTML or role", "description": "Use <button> element or role=\\"button\\" on interactive element" },
      { "id": "button-text", "title": "Accessible button text", "description": "Button must have perceivable text content or aria-label" },
      { "id": "button-keyboard", "title": "Keyboard accessible", "description": "Button must be operable via keyboard (Tab, Enter/Space)" }
    ],
    "should": [
      { "id": "button-disabled-state", "title": "Disabled state indication", "description": "Disabled buttons should have disabled attribute or aria-disabled=\\"true\\"" }
    ],
    "avoid": [
      { "id": "button-div-span", "title": "Avoid using div/span as button", "description": "Don't use <div> or <span> with click handlers instead of <button>" }
    ]
  },
  "codeSamples": {
    "react": { "label": "React Button Component", "code": "<button type=\\"button\\" onClick={onClick}>{label}</button>" },
    "html": { "label": "HTML Button", "code": "<button type=\\"button\\" aria-label=\\"Description\\">Click me</button>" }
  },
  "tests": [
    { "title": "Keyboard Navigation Test", "steps": ["Tab to the button", "Press Enter or Space", "Verify action is triggered"], "tools": ["Keyboard only"] }
  ],
  "references": ["https://www.w3.org/WAI/ARIA/apg/patterns/button/", "https://www.w3.org/TR/wai-aria-1.2/#button"]
}`

const SYSTEM_PROMPT = `You are a WCAG accessibility expert. Given a W3C specification HTML page, extract a structured accessibility rule set.

Return ONLY valid JSON — no markdown fences, no explanation. Match this exact schema:
${EXAMPLE_RULE}

Rules:
- checklist.must: WCAG Level A/AA hard requirements
- checklist.should: best practices and strongly recommended patterns
- checklist.avoid: common anti-patterns that cause accessibility failures
- All IDs must be unique kebab-case (e.g. "button-role", "input-label")
- codeSamples keys must be one of: "react", "html", "typescript"
- wcagLevel: the minimum WCAG conformance level this pattern targets ("A", "AA", or "AAA")
- Include 2-4 items per checklist category
- references must be real W3C/MDN URLs found in the page`

// Truncate HTML to avoid exceeding token limits — keep the main content area
function extractMainContent(html: string): string {
  const mainMatch = html.match(/<main[\s\S]*?<\/main>/i)
  const content = mainMatch ? mainMatch[0] : html
  return content.slice(0, 40000)
}

export interface RuleSet {
  pattern: string
  wcagLevel: string
  checklist: {
    must: { id: string; title: string; description: string }[]
    should: { id: string; title: string; description: string }[]
    avoid: { id: string; title: string; description: string }[]
  }
  codeSamples: Record<string, { label: string; code: string }>
  tests: { title: string; steps: string[]; tools: string[] }[]
  references: string[]
}

export async function extractRules(patternName: string, url: string, html: string): Promise<RuleSet> {
  const content = extractMainContent(html)

  const message = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Extract accessibility rules for the "${patternName}" pattern from this W3C spec page.\nSource URL: ${url}\n\n${content}`
      }
    ]
  })

  const text = message.content[0]?.type === 'text' ? message.content[0].text : ''

  try {
    return JSON.parse(text) as RuleSet
  } catch {
    throw new Error(`Failed to parse Claude response as JSON for pattern "${patternName}":\n${text.slice(0, 500)}`)
  }
}
