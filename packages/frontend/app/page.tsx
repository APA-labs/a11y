export const dynamic = 'force-static'

import { Sparkles } from 'lucide-react'
import Link from 'next/link'

import DSLegendFloat from '../components/DSLegendFloat'
import PatternCard from '../components/PatternCard'
import { patterns } from '../lib/patterns'
import { DS_META, DS_ORDER } from '../lib/types'

export default function Home() {
  const totalMust = patterns.reduce((sum, p) => sum + p.baseline.checklist.must.length, 0)
  const totalShould = patterns.reduce((sum, p) => sum + p.baseline.checklist.should.length, 0)
  const dsCount = DS_ORDER.filter((id) => patterns.some((p) => p.designSystems[id] != null)).length

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12'>
      <div className='mb-8 sm:mb-10'>
        <h1 className='text-2xl sm:text-3xl font-bold text-navy mb-3'>Accessibility Pattern Hub</h1>
        <p className='text-mist-700 text-sm leading-relaxed'>
          WCAG 2.1 AA 기준의 공통 베이스라인과 다양한 디자인 시스템들의 구현 방식을 한눈에 비교하세요.
        </p>
      </div>

      <div className='flex items-center gap-6 sm:gap-10 mb-8 sm:mb-10 pb-8 sm:pb-10 border-b border-mist-200 flex-wrap'>
        <div>
          <p className='text-3xl font-bold text-violet-600'>{patterns.length}</p>
          <p className='text-xs text-mist-700 mt-1 uppercase tracking-wider'>Patterns</p>
        </div>
        <div>
          <p className='text-3xl font-bold text-navy'>{dsCount}</p>
          <p className='text-xs text-mist-700 mt-1 uppercase tracking-wider'>Design Systems</p>
        </div>
        <div>
          <p className='text-3xl font-bold text-red-500'>{totalMust}</p>
          <p className='text-xs text-mist-700 mt-1 uppercase tracking-wider'>Must Rules</p>
        </div>
        <div>
          <p className='text-3xl font-bold text-amber-500'>{totalShould}</p>
          <p className='text-xs text-mist-700 mt-1 uppercase tracking-wider'>Should Rules</p>
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
        {/* 모바일 전용 DS 안내 (데스크톱은 우하단 플로팅 레전드 사용) */}
        <div className='lg:hidden mb-5 p-3 bg-white border border-mist-200 rounded-xl'>
          <p className='text-[10px] font-semibold uppercase tracking-wider text-mist-500 mb-2'>지원하는 디자인시스템</p>
          <div className='flex flex-wrap gap-x-4 gap-y-1.5'>
            {DS_ORDER.map((id) => (
              <div
                key={id}
                className='flex items-center gap-1.5'>
                <span
                  className='w-2 h-2 rounded-full shrink-0'
                  style={{ backgroundColor: DS_META[id].color }}
                />
                <span className='text-xs text-navy-700'>{DS_META[id].name}</span>
              </div>
            ))}
          </div>
        </div>

        <h2 className='text-xs font-semibold text-mist-700 uppercase tracking-wider mb-5'>모든 패턴</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3'>
          {patterns.map((pattern) => (
            <PatternCard
              key={pattern.slug}
              pattern={pattern}
            />
          ))}
        </div>
      </div>
      <DSLegendFloat />
    </div>
  )
}
