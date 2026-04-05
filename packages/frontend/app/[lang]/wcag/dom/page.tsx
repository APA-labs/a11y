export const dynamic = 'force-static'

import { getTranslations, SUPPORTED_LANGS } from '../../../../lib/i18n'
import { WcagInfoCard } from '../_components/WcagInfoCard'
import { WcagPageShell } from '../_components/WcagPageShell'
import { WcagSection } from '../_components/WcagSection'

import type { Lang } from '../../../../lib/i18n'

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }))
}

function glossaryId(index: number) {
  return `glossary-${index}`
}

function LinkableText({ text, terms }: { text: string; terms: { term: string; id: string }[] }) {
  if (!terms.length) return <>{text}</>

  const escaped = terms.map((t) => t.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi')
  const parts = text.split(pattern)

  return (
    <>
      {parts.map((part, i) => {
        const match = terms.find((t) => t.term.toLowerCase() === part.toLowerCase())
        if (match) {
          return (
            <a
              key={i}
              href={`#${match.id}`}
              className='underline decoration-dotted underline-offset-2 hover:text-body transition-colors'>
              {part}
            </a>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

export default async function DomPage({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params
  const t = getTranslations(lang)
  const d = t.dom

  const glossaryTerms = d.glossary.map((item, i) => ({ term: item.term, id: glossaryId(i) }))

  const Desc = ({ text }: { text: string }) => (
    <p className='text-xs text-soft leading-relaxed'>
      <LinkableText
        text={text}
        terms={glossaryTerms}
      />
    </p>
  )

  return (
    <WcagPageShell
      title={d.title}
      subtitle={d.subtitle}>
      <div className='space-y-10'>
        <WcagSection label={d.sectionSemantic}>
          <div className='grid grid-cols-1 gap-3'>
            {d.semantic.map((item) => (
              <WcagInfoCard key={item.id}>
                <div className='flex items-start gap-3'>
                  <code className='text-xs font-mono text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 px-1.5 py-0.5 rounded shrink-0 mt-0.5'>
                    {item.id}
                  </code>
                  <div>
                    <p className='font-semibold text-body text-sm mb-1'>{item.title}</p>
                    <Desc text={item.desc} />
                  </div>
                </div>
              </WcagInfoCard>
            ))}
          </div>
        </WcagSection>

        <WcagSection label={d.sectionHeading}>
          <div className='grid grid-cols-1 gap-3'>
            {d.heading.map((item) => (
              <WcagInfoCard key={item.id}>
                <p className='font-semibold text-body text-sm mb-1'>{item.title}</p>
                <Desc text={item.desc} />
              </WcagInfoCard>
            ))}
          </div>
        </WcagSection>

        <WcagSection label={d.sectionNesting}>
          <div className='grid grid-cols-1 gap-3'>
            {d.nesting.map((item) => (
              <WcagInfoCard key={item.id}>
                <p className='font-semibold text-body text-sm mb-1'>{item.title}</p>
                <Desc text={item.desc} />
              </WcagInfoCard>
            ))}
          </div>
        </WcagSection>

        <WcagSection label={d.sectionDomSize}>
          <div className='grid grid-cols-1 gap-3'>
            {d.domSize.map((item) => (
              <WcagInfoCard key={item.id}>
                <div className='flex items-start gap-3'>
                  <span className='text-xs font-mono text-faint bg-inset px-2 py-1 rounded shrink-0 mt-0.5 whitespace-nowrap'>{item.id}</span>
                  <div>
                    <p className='font-semibold text-body text-sm mb-1'>{item.title}</p>
                    <Desc text={item.desc} />
                  </div>
                </div>
              </WcagInfoCard>
            ))}
          </div>
        </WcagSection>

        <WcagSection label={d.sectionFocus}>
          <div className='grid grid-cols-1 gap-3'>
            {d.focus.map((item) => (
              <WcagInfoCard key={item.id}>
                <p className='font-semibold text-body text-sm mb-1'>{item.title}</p>
                <Desc text={item.desc} />
              </WcagInfoCard>
            ))}
          </div>
        </WcagSection>

        <section>
          <h2 className='text-sm font-semibold text-soft uppercase tracking-wider mb-3'>{d.glossaryLabel}</h2>
          <div className='bg-inset rounded-xl border border-outline divide-y divide-outline'>
            {d.glossary.map((item, i) => (
              <div
                key={item.term}
                id={glossaryId(i)}
                className='px-5 py-4 scroll-mt-6'>
                <p className='text-sm font-semibold text-body mb-1'>{item.term}</p>
                <p className='text-xs text-soft leading-relaxed'>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </WcagPageShell>
  )
}
