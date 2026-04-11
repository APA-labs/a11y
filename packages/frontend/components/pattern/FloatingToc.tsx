'use client'

import { useEffect, useState } from 'react'

type TocItem = {
  id: string
  label: string
}

export default function FloatingToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? '')

  useEffect(() => {
    if (items.length === 0) return
    const scrollContainer = document.querySelector('main')
    if (!scrollContainer) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      {
        root: scrollContainer,
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 1]
      }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const main = document.querySelector('main')
    if (!main) return
    const offsetTop = el.offsetTop - 24
    main.scrollTo({ top: offsetTop, behavior: 'smooth' })
  }

  return (
    <nav
      aria-label='On this page'
      className='sticky top-24 text-sm'>
      <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-faint mb-3'>On this page</p>
      <ul className='space-y-1.5 border-l border-outline'>
        {items.map(({ id, label }) => {
          const isActive = active === id
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                aria-current={isActive ? 'location' : undefined}
                className={`relative block pl-4 py-1 text-[13px] leading-snug transition-colors ${
                  isActive ? 'text-body font-medium' : 'text-soft hover:text-body'
                }`}>
                <span
                  aria-hidden='true'
                  className={`absolute left-[-1px] top-0 bottom-0 w-[2px] transition-all ${isActive ? 'bg-violet-500' : 'bg-transparent'}`}
                />
                {label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
