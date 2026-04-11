'use client'

import * as Tooltip from '@radix-ui/react-tooltip'
import { Heart, Layers, MousePointer2, PanelLeftClose, PanelLeftOpen, ShieldCheck, Sparkles, Tag } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { getTranslations } from '../lib/i18n'
import { ICON_MAP } from '../lib/pattern-icons'
import { getPatterns } from '../lib/patterns'

import type { Lang } from '../lib/i18n'

function MarqueeText({ label, hidden }: { label: string; hidden: boolean }) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const [shift, setShift] = useState(0)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (hidden) {
      setShift(0)
      return
    }
    const timer = setTimeout(() => {
      const container = containerRef.current
      const text = textRef.current
      if (!container || !text) return
      const overflow = text.scrollWidth - container.clientWidth
      setShift(overflow > 0 ? text.scrollWidth + 32 : 0)
    }, 210)
    return () => clearTimeout(timer)
  }, [label, hidden])

  const duration = Math.max(1.5, shift / 50)

  return (
    <span
      ref={containerRef}
      aria-hidden={hidden}
      className={`overflow-hidden block transition-opacity duration-150 ${hidden ? 'w-0 opacity-0' : 'opacity-100 delay-100'}`}
      onMouseEnter={() => shift > 0 && setActive(true)}
      onMouseLeave={() => setActive(false)}>
      <span
        className='inline-flex whitespace-nowrap'
        style={
          active
            ? ({
                '--marquee-shift': `-${shift}px`,
                animation: `sidebar-marquee ${duration}s linear infinite`
              } as React.CSSProperties)
            : undefined
        }>
        <span ref={textRef}>{label}</span>
        {shift > 0 && (
          <span
            className='pl-8'
            aria-hidden='true'>
            {label}
          </span>
        )}
      </span>
    </span>
  )
}

export default function Sidebar({ aiEnabled = true, lang }: { aiEnabled?: boolean; lang: Lang }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(true)
  const t = getTranslations(lang)
  const patterns = getPatterns(lang)

  const toggle = () => setCollapsed((prev) => !prev)

  const SectionLabel = ({ children }: { children: string }) =>
    collapsed ? (
      <div className='mx-3 my-2 border-t border-outline' />
    ) : (
      <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-faint'>{children}</p>
    )

  const navItem = (href: string, icon: React.ReactNode, label: string) => {
    const isActive = pathname === href
    const linkClass = `
          flex items-center py-1.5 rounded-md text-sm transition-colors
          ${collapsed ? 'justify-center px-0' : 'gap-2.5 px-2'}
          ${isActive ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/60 dark:text-violet-300' : 'text-soft hover:bg-inset hover:text-body'}
        `
    const link = (
      <Link
        href={href}
        aria-current={isActive ? 'page' : undefined}
        aria-label={collapsed ? label : undefined}
        className={linkClass}>
        <span className={`shrink-0 ${isActive ? 'text-violet-600 dark:text-violet-300' : 'text-faint'}`}>{icon}</span>
        <MarqueeText
          label={label}
          hidden={collapsed}
        />
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
            className='z-[100] max-w-[min(240px,calc(100vw-4rem))] rounded-md border border-outline bg-float px-2.5 py-1.5 text-xs font-medium leading-snug text-body shadow-md select-none'>
            {label}
            <Tooltip.Arrow
              className='fill-float'
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
        className='hidden lg:flex flex-col h-full bg-surface shrink-0 overflow-y-auto overflow-x-hidden scrollbar-thin transition-[width] duration-200 ease-in-out border-r border-outline'>
        <div className={`flex ${collapsed ? 'justify-center' : 'justify-end'} px-2 pt-3 pb-1`}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                type='button'
                onClick={toggle}
                className='p-1.5 rounded-md text-faint hover:text-navy hover:bg-mist-100 dark:hover:bg-[#1E2E40] dark:hover:text-white transition-colors'
                aria-label={collapsed ? t.nav.sidebarExpand : t.nav.sidebarCollapse}>
                {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side='right'
                sideOffset={8}
                className='z-[100] max-w-[min(240px,calc(100vw-4rem))] rounded-md border border-outline bg-float px-2.5 py-1.5 text-xs font-medium leading-snug text-body shadow-md select-none'>
                {collapsed ? t.nav.sidebarExpand : t.nav.sidebarCollapse}
                <Tooltip.Arrow
                  className='fill-float'
                  width={10}
                  height={5}
                />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </div>

        <nav className='flex-1 px-2 py-1 space-y-5'>
          <div>
            <SectionLabel>{t.nav.docs}</SectionLabel>
            <ul className='space-y-0.5'>
              <li>{navItem(`/${lang}/wcag`, <ShieldCheck size={14} />, t.nav.wcag)}</li>
              <li>{navItem(`/${lang}/wcag/why`, <Heart size={14} />, t.nav.wcagWhy)}</li>
              <li>{navItem(`/${lang}/wcag/aria`, <Tag size={14} />, t.nav.wcagAria)}</li>
              <li>{navItem(`/${lang}/wcag/dom`, <Layers size={14} />, t.nav.wcagDom)}</li>
            </ul>
          </div>

          <div>
            <SectionLabel>{t.nav.patterns}</SectionLabel>
            <ul className='space-y-0.5'>
              {patterns.map((pattern) => (
                <li key={pattern.slug}>
                  {navItem(`/${lang}/patterns/${pattern.slug}`, ICON_MAP[pattern.slug] ?? <MousePointer2 size={14} />, pattern.name)}
                </li>
              ))}
            </ul>
          </div>

          {aiEnabled && (
            <div>
              <SectionLabel>{t.nav.tools}</SectionLabel>
              <ul className='space-y-0.5'>
                <li>{navItem(`/${lang}/analyze`, <Sparkles size={14} />, t.nav.aiAnalyze)}</li>
              </ul>
            </div>
          )}
        </nav>

        <div className='h-4 shrink-0' />
      </aside>
    </Tooltip.Provider>
  )
}
