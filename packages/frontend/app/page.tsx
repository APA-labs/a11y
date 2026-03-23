import { BookOpen, Sparkles } from 'lucide-react'
import Link from 'next/link'

import PatternCard from '../components/PatternCard'
import { patterns } from '../lib/patterns'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Accessibility Pattern Hub</h1>
        <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
          WCAG 2.1 AA 기준의 공통 베이스라인과 Material Design, Radix UI, Ant Design의 구현 방식을 한눈에 비교하세요.
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-6 mb-8 p-4 bg-white rounded-xl border border-slate-200">
        <div className="text-center">
          <p className="text-2xl font-bold text-indigo-600">{patterns.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Patterns</p>
        </div>
        <div className="w-px h-8 bg-slate-200" />
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-700">3</p>
          <p className="text-xs text-slate-500 mt-0.5">Design Systems</p>
        </div>
        <div className="w-px h-8 bg-slate-200" />
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-700">
            {patterns.reduce((sum, p) => sum + p.baseline.checklist.must.length, 0)}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Must Rules</p>
        </div>
        <div className="ml-auto">
          <Link
            href="/analyze"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Sparkles size={14} />
            AI 분석
          </Link>
        </div>
      </div>

      {/* Pattern grid */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={15} className="text-slate-400" />
          <h2 className="text-sm font-semibold text-slate-600">모든 패턴</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {patterns.map((pattern) => (
            <PatternCard key={pattern.slug} pattern={pattern} />
          ))}
        </div>
      </div>
    </div>
  )
}
