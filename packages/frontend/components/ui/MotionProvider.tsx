'use client'

import { LazyMotion, domAnimation, MotionConfig } from 'motion/react'

import type { ReactNode } from 'react'

export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion
      features={domAnimation}
      strict>
      <MotionConfig
        reducedMotion='user'
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}
