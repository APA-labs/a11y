'use client'

import { SandpackCodeEditor, SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react'
import { Component, useEffect, useState, type ReactNode } from 'react'

import { buildAppCode } from '@/lib/sandpack/build-preview-code'
import { buildIndexCss } from '@/lib/sandpack/css'

class SandpackErrorBoundary extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false }
  static getDerivedStateFromError() {
    return { error: true }
  }
  render() {
    if (this.state.error) {
      return (
        <div
          className='rounded-b-xl bg-mist-50 flex flex-col items-center justify-center gap-3 dark:bg-navy-900'
          style={{ height: 280 }}>
          <p className='text-sm text-mist-500 dark:text-mist-400'>Preview failed to load.</p>
          <button
            onClick={() => this.setState({ error: false })}
            className='text-xs px-3 py-1.5 rounded bg-mist-200 text-mist-700 hover:bg-mist-300 transition-colors dark:bg-navy-700 dark:text-mist-300'>
            Retry
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
  antd: { antd: '5.23.4', dayjs: '1.11.10', '@ant-design/icons': '5.6.1', 'rc-util': '5.44.3' },
  '@chakra-ui': {
    '@chakra-ui/react': '3.34.0',
    '@emotion/react': '11.14.0',
    '@emotion/styled': '11.14.0'
  },
  '@adobe/react-spectrum': {
    '@adobe/react-spectrum': '3.46.2',
    'react-aria-components': '1.16.0',
    '@react-aria/utils': '3.33.1',
    '@react-stately/data': '3.15.2'
  },
  'react-aria-components': {
    'react-aria-components': '1.16.0',
    '@adobe/react-spectrum': '3.46.2',
    '@react-aria/utils': '3.33.1',
    '@react-stately/data': '3.15.2'
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
  },
  '@base-ui/react': {
    // NOTES: base-ui에서 code-sandbox를 지원하지 않아 유지되지 않는 못불러오는 경우가 존재합니다.
    '@base-ui/react': '1.4.1'
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
  slug?: string
}

const LIGHT_THEME = {
  colors: {
    surface1: '#f8f9fc',
    surface2: '#eef0f5',
    surface3: '#e4e7ef',
    clickable: '#6b7280',
    base: '#1e293b',
    disabled: '#9ca3af',
    hover: '#374151',
    accent: '#7c3aed',
    error: '#ef4444',
    errorSurface: '#fef2f2'
  },
  syntax: {
    plain: '#1e293b',
    comment: { color: '#94a3b8', fontStyle: 'italic' as const },
    keyword: '#7c3aed',
    tag: '#0369a1',
    punctuation: '#64748b',
    definition: '#0369a1',
    property: '#0369a1',
    static: '#b45309',
    string: '#059669'
  },
  font: { body: 'inherit', mono: 'ui-monospace, monospace', size: '13px', lineHeight: '1.6' }
}

const DARK_THEME = {
  colors: {
    surface1: '#0d0d0d',
    surface2: '#161616',
    surface3: '#1f1f1f',
    clickable: '#8a8a8a',
    base: '#f0f0f3',
    disabled: '#555555',
    hover: '#c8c7d2',
    accent: '#a78bfa',
    error: '#f87171',
    errorSurface: '#1a0a0a'
  },
  syntax: {
    plain: '#e2e8f0',
    comment: { color: '#555555', fontStyle: 'italic' as const },
    keyword: '#a78bfa',
    tag: '#60a5fa',
    punctuation: '#6b6b6b',
    definition: '#60a5fa',
    property: '#60a5fa',
    static: '#fbbf24',
    string: '#34d399'
  },
  font: { body: 'inherit', mono: 'ui-monospace, monospace', size: '13px', lineHeight: '1.6' }
}

export default function SandpackPreviewBlock({ code, language, slug }: Props) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains('dark'))
    update()
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, { attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

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

  let appCode = buildAppCode(code).replace(/\s+$/, '')
  const extraDeps = detectDeps(code)

  const hasChakra = code.includes('@chakra-ui')
  const hasSpectrum = code.includes('react-aria-components') || code.includes('@adobe/react-spectrum')

  if (hasChakra && !appCode.includes('ChakraProvider')) {
    const WRAPPER_DIV = `<div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif', fontSize: '14px' }}>`

    if (appCode.includes(WRAPPER_DIV)) {
      appCode =
        `import { ChakraProvider, defaultSystem as __ds } from '@chakra-ui/react'\n` +
        appCode.replace(WRAPPER_DIV, `<ChakraProvider value={__ds}>`).replace(/(\s*<\/div>\n\s*\)\n\})\s*$/, `\n    </ChakraProvider>\n  )\n}`)
    } else {
      appCode = appCode.replace(
        /import\s*\{([^}]+)\}\s*from\s*['"]@chakra-ui\/react['"]/,
        (_, named: string) => `import { ${named.trim()}, ChakraProvider, defaultSystem as __ds } from '@chakra-ui/react'`
      )
      appCode = appCode.replace(/(\s+)(return\s*\(\s*\n)(\s*)(<)/, '$1$2$3<ChakraProvider value={__ds}>\n$3$4')
      appCode = appCode.replace(/(\n)(\s*\)\s*\n\})\s*$/, '$1  </ChakraProvider>\n$2')
    }
  }

  if (hasSpectrum && !appCode.includes('Provider')) {
    const WRAPPER_DIV = `<div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif', fontSize: '14px' }}>`

    if (appCode.includes(WRAPPER_DIV)) {
      appCode =
        `import { Provider as __RAProvider, defaultTheme as __RATheme } from '@adobe/react-spectrum'\n` +
        appCode
          .replace(WRAPPER_DIV, `<__RAProvider theme={__RATheme} locale="ko-KR">`)
          .replace(/(\s*<\/div>\n\s*\)\n\})\s*$/, `\n    </__RAProvider>\n  )\n}`)
    } else {
      appCode = `import { Provider as __RAProvider, defaultTheme as __RATheme } from '@adobe/react-spectrum'\n` + appCode
      appCode = appCode.replace(/(\s+)(return\s*\(\s*\n)(\s*)(<)/, '$1$2$3<__RAProvider theme={__RATheme} locale="ko-KR">\n$3$4')
      appCode = appCode.replace(/(\n)(\s*\)\s*\n\})\s*$/, '$1  </__RAProvider>\n$2')
    }
  }

  const sandpackFiles: Record<string, string> = { '/App.tsx': appCode }

  const indexHtml = `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`

  const indexCss = buildIndexCss(slug)

  return (
    <SandpackErrorBoundary>
      <SandpackProvider
        template='react-ts'
        files={{ ...sandpackFiles, '/index.html': indexHtml, '/index.css': indexCss }}
        theme={isDark ? DARK_THEME : LIGHT_THEME}
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
