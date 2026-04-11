'use client'

import { ArrowUpRight } from 'lucide-react'
import { m } from 'motion/react'
import Link from 'next/link'

import { getDsSwatchColor } from '../../lib/ds-swatch'
import { DS_META, DS_ORDER } from '../../lib/types'
import { getPreview } from '../previews'

import type { Lang } from '../../lib/i18n'
import type { Pattern } from '../../lib/types'

type Props = {
  pattern: Pattern
  lang: Lang
}

export default function PatternCardFancy({ pattern, lang }: Props) {
  const mustCount = pattern.baseline.checklist.must.length
  const shouldCount = pattern.baseline.checklist.should.length
  const SvgPreview = getPreview(pattern.slug)

  const activeDS = DS_ORDER.filter((id) => pattern.designSystems[id] != null)

  return (
    <m.div
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      whileHover={{ y: -4 }}
      className='group relative'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'
        style={{
          background:
            'conic-gradient(from 180deg at 50% 50%, rgba(139,92,246,0.35), rgba(236,72,153,0.3), rgba(16,185,129,0.3), rgba(139,92,246,0.35))',
          filter: 'blur(14px)'
        }}
      />

      <Link
        href={`/${lang}/patterns/${pattern.slug}`}
        className='relative block bg-surface rounded-2xl border border-outline overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas transition-colors group-hover:border-violet-300 dark:group-hover:border-violet-700'>
        <div
          className='relative w-full bg-canvas overflow-hidden border-b border-divider'
          style={{ aspectRatio: '320 / 180' }}>
          <div
            aria-hidden='true'
            className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'
            style={{
              background: 'radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(139,92,246,0.12), transparent 40%)'
            }}
          />
          {SvgPreview ? (
            <div className='absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]'>
              <SvgPreview />
            </div>
          ) : (
            <div className='absolute inset-0 flex items-center justify-center'>
              <span className='text-sm font-medium text-faint tracking-tight'>{pattern.name}</span>
            </div>
          )}
        </div>

        <div className='relative p-4'>
          <div className='flex items-start justify-between gap-2'>
            <h2 className='text-[14px] font-semibold tracking-tight leading-snug text-body transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-400'>
              {pattern.name}
            </h2>
            <ArrowUpRight
              size={16}
              className='shrink-0 mt-0.5 text-faint transition-all duration-300 group-hover:text-violet-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
            />
          </div>
          <p className='mt-1 text-[12px] text-soft leading-snug line-clamp-2 min-h-[2.5rem]'>{pattern.description}</p>

          <div className='mt-3 pt-3 border-t border-divider flex items-center justify-between'>
            <div className='flex items-center gap-2 text-[11px] text-soft'>
              <span>
                <span className='font-semibold text-rose-500 dark:text-rose-400'>{mustCount}</span> must
              </span>
              <span className='text-faint'>·</span>
              <span>
                <span className='font-semibold text-amber-500 dark:text-amber-400'>{shouldCount}</span> should
              </span>
            </div>
            <div className='flex items-center -space-x-1'>
              {activeDS.slice(0, 5).map((id) => (
                <span
                  key={id}
                  className='w-2.5 h-2.5 rounded-full ring-2 ring-surface'
                  title={DS_META[id].name}
                  style={{ backgroundColor: getDsSwatchColor(id) }}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </m.div>
  )
}
