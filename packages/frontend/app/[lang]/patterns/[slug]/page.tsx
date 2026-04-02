import { ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import ChecklistSection from '../../../../components/ChecklistSection'
import CodeBlock from '../../../../components/CodeBlock'
import DesignSystemTabs from '../../../../components/DesignSystemTabs'
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

  return (
    <div className='max-w-4xl mx-auto px-6 sm:px-10 py-10 sm:py-14'>
      <Link
        href={`/${lang}`}
        className='inline-flex items-center gap-1.5 text-sm text-soft hover:text-navy transition-colors mb-8'>
        <ArrowLeft size={14} />
        {t.pattern.backToAll}
      </Link>

      <div className='mb-10'>
        <h1 className='text-2xl font-bold text-body mb-1.5'>{pattern.name}</h1>
        <p className='text-soft text-sm'>{pattern.description}</p>

        <div className='mt-4'>
          <p className='text-[11px] text-faint mb-2'>{t.pattern.wcagHint}</p>
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
      </div>

      <div className='space-y-12'>
        <div>
          <h3 className='text-xs font-semibold text-soft uppercase tracking-wider mb-3'>{t.pattern.codeExample}</h3>
          <CodeBlock
            sample={pattern.baseline.codeSample}
            lang={lang}
            slug={slug}
          />
        </div>

        <section>
          <div className='flex items-center gap-3 mb-6'>
            <span className='w-2.5 h-2.5 rounded-full bg-body' />
            <h2 className='font-semibold text-body text-base'>{t.pattern.baseline}</h2>
            <span className='text-xs px-2 py-0.5 rounded bg-inset text-soft'>{t.pattern.appliesTo}</span>
          </div>

          <ChecklistSection
            must={pattern.baseline.checklist.must}
            should={pattern.baseline.checklist.should}
            avoid={pattern.baseline.checklist.avoid}
          />
        </section>

        <div className='flex items-center gap-4'>
          <div className='flex-1 h-px bg-outline' />
          <span className='text-xs text-faint font-medium uppercase tracking-wider'>{t.pattern.dsSectionDivider}</span>
          <div className='flex-1 h-px bg-outline' />
        </div>

        <section>
          <DesignSystemTabs
            designSystems={pattern.designSystems}
            lang={lang}
            slug={slug}
          />
        </section>

        <section className='pt-6 border-t border-outline'>
          <h2 className='text-xs font-semibold text-soft uppercase tracking-wider mb-4'>{t.pattern.references}</h2>
          <ul className='space-y-2'>
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
      </div>
    </div>
  )
}
