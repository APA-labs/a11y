'use client'

import { m, useReducedMotion } from 'motion/react'

import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: ReactNode
  children?: ReactNode
  id?: string
}

export default function SectionHeader({ eyebrow, title, children, id }: Props) {
  const reduce = useReducedMotion()

  return (
    <m.header
      id={id}
      initial={reduce ? undefined : { opacity: 0, y: 12, filter: 'blur(6px)' }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className='mb-6 scroll-mt-24'>
      <div className='flex items-center gap-3'>
        <span
          aria-hidden='true'
          className='inline-block h-[2px] w-8 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full'
        />
        {eyebrow && <span className='text-[11px] font-medium uppercase tracking-[0.16em] text-soft'>{eyebrow}</span>}
      </div>
      <h2 className='mt-3 text-xl sm:text-2xl font-semibold tracking-tight text-body leading-tight'>{title}</h2>
      {children && <div className='mt-2 text-sm text-soft leading-relaxed'>{children}</div>}
    </m.header>
  )
}
