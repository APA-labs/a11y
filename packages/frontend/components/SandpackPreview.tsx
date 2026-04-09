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

const BASE_CSS = `/* Layout */
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
.btn-radix { background: #6e56cf; color: white; border-color: #6e56cf; }
.btn-radix:hover { filter: brightness(0.9); }

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
.dialog-close-top-right { position: absolute; top: 8px; right: 8px; }
.dialog-wide { min-width: 360px; }
.dialog-spectrum { background: #fff; border-radius: 12px; padding: 24px; max-width: 400px; width: 90%; outline: none; box-shadow: 0 8px 32px rgba(0,0,0,.2); }

/* Panel */
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

/* Breadcrumb */
.breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 13px; list-style: none; padding: 0; margin: 0; flex-wrap: wrap; }
.breadcrumb-sep { color: #9ca3af; }

/* Badge */
.badge { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 9999px; font-size: 12px; font-weight: 500; background: #f3f4f6; color: #374151; }

/* Utility */
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border-width: 0; }
.justify-end { justify-content: flex-end; }
.justify-between { justify-content: space-between; }
.bottom-space-8 { margin-bottom: 8px; }
.bottom-space-20 { margin-bottom: 20px; }
.outline-none { outline: none; }
.cursor-pointer { cursor: pointer; }
.text-muted { font-size: 13px; color: #6b7280; }
.text-success { color: #38a169; }
.text-sm { font-size: 13px; }
.font-bold { font-weight: 600; }
.mt-0 { margin-top: 0; }
.mb-0 { margin-bottom: 0; }
.mb-4 { margin-bottom: 4px; }
.mb-8 { margin-bottom: 8px; }
.mb-12 { margin-bottom: 12px; }
.mb-16 { margin-bottom: 16px; }
.mb-24 { margin-bottom: 24px; }
.mt-8 { margin-top: 8px; }
.mt-16 { margin-top: 16px; }
.ml-auto { margin-left: auto; }
.mx-auto { margin-left: auto; margin-right: auto; }
.w-full { width: 100%; }
.p-8 { padding: 8px; }
.p-16 { padding: 16px; }
.p-24 { padding: 24px; }
.p-32 { padding: 32px; }
.max-w-320 { max-width: 320px; }
.max-w-360 { max-width: 360px; }
.max-w-400 { max-width: 400px; }
.max-w-480 { max-width: 480px; }
.max-w-560 { max-width: 560px; }
.max-h-44 { min-height: 44px; }
.min-w-200 { min-width: 200px; }
.min-w-220 { min-width: 220px; }
.min-w-240 { min-width: 240px; }
.min-w-260 { min-width: 260px; }
.col-center { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.link-plain { display: block; text-decoration: none; color: #2d3748; }
.status-badge { padding: 12px 16px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 6px; font-size: 14px; }
.info-box { padding: 12px 16px; background: #fafafa; border-radius: 6px; border: 1px solid #f0f0f0; font-size: 14px; color: #595959; }
.row-between { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.gap-8 { gap: 8px; }
.gap-12 { gap: 12px; }
.gap-16 { gap: 16px; }
.gap-24 { gap: 24px; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
`

const PATTERN_CSS: Record<string, string> = {
  accordion: `
/* Accordion */
.accordion-item { border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
.accordion-trigger { width: 100%; padding: 12px 16px; background: white; border: none; text-align: left; cursor: pointer; font-size: 14px; display: flex; justify-content: space-between; align-items: center; }
.accordion-trigger:hover { background: #f9fafb; }
.accordion-panel { padding: 12px 16px; font-size: 14px; color: #374151; border-top: 1px solid #e5e7eb; }
.accordion-root { width: 100%; max-width: 560px; }
.accordion-item-sep { border-bottom: 1px solid #e2e8f0; }
.accordion-trigger-btn { display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 14px 0; background: none; border: none; cursor: pointer; font-size: 15px; font-weight: 500; text-align: left; }
.accordion-trigger-btn:hover { background: none; }
.accordion-content-text { padding: 0 0 14px; font-size: 14px; color: #4a5568; line-height: 1.6; }
.accordion-trigger-padded { display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 12px 16px; background: none; border: none; cursor: pointer; font-size: 14px; font-weight: 600; text-align: left; }
.accordion-trigger-padded:hover { background: none; }
`,
  alert: `
/* Toast / Alert */
.toast-viewport { position: fixed; bottom: 16px; right: 16px; display: flex; flex-direction: column; gap: 8px; z-index: 50; max-width: 360px; }
.toast-root { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 16px; display: flex; align-items: flex-start; gap: 12px; box-shadow: 0 4px 12px rgba(0,0,0,.1); }
.toast-container-tr { position: fixed; top: 16px; right: 16px; display: flex; flex-direction: column; gap: 8px; }
.toast-item { padding: 12px 16px; border-radius: 8px; border: 1px solid; display: flex; align-items: center; gap: 8px; }
.toast-success { background-color: #dcfce7; border-color: #86efac; }
.toast-error { background-color: #fee2e2; border-color: #fca5a5; }
`,
  checkbox: `
/* Checkbox */
.checkbox-root { width: 20px; height: 20px; border-radius: 4px; border: 2px solid #c4c4c4; display: flex; align-items: center; justify-content: center; cursor: pointer; background: white; flex-shrink: 0; }
.checkbox-root[data-state="checked"] { background: #6e56cf; border-color: #6e56cf; }
.checkbox-indicator { color: white; font-size: 14px; line-height: 1; }
.checkbox-row { display: flex; align-items: center; gap: 10px; }
`,
  combobox: `
/* Combobox */
.combobox-group { display: inline-flex; align-items: center; border: 1px solid #d1d5db; border-radius: 6px; background: #fff; overflow: hidden; }
.combobox-input { border: none; outline: none; font-size: 14px; padding: 6px 10px; min-width: 160px; }
.combobox-btn { background: none; border: none; border-left: 1px solid #e5e7eb; cursor: pointer; padding: 6px 10px; font-size: 13px; }
.combobox-item { padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 14px; outline: none; list-style: none; }
.combobox-item[data-focused] { background: #fef2f2; }
.combobox-item[data-selected] { background: #e03; color: #fff; }
`,
  'date-picker': `
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
`,
  'navigation-menu': `
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
.nav-spectrum-popover { padding: 4px; outline: none; min-width: 180px; }
.nav-spectrum-menu { list-style: none; margin: 0; padding: 0; }
.nav-spectrum-section-header { padding: 4px 12px; text-transform: uppercase; font-size: 11px; color: #6b7280; }
.nav-spectrum-menuitem { padding: 8px 14px; border-radius: 4px; cursor: pointer; outline: none; background: transparent; }
.nav-spectrum-menuitem:focus-visible { background: #fef2f2; }
.nav-spectrum-quit { color: #dc2626; }
.nav-spectrum-separator { height: 1px; background: #e5e7eb; margin: 4px 0; }
.nav-baseui-root { position: relative; padding: 1rem; }
.nav-baseui-list { list-style: none; margin: 0; padding: 0; gap: 4px !important; }
.nav-baseui-trigger { gap: 4px !important; font-weight: 500; }
.nav-baseui-link { display: block; text-decoration: none; color: #374151; }
.nav-minw-180 { min-width: 180px; }
`,
  pagination: `
/* Pagination */
.pagination { display: flex; gap: 4px; list-style: none; padding: 0; margin: 0; }
.page-btn { padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 6px; background: #fff; color: #374151; cursor: pointer; font-size: 14px; }
.page-btn[aria-current="page"] { background: #2563eb; color: #fff; font-weight: 700; border-color: #2563eb; }
.page-btn:disabled, .page-btn[aria-disabled="true"] { opacity: 0.4; cursor: default; }
`,
  popover: `
/* Popover */
.popover-close { position: absolute; top: 6px; right: 6px; }
.popover-arrow { fill: white; filter: drop-shadow(0 -1px 0 #e5e7eb); }
.popover-arrow-bordered { fill: #fff; stroke: #e5e7eb; stroke-width: 1; }
`,
  'radio-group': `
/* Radio */
.radio-btn { width: 20px; height: 20px; border-radius: 50%; border: 2px solid #d1d5db; background: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0; cursor: pointer; }
.radio-btn[data-checked] { border-color: #18181b; }
.radio-indicator { width: 10px; height: 10px; border-radius: 50%; background: #18181b; }
`,
  select: `
/* Select */
.select-trigger { display: inline-flex; align-items: center; justify-content: space-between; gap: 8px; padding: 8px 12px; border-radius: 6px; border: 1px solid #d1d5db; background: white; cursor: pointer; font-size: 14px; min-width: 200px; }
.select-popup { background: white; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); padding: 4px; min-width: 200px; z-index: 100; outline: none; }
.select-item { padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 14px; outline: none; display: flex; align-items: center; gap: 8px; list-style: none; }
.select-item:hover, .select-item:focus { background: #f3f4f6; }
.select-item[data-selected] { background: #e03; color: #fff; }
.select-item[data-focused] { background: #fef2f2; }
.item-indicator { width: 16px; }
`,
  tabs: `
/* Tabs extended */
.tab-content { padding: 20px 4px; font-size: 14px; line-height: 1.6; color: #374151; }
.tab-aria { padding: 8px 16px; cursor: pointer; font-size: 14px; font-weight: 500; border: none; background: none; border-bottom: 2px solid transparent; margin-bottom: -2px; color: #374151; outline: none; }
.tab-aria[data-selected] { border-bottom-color: #e03; color: #e03; }
.tabs-indicator { position: absolute; bottom: -1px; left: var(--active-tab-left); width: var(--active-tab-width); height: 2px; background: #18181b; transition: left 0.2s, width 0.2s; }
`,
  toggle: `
/* Switch / Toggle */
.switch-root { width: 44px; height: 24px; border-radius: 9999px; border: none; padding: 2px; cursor: pointer; flex-shrink: 0; position: relative; transition: background-color 0.15s; }
.switch-thumb { display: block; width: 20px; height: 20px; border-radius: 9999px; background-color: white; box-shadow: 0 1px 3px rgba(0,0,0,0.25); transition: transform 0.15s; }
.switch-sm { width: 40px; height: 22px; border-radius: 11px; border: none; padding: 2px; cursor: pointer; flex-shrink: 0; transition: background .2s; }
.switch-thumb-sm { width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform .2s; }
.switch-root[data-state="checked"] { background-color: #6e56cf; }
.switch-root[data-state="unchecked"] { background-color: #d1d5db; }
.switch-root[data-state="checked"] .switch-thumb,
.switch-root[data-checked] .switch-thumb { transform: translateX(20px); }
.switch-root[data-state="unchecked"] .switch-thumb,
.switch-root[data-unchecked] .switch-thumb { transform: translateX(0); }
.switch-root[data-checked] { background-color: #18181b; }
.switch-root[data-unchecked] { background-color: #d1d5db; }
.switch-root[aria-checked="true"] { background-color: #2563eb; }
.switch-root[aria-checked="false"] { background-color: #d1d5db; }
.switch-root[aria-checked="true"] .switch-thumb { transform: translateX(20px); }
.switch-root[aria-checked="false"] .switch-thumb { transform: translateX(0); }
.switch-sm { background-color: #d1d5db; }
[data-selected] .switch-sm { background-color: #e03; }
[data-selected] .switch-thumb-sm { transform: translateX(18px); }
.btn-toggle[data-selected] { background: #e03; color: white; border-color: #e03; }
`,
  badge: `
/* Badge */
.badge-wrap { position: relative; display: inline-flex; }
.badge-icon { width: 40px; height: 40px; border-radius: 8px; border: 1px solid #d1d5db; background: white; display: inline-flex; align-items: center; justify-content: center; font-size: 18px; cursor: pointer; }
.badge-count { position: absolute; top: -6px; right: -6px; min-width: 18px; height: 18px; padding: 0 5px; border-radius: 9999px; background: #dc2626; color: #fff; font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; }
.badge-dot { position: absolute; top: 2px; right: 2px; width: 8px; height: 8px; border-radius: 50%; background: #dc2626; }
.badge-status { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; }
.badge-status-dot { width: 8px; height: 8px; border-radius: 50%; }
.badge-status-dot.success { background: #16a34a; }
.badge-status-dot.error { background: #dc2626; }
.badge-status-dot.warning { background: #d97706; }
`,
  chip: `
/* Chip / Tag */
.chip-list { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
.chip { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 9999px; border: 1px solid #d1d5db; background: #f3f4f6; color: #111; font-size: 13px; }
.chip-btn { cursor: pointer; font: inherit; }
.chip-btn:hover { background: #e5e7eb; }
.chip-btn:focus-visible { outline: 2px solid #18181b; outline-offset: 2px; }
.chip[data-selected="true"] { background: #18181b; color: #fff; border-color: #18181b; }
.chip-remove { border: none; background: transparent; cursor: pointer; padding: 0; width: 16px; height: 16px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: inherit; font-size: 14px; line-height: 1; }
.chip-remove:hover { background: rgba(0,0,0,0.12); }
.chip-remove:focus-visible { outline: 2px solid #18181b; outline-offset: 1px; }
`,
  toast: `
/* Toast */
.toast-viewport { position: fixed; bottom: 16px; right: 16px; display: flex; flex-direction: column; gap: 8px; z-index: 50; max-width: 360px; }
.toast-root { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 16px; display: flex; align-items: flex-start; gap: 12px; box-shadow: 0 4px 12px rgba(0,0,0,.1); }
.toast-container-tr { position: fixed; top: 16px; right: 16px; display: flex; flex-direction: column; gap: 8px; }
.toast-item { padding: 12px 16px; border-radius: 8px; border: 1px solid; display: flex; align-items: center; gap: 8px; }
.toast-success { background-color: #dcfce7; border-color: #86efac; }
.toast-error { background-color: #fee2e2; border-color: #fca5a5; }
`,
  tooltip: `
/* Tooltip */
.tooltip-wrapper { position: relative; display: inline-block; }
.tooltip-popup { position: absolute; bottom: 100%; left: 0; white-space: nowrap; background: #1f2937; color: #fff; padding: 5px 10px; border-radius: 4px; font-size: 12px; }
.btn-icon { width: 36px; height: 36px; border-radius: 6px; border: 1px solid #d1d5db; background: white; cursor: pointer; font-size: 16px; display: inline-flex; align-items: center; justify-content: center; }
.btn-icon-danger { border-color: #fca5a5; color: #dc2626; }
.tooltip-content-dark { background: #1f2937; color: white; padding: 5px 10px; border-radius: 4px; font-size: 12px; line-height: 1.4; max-width: 200px; }
.tooltip-content-error { background: #dc2626; color: white; padding: 5px 10px; border-radius: 4px; font-size: 12px; line-height: 1.4; max-width: 200px; }
.tooltip-arrow-dark { fill: #1f2937; }
.tooltip-arrow-error { fill: #dc2626; }
`
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

  const indexCss = BASE_CSS + '\n' + (slug ? (PATTERN_CSS[slug] ?? '') : Object.values(PATTERN_CSS).join('\n'))

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
