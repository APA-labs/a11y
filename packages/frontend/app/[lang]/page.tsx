export const dynamic = 'force-static'

import DSLegendFloat from '../../components/DSLegendFloat'
import Hero from '../../components/home/Hero'
import StatsCounter from '../../components/home/StatsCounter'
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
  const aiEnabled = process.env.NEXT_PUBLIC_AI_ENABLED === 'true'

  const totalMust = patterns.reduce((sum, p) => sum + p.baseline.checklist.must.length, 0)
  const totalShould = patterns.reduce((sum, p) => sum + p.baseline.checklist.should.length, 0)
  const dsCount = DS_ORDER.filter((id) => patterns.some((p) => p.designSystems[id] != null)).length

  const stats = [
    { label: 'Patterns', value: patterns.length, tone: 'violet' as const },
    { label: 'Design Systems', value: dsCount, tone: 'body' as const },
    { label: 'Must Rules', value: totalMust, tone: 'red' as const },
    { label: 'Should Rules', value: totalShould, tone: 'amber' as const }
  ]

  return (
    <div className='relative'>
      <Hero
        lang={lang}
        subtitle={t.home.subtitle}
        aiEnabled={aiEnabled}
        aiLabel={t.home.aiAnalyze}
      />

      <div className='-mt-4 sm:-mt-6 pb-4'>
        <StatsCounter stats={stats} />
      </div>

      <div
        id='patterns'
        className='max-w-7xl mx-auto px-6 sm:px-10 pt-14 pb-16 sm:pt-16 sm:pb-20 scroll-mt-20'>
        <PatternGrid
          patterns={patterns}
          lang={lang}
        />
      </div>

      <DSLegendFloat />
    </div>
  )
}
