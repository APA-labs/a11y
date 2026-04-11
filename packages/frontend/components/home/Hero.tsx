'use client'

import { m, useReducedMotion } from 'motion/react'

import Aurora from './Aurora'

type HeroProps = {
  subtitle: string
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

export default function Hero({ subtitle }: HeroProps) {
  const reduce = useReducedMotion()
  const initial = reduce ? 'show' : 'hidden'

  return (
    <section className='relative isolate overflow-hidden'>
      <Aurora />

      <div className='relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-20 pb-4 sm:pt-28 sm:pb-6'>
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
            className='font-serif leading-[1.05] tracking-tight text-body text-[clamp(2.25rem,8vw,4.75rem)]'>
            Accessibility <span className='italic text-gradient'>patterns</span>
            <br className='hidden sm:block' /> decoded for builders.
          </m.h1>

          <m.p
            variants={item}
            className='mt-6 text-base sm:text-lg text-soft leading-relaxed max-w-2xl'>
            {subtitle}
          </m.p>
        </m.div>
      </div>
    </section>
  )
}
