'use client'

import { Menu, MousePointer2, ShieldCheck, Sparkles, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ICON_MAP } from '../lib/pattern-icons'
import { patterns } from '../lib/patterns'

export default function MobileNav({ aiEnabled = true }: { aiEnabled?: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* 상단 헤더 바 */}
      <header className='lg:hidden flex-shrink-0 flex items-center justify-between px-4 h-14 bg-navy-900 border-b border-navy-800 z-40'>
        <Link
          href='/'
          className='flex items-center gap-2.5'>
          <div className='w-7 h-7 rounded-md bg-violet-600 flex items-center justify-center text-white font-bold text-sm'>A</div>
          <span className='font-semibold text-white text-sm tracking-tight'>A11y Patterns</span>
        </Link>

        <button
          type='button'
          onClick={() => setOpen((v) => !v)}
          className='p-1.5 rounded-md text-mist-400 hover:text-white hover:bg-navy-800 transition-colors'
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={open}
          aria-controls='mobile-drawer'>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* 딤 오버레이 */}
      <div
        className={`
          lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-200
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setOpen(false)}
        aria-hidden='true'
      />

      {/* 슬라이드인 드로어 */}
      <nav
        id='mobile-drawer'
        aria-label='모바일 내비게이션'
        className={`
          lg:hidden fixed top-14 left-0 bottom-0 z-40 w-64 bg-navy-900 text-mist-300
          overflow-y-auto scrollbar-thin transition-transform duration-200 ease-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}>
        <div className='px-3 py-4 space-y-6'>
          {/* Docs */}
          <section>
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
          </section>

          {/* Patterns */}
          <section>
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
                      <span className={isActive ? 'text-white' : 'text-mist-600'}>{ICON_MAP[pattern.slug] ?? <MousePointer2 size={14} />}</span>
                      {pattern.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>

          {/* Tools */}
          {aiEnabled && (
            <section>
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
            </section>
          )}
        </div>
      </nav>
    </>
  )
}
