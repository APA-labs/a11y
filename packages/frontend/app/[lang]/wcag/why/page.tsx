export const dynamic = 'force-static'

import { getTranslations, SUPPORTED_LANGS } from '../../../../lib/i18n'
import { WcagInfoCard } from '../_components/WcagInfoCard'
import { WcagPageShell } from '../_components/WcagPageShell'
import { WcagSection } from '../_components/WcagSection'

import type { Lang } from '../../../../lib/i18n'

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }))
}

export default async function WhyPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params
  const t = getTranslations(lang)
  const w = t.why

  return (
    <WcagPageShell
      title={w.title}
      subtitle={w.subtitle}>
      <div className='space-y-10'>
        <WcagSection label={w.sectionLegal}>
          <div className='grid grid-cols-1 gap-3'>
            {w.legal.map((item) => (
              <WcagInfoCard key={item.id}>
                <div className='flex items-start gap-3'>
                  <span className='text-xs font-mono text-faint bg-inset px-2 py-1 rounded shrink-0 mt-0.5'>{item.id}</span>
                  <div>
                    <p className='font-semibold text-body text-sm mb-1'>{item.title}</p>
                    <p className='text-xs text-soft leading-relaxed'>{item.desc}</p>
                  </div>
                </div>
              </WcagInfoCard>
            ))}
          </div>
        </WcagSection>

        <WcagSection label={w.sectionUsers}>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {w.users.map((item) => (
              <WcagInfoCard key={item.id}>
                <p className='text-lg font-bold text-body mb-1'>{item.id}</p>
                <p className='font-semibold text-body text-sm mb-1'>{item.title}</p>
                <p className='text-xs text-soft leading-relaxed'>{item.desc}</p>
              </WcagInfoCard>
            ))}
          </div>
        </WcagSection>

        <WcagSection label={w.sectionBusiness}>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {w.business.map((item) => (
              <WcagInfoCard key={item.id}>
                <p className='text-xs font-mono text-faint mb-1'>{item.id}</p>
                <p className='font-semibold text-body text-sm mb-1'>{item.title}</p>
                <p className='text-xs text-soft leading-relaxed'>{item.desc}</p>
              </WcagInfoCard>
            ))}
          </div>
        </WcagSection>

        <WcagSection label={w.sectionQuality}>
          <div className='grid grid-cols-1 gap-3'>
            {w.quality.map((item) => (
              <WcagInfoCard key={item.id}>
                <div className='flex items-start gap-3'>
                  <span className='text-xs font-mono text-faint bg-inset px-2 py-1 rounded shrink-0 mt-0.5'>{item.id}</span>
                  <div>
                    <p className='font-semibold text-body text-sm mb-1'>{item.title}</p>
                    <p className='text-xs text-soft leading-relaxed'>{item.desc}</p>
                  </div>
                </div>
              </WcagInfoCard>
            ))}
          </div>
        </WcagSection>
      </div>
    </WcagPageShell>
  )
}
