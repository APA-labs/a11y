'use client'

import { Github, Globe, Menu, MousePointer2, ShieldCheck, Sparkles, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ICON_MAP } from '../lib/pattern-icons'
import { patterns } from '../lib/patterns'

export default function Header({ aiEnabled = true }: { aiEnabled?: boolean }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [lang, setLang] = useState<'ko' | 'en'>('ko')
  const pathname = usePathname()

  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  return (
    <>
      <header className='flex items-center h-14 px-4 md:px-6 border-b border-mist-200 bg-white shrink-0 z-40 relative'>
        {/* 로고 */}
        <Link
          href='/'
          className='flex items-center gap-2.5'>
          <div className='w-7 h-7 rounded-md bg-violet-600 flex items-center justify-center text-white font-bold text-sm select-none'>A</div>
          <span className='font-semibold text-navy-800 text-sm tracking-tight'>A11y Patterns</span>
        </Link>

        <div className='flex-1' />

        {/* 우측 액션 */}
        <nav
          className='flex items-center gap-0.5'
          aria-label='글로벌 내비게이션'>
          <Link
            href='/'
            className='hidden sm:flex px-3 py-1.5 text-sm text-mist-700 hover:text-navy hover:bg-mist-100 rounded-md transition-colors'>
            홈
          </Link>

          {/* 번역 토글 */}
          <button
            type='button'
            onClick={() => setLang((l) => (l === 'ko' ? 'en' : 'ko'))}
            className='hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm text-mist-700 hover:text-navy hover:bg-mist-100 rounded-md transition-colors'
            aria-label='언어 변경'>
            <Globe size={14} />
            <span>{lang === 'ko' ? '한국어' : 'English'}</span>
          </button>

          {/* GitHub */}
          <a
            href='https://github.com/APA-labs/a11y'
            target='_blank'
            rel='noreferrer'
            className='p-2 text-mist-600 hover:text-navy hover:bg-mist-100 rounded-md transition-colors'
            aria-label='GitHub 저장소'>
            <Github size={16} />
          </a>

          {/* 모바일 햄버거 */}
          <button
            type='button'
            onClick={() => setDrawerOpen((v) => !v)}
            className='lg:hidden p-2 text-mist-600 hover:text-navy hover:bg-mist-100 rounded-md transition-colors'
            aria-label={drawerOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={drawerOpen}
            aria-controls='mobile-drawer'>
            {drawerOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* 딤 오버레이 */}
      <div
        className={`
          lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-200
          ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setDrawerOpen(false)}
        aria-hidden='true'
      />

      {/* 모바일 드로어 */}
      <nav
        id='mobile-drawer'
        aria-label='모바일 내비게이션'
        className={`
          lg:hidden fixed top-14 left-0 bottom-0 z-40 w-64 bg-white border-r border-mist-200
          overflow-y-auto transition-transform duration-200 ease-out
          ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
        <div className='px-3 py-4 space-y-6'>
          {/* 모바일 전용: 홈·번역 */}
          <div className='flex items-center gap-2 sm:hidden px-2'>
            <Link
              href='/'
              className='flex-1 py-1.5 text-sm text-center text-mist-700 hover:text-navy hover:bg-mist-100 rounded-md transition-colors'>
              홈
            </Link>
            <button
              type='button'
              onClick={() => setLang((l) => (l === 'ko' ? 'en' : 'ko'))}
              className='flex-1 flex items-center justify-center gap-1.5 py-1.5 text-sm text-mist-700 hover:text-navy hover:bg-mist-100 rounded-md transition-colors'>
              <Globe size={13} />
              {lang === 'ko' ? '한국어' : 'English'}
            </button>
          </div>

          <section>
            <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-mist-400'>Docs</p>
            <ul className='space-y-0.5'>
              <li>
                <Link
                  href='/wcag'
                  className={`
                    flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors
                    ${pathname === '/wcag' ? 'bg-violet-50 text-violet-700' : 'text-mist-700 hover:bg-mist-100 hover:text-navy'}
                  `}>
                  <ShieldCheck
                    size={14}
                    className={pathname === '/wcag' ? 'text-violet-600' : 'text-mist-500'}
                  />
                  WCAG 레퍼런스
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-mist-400'>Patterns</p>
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
                        ${isActive ? 'bg-violet-50 text-violet-700' : 'text-mist-700 hover:bg-mist-100 hover:text-navy'}
                      `}>
                      <span className={isActive ? 'text-violet-600' : 'text-mist-500'}>{ICON_MAP[pattern.slug] ?? <MousePointer2 size={14} />}</span>
                      {pattern.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>

          {aiEnabled && (
            <section>
              <p className='px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-mist-400'>Tools</p>
              <ul className='space-y-0.5'>
                <li>
                  <Link
                    href='/analyze'
                    className={`
                      flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors
                      ${pathname === '/analyze' ? 'bg-violet-50 text-violet-700' : 'text-mist-700 hover:bg-mist-100 hover:text-navy'}
                    `}>
                    <Sparkles
                      size={14}
                      className={pathname === '/analyze' ? 'text-violet-600' : 'text-mist-500'}
                    />
                    AI 분석
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
