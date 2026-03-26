'use client'

import { Github, Menu, MousePointer2, Search, ShieldCheck, Sparkles, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import CommandPalette from './CommandPalette'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import { getTranslations } from '../lib/i18n'
import { ICON_MAP } from '../lib/pattern-icons'
import { getPatterns } from '../lib/patterns'

import type { Lang } from '../lib/i18n'

export default function Header({ aiEnabled = true, lang }: { aiEnabled?: boolean; lang: Lang }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const pathname = usePathname()
  const t = getTranslations(lang)
  const patterns = getPatterns(lang)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  const isActive = (path: string) => pathname === `/${lang}${path}`

  return (
    <>
      <header className='flex items-center h-14 px-4 md:px-6 border-b border-outline bg-surface shrink-0 z-40 relative'>
        {/* 좌측: 로고 */}
        <Link
          href={`/${lang}`}
          className='flex items-center gap-2 sm:gap-2.5 min-w-0 shrink-0'>
          <span className='font-semibold text-body text-sm tracking-tight whitespace-nowrap'>A11y Patterns</span>
        </Link>

        {/* 중앙: 검색바 */}
        <div className='flex-1 flex justify-center px-4'>
          <button
            type='button'
            onClick={() => setCmdOpen(true)}
            aria-label={t.cmd.searchLabel}
            className='hidden sm:flex items-center gap-2 w-full max-w-xs pl-3 pr-2 py-1.5 rounded-lg border border-outline bg-inset hover:border-violet-400 transition-colors text-faint hover:text-soft'>
            <Search
              size={13}
              className='shrink-0'
            />
            <span className='flex-1 text-xs text-left'>{t.cmd.placeholder}</span>
            <kbd className='shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-surface border border-outline'>⌘K</kbd>
          </button>
        </div>

        {/* 우측: 아이콘 */}
        <nav
          className='flex items-center gap-1 shrink-0'
          aria-label={t.nav.globalNav}>
          <ThemeToggle />
          <LanguageSwitcher currentLang={lang} />

          <a
            href='https://github.com/APA-labs/a11y'
            target='_blank'
            rel='noreferrer'
            className='p-2 text-soft hover:text-navy hover:bg-mist-100 dark:hover:bg-[#1E2E40] dark:hover:text-white rounded-md transition-colors'
            aria-label={t.nav.githubLabel}>
            <Github size={16} />
          </a>

          <button
            type='button'
            onClick={() => setCmdOpen(true)}
            aria-label={t.cmd.searchLabel}
            className='sm:hidden p-2 text-soft hover:text-body hover:bg-mist-100 dark:hover:bg-[#1E2E40] rounded-md transition-colors'>
            <Search size={16} />
          </button>

          <button
            type='button'
            onClick={() => setDrawerOpen((v) => !v)}
            className='lg:hidden p-2 text-soft hover:text-navy hover:bg-mist-100 dark:hover:bg-[#1E2E40] dark:hover:text-white rounded-md transition-colors'
            aria-label={drawerOpen ? t.nav.menuClose : t.nav.menuOpen}
            aria-expanded={drawerOpen}
            aria-controls='mobile-drawer'>
            {drawerOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      <div
        className={`
          lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-200
          ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setDrawerOpen(false)}
        aria-hidden='true'
      />

      <nav
        id='mobile-drawer'
        aria-label={t.nav.mobileNav}
        className={`
          lg:hidden fixed top-14 left-0 bottom-0 z-40 w-64 bg-surface border-r border-outline
          overflow-y-auto transition-transform duration-200 ease-out
          ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
        <div className='px-3 py-4 space-y-6'>
          <section>
            <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-faint'>{t.nav.docs}</p>
            <ul className='space-y-0.5'>
              <li>
                <Link
                  href={`/${lang}/wcag`}
                  className={`
                    flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors
                    ${isActive('/wcag') ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/60 dark:text-violet-300' : 'text-soft hover:bg-inset hover:text-body'}
                  `}>
                  <ShieldCheck
                    size={14}
                    className={isActive('/wcag') ? 'text-violet-600 dark:text-violet-300' : 'text-faint'}
                  />
                  {t.nav.wcag}
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-faint'>{t.nav.patterns}</p>
            <ul className='space-y-0.5'>
              {patterns.map((pattern) => {
                const href = `/${lang}/patterns/${pattern.slug}`
                const active = pathname === href
                return (
                  <li key={pattern.slug}>
                    <Link
                      href={href}
                      className={`
                        flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors
                        ${active ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/60 dark:text-violet-300' : 'text-soft hover:bg-inset hover:text-body'}
                      `}>
                      <span className={active ? 'text-violet-600 dark:text-violet-300' : 'text-faint'}>
                        {ICON_MAP[pattern.slug] ?? <MousePointer2 size={14} />}
                      </span>
                      {pattern.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>

          {aiEnabled && (
            <section>
              <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-faint'>{t.nav.tools}</p>
              <ul className='space-y-0.5'>
                <li>
                  <Link
                    href={`/${lang}/analyze`}
                    className={`
                      flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors
                      ${isActive('/analyze') ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/60 dark:text-violet-300' : 'text-soft hover:bg-inset hover:text-body'}
                    `}>
                    <Sparkles
                      size={14}
                      className={isActive('/analyze') ? 'text-violet-600 dark:text-violet-300' : 'text-faint'}
                    />
                    {t.nav.aiAnalyze}
                  </Link>
                </li>
              </ul>
            </section>
          )}
        </div>
      </nav>

      <CommandPalette
        patterns={patterns}
        lang={lang}
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
      />
    </>
  )
}
