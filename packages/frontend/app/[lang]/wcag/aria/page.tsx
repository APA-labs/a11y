export const dynamic = 'force-static'

import { getTranslations, SUPPORTED_LANGS } from '../../../../lib/i18n'
import { WcagInfoCard } from '../_components/WcagInfoCard'
import { WcagPageShell } from '../_components/WcagPageShell'
import { WcagSection } from '../_components/WcagSection'

import type { Lang } from '../../../../lib/i18n'

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }))
}

export default async function AriaPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params
  const t = getTranslations(lang)
  const a = t.aria

  return (
    <WcagPageShell
      title={a.title}
      subtitle={a.subtitle}>
      <div className='space-y-10'>
        <WcagSection label={a.sectionPrinciples}>
          <div className='grid grid-cols-1 gap-3'>
            {a.principles.map((item) => (
              <WcagInfoCard key={item.id}>
                <div className='flex items-start gap-3'>
                  <span className='text-base font-bold text-faint shrink-0 w-5 text-center'>{item.id}</span>
                  <div>
                    <p className='font-semibold text-body text-sm mb-1'>{item.title}</p>
                    <p className='text-xs text-soft leading-relaxed'>{item.desc}</p>
                  </div>
                </div>
              </WcagInfoCard>
            ))}
          </div>
        </WcagSection>

        <WcagSection label={a.sectionRoles}>
          <div className='space-y-3'>
            <p className='text-xs text-faint uppercase tracking-wider font-semibold mb-2'>Landmark roles</p>
            <div className='grid grid-cols-2 gap-3 mb-6'>
              {a.landmarkRoles.map((item) => (
                <WcagInfoCard key={item.id}>
                  <code className='text-xs font-mono text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 px-1.5 py-0.5 rounded mb-1.5 inline-block'>
                    {item.title}
                  </code>
                  <p className='text-xs text-soft leading-relaxed'>{item.desc}</p>
                </WcagInfoCard>
              ))}
            </div>
            <p className='text-xs text-faint uppercase tracking-wider font-semibold mb-2'>Widget roles</p>
            <div className='grid grid-cols-2 gap-3'>
              {a.widgetRoles.map((item) => (
                <WcagInfoCard key={item.id}>
                  <code className='text-xs font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-1.5 py-0.5 rounded mb-1.5 inline-block'>
                    {item.title}
                  </code>
                  <p className='text-xs text-soft leading-relaxed'>{item.desc}</p>
                </WcagInfoCard>
              ))}
            </div>
          </div>
        </WcagSection>

        <WcagSection label={a.sectionStates}>
          <div className='space-y-3'>
            <p className='text-xs text-faint uppercase tracking-wider font-semibold mb-2'>States</p>
            <div className='grid grid-cols-2 gap-3 mb-6'>
              {a.states.map((item) => (
                <WcagInfoCard key={item.id}>
                  <code className='text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded mb-1.5 inline-block'>
                    {item.title}
                  </code>
                  <p className='text-xs text-soft leading-relaxed'>{item.desc}</p>
                </WcagInfoCard>
              ))}
            </div>
            <p className='text-xs text-faint uppercase tracking-wider font-semibold mb-2'>Relations</p>
            <div className='grid grid-cols-2 gap-3'>
              {a.relations.map((item) => (
                <WcagInfoCard key={item.id}>
                  <code className='text-xs font-mono text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-1.5 py-0.5 rounded mb-1.5 inline-block'>
                    {item.title}
                  </code>
                  <p className='text-xs text-soft leading-relaxed'>{item.desc}</p>
                </WcagInfoCard>
              ))}
            </div>
          </div>
        </WcagSection>

        <WcagSection label={a.sectionLive}>
          <div className='grid grid-cols-2 gap-3'>
            {a.live.map((item) => (
              <WcagInfoCard key={item.id}>
                <code className='text-xs font-mono text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 px-1.5 py-0.5 rounded mb-1.5 inline-block'>
                  {item.title}
                </code>
                <p className='text-xs text-soft leading-relaxed'>{item.desc}</p>
              </WcagInfoCard>
            ))}
          </div>
        </WcagSection>
      </div>
    </WcagPageShell>
  )
}
