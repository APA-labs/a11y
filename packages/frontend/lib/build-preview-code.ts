function extractImports(code: string): { imports: string; body: string } {
  const lines = code.split('\n')
  const importLines: string[] = []
  const bodyLines: string[] = []
  let inImport = false

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('import ')) {
      importLines.push(line)
      inImport = trimmed.endsWith('{') || !trimmed.includes('from')
    } else if (inImport) {
      importLines.push(line)
      if (trimmed.endsWith("'") || trimmed.endsWith('"')) inImport = false
    } else {
      bodyLines.push(line)
    }
  }

  return { imports: importLines.join('\n'), body: bodyLines.join('\n').trim() }
}

function splitDeclsAndJsx(body: string): { decls: string; jsx: string } {
  const lines = body.split('\n')
  const declLines: string[] = []
  const jsxLines: string[] = []
  let depth = 0
  let inDecl = false

  for (const line of lines) {
    const trimmed = line.trim()
    if (!inDecl && depth === 0 && /^(const|let|var)\s/.test(trimmed)) inDecl = true
    if (inDecl) {
      declLines.push(line)
      for (const ch of line) {
        if (ch === '[' || ch === '{' || ch === '(') depth++
        else if (ch === ']' || ch === '}' || ch === ')') depth--
      }
      if (depth === 0) inDecl = false
    } else {
      jsxLines.push(line)
    }
  }

  return { decls: declLines.join('\n').trim(), jsx: jsxLines.join('\n').trim() }
}

const STATE_VAR_RE =
  /\b(is[A-Z]\w*|has[A-Z]\w*|show[A-Z]\w*|\w+Checked|\w+Open|\w+Visible|\w+Selected|\w+Enabled|\w+Active|open|active|enabled|checked|loading|selected)\b/g

function buildStateDecls(code: string): string[] {
  const found = new Set<string>()
  let m: RegExpExecArray | null
  STATE_VAR_RE.lastIndex = 0
  while ((m = STATE_VAR_RE.exec(code)) !== null) {
    const name = m[1]
    if (name && !name.startsWith('set')) found.add(name)
  }
  return [...found].map((v) => `const [${v}, set${v.charAt(0).toUpperCase()}${v.slice(1)}] = useState(false)`)
}

function parseDestructuredProps(code: string, funcName: string): string[] {
  const re = new RegExp(`function\\s+${funcName}\\s*\\(\\s*\\{([^}]+)\\}`)
  const m = code.match(re)
  if (!m || !m[1]) return []
  return m[1]
    .split(',')
    .map((p) => {
      const part = p
        .trim()
        .replace(/\s*=.*$/, '')
        .split(':')[0]
      return part ? part.trim() : ''
    })
    .filter((p) => p && /^[a-z]/.test(p) && !p.startsWith('...'))
}

const REACT_HOOKS = [
  'useState',
  'useRef',
  'useEffect',
  'useCallback',
  'useMemo',
  'useId',
  'useReducer',
  'useContext',
  'useLayoutEffect',
  'useImperativeHandle'
]

function buildReactImport(code: string): string {
  const existingReactImportMatch = code.match(/import\s+\{([^}]+)\}\s+from\s+['"]react['"]/)
  const alreadyImportsReact = /from\s+['"]react['"]/.test(code)

  const neededHooks = REACT_HOOKS.filter((h) => new RegExp(`\\b${h}\\b`).test(code))

  if (existingReactImportMatch) {
    const existingHooks = existingReactImportMatch[1]!
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const missing = neededHooks.filter((h) => !existingHooks.includes(h))
    if (missing.length === 0) return ''
    // Return a line to prepend that patches in missing hooks
    return `import { ${missing.join(', ')} } from 'react'\n`
  }

  if (alreadyImportsReact) return ''

  return neededHooks.length > 0 ? `import { ${neededHooks.join(', ')} } from 'react'\n` : `import React from 'react'\n`
}

export function buildAppCode(code: string): string {
  if (/export\s+default\s+function\s+App/.test(code)) return code

  // Match both exported and non-exported top-level function definitions
  const namedExportMatch = code.match(/(?:export\s+(?:default\s+)?)?function\s+(\w+)/)

  if (namedExportMatch) {
    const name = namedExportMatch[1] ?? ''
    const rawProps = parseDestructuredProps(code, name)
    const hasChildren = rawProps.includes('children') || /children/.test(code)

    const propBindings: string[] = []
    for (const prop of rawProps) {
      if (prop === 'children') continue
      if (prop === 'label') {
        propBindings.push('label="레이블"')
        continue
      }
      if (prop === 'title') {
        propBindings.push('title="예시 제목"')
        continue
      }
      if (prop === 'legend') {
        propBindings.push('legend="그룹 제목"')
        continue
      }
      if (prop === 'id') {
        propBindings.push('id="example-id"')
        continue
      }
      if (prop === 'href') {
        propBindings.push('href="#"')
        continue
      }
      if (/^on[A-Z]/.test(prop)) {
        propBindings.push(`${prop}={() => {}}`)
        continue
      }
      if (/^(checked|indeterminate|selected|disabled|required|readOnly|multiple|open|active|enabled|visible|expanded|loading)$/.test(prop)) {
        propBindings.push(`${prop}={false}`)
        continue
      }
    }

    const inner = hasChildren ? `<p style={{ margin: 0 }}>예시 내용입니다.</p>` : ''
    const propsStr = propBindings.join(' ')
    const renderCall = inner ? `<${name} ${propsStr}>${inner}</${name}>` : `<${name} ${propsStr} />`
    const reactImport = buildReactImport(code)

    return `${reactImport}${code}

export default function App() {
  return (
    <div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif', fontSize: '14px' }}>
      ${renderCall}
    </div>
  )
}`
  }

  const { imports, body } = extractImports(code)
  const { decls, jsx } = splitDeclsAndJsx(body)
  const stateDecls = buildStateDecls(jsx)
  const needsUseState = stateDecls.length > 0
  const reactImport = needsUseState ? `import { useState } from 'react'` : `import React from 'react'`
  const stateBlock = stateDecls.length > 0 ? `  ${stateDecls.join('\n  ')}\n` : ''
  const declBlock = decls ? `  ${decls.split('\n').join('\n  ')}\n` : ''
  const jsxIndented = jsx
    .split('\n')
    .map((l) => `      ${l}`)
    .join('\n')
    .trim()

  return `${reactImport}
${imports}

export default function App() {
${stateBlock}${declBlock}
  return (
    <div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif', fontSize: '14px' }}>
      ${jsxIndented}
    </div>
  )
}`
}

/**
 * 캡처 스크립트용: import를 React/ReactDOM 전역으로 치환한 순수 JS 스크립트 반환
 * (esbuild로 JSX 컴파일 후 사용)
 */
export function buildStandaloneScript(code: string): string {
  const appCode = buildAppCode(code)

  return appCode
    .replace(/import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]react['"]/g, (_, named: string) => {
      const names = named
        .split(',')
        .map((n: string) => (n.trim().split(/\s+as\s+/)[0] ?? '').trim())
        .filter(Boolean)
        .join(', ')
      return `const { ${names} } = React`
    })
    .replace(/import\s+React(?:,\s*\{[^}]*\})?\s+from\s+['"]react['"]/g, '')
    .replace(/import\s+[^\n]+from\s+['"][^'"]+['"]/g, '')
    .trim()
}
