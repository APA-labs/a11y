import { ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import ChecklistSection from '../../../components/ChecklistSection'
import CodeBlock from '../../../components/CodeBlock'
import DesignSystemTabs from '../../../components/DesignSystemTabs'
import { getPattern, patterns } from '../../../lib/patterns'

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
    <div className='max-w-4xl mx-auto px-8 py-10'>
      {/* Back */}
      <Link
        href='/'
        className='inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6'>
        <ArrowLeft size={14} />
        모든 패턴
      </Link>

      {/* Title */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-slate-900 mb-1'>{pattern.name}</h1>
        <p className='text-slate-500 text-sm'>{pattern.description}</p>

        {/* WCAG chips */}
        <div className='flex flex-wrap gap-2 mt-3'>
          {pattern.wcagCriteria.map((criterion) => (
            <span
              key={criterion}
              className='text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-mono'>
              {criterion}
            </span>
          ))}
        </div>
      </div>

      <div className='space-y-10'>
        {/* ── SECTION 1: 공통 베이스라인 ── */}
        <section>
          <div className='flex items-center gap-3 mb-5'>
            <div className='flex items-center gap-2'>
              <span className='w-3 h-3 rounded-full bg-slate-800' />
              <h2 className='font-semibold text-slate-900 text-base'>공통 베이스라인</h2>
            </div>
            <span className='text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-500'>모든 디자인 시스템에 적용</span>
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='min-w-0'>
              <ChecklistSection
                must={pattern.baseline.checklist.must}
                should={pattern.baseline.checklist.should}
                avoid={pattern.baseline.checklist.avoid}
              />
            </div>
            <div className='min-w-0'>
              <h3 className='text-sm font-semibold text-slate-700 mb-3'>기본 코드 예시</h3>
              <CodeBlock sample={pattern.baseline.codeSample} />
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className='flex items-center gap-3'>
          <div className='flex-1 h-px bg-slate-200' />
          <span className='text-xs text-slate-400 font-medium uppercase tracking-wider'>디자인 시스템별 구현</span>
          <div className='flex-1 h-px bg-slate-200' />
        </div>

        {/* ── SECTION 2: 디자인 시스템 탭 ── */}
        <section>
          <DesignSystemTabs designSystems={pattern.designSystems} />
        </section>

        {/* References */}
        <section className='pt-6 border-t border-slate-200'>
          <h2 className='text-sm font-semibold text-slate-700 mb-3'>참고 문서</h2>
          <ul className='space-y-1.5'>
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
                  className='inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 transition-colors'>
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
