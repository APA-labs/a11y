'use client'

import { useState, type ReactNode } from 'react'

import { getTranslations } from '../lib/i18n'

import type { Lang } from '../lib/i18n'

interface Props {
  lang: Lang
  analyzeForm: ReactNode
  generateForm: ReactNode
}

export default function AnalyzeTabs({ lang, analyzeForm, generateForm }: Props) {
  const [active, setActive] = useState<'analyze' | 'generate'>('analyze')
  const t = getTranslations(lang)

  return (
    <div>
      <div
        role='tablist'
        aria-label={t.analyze.title}
        className='flex gap-0 mb-6 border-b border-outline'>
        <button
          role='tab'
          aria-selected={active === 'analyze'}
          aria-controls='panel-analyze'
          id='tab-analyze'
          onClick={() => setActive('analyze')}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
            active === 'analyze' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-soft hover:text-body'
          }`}>
          {t.analyze.tabAnalyze}
        </button>
        <button
          role='tab'
          aria-selected={active === 'generate'}
          aria-controls='panel-generate'
          id='tab-generate'
          onClick={() => setActive('generate')}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
            active === 'generate' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-soft hover:text-body'
          }`}>
          {t.analyze.tabGenerate}
        </button>
      </div>

      <div
        role='tabpanel'
        id='panel-analyze'
        aria-labelledby='tab-analyze'
        hidden={active !== 'analyze'}>
        {analyzeForm}
      </div>
      <div
        role='tabpanel'
        id='panel-generate'
        aria-labelledby='tab-generate'
        hidden={active !== 'generate'}>
        {generateForm}
      </div>
    </div>
  )
}
