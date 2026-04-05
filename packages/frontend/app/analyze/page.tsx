import { Sparkles } from 'lucide-react'

import AnalyzeForm from '../../components/AnalyzeForm'
import AnalyzeTabs from '../../components/AnalyzeTabs'
import GenerateForm from '../../components/GenerateForm'

export const metadata = {
  title: 'AI 분석 — A11y Patterns'
}

export default function AnalyzePage() {
  return (
    <div className='max-w-4xl mx-auto px-8 py-10'>
      <div className='mb-8'>
        <div className='flex items-center gap-2 mb-2'>
          <Sparkles
            size={18}
            className='text-indigo-500'
          />
          <h1 className='text-2xl font-bold text-slate-900'>AI 접근성 도구</h1>
        </div>
        <p className='text-slate-500 text-sm leading-relaxed max-w-xl'>
          Claude가 WCAG 2.1 AA 기준에 따라 접근성 체크리스트를 생성하거나, 접근성이 반영된 React 컴포넌트를 직접 만들어줍니다.
        </p>
      </div>

      <AnalyzeTabs
        analyzeForm={<AnalyzeForm />}
        generateForm={<GenerateForm />}
      />
    </div>
  )
}
