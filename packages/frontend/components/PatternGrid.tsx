'use client'

import { useMemo, useState } from 'react'

import PatternCard from './PatternCard'
import { getTranslations } from '../lib/i18n'
import { DS_META, DS_ORDER } from '../lib/types'

import type { Lang } from '../lib/i18n'
import type { DesignSystemId, Pattern } from '../lib/types'

export default function PatternGrid({ patterns, lang }: { patterns: Pattern[]; lang: Lang }) {
  const t = getTranslations(lang)
  const [activeDS, setActiveDS] = useState<DesignSystemId | null>(null)

  const filtered = useMemo(() => {
    return activeDS ? patterns.filter((p) => p.designSystems[activeDS] != null) : patterns
  }, [patterns, activeDS])

  return (
    <div>
      <div
        className='flex items-center gap-1.5 flex-wrap mb-5'
        role='group'
        aria-label={t.home.filterByDS}>
        <button
          type='button'
          onClick={() => setActiveDS(null)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
            activeDS === null
              ? 'bg-violet-600 text-white border-violet-600'
              : 'bg-surface text-soft border-outline hover:border-violet-400 hover:text-body'
          }`}>
          {t.home.allDS}
        </button>
        {DS_ORDER.map((id) => (
          <button
            key={id}
            type='button'
            onClick={() => setActiveDS(activeDS === id ? null : id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              activeDS === id ? 'text-white border-transparent' : 'bg-surface text-soft border-outline hover:border-violet-400 hover:text-body'
            }`}
            style={activeDS === id ? { backgroundColor: DS_META[id].color, borderColor: DS_META[id].color } : {}}>
            <span
              className='w-2 h-2 rounded-full shrink-0'
              style={{ backgroundColor: activeDS === id ? 'rgba(255,255,255,0.8)' : DS_META[id].color }}
            />
            {DS_META[id].name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className='py-20 text-center text-soft text-sm'>{t.home.noResults}</div>
      ) : (
        <>
          <p className='text-xs text-faint mb-3'>
            {filtered.length === patterns.length ? t.home.allPatterns : t.home.filteredCount(filtered.length)}
          </p>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3'>
            {filtered.map((pattern) => (
              <PatternCard
                key={pattern.slug}
                pattern={pattern}
                lang={lang}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
