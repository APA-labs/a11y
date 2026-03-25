// Serializes a Pattern-like object to TypeScript source code matching patterns.ts style

function serializeString(s: string): string {
  if (s.includes('\n') || s.includes('`')) {
    const escaped = s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
    return `\`${escaped}\``
  }
  return `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

function serializeValue(val: unknown, depth: number): string {
  const pad = '  '.repeat(depth)
  const inner = '  '.repeat(depth + 1)

  if (val === null || val === undefined) return 'undefined'
  if (typeof val === 'boolean') return String(val)
  if (typeof val === 'number') return String(val)
  if (typeof val === 'string') return serializeString(val)

  if (Array.isArray(val)) {
    if (val.length === 0) return '[]'
    const items = val.map((item) => `${inner}${serializeValue(item, depth + 1)}`).join(',\n')
    return `[\n${items}\n${pad}]`
  }

  if (typeof val === 'object') {
    const entries = Object.entries(val as Record<string, unknown>)
    if (entries.length === 0) return '{}'
    const items = entries.map(([k, v]) => `${inner}${k}: ${serializeValue(v, depth + 1)}`).join(',\n')
    return `{\n${items}\n${pad}}`
  }

  return String(val)
}

export function serializePattern(pattern: unknown): string {
  return `  ${serializeValue(pattern, 1)}`
}
