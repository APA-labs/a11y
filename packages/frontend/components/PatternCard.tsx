import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import type { Pattern } from '../lib/types'

const LEVEL_COLORS: Record<string, string> = {
  interactive: 'bg-blue-50 text-blue-700',
  form: 'bg-violet-50 text-violet-700',
  overlay: 'bg-amber-50 text-amber-700',
  'focus-management': 'bg-emerald-50 text-emerald-700',
  state: 'bg-rose-50 text-rose-700',
  action: 'bg-indigo-50 text-indigo-700',
  input: 'bg-teal-50 text-teal-700'
}

const DS_COLORS = ['#1976d2', '#6e56cf', '#1677ff']

export default function PatternCard({ pattern }: { pattern: Pattern }) {
  const mustCount = pattern.baseline.checklist.must.length
  const shouldCount = pattern.baseline.checklist.should.length

  return (
    <Link
      href={`/patterns/${pattern.slug}`}
      className='group block bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all p-5'>
      {/* Header */}
      <div className='flex items-start justify-between mb-3'>
        <div>
          <h2 className='font-semibold text-slate-900 text-base group-hover:text-indigo-600 transition-colors'>{pattern.name}</h2>
          <p className='text-sm text-slate-500 mt-0.5 line-clamp-2'>{pattern.description}</p>
        </div>
        <ArrowRight
          size={16}
          className='shrink-0 mt-0.5 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all'
        />
      </div>

      {/* Tags */}
      <div className='flex flex-wrap gap-1.5 mb-4'>
        {pattern.tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[tag] ?? 'bg-slate-100 text-slate-600'}`}>
            {tag}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className='flex items-center gap-4 text-xs text-slate-500 mb-4'>
        <span>
          <span className='font-semibold text-red-600'>{mustCount}</span> must
        </span>
        <span>
          <span className='font-semibold text-amber-600'>{shouldCount}</span> should
        </span>
        <span className='text-slate-400'>WCAG 2.1 AA</span>
      </div>

      {/* Design system dots */}
      <div className='flex items-center gap-1.5 pt-3 border-t border-slate-100'>
        <span className='text-xs text-slate-400 mr-1'>커버</span>
        {DS_COLORS.map((color, i) => (
          <span
            key={i}
            className='w-3 h-3 rounded-full'
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </Link>
  )
}
