'use client'

import { Github, Menu, MousePointer2, ShieldCheck, Sparkles, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import LanguageSwitcher from './LanguageSwitcher'
import { getTranslations } from '../lib/i18n'
import { ICON_MAP } from '../lib/pattern-icons'
import { getPatterns } from '../lib/patterns'

import type { Lang } from '../lib/i18n'

export default function Header({ aiEnabled = true, lang }: { aiEnabled?: boolean; lang: Lang }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()
  const t = getTranslations(lang)
  const patterns = getPatterns(lang)

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
      <header className='flex items-center h-14 px-4 md:px-6 border-b border-mist-200 bg-white shrink-0 z-40 relative'>
        <Link
          href={`/${lang}`}
          className='flex items-center gap-2 sm:gap-2.5 min-w-0 shrink-0'>
          <span className='font-semibold text-navy-800 text-sm tracking-tight whitespace-nowrap'>A11y Patterns</span>
        </Link>

        <div className='flex-1' />

        <nav
          className='flex items-center gap-1'
          aria-label={t.nav.globalNav}>
          <Link
            href={`/${lang}`}
            className='hidden sm:flex px-3 py-1.5 text-sm text-mist-700 hover:text-navy hover:bg-mist-100 rounded-md transition-colors'>
            {t.nav.home}
          </Link>

          <LanguageSwitcher currentLang={lang} />

          <a
            href='https://github.com/APA-labs/a11y'
            target='_blank'
            rel='noreferrer'
            className='p-2 text-mist-600 hover:text-navy hover:bg-mist-100 rounded-md transition-colors'
            aria-label={t.nav.githubLabel}>
            <Github size={16} />
          </a>

          <button
            type='button'
            onClick={() => setDrawerOpen((v) => !v)}
            className='lg:hidden p-2 text-mist-600 hover:text-navy hover:bg-mist-100 rounded-md transition-colors'
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
          lg:hidden fixed top-14 left-0 bottom-0 z-40 w-64 bg-white border-r border-mist-200
          overflow-y-auto transition-transform duration-200 ease-out
          ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
        <div className='px-3 py-4 space-y-6'>
          <section>
            <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-mist-400'>{t.nav.docs}</p>
            <ul className='space-y-0.5'>
              <li>
                <Link
                  href={`/${lang}/wcag`}
                  className={`
                    flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors
                    ${isActive('/wcag') ? 'bg-violet-50 text-violet-700' : 'text-mist-700 hover:bg-mist-100 hover:text-navy'}
                  `}>
                  <ShieldCheck
                    size={14}
                    className={isActive('/wcag') ? 'text-violet-600' : 'text-mist-500'}
                  />
                  {t.nav.wcag}
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-mist-400'>{t.nav.patterns}</p>
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
                        ${active ? 'bg-violet-50 text-violet-700' : 'text-mist-700 hover:bg-mist-100 hover:text-navy'}
                      `}>
                      <span className={active ? 'text-violet-600' : 'text-mist-500'}>{ICON_MAP[pattern.slug] ?? <MousePointer2 size={14} />}</span>
                      {pattern.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>

          {aiEnabled && (
            <section>
              <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-mist-400'>{t.nav.tools}</p>
              <ul className='space-y-0.5'>
                <li>
                  <Link
                    href={`/${lang}/analyze`}
                    className={`
                      flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors
                      ${isActive('/analyze') ? 'bg-violet-50 text-violet-700' : 'text-mist-700 hover:bg-mist-100 hover:text-navy'}
                    `}>
                    <Sparkles
                      size={14}
                      className={isActive('/analyze') ? 'text-violet-600' : 'text-mist-500'}
                    />
                    {t.nav.aiAnalyze}
                  </Link>
                </li>
              </ul>
            </section>
          )}
        </div>
      </nav>
    </>
  )
}
