'use client'

import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

import CodeBlock from './CodeBlock'

import type { Lang } from '@/lib/i18n'
import type { DesignSystemId, DesignSystemVariant, Pattern } from '@/lib/types'

import { getTranslations } from '@/lib/i18n'
import { renderWithCode } from '@/lib/inline-code'
import { DS_ORDER } from '@/lib/types'
import { getDsSwatchColor } from '@/lib/wcag/ds-swatch'

/** Design system tabs that show code only (no Sandpack preview). */
const DESIGN_SYSTEM_IDS_WITHOUT_PREVIEW: readonly DesignSystemId[] = ['baseui']

interface Props {
  designSystems: Pattern['designSystems']
  lang?: Lang
  slug?: string
}

export default function DesignSystemTabs({ designSystems, lang = 'ko', slug }: Props) {
  const t = getTranslations(lang)
  const availableIds = DS_ORDER.filter((id) => designSystems[id] != null)
  const [active, setActive] = useState<DesignSystemId>(availableIds[0] ?? 'material')

  if (availableIds.length === 0) return null

  const current = designSystems[active] as DesignSystemVariant

  return (
    <div>
      {/* Tabs */}
      <div className='flex gap-1 p-1 bg-inset rounded-lg mb-6 w-fit flex-wrap'>
        {availableIds.map((id) => {
          const ds = designSystems[id] as DesignSystemVariant
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`
                flex items-center gap-2 px-3.5 py-1.5 rounded-md text-sm font-medium transition-all
                ${isActive ? 'bg-surface shadow-sm text-body' : 'text-soft hover:text-navy dark:hover:text-white'}
              `}>
              <span
                className='w-2 h-2 rounded-full shrink-0'
                style={{ backgroundColor: getDsSwatchColor(id) }}
              />
              {ds.name}
            </button>
          )
        })}
      </div>

      <div className='space-y-6'>
        {current.additionalChecks.length > 0 && (
          <div>
            <h4
              className='text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2'
              style={{ color: current.color }}>
              <span
                className='w-2 h-2 rounded-full'
                style={{ backgroundColor: current.color }}
              />
              {t.pattern.additionalChecks}
            </h4>
            <ul className='space-y-2'>
              {current.additionalChecks.map((item) => {
                const isMust = item.level === 'must'
                return (
                  <li
                    key={item.id}
                    className={`flex gap-3 p-3 rounded-lg border text-sm ${isMust ? 'bg-red-50 border-red-100 dark:bg-red-950/30 dark:border-red-900/50' : 'bg-amber-50 border-amber-100 dark:bg-amber-950/30 dark:border-amber-900/50'}`}>
                    {isMust ? (
                      <AlertCircle
                        size={14}
                        className='shrink-0 mt-0.5 text-red-500 dark:text-red-400'
                      />
                    ) : (
                      <CheckCircle2
                        size={14}
                        className='shrink-0 mt-0.5 text-amber-500 dark:text-amber-400'
                      />
                    )}
                    <div>
                      <p className='font-medium text-body text-[13px]'>{item.title}</p>
                      <p className='text-xs text-soft mt-0.5 leading-relaxed'>{renderWithCode(item.description)}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        <div>
          <h4
            className='text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2'
            style={{ color: current.color }}>
            <span
              className='w-2 h-2 rounded-full'
              style={{ backgroundColor: current.color }}
            />
            {t.pattern.codeSample}
          </h4>
          <CodeBlock
            sample={current.codeSample}
            lang={lang}
            disablePreview={DESIGN_SYSTEM_IDS_WITHOUT_PREVIEW.includes(active)}
            slug={slug}
          />
        </div>

        {current.notes.length > 0 && (
          <div>
            <h4
              className='text-xs font-semibold uppercase tracking-wider mb-3'
              style={{ color: current.color }}>
              {t.pattern.implNotes}
            </h4>
            <ul className='space-y-1.5'>
              {current.notes.map((note, i) => (
                <li
                  key={i}
                  className='flex gap-2 text-sm text-soft'>
                  <span className='text-faint shrink-0 mt-0.5'>–</span>
                  {renderWithCode(note)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
