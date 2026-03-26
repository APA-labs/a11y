export const dynamic = 'force-static'

import { Sparkles } from 'lucide-react'
import Link from 'next/link'

import DSLegendFloat from '../../components/DSLegendFloat'
import PatternGrid from '../../components/PatternGrid'
import { getTranslations, SUPPORTED_LANGS } from '../../lib/i18n'
import { getPatterns } from '../../lib/patterns'
import { DS_ORDER } from '../../lib/types'

import type { Lang } from '../../lib/i18n'

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }))
}

export default async function Home({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params
  const t = getTranslations(lang)
  const patterns = getPatterns(lang)

  const totalMust = patterns.reduce((sum, p) => sum + p.baseline.checklist.must.length, 0)
  const totalShould = patterns.reduce((sum, p) => sum + p.baseline.checklist.should.length, 0)
  const dsCount = DS_ORDER.filter((id) => patterns.some((p) => p.designSystems[id] != null)).length

  return (
    <div className='max-w-7xl mx-auto px-6 sm:px-10 py-10 sm:py-14'>
      <div className='mb-8 sm:mb-10'>
        <h1 className='text-2xl sm:text-3xl font-bold text-body mb-3'>Accessibility Pattern Hub</h1>
        <p className='text-soft text-sm leading-relaxed'>{t.home.subtitle}</p>
      </div>

      <div className='flex items-center gap-6 sm:gap-10 mb-8 sm:mb-10 pb-8 sm:pb-10 border-b border-outline flex-wrap'>
        <div>
          <p className='text-3xl font-bold text-violet-600'>{patterns.length}</p>
          <p className='text-xs text-soft mt-1 uppercase tracking-wider'>Patterns</p>
        </div>
        <div>
          <p className='text-3xl font-bold text-body'>{dsCount}</p>
          <p className='text-xs text-soft mt-1 uppercase tracking-wider'>Design Systems</p>
        </div>
        <div>
          <p className='text-3xl font-bold text-red-500 dark:text-red-400'>{totalMust}</p>
          <p className='text-xs text-soft mt-1 uppercase tracking-wider'>Must Rules</p>
        </div>
        <div>
          <p className='text-3xl font-bold text-amber-500 dark:text-amber-400'>{totalShould}</p>
          <p className='text-xs text-soft mt-1 uppercase tracking-wider'>Should Rules</p>
        </div>
        {process.env.ANTHROPIC_API_KEY && (
          <div className='ml-auto'>
            <Link
              href={`/${lang}/analyze`}
              className='flex items-center gap-2 px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors'>
              <Sparkles size={14} />
              {t.home.aiAnalyze}
            </Link>
          </div>
        )}
      </div>

      <PatternGrid
        patterns={patterns}
        lang={lang}
      />
      <DSLegendFloat />
    </div>
  )
}
