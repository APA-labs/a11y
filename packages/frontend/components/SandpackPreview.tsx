'use client'

import { SandpackCodeEditor, SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react'
import { Component, useEffect, useState, type ReactNode } from 'react'

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
  antd: { antd: '5.16.4', dayjs: '1.11.10' },
  '@chakra-ui': {
    '@chakra-ui/react': '3.34.0',
    '@emotion/react': '11.14.0',
    '@emotion/styled': '11.14.0'
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
  },
  '@base-ui/react': {
    // NOTES: base-ui에서 code-sandbox를 지원하지 않아 유지되지 않는 못불러오는 경우가 존재합니다.
    '@base-ui/react': '1.3.0'
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

export default function SandpackPreviewBlock({ code, language }: Props) {
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

  let appCode = buildAppCode(code)
  const extraDeps = detectDeps(code)

  const hasChakra = code.includes('@chakra-ui')
  const hasSpectrum = code.includes('react-aria-components') || code.includes('@adobe/react-spectrum')

  if (hasChakra && !appCode.includes('ChakraProvider')) {
    const WRAPPER_DIV = `<div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif', fontSize: '14px' }}>`

    if (appCode.includes(WRAPPER_DIV)) {
      appCode =
        `import { ChakraProvider, defaultSystem as __ds } from '@chakra-ui/react'\n` +
        appCode.replace(WRAPPER_DIV, `<ChakraProvider value={__ds}>`).replace(/(\s*<\/div>\n\s*\)\n\})$/, `\n    </ChakraProvider>\n  )\n}`)
    } else {
      appCode = appCode.replace(
        /import\s*\{([^}]+)\}\s*from\s*['"]@chakra-ui\/react['"]/,
        (_, named: string) => `import { ${named.trim()}, ChakraProvider, defaultSystem as __ds } from '@chakra-ui/react'`
      )
      appCode = appCode.replace(/(\s+)(return\s*\(\s*\n)(\s*)(<)/, '$1$2$3<ChakraProvider value={__ds}>\n$3$4')
      appCode = appCode.replace(/(\n)(\s*\)\s*\n\})$/, '$1  </ChakraProvider>\n$2')
    }
  }

  if (hasSpectrum && !appCode.includes('Provider')) {
    const WRAPPER_DIV = `<div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif', fontSize: '14px' }}>`

    if (appCode.includes(WRAPPER_DIV)) {
      appCode =
        `import { Provider as __RAProvider, defaultTheme as __RATheme } from '@adobe/react-spectrum'\n` +
        appCode
          .replace(WRAPPER_DIV, `<__RAProvider theme={__RATheme} locale="ko-KR">`)
          .replace(/(\s*<\/div>\n\s*\)\n\})$/, `\n    </__RAProvider>\n  )\n}`)
    } else {
      appCode = `import { Provider as __RAProvider, defaultTheme as __RATheme } from '@adobe/react-spectrum'\n` + appCode
      appCode = appCode.replace(/(\s+)(return\s*\(\s*\n)(\s*)(<)/, '$1$2$3<__RAProvider theme={__RATheme} locale="ko-KR">\n$3$4')
      appCode = appCode.replace(/(\n)(\s*\)\s*\n\})$/, '$1  </__RAProvider>\n$2')
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

  const indexCss = `/* Layout */
.app { padding: 20px; font-family: system-ui, sans-serif; font-size: 14px; color: #111; }
.stack { display: flex; flex-direction: column; gap: 12px; }
.stack-sm { display: flex; flex-direction: column; gap: 8px; }
.stack-lg { display: flex; flex-direction: column; gap: 16px; }
.row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.center { display: flex; align-items: center; justify-content: center; }
.divider { border-bottom: 1px solid #e5e7eb; }
.section { padding: 16px 0; font-size: 14px; }

/* Buttons */
.btn { padding: 8px 16px; border-radius: 6px; border: 1px solid #d1d5db; cursor: pointer; font-size: 14px; background: white; color: #111; transition: background 0.15s; }
.btn:hover { background: #f9fafb; }
.btn-danger-outline { color: #dc2626; border-color: #dc2626; }
.btn-danger-outline:hover { background: #fef2f2; }
.btn-danger-solid { background: #dc2626; color: white; border-color: #dc2626; }
.btn-danger-solid:hover { background: #ef4444; }
.btn-accent { background: #e03; color: white; border-color: #e03; }
.btn-accent:hover { filter: brightness(0.95); }
.btn:focus-visible { outline: 2px solid #18181b; outline-offset: 2px; }
.btn:disabled { opacity: 0.45; cursor: not-allowed; }
.btn-primary { background: #18181b; color: white; border-color: #18181b; }
.btn-primary:hover { background: #374151; }
.btn-sm { padding: 4px 10px; font-size: 12px; }
.btn-ghost { background: transparent; border-color: transparent; }
.btn-ghost:hover { background: #f3f4f6; }
.icon-btn { padding: 6px; border-radius: 6px; border: 1px solid #d1d5db; cursor: pointer; background: white; display: inline-flex; align-items: center; justify-content: center; }

/* Form */
.form { display: flex; flex-direction: column; gap: 16px; max-width: 480px; }
.field { display: flex; flex-direction: column; gap: 4px; }
.label { display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 4px; }
.input { padding: 8px 12px; border-radius: 6px; border: 1px solid #d1d5db; font-size: 14px; width: 100%; box-sizing: border-box; }
.input:focus { outline: 2px solid #18181b; outline-offset: 2px; border-color: transparent; }
.input[aria-invalid="true"] { border-color: #ef4444; }
.hint { display: block; font-size: 12px; color: #6b7280; margin-top: 4px; }
.error { display: block; font-size: 12px; color: #dc2626; margin-top: 4px; }

/* Overlay & Dialog */
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 100; }
.dialog { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 24px; border-radius: 12px; min-width: 320px; max-width: 90vw; z-index: 101; box-shadow: 0 8px 32px rgba(0,0,0,0.15); }
.dialog-title { font-size: 16px; font-weight: 600; margin: 0 0 8px; }
.dialog-close { position: absolute; top: 12px; right: 12px; }

/* Panel / Popover */
.panel { background: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }

/* Menu / List */
.menu { list-style: none; padding: 4px; margin: 0; display: flex; flex-direction: column; gap: 2px; min-width: 160px; }
.menu-item { padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 14px; }
.menu-item:hover, .menu-item:focus { background: #f3f4f6; outline: none; }
.menu-item[aria-current="page"] { background: #f3f4f6; font-weight: 500; }

/* Tabs */
.tab-list { display: flex; gap: 2px; border-bottom: 1px solid #e5e7eb; }
.tab { padding: 8px 16px; border: none; background: none; cursor: pointer; font-size: 14px; color: #6b7280; border-bottom: 2px solid transparent; margin-bottom: -1px; }
.tab[aria-selected="true"] { color: #111; border-bottom-color: #18181b; font-weight: 500; }
.tab-panel { padding: 16px 0; }

/* Accordion */
.accordion-item { border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
.accordion-trigger { width: 100%; padding: 12px 16px; background: white; border: none; text-align: left; cursor: pointer; font-size: 14px; display: flex; justify-content: space-between; align-items: center; }
.accordion-trigger:hover { background: #f9fafb; }
.accordion-panel { padding: 12px 16px; font-size: 14px; color: #374151; border-top: 1px solid #e5e7eb; }

/* Breadcrumb */
.breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 13px; list-style: none; padding: 0; margin: 0; flex-wrap: wrap; }
.breadcrumb-sep { color: #9ca3af; }

/* Badge */
.badge { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 9999px; font-size: 12px; font-weight: 500; background: #f3f4f6; color: #374151; }

/* Utility */
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border-width: 0; }
.justify-end { justify-content: flex-end; }
.bottom-space-8 { margin-bottom: 8px; }
.bottom-space-20 { margin-bottom: 20px; }
.outline-none { outline: none; }
.dialog-close-top-right { position: absolute; top: 8px; right: 8px; }
.dialog-wide { min-width: 360px; }
.dialog-spectrum { background: #fff; border-radius: 12px; padding: 24px; max-width: 400px; width: 90%; outline: none; box-shadow: 0 8px 32px rgba(0,0,0,.2); }

/* Navigation Menu */
.nav-toplist { list-style: none; display: flex; gap: 8px; padding: 0; margin: 0; }
.nav-item-rel { position: relative; }
.nav-submenu { list-style: none; padding: 4px; margin: 0; border: 1px solid #ccc; border-radius: 4px; position: absolute; background: white; }
.nav-top-link { text-decoration: none; color: inherit; font-weight: normal; }
.nav-top-link[aria-current="page"] { color: #6d28d9; font-weight: bold; }
.nav-menu-link-block { display: block; padding: 4px 8px; text-decoration: none; color: inherit; }
.nav-menu-link-block[aria-current="page"] { color: #6d28d9; font-weight: bold; }

.nav-relative-pad { position: relative; padding: 12px 16px; }
.nav-radix-list { list-style: none; margin: 0; padding: 0; border-bottom: none !important; gap: 4px !important; }
.nav-link-block { display: block; text-decoration: none; }
.nav-content-min180 { min-width: 180px; gap: 4px !important; }
.nav-viewport { position: absolute; top: 100%; left: 0; }

.nav-ant-menu-border-none { border-bottom: none !important; }

/* React Aria Menu (Spectrum) */
.nav-spectrum-popover { padding: 4px; outline: none; min-width: 180px; }
.nav-spectrum-menu { list-style: none; margin: 0; padding: 0; }
.nav-spectrum-section-header { padding: 4px 12px; text-transform: uppercase; font-size: 11px; color: #6b7280; }
.nav-spectrum-menuitem { padding: 8px 14px; border-radius: 4px; cursor: pointer; outline: none; background: transparent; }
.nav-spectrum-menuitem:focus-visible { background: #fef2f2; }
.nav-spectrum-quit { color: #dc2626; }
.nav-spectrum-separator { height: 1px; background: #e5e7eb; margin: 4px 0; }

/* Base UI Navigation Menu */
.nav-baseui-root { position: relative; padding: 1rem; }
.nav-baseui-list { list-style: none; margin: 0; padding: 0; gap: 4px !important; }
.nav-baseui-trigger { gap: 4px !important; font-weight: 500; }
.nav-baseui-link { display: block; text-decoration: none; color: #374151; }
.nav-minw-180 { min-width: 180px; }

/* Accordion */
.accordion-root { width: 100%; max-width: 560px; }
.accordion-item-sep { border-bottom: 1px solid #e2e8f0; }
.accordion-trigger-btn { display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 14px 0; background: none; border: none; cursor: pointer; font-size: 15px; font-weight: 500; text-align: left; }
.accordion-trigger-btn:hover { background: none; }
.accordion-content-text { padding: 0 0 14px; font-size: 14px; color: #4a5568; line-height: 1.6; }
.accordion-trigger-padded { display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 12px 16px; background: none; border: none; cursor: pointer; font-size: 14px; font-weight: 600; text-align: left; }
.accordion-trigger-padded:hover { background: none; }

/* Checkbox */
.checkbox-root { width: 20px; height: 20px; border-radius: 4px; border: 2px solid #c4c4c4; display: flex; align-items: center; justify-content: center; cursor: pointer; background: white; flex-shrink: 0; }
.checkbox-root[data-state="checked"] { background: #6e56cf; border-color: #6e56cf; }
.checkbox-indicator { color: white; font-size: 14px; line-height: 1; }
.checkbox-row { display: flex; align-items: center; gap: 10px; }

/* Switch / Toggle */
.row-between { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.switch-root { width: 44px; height: 24px; border-radius: 9999px; border: none; padding: 2px; cursor: pointer; flex-shrink: 0; position: relative; transition: background-color 0.15s; }
.switch-thumb { display: block; width: 20px; height: 20px; border-radius: 9999px; background-color: white; box-shadow: 0 1px 3px rgba(0,0,0,0.25); transition: transform 0.15s; }
.switch-sm { width: 40px; height: 22px; border-radius: 11px; border: none; padding: 2px; cursor: pointer; flex-shrink: 0; transition: background .2s; }
.switch-thumb-sm { width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform .2s; }

/* Select / Combobox dropdowns */
.select-trigger { display: inline-flex; align-items: center; justify-content: space-between; gap: 8px; padding: 8px 12px; border-radius: 6px; border: 1px solid #d1d5db; background: white; cursor: pointer; font-size: 14px; min-width: 200px; }
.select-popup { background: white; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); padding: 4px; min-width: 200px; z-index: 100; outline: none; }
.select-item { padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 14px; outline: none; display: flex; align-items: center; gap: 8px; list-style: none; }
.select-item:hover, .select-item:focus { background: #f3f4f6; }
.combobox-group { display: inline-flex; align-items: center; border: 1px solid #d1d5db; border-radius: 6px; background: #fff; overflow: hidden; }
.combobox-input { border: none; outline: none; font-size: 14px; padding: 6px 10px; min-width: 160px; }
.combobox-btn { background: none; border: none; border-left: 1px solid #e5e7eb; cursor: pointer; padding: 6px 10px; font-size: 13px; }
.combobox-item { padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 14px; outline: none; list-style: none; }
.combobox-item[data-focused] { background: #fef2f2; }
.combobox-item[data-selected] { background: #e03; color: #fff; }

/* Date Picker */
.datepicker-group { display: inline-flex; align-items: center; gap: 2px; border: 1px solid #d1d5db; border-radius: 6px; padding: 4px 8px; background: #fff; }
.datepicker-input { display: flex; gap: 1px; }
.datepicker-segment { padding: 1px 2px; border-radius: 2px; outline: none; font-size: 14px; }
.datepicker-segment:focus { background: #e0e7ff; }
.datepicker-btn { background: none; border: none; cursor: pointer; padding: 2px 6px; border-radius: 4px; font-size: 16px; }
.calendar-popover { background: #fff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,.15); padding: 16px; outline: none; }
.calendar-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.calendar-nav-btn { background: none; border: none; cursor: pointer; padding: 4px 8px; border-radius: 4px; font-size: 16px; }
.calendar-heading { font-weight: 600; font-size: 14px; }
.calendar-grid { border-collapse: collapse; width: 100%; }
.calendar-header-cell { padding: 6px; font-size: 12px; font-weight: 600; color: #6b7280; text-align: center; }
.calendar-cell { text-align: center; padding: 6px; border-radius: 4px; cursor: pointer; font-size: 14px; outline: none; color: #374151; }
.calendar-cell[data-selected] { background: #e03; color: #fff; }
.calendar-cell[data-outside-month] { color: #d1d5db; }
.calendar-cell[data-focused] { outline: 2px solid #18181b; }

/* Toast / Radix Toast */
.toast-viewport { position: fixed; bottom: 16px; right: 16px; display: flex; flex-direction: column; gap: 8px; z-index: 50; max-width: 360px; }
.toast-root { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 16px; display: flex; align-items: flex-start; gap: 12px; box-shadow: 0 4px 12px rgba(0,0,0,.1); }

/* Utility */
.p-8 { padding: 8px; }
.p-16 { padding: 16px; }
.p-24 { padding: 24px; }
.p-32 { padding: 32px; }
.max-w-400 { max-width: 400px; }
.max-w-480 { max-width: 480px; }
.max-w-560 { max-width: 560px; }
.max-w-320 { max-width: 320px; }
.max-w-360 { max-width: 360px; }
.max-h-44 { min-height: 44px; }
.col-center { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.link-plain { display: block; text-decoration: none; color: #2d3748; }
.cursor-pointer { cursor: pointer; }
.text-muted { font-size: 13px; color: #6b7280; }
.text-success { color: #38a169; }
.text-sm { font-size: 13px; }
.font-bold { font-weight: 600; }
.mt-0 { margin-top: 0; }
.mb-0 { margin-bottom: 0; }
.mb-8 { margin-bottom: 8px; }
.mb-12 { margin-bottom: 12px; }
.mb-16 { margin-bottom: 16px; }
.mb-24 { margin-bottom: 24px; }
.w-full { width: 100%; }
.status-badge { padding: 12px 16px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 6px; font-size: 14px; }
.info-box { padding: 12px 16px; background: #fafafa; border-radius: 6px; border: 1px solid #f0f0f0; font-size: 14px; color: #595959; }
`

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
