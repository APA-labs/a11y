'use client'

import { m } from 'motion/react'
import { useMemo, useState } from 'react'

import type { Lang } from '@/lib/i18n'
import type { DesignSystemId, Pattern } from '@/lib/types'

import PatternCardFancy from '@/components/home/PatternCardFancy'
import { getTranslations } from '@/lib/i18n'
import { DS_META, DS_ORDER } from '@/lib/types'
import { getDsSwatchColor } from '@/lib/wcag/ds-swatch'


export default function PatternGrid({ patterns, lang }: { patterns: Pattern[]; lang: Lang }) {
  const t = getTranslations(lang)
  const [activeDS, setActiveDS] = useState<DesignSystemId | null>(null)

  const filtered = useMemo(() => {
    return activeDS ? patterns.filter((p) => p.designSystems[activeDS] != null) : patterns
  }, [patterns, activeDS])

  return (
    <div>
      <div className='flex items-end justify-between flex-wrap gap-4 mb-6'>
        <div>
          <h2 className='text-lg sm:text-xl font-semibold tracking-tight text-body'>{t.home.exploreTitle}</h2>
          <p className='text-xs text-faint mt-1'>
            {filtered.length === patterns.length ? t.home.allPatterns : t.home.filteredCount(filtered.length)}
          </p>
        </div>

        <div
          className='flex items-center gap-1.5 flex-wrap'
          role='group'
          aria-label={t.home.filterByDS}>
          <button
            type='button'
            onClick={() => setActiveDS(null)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
              activeDS === null
                ? 'bg-navy-800 text-pearl border-navy-800 dark:bg-pearl dark:text-navy-800 dark:border-pearl'
                : 'bg-surface text-soft border-outline hover:border-violet-400 hover:text-body'
            }`}>
            {t.home.allDS}
          </button>
          {DS_ORDER.map((id) => {
            const swatch = getDsSwatchColor(id)
            const isActive = activeDS === id
            const isBaseUi = id === 'baseui'
            const activeTextClass = isBaseUi ? 'text-navy-900 dark:text-navy-900' : 'text-white'
            return (
              <button
                key={id}
                type='button'
                onClick={() => setActiveDS(isActive ? null : id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                  isActive
                    ? `${activeTextClass} border-transparent shadow-sm`
                    : 'bg-surface text-soft border-outline hover:border-violet-400 hover:text-body'
                }`}
                style={isActive ? { backgroundColor: swatch, borderColor: swatch } : {}}>
                <span
                  className='w-2 h-2 rounded-full shrink-0'
                  style={{
                    backgroundColor: isActive ? (isBaseUi ? 'rgba(24,24,27,0.7)' : 'rgba(255,255,255,0.85)') : swatch
                  }}
                />
                {DS_META[id].name}
              </button>
            )
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className='py-20 text-center text-soft text-sm'>{t.home.noResults}</div>
      ) : (
        <m.div
          key={activeDS ?? 'all'}
          initial='hidden'
          animate='show'
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.04 } }
          }}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5'>
          {filtered.map((pattern) => (
            <PatternCardFancy
              key={pattern.slug}
              pattern={pattern}
              lang={lang}
            />
          ))}
        </m.div>
      )}
    </div>
  )
}
