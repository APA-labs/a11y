'use client'

import { SandpackCodeEditor, SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react'
import { Component, type ReactNode } from 'react'

import { buildAppCode } from '../lib/build-preview-code'
import { SHADCN_FILES } from '../lib/sandpack-shadcn'

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
  '@mui/x-date-pickers': {
    '@mui/x-date-pickers': '6.20.2',
    '@mui/material': '5.15.14',
    '@emotion/react': '11.11.4',
    '@emotion/styled': '11.11.0',
    'date-fns': '2.30.0'
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
    '@radix-ui/react-dropdown-menu': '2.0.6',
    '@radix-ui/react-slider': '1.1.2',
    '@radix-ui/react-toolbar': '1.0.4',
    '@radix-ui/react-select': '2.0.0',
    '@radix-ui/react-navigation-menu': '1.1.4',
    '@radix-ui/react-icons': '1.3.0',
    '@radix-ui/react-form': '0.0.3',
    '@radix-ui/react-toast': '1.1.5',
    '@radix-ui/react-visually-hidden': '1.0.3',
    '@radix-ui/react-slot': '1.0.2',
    '@radix-ui/react-label': '2.0.2'
  },
  antd: { antd: '5.16.4' },
  '@chakra-ui': {
    '@chakra-ui/react': '3.2.3'
  },
  '@adobe/react-spectrum': {
    '@adobe/react-spectrum': '3.33.1',
    'react-aria-components': '1.3.3',
    '@react-aria/utils': '3.24.1',
    '@react-stately/data': '3.11.5'
  },
  'react-aria-components': {
    'react-aria-components': '1.3.3',
    '@adobe/react-spectrum': '3.33.1',
    '@react-aria/utils': '3.24.1',
    '@react-stately/data': '3.11.5'
  },
  'react-hook-form': {
    'react-hook-form': '7.51.0',
    '@hookform/resolvers': '3.3.4',
    zod: '3.22.4'
  },
  '@hookform/resolvers': {
    'react-hook-form': '7.51.0',
    '@hookform/resolvers': '3.3.4',
    zod: '3.22.4'
  },
  'class-variance-authority': {
    'class-variance-authority': '0.7.0',
    clsx: '2.1.0',
    'tailwind-merge': '2.2.1'
  }
}

function detectDeps(code: string): Record<string, string> {
  const deps: Record<string, string> = {}
  for (const [key, pkgs] of Object.entries(DS_DEPS)) {
    if (code.includes(key)) Object.assign(deps, pkgs)
  }
  return deps
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

  const hasShadcn = code.includes('@/components/ui')
  const hasChakra = code.includes('@chakra-ui')

  let appCodeFinal = hasShadcn
    ? appCode.replace(/from '@\/components\/ui\//g, "from './components/ui/").replace(/from '@\/lib\//g, "from './lib/")
    : appCode

  if (hasChakra) {
    appCodeFinal =
      `import { Provider as __ChakraProvider } from '@chakra-ui/react'\n` +
      appCodeFinal
        .replace(
          `<div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif', fontSize: '14px' }}>`,
          `<__ChakraProvider><div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif', fontSize: '14px' }}>`
        )
        .replace(/(\s*<\/div>\n\s*\)\n\})$/, `\n    </div></__ChakraProvider>\n  )\n}`)
  }

  const sandpackFiles: Record<string, string> = { '/App.tsx': appCodeFinal }
  if (hasShadcn) {
    Object.assign(sandpackFiles, SHADCN_FILES)
    // Include all Radix packages needed by shadcn stubs
    Object.assign(extraDeps, DS_DEPS['@radix-ui'], {
      'class-variance-authority': '0.7.0',
      clsx: '2.1.0',
      'tailwind-merge': '2.2.1',
      'react-hook-form': '7.51.0',
      '@hookform/resolvers': '3.3.4',
      zod: '3.22.4'
    })
  }

  const indexHtml = `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`

  return (
    <SandpackErrorBoundary>
      <SandpackProvider
        template='react-ts'
        files={{ ...sandpackFiles, '/index.html': indexHtml }}
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
