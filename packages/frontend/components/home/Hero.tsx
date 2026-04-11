'use client'

import { ArrowDown, Sparkles } from 'lucide-react'
import { m, useReducedMotion } from 'motion/react'
import Link from 'next/link'

import Aurora from './Aurora'

import type { Lang } from '../../lib/i18n'

type HeroProps = {
  lang: Lang
  subtitle: string
  aiEnabled: boolean
  aiLabel: string
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
} as const

const item = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  }
} as const

export default function Hero({ lang, subtitle, aiEnabled, aiLabel }: HeroProps) {
  const reduce = useReducedMotion()
  const initial = reduce ? 'show' : 'hidden'

  return (
    <section className='relative isolate overflow-hidden'>
      <Aurora />

      <div className='relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-16 pb-14 sm:pt-24 sm:pb-20'>
        <m.div
          variants={container}
          initial={initial}
          animate='show'
          className='max-w-3xl'>
          <m.div
            variants={item}
            className='inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-soft mb-6'>
            <span className='inline-block h-1.5 w-1.5 rounded-full bg-violet-500' />
            WCAG 2.1 AA · Pattern Library
          </m.div>

          <m.h1
            variants={item}
            className='font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-body'>
            Accessibility <span className='italic text-gradient'>patterns</span>
            <br className='hidden sm:block' /> decoded for builders.
          </m.h1>

          <m.p
            variants={item}
            className='mt-6 text-base sm:text-lg text-soft leading-relaxed max-w-2xl'>
            {subtitle}
          </m.p>

          <m.div
            variants={item}
            className='mt-10 flex flex-wrap items-center gap-3'>
            <a
              href='#patterns'
              className='group inline-flex items-center gap-2 rounded-full bg-navy-800 dark:bg-pearl text-pearl dark:text-navy-800 px-5 py-2.5 text-sm font-medium shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas'>
              Browse patterns
              <ArrowDown
                size={14}
                className='transition-transform group-hover:translate-y-0.5'
              />
            </a>

            <Link
              href={`/${lang}/wcag`}
              className='inline-flex items-center gap-2 rounded-full border border-outline bg-surface/60 backdrop-blur px-5 py-2.5 text-sm font-medium text-body hover:bg-surface hover:border-violet-300 dark:hover:border-violet-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400'>
              Why WCAG?
            </Link>

            {aiEnabled && (
              <Link
                href={`/${lang}/analyze`}
                className='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas'>
                <Sparkles size={14} />
                {aiLabel}
              </Link>
            )}
          </m.div>
        </m.div>
      </div>
    </section>
  )
}
