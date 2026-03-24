'use client'

import { SandpackCodeEditor, SandpackLayout, SandpackPreview, SandpackProvider, UnstyledOpenInCodeSandboxButton } from '@codesandbox/sandpack-react'
import { ExternalLink } from 'lucide-react'
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
    '@mui/material': 'latest',
    '@emotion/react': 'latest',
    '@emotion/styled': 'latest',
    '@mui/icons-material': 'latest'
  },
  '@radix-ui': {
    '@radix-ui/react-collapsible': 'latest',
    '@radix-ui/react-tabs': 'latest',
    '@radix-ui/react-tooltip': 'latest',
    '@radix-ui/react-accordion': 'latest',
    '@radix-ui/react-checkbox': 'latest',
    '@radix-ui/react-radio-group': 'latest',
    '@radix-ui/react-switch': 'latest',
    '@radix-ui/react-dialog': 'latest',
    '@radix-ui/react-popover': 'latest',
    '@radix-ui/react-icons': 'latest'
  },
  antd: { antd: 'latest' }
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

const STATE_VAR_RE = /\b(is[A-Z]\w*|has[A-Z]\w*|show[A-Z]\w*|open|active|enabled|checked|loading|selected)\b/g

function buildStateDecls(code: string): string[] {
  const found = new Set<string>()
  let m: RegExpExecArray | null
  STATE_VAR_RE.lastIndex = 0
  while ((m = STATE_VAR_RE.exec(code)) !== null) {
    if (m[1]) found.add(m[1])
  }
  return [...found].map((v) => `const [${v}, set${v.charAt(0).toUpperCase()}${v.slice(1)}] = useState(false)`)
}

function buildAppCode(code: string): string {
  if (/export\s+default\s+function\s+App/.test(code)) return code

  const namedExportMatch = code.match(/export\s+(?:default\s+)?function\s+(\w+)/)

  if (namedExportMatch) {
    const name = namedExportMatch[1]
    const hasChildren = /children/.test(code)
    const hasTitle = /\btitle\b/.test(code)
    const hasLabel = /\blabel\b/.test(code)
    const hasLegend = /\blegend\b/.test(code)

    const props = [hasTitle && 'title="예시 제목"', hasLabel && 'label="레이블"', hasLegend && 'legend="그룹 제목"'].filter(Boolean).join(' ')

    const inner = hasChildren ? `<p style={{ margin: 0 }}>예시 내용입니다.</p>` : ''
    const renderCall = inner ? `<${name} ${props}>${inner}</${name}>` : `<${name} ${props} />`

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
  const stateDecls = buildStateDecls(body)
  const needsUseState = stateDecls.length > 0
  const reactImport = needsUseState ? `import { useState } from 'react'` : `import React from 'react'`
  const stateBlock = stateDecls.length > 0 ? `  ${stateDecls.join('\n  ')}\n` : ''
  const bodyIndented = body
    .split('\n')
    .map((l) => `      ${l}`)
    .join('\n')
    .trim()

  return `${reactImport}
${imports}

export default function App() {
${stateBlock}
  return (
    <div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif', fontSize: '14px' }}>
      ${bodyIndented}
    </div>
  )
}`
}

function OpenInCSBButton() {
  return (
    <UnstyledOpenInCodeSandboxButton>
      <span className='flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors'>
        <ExternalLink size={12} />
        CodeSandbox에서 열기
      </span>
    </UnstyledOpenInCodeSandboxButton>
  )
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
  const hasExternalDeps = Object.keys(extraDeps).length > 0

  return (
    <SandpackErrorBoundary>
      <SandpackProvider
        template='react-ts'
        files={{ '/App.tsx': appCode }}
        theme='dark'
        customSetup={{ dependencies: extraDeps }}
        options={{ recompileMode: 'delayed', recompileDelay: 600 }}>
        <SandpackLayout style={{ borderRadius: '0 0 0.75rem 0.75rem', border: 'none' }}>
          <SandpackCodeEditor style={{ height: hasExternalDeps ? 320 : 280 }} />
          {!hasExternalDeps && (
            <SandpackPreview
              style={{ height: 280 }}
              showNavigator={false}
            />
          )}
        </SandpackLayout>

        {hasExternalDeps && (
          <div className='flex items-center justify-between px-4 py-2 bg-[#151515] rounded-b-xl border-t border-slate-700/40'>
            <span className='text-xs text-slate-500'>외부 패키지 포함 — 인라인 미리보기 불가</span>
            <OpenInCSBButton />
          </div>
        )}
      </SandpackProvider>
    </SandpackErrorBoundary>
  )
}
