'use client'

import {
  Bell,
  BookOpen,
  ChevronDown,
  ExternalLink,
  Layers,
  Link2,
  List,
  Minus,
  ShieldCheck,
  Sliders,
  Sparkles,
  Square,
  Table,
  ToggleLeft,
  Type
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { patterns } from '../lib/patterns'

const ICON_MAP: Record<string, React.ReactNode> = {
  button: <Square size={14} />,
  'text-input': <Type size={14} />,
  'modal-dialog': <BookOpen size={14} />,
  toggle: <ToggleLeft size={14} />,
  disclosure: <ChevronDown size={14} />,
  tabs: <Layers size={14} />,
  tooltip: <ExternalLink size={14} />,
  accordion: <List size={14} />,
  combobox: <Type size={14} />,
  checkbox: <Square size={14} />,
  'radio-group': <Square size={14} />,
  link: <Link2 size={14} />,
  alert: <Bell size={14} />,
  select: <List size={14} />,
  breadcrumb: <ChevronDown size={14} />,
  pagination: <List size={14} />,
  'navigation-menu': <Layers size={14} />,
  'form-validation': <ShieldCheck size={14} />,
  popover: <ExternalLink size={14} />,
  drawer: <Layers size={14} />,
  'date-picker': <Type size={14} />,
  switch: <ToggleLeft size={14} />,
  slider: <Sliders size={14} />,
  table: <Table size={14} />,
  'menu-button': <List size={14} />,
  toolbar: <Minus size={14} />
}

export default function Sidebar({ aiEnabled = true }: { aiEnabled?: boolean }) {
  const pathname = usePathname()

  return (
    <aside className='w-[240px] shrink-0 bg-navy-900 text-mist-300 flex flex-col h-full overflow-y-auto scrollbar-thin'>
      {/* Logo */}
      <div className='px-5 py-5 border-b border-navy-800'>
        <Link
          href='/'
          className='flex items-center gap-2.5 group'>
          <div className='w-7 h-7 rounded-md bg-violet-600 flex items-center justify-center text-white font-bold text-sm'>A</div>
          <span className='font-semibold text-white text-sm tracking-tight'>A11y Patterns</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className='flex-1 px-3 py-4 space-y-6'>
        <div>
          <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-mist-600'>Patterns</p>
          <ul className='space-y-0.5'>
            {patterns.map((pattern) => {
              const href = `/patterns/${pattern.slug}`
              const isActive = pathname === href
              return (
                <li key={pattern.slug}>
                  <Link
                    href={href}
                    className={`
                      flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors
                      ${isActive ? 'bg-violet-600 text-white' : 'text-mist-400 hover:bg-navy-800 hover:text-white'}
                    `}>
                    <span className={isActive ? 'text-white' : 'text-mist-600'}>{ICON_MAP[pattern.slug] ?? <Square size={14} />}</span>
                    {pattern.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-mist-600'>Docs</p>
          <ul className='space-y-0.5'>
            <li>
              <Link
                href='/wcag'
                className={`
                  flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors
                  ${pathname === '/wcag' ? 'bg-violet-600 text-white' : 'text-mist-400 hover:bg-navy-800 hover:text-white'}
                `}>
                <ShieldCheck
                  size={14}
                  className={pathname === '/wcag' ? 'text-white' : 'text-mist-600'}
                />
                WCAG 레퍼런스
              </Link>
            </li>
          </ul>
        </div>

        {aiEnabled && (
          <div>
            <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-mist-600'>Tools</p>
            <ul className='space-y-0.5'>
              <li>
                <Link
                  href='/analyze'
                  className={`
                    flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors
                    ${pathname === '/analyze' ? 'bg-violet-600 text-white' : 'text-mist-400 hover:bg-navy-800 hover:text-white'}
                  `}>
                  <Sparkles
                    size={14}
                    className={pathname === '/analyze' ? 'text-white' : 'text-mist-600'}
                  />
                  AI 분석
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Design systems legend */}
      <div className='px-4 py-4 border-t border-navy-800 space-y-1.5'>
        <p className='text-xs font-semibold uppercase tracking-wider text-mist-600 mb-2'>Design Systems</p>
        {[
          { name: 'Material (MUI)', color: '#1976d2' },
          { name: 'Radix UI', color: '#6e56cf' },
          { name: 'Ant Design', color: '#1677ff' }
        ].map((ds) => (
          <div
            key={ds.name}
            className='flex items-center gap-2'>
            <span
              className='w-2 h-2 rounded-full shrink-0'
              style={{ backgroundColor: ds.color }}
            />
            <span className='text-xs text-mist-500'>{ds.name}</span>
          </div>
        ))}
      </div>
    </aside>
  )
}
