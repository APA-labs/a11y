import { ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import ChecklistSection from '../../../components/ChecklistSection'
import CodeBlock from '../../../components/CodeBlock'
import DesignSystemTabs from '../../../components/DesignSystemTabs'
import WcagBadge from '../../../components/WcagBadge'
import { getPattern, patterns } from '../../../lib/patterns'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return patterns.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pattern = getPattern(slug)
  if (!pattern) return {}
  return { title: `${pattern.name} — A11y Patterns` }
}

export default async function PatternPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pattern = getPattern(slug)
  if (!pattern) notFound()

  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-10'>
      <Link
        href='/'
        className='inline-flex items-center gap-1.5 text-sm text-mist-600 hover:text-navy transition-colors mb-8'>
        <ArrowLeft size={14} />
        모든 패턴
      </Link>

      <div className='mb-10'>
        <h1 className='text-2xl font-bold text-navy mb-1.5'>{pattern.name}</h1>
        <p className='text-mist-700 text-sm'>{pattern.description}</p>

        <div className='mt-4'>
          <p className='text-[11px] text-mist-500 mb-2'>관련 WCAG 기준 — 클릭하여 상세 보기</p>
          <div className='flex flex-wrap gap-2'>
            {pattern.wcagCriteria.map((criterion) => (
              <WcagBadge
                key={criterion}
                criterion={criterion}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='space-y-12'>
        {/* ── 기본 코드 예시 (최상단) ── */}
        <div>
          <h3 className='text-xs font-semibold text-mist-700 uppercase tracking-wider mb-3'>기본 코드 예시</h3>
          <CodeBlock sample={pattern.baseline.codeSample} />
        </div>

        {/* ── SECTION 1: 공통 베이스라인 ── */}
        <section>
          <div className='flex items-center gap-3 mb-6'>
            <span className='w-2.5 h-2.5 rounded-full bg-navy' />
            <h2 className='font-semibold text-navy text-base'>공통 베이스라인</h2>
            <span className='text-xs px-2 py-0.5 rounded bg-pearl-200 text-mist-700'>모든 디자인 시스템에 적용</span>
          </div>

          <ChecklistSection
            must={pattern.baseline.checklist.must}
            should={pattern.baseline.checklist.should}
            avoid={pattern.baseline.checklist.avoid}
          />
        </section>

        <div className='flex items-center gap-4'>
          <div className='flex-1 h-px bg-mist-200' />
          <span className='text-xs text-mist-500 font-medium uppercase tracking-wider'>디자인 시스템별 구현</span>
          <div className='flex-1 h-px bg-mist-200' />
        </div>

        {/* ── SECTION 2: 디자인 시스템 탭 ── */}
        <section>
          <DesignSystemTabs designSystems={pattern.designSystems} />
        </section>

        {/* References */}
        <section className='pt-6 border-t border-mist-200'>
          <h2 className='text-xs font-semibold text-mist-700 uppercase tracking-wider mb-4'>참고 문서</h2>
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
                  className='inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 transition-colors'>
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
