'use client'

import { SandpackCodeEditor, SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react'
import { Component, type ReactNode } from 'react'

class SandpackErrorBoundary extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false }
  static getDerivedStateFromError() {
    return { error: true }
  }
  render() {
    if (this.state.error) {
      return (
        <div
          className='rounded-b-xl bg-slate-900 flex flex-col items-center justify-center gap-3'
          style={{ height: 280 }}>
          <p className='text-sm text-slate-400'>미리보기를 불러오지 못했습니다.</p>
          <button
            onClick={() => this.setState({ error: false })}
            className='text-xs px-3 py-1.5 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors'>
            다시 시도
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

const DS_DEPS: Record<string, Record<string, string>> = {
  '@mui/material': {
    '@mui/material': '5.15.14',
    '@emotion/react': '11.11.4',
    '@emotion/styled': '11.11.0',
    '@mui/icons-material': '5.15.14'
  },
  '@radix-ui': {
    '@radix-ui/react-collapsible': '1.0.3',
    '@radix-ui/react-tabs': '1.0.4',
    '@radix-ui/react-tooltip': '1.0.7',
    '@radix-ui/react-accordion': '1.1.2',
    '@radix-ui/react-checkbox': '1.0.4',
    '@radix-ui/react-radio-group': '1.1.3',
    '@radix-ui/react-switch': '1.0.3',
    '@radix-ui/react-dialog': '1.0.5',
    '@radix-ui/react-popover': '1.0.7',
    '@radix-ui/react-icons': '1.3.0'
  },
  antd: { antd: '5.16.4' }
}

function detectDeps(code: string): Record<string, string> {
  const deps: Record<string, string> = {}
  for (const [key, pkgs] of Object.entries(DS_DEPS)) {
    if (code.includes(key)) Object.assign(deps, pkgs)
  }
  return deps
}

function extractImports(code: string): { imports: string; body: string } {
  const lines = code.split('\n')
  const importLines: string[] = []
  const bodyLines: string[] = []
  let inImport = false

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('import ')) {
      importLines.push(line)
      inImport = trimmed.endsWith('{') || trimmed.includes('from') === false
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
    if (!inDecl && depth === 0 && /^(const|let|var)\s/.test(trimmed)) {
      inDecl = true
    }
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

function buildAppCode(code: string): string {
  if (/export\s+default\s+function\s+App/.test(code)) return code

  const namedExportMatch = code.match(/export\s+(?:default\s+)?function\s+(\w+)/)

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

    return `${code}

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

interface Props {
  code: string
  language: string
}

export default function SandpackPreviewBlock({ code, language }: Props) {
  const isHtml = language === 'html'

  if (isHtml) {
    return (
      <div
        className='rounded-b-xl overflow-hidden bg-white'
        style={{ height: 240 }}>
        <iframe
          srcDoc={code}
          title='HTML 미리보기'
          className='w-full h-full border-0'
          sandbox='allow-scripts'
        />
      </div>
    )
  }

  const appCode = buildAppCode(code)
  const extraDeps = detectDeps(code)

  return (
    <SandpackErrorBoundary>
      <SandpackProvider
        template='react-ts'
        files={{ '/App.tsx': appCode }}
        theme='dark'
        customSetup={{ dependencies: extraDeps }}
        options={{ recompileMode: 'delayed', recompileDelay: 600 }}>
        <SandpackLayout style={{ borderRadius: '0 0 0.75rem 0.75rem', border: 'none' }}>
          <SandpackCodeEditor style={{ height: 280 }} />
          <SandpackPreview
            style={{ height: 280 }}
            showNavigator={false}
          />
        </SandpackLayout>
      </SandpackProvider>
    </SandpackErrorBoundary>
  )
}
