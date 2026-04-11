'use client'

import { useEffect, useState } from 'react'

import { DS_META, DS_ORDER } from '../lib/types'

export default function DSLegendFloat() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const target = document.getElementById('patterns')
    if (!target) return

    const root = document.querySelector('main')
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) setVisible(entry.isIntersecting)
      },
      {
        root: root ?? null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0
      }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className={`hidden lg:block fixed bottom-5 right-5 z-50 transition-all duration-300 ease-out ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}>
      <div className='bg-surface/90 backdrop-blur-md border border-outline rounded-xl shadow-lg px-4 py-3 space-y-1.5'>
        <p className='text-[10px] font-semibold uppercase tracking-wider text-faint mb-1'>Design Systems</p>
        {DS_ORDER.map((id) => {
          const ds = DS_META[id]
          return (
            <div
              key={id}
              className='flex items-center gap-2'>
              <span
                className='w-2 h-2 rounded-full shrink-0'
                style={{ backgroundColor: ds.color }}
              />
              <span className='text-xs text-body whitespace-nowrap'>{ds.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
