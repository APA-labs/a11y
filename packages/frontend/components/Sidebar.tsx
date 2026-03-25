'use client'

import * as Tooltip from '@radix-ui/react-tooltip'
import { MousePointer2, PanelLeftClose, PanelLeftOpen, ShieldCheck, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ICON_MAP } from '../lib/pattern-icons'
import { patterns } from '../lib/patterns'

export default function Sidebar({ aiEnabled = true }: { aiEnabled?: boolean }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed')
    if (stored !== null) setCollapsed(stored === 'true')
  }, [])

  const toggle = () => {
    setCollapsed((prev) => {
      localStorage.setItem('sidebar-collapsed', String(!prev))
      return !prev
    })
  }

  const SectionLabel = ({ children }: { children: string }) =>
    collapsed ? (
      <div className='mx-3 my-2 border-t border-mist-200' />
    ) : (
      <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-mist-400'>{children}</p>
    )

  const navItem = (href: string, icon: React.ReactNode, label: string) => {
    const isActive = pathname === href
    const linkClass = `
          flex items-center py-1.5 rounded-md text-sm transition-colors
          ${collapsed ? 'justify-center px-0' : 'gap-2.5 px-2'}
          ${isActive ? 'bg-violet-50 text-violet-700' : 'text-mist-700 hover:bg-mist-100 hover:text-navy'}
        `
    const link = (
      <Link
        href={href}
        aria-current={isActive ? 'page' : undefined}
        aria-label={collapsed ? label : undefined}
        className={linkClass}>
        <span className={`shrink-0 ${isActive ? 'text-violet-600' : 'text-mist-500'}`}>{icon}</span>
        <span
          aria-hidden={collapsed}
          className={`whitespace-nowrap overflow-hidden transition-opacity duration-150 ${collapsed ? 'w-0 opacity-0' : 'opacity-100 delay-100'}`}>
          {label}
        </span>
      </Link>
    )

    if (!collapsed) {
      return link
    }

    return (
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{link}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side='right'
            sideOffset={8}
            className='z-[100] max-w-[min(240px,calc(100vw-4rem))] rounded-md border border-mist-200 bg-white px-2.5 py-1.5 text-xs font-medium leading-snug text-navy shadow-md select-none'>
            {label}
            <Tooltip.Arrow
              className='fill-white'
              width={10}
              height={5}
            />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    )
  }

  return (
    <Tooltip.Provider delayDuration={200}>
      <aside
        style={{ width: collapsed ? 52 : 240 }}
        className='hidden lg:flex flex-col h-full bg-white shrink-0 overflow-y-auto overflow-x-hidden scrollbar-thin transition-[width] duration-200 ease-in-out border-r border-mist-200'>
        {/* 접기 / 펼치기 버튼 */}
        <div className={`flex ${collapsed ? 'justify-center' : 'justify-end'} px-2 pt-3 pb-1`}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                type='button'
                onClick={toggle}
                className='p-1.5 rounded-md text-mist-400 hover:text-navy hover:bg-mist-100 transition-colors'
                aria-label={collapsed ? '사이드바 펼치기' : '사이드바 접기'}>
                {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side='right'
                sideOffset={8}
                className='z-[100] max-w-[min(240px,calc(100vw-4rem))] rounded-md border border-mist-200 bg-white px-2.5 py-1.5 text-xs font-medium leading-snug text-navy shadow-md select-none'>
                {collapsed ? '사이드바 펼치기' : '사이드바 접기'}
                <Tooltip.Arrow
                  className='fill-white'
                  width={10}
                  height={5}
                />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </div>

        {/* Nav */}
        <nav className='flex-1 px-2 py-1 space-y-5'>
          {/* Docs */}
          <div>
            <SectionLabel>Docs</SectionLabel>
            <ul className='space-y-0.5'>
              <li>{navItem('/wcag', <ShieldCheck size={14} />, 'WCAG 레퍼런스')}</li>
            </ul>
          </div>

          {/* Patterns */}
          <div>
            <SectionLabel>Patterns</SectionLabel>
            <ul className='space-y-0.5'>
              {patterns.map((pattern) => (
                <li key={pattern.slug}>
                  {navItem(`/patterns/${pattern.slug}`, ICON_MAP[pattern.slug] ?? <MousePointer2 size={14} />, pattern.name)}
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          {aiEnabled && (
            <div>
              <SectionLabel>Tools</SectionLabel>
              <ul className='space-y-0.5'>
                <li>{navItem('/analyze', <Sparkles size={14} />, 'AI 분석')}</li>
              </ul>
            </div>
          )}
        </nav>

        <div className='h-4 shrink-0' />
      </aside>
    </Tooltip.Provider>
  )
}
