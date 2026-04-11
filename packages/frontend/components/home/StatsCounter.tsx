'use client'

import { animate, m, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type Stat = {
  label: string
  value: number
  tone: 'violet' | 'body' | 'red' | 'amber'
}

type StatsCounterProps = {
  stats: Stat[]
}

const toneClasses: Record<Stat['tone'], string> = {
  violet: 'text-violet-600 dark:text-violet-400',
  body: 'text-body',
  red: 'text-rose-500 dark:text-rose-400',
  amber: 'text-amber-500 dark:text-amber-400'
}

function Counter({ to, reduce }: { to: number; reduce: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [val, setVal] = useState(reduce ? to : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, to, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v))
    })
    return () => controls.stop()
  }, [inView, to, reduce])

  return <span ref={ref}>{val}</span>
}

export default function StatsCounter({ stats }: StatsCounterProps) {
  const reduce = useReducedMotion() ?? false

  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className='relative z-10 max-w-7xl mx-auto px-6 sm:px-10'>
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-outline bg-outline/60 shadow-sm'>
        {stats.map((s) => (
          <div
            key={s.label}
            className='bg-surface px-5 py-6 sm:py-7'>
            <p className={`font-serif text-4xl sm:text-5xl leading-none ${toneClasses[s.tone]}`}>
              <Counter
                to={s.value}
                reduce={reduce}
              />
            </p>
            <p className='text-[11px] text-soft mt-3 uppercase tracking-[0.14em]'>{s.label}</p>
          </div>
        ))}
      </div>
    </m.div>
  )
}
