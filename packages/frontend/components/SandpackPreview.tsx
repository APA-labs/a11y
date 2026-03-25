'use client'

import { SandpackCodeEditor, SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react'
import { Component, type ReactNode } from 'react'

import { buildAppCode } from '../lib/build-preview-code'

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
    '@chakra-ui/react': '2.8.2',
    '@emotion/react': '11.11.4',
    '@emotion/styled': '11.11.0',
    'framer-motion': '10.18.0'
  },
  '@adobe/react-spectrum': {
    '@adobe/react-spectrum': '3.33.1'
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

  if (code.includes('@/components/ui')) {
    return (
      <div
        className='rounded-b-xl bg-slate-900 flex flex-col items-center justify-center gap-2'
        style={{ height: 280 }}>
        <p className='text-sm text-slate-400'>shadcn/ui 컴포넌트는 인라인 미리보기를 지원하지 않습니다.</p>
        <p className='text-xs text-slate-500'>로컬 프로젝트에 설치 후 확인하세요.</p>
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
