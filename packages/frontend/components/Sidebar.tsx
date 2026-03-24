'use client'

import { BookOpen, ShieldCheck, Sparkles, Square, ToggleLeft, Type } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { patterns } from '../lib/patterns'

const ICON_MAP: Record<string, React.ReactNode> = {
  button: <Square size={14} />,
  'text-input': <Type size={14} />,
  'modal-dialog': <BookOpen size={14} />,
  toggle: <ToggleLeft size={14} />
}

export default function Sidebar({ aiEnabled = true }: { aiEnabled?: boolean }) {
  const pathname = usePathname()

  return (
    <aside className='w-[240px] shrink-0 bg-[#0f172a] text-slate-300 flex flex-col h-full overflow-y-auto scrollbar-thin'>
      {/* Logo */}
      <div className='px-5 py-5 border-b border-slate-700/60'>
        <Link
          href='/'
          className='flex items-center gap-2 group'>
          <div className='w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center text-white font-bold text-sm'>A</div>
          <span className='font-semibold text-white text-sm tracking-tight'>A11y Patterns</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className='flex-1 px-3 py-4 space-y-6'>
        {/* Patterns */}
        <div>
          <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500'>Patterns</p>
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
                      ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-700/60 hover:text-slate-200'}
                    `}>
                    <span className={isActive ? 'text-white' : 'text-slate-500'}>{ICON_MAP[pattern.slug] ?? <Square size={14} />}</span>
                    {pattern.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Docs */}
        <div>
          <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500'>Docs</p>
          <ul className='space-y-0.5'>
            <li>
              <Link
                href='/wcag'
                className={`
                  flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors
                  ${pathname === '/wcag' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-700/60 hover:text-slate-200'}
                `}>
                <ShieldCheck
                  size={14}
                  className={pathname === '/wcag' ? 'text-white' : 'text-slate-500'}
                />
                WCAG 레퍼런스
              </Link>
            </li>
          </ul>
        </div>

        {/* Tools */}
        {aiEnabled && (
          <div>
            <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500'>Tools</p>
            <ul className='space-y-0.5'>
              <li>
                <Link
                  href='/analyze'
                  className={`
                    flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors
                    ${pathname === '/analyze' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-700/60 hover:text-slate-200'}
                  `}>
                  <Sparkles
                    size={14}
                    className={pathname === '/analyze' ? 'text-white' : 'text-slate-500'}
                  />
                  AI 분석
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Design systems legend */}
      <div className='px-4 py-4 border-t border-slate-700/60 space-y-1.5'>
        <p className='text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2'>Design Systems</p>
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
            <span className='text-xs text-slate-400'>{ds.name}</span>
          </div>
        ))}
      </div>
    </aside>
  )
}
