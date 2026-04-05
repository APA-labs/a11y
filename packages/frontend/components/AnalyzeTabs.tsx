'use client'

import { useState, type ReactNode } from 'react'

interface Props {
  analyzeForm: ReactNode
  generateForm: ReactNode
}

export default function AnalyzeTabs({ analyzeForm, generateForm }: Props) {
  const [active, setActive] = useState<'analyze' | 'generate'>('analyze')

  return (
    <div>
      <div
        role='tablist'
        aria-label='AI 접근성 도구 탭'
        className='flex gap-0 mb-6 border-b border-slate-200'>
        <button
          role='tab'
          aria-selected={active === 'analyze'}
          aria-controls='panel-analyze'
          id='tab-analyze'
          onClick={() => setActive('analyze')}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
            active === 'analyze' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}>
          접근성 분석
        </button>
        <button
          role='tab'
          aria-selected={active === 'generate'}
          aria-controls='panel-generate'
          id='tab-generate'
          onClick={() => setActive('generate')}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
            active === 'generate' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}>
          컴포넌트 생성
        </button>
      </div>

      <div
        role='tabpanel'
        id='panel-analyze'
        aria-labelledby='tab-analyze'
        hidden={active !== 'analyze'}>
        {analyzeForm}
      </div>
      <div
        role='tabpanel'
        id='panel-generate'
        aria-labelledby='tab-generate'
        hidden={active !== 'generate'}>
        {generateForm}
      </div>
    </div>
  )
}
