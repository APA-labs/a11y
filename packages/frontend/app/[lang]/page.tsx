export const dynamic = 'force-static'

import type { Lang } from '@/lib/i18n'

import Aurora from '@/components/home/Aurora'
import Hero from '@/components/home/Hero'
import StatsCounter from '@/components/home/StatsCounter'
import WcagIntro from '@/components/home/WcagIntro'
import DSLegendFloat from '@/components/layout/DSLegendFloat'
import PatternGrid from '@/components/pattern/PatternGrid'
import { getTranslations, SUPPORTED_LANGS } from '@/lib/i18n'
import { getPatterns } from '@/lib/patterns'
import { DS_ORDER } from '@/lib/types'

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

  const stats = [
    { label: 'Patterns', value: patterns.length, tone: 'violet' as const },
    { label: 'Design Systems', value: dsCount, tone: 'body' as const },
    { label: 'Must Rules', value: totalMust, tone: 'red' as const },
    { label: 'Should Rules', value: totalShould, tone: 'amber' as const }
  ]

  return (
    <div className='relative isolate'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-x-0 top-0 h-[900px] overflow-hidden -z-10'
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)'
        }}>
        <Aurora />
      </div>

      <Hero subtitle={t.home.subtitle} />

      <div className='relative mt-10 sm:mt-16'>
        <StatsCounter stats={stats} />
      </div>

      <div className='mt-24 sm:mt-36'>
        <WcagIntro
          lang={lang}
          content={t.home.wcagIntro}
        />
      </div>

      <div
        id='patterns'
        className='max-w-7xl mx-auto px-6 sm:px-10 mt-20 sm:mt-28 pb-24 sm:pb-32 scroll-mt-20'>
        <PatternGrid
          patterns={patterns}
          lang={lang}
        />
      </div>

      <DSLegendFloat />
    </div>
  )
}
