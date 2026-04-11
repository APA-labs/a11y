'use client'

import { m, useScroll, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    ref.current = document.querySelector('main') as HTMLElement | null
  }, [])

  const { scrollYProgress } = useScroll({ container: ref })
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })

  return (
    <m.div
      aria-hidden='true'
      style={{ scaleX }}
      className='fixed top-14 left-0 right-0 h-[2px] origin-left z-30 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500'
    />
  )
}
