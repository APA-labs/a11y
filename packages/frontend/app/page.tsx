import { Sparkles } from 'lucide-react'
import Link from 'next/link'

import PatternCard from '../components/PatternCard'
import { patterns } from '../lib/patterns'

export default function Home() {
  const totalMust = patterns.reduce((sum, p) => sum + p.baseline.checklist.must.length, 0)

  return (
    <div className='max-w-4xl mx-auto px-8 py-12'>
      <div className='mb-10'>
        <h1 className='text-3xl font-bold text-navy mb-3'>Accessibility Pattern Hub</h1>
        <p className='text-mist-700 text-sm leading-relaxed max-w-xl'>
          WCAG 2.1 AA 기준의 공통 베이스라인과 Material Design, Radix UI, Ant Design의 구현 방식을 한눈에 비교하세요.
        </p>
      </div>

      <div className='flex items-center gap-10 mb-10 pb-10 border-b border-mist-200'>
        <div>
          <p className='text-3xl font-bold text-violet-600'>{patterns.length}</p>
          <p className='text-xs text-mist-700 mt-1 uppercase tracking-wider'>Patterns</p>
        </div>
        <div>
          <p className='text-3xl font-bold text-navy'>{3}</p>
          <p className='text-xs text-mist-700 mt-1 uppercase tracking-wider'>Design Systems</p>
        </div>
        <div>
          <p className='text-3xl font-bold text-navy'>{totalMust}</p>
          <p className='text-xs text-mist-700 mt-1 uppercase tracking-wider'>Must Rules</p>
        </div>
        {process.env.ANTHROPIC_API_KEY && (
          <div className='ml-auto'>
            <Link
              href='/analyze'
              className='flex items-center gap-2 px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors'>
              <Sparkles size={14} />
              AI 분석
            </Link>
          </div>
        )}
      </div>

      <div>
        <h2 className='text-xs font-semibold text-mist-700 uppercase tracking-wider mb-5'>모든 패턴</h2>
        <div className='grid grid-cols-2 gap-4'>
          {patterns.map((pattern) => (
            <PatternCard
              key={pattern.slug}
              pattern={pattern}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
