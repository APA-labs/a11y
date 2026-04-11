import { ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import ChecklistSection from '../../../../components/ChecklistSection'
import CodeBlock from '../../../../components/CodeBlock'
import DesignSystemTabs from '../../../../components/DesignSystemTabs'
import FloatingToc from '../../../../components/pattern/FloatingToc'
import ScrollProgress from '../../../../components/pattern/ScrollProgress'
import SectionHeader from '../../../../components/pattern/SectionHeader'
import WcagBadge from '../../../../components/WcagBadge'
import { getTranslations, SUPPORTED_LANGS } from '../../../../lib/i18n'
import { getPattern, getPatterns } from '../../../../lib/patterns'

import type { Lang } from '../../../../lib/i18n'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return getPatterns('ko').flatMap((p) => SUPPORTED_LANGS.map((lang) => ({ lang, slug: p.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Lang; slug: string }> }) {
  const { lang, slug } = await params
  const pattern = getPattern(slug, lang)
  if (!pattern) return {}
  return { title: `${pattern.name} — A11y Patterns` }
}

export default async function PatternPage({ params }: { params: Promise<{ lang: Lang; slug: string }> }) {
  const { lang, slug } = await params
  const pattern = getPattern(slug, lang)
  if (!pattern) notFound()

  const t = getTranslations(lang)

  const tocItems = [
    { id: 'overview', label: t.pattern.codeExample },
    { id: 'baseline', label: t.pattern.baseline },
    { id: 'design-systems', label: t.pattern.dsSectionDivider },
    { id: 'references', label: t.pattern.references }
  ]

  return (
    <div className='relative'>
      <ScrollProgress />

      <div className='max-w-[1200px] mx-auto px-6 sm:px-10 py-10 sm:py-14'>
        <Link
          href={`/${lang}`}
          className='inline-flex items-center gap-1.5 text-sm text-soft hover:text-body transition-colors mb-10 group'>
          <ArrowLeft
            size={14}
            className='transition-transform group-hover:-translate-x-0.5'
          />
          {t.pattern.backToAll}
        </Link>

        <header className='mb-12 max-w-3xl'>
          <div className='inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-soft mb-4'>
            <span className='inline-block h-1.5 w-1.5 rounded-full bg-violet-500' />
            Pattern
          </div>
          <h1 className='text-[clamp(1.75rem,5vw,2.5rem)] font-semibold tracking-tight leading-tight text-body'>{pattern.name}</h1>
          <p className='mt-4 text-base text-soft leading-relaxed'>{pattern.description}</p>

          <div className='mt-7'>
            <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-faint mb-2.5'>{t.pattern.wcagHint}</p>
            <div className='flex flex-wrap gap-2'>
              {pattern.wcagCriteria.map((criterion) => (
                <WcagBadge
                  key={criterion}
                  criterion={criterion}
                  lang={lang}
                />
              ))}
            </div>
          </div>
        </header>

        <div className='grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_200px] gap-10'>
          <article className='min-w-0 space-y-20'>
            <section
              id='overview'
              className='scroll-mt-24'>
              <SectionHeader
                eyebrow='01 — Code'
                title={t.pattern.codeExample}
              />
              <CodeBlock
                sample={pattern.baseline.codeSample}
                lang={lang}
                slug={slug}
              />
            </section>

            <section
              id='baseline'
              className='scroll-mt-24'>
              <SectionHeader
                eyebrow='02 — Rules'
                title={t.pattern.baseline}>
                {t.pattern.appliesTo}
              </SectionHeader>
              <ChecklistSection
                must={pattern.baseline.checklist.must}
                should={pattern.baseline.checklist.should}
                avoid={pattern.baseline.checklist.avoid}
              />
            </section>

            <section
              id='design-systems'
              className='scroll-mt-24'>
              <SectionHeader
                eyebrow='03 — Implementations'
                title={t.pattern.dsSectionDivider}
              />
              <DesignSystemTabs
                designSystems={pattern.designSystems}
                lang={lang}
                slug={slug}
              />
            </section>

            <section
              id='references'
              className='scroll-mt-24 pt-8 border-t border-outline'>
              <SectionHeader
                eyebrow='04 — References'
                title={t.pattern.references}
              />
              <ul className='space-y-2.5'>
                {[
                  { label: `WAI-ARIA APG — ${pattern.name}`, href: 'https://www.w3.org/WAI/ARIA/apg/patterns/' },
                  { label: 'WCAG 2.1 Guidelines', href: 'https://www.w3.org/TR/WCAG21/' },
                  { label: 'Inclusive Components', href: 'https://inclusive-components.design/' }
                ].map((ref) => (
                  <li key={ref.href}>
                    <a
                      href={ref.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 transition-colors dark:text-violet-400 dark:hover:text-violet-300'>
                      {ref.label}
                      <ExternalLink size={12} />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </article>

          <aside className='hidden lg:block'>
            <FloatingToc items={tocItems} />
          </aside>
        </div>
      </div>
    </div>
  )
}
