import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import type { Pattern } from '../lib/types'

const TAG_COLORS: Record<string, string> = {
  interactive: 'bg-sand-50 text-sand-700',
  form: 'bg-mauve-100 text-mauve-700',
  overlay: 'bg-mist-100 text-mist-700',
  'focus-management': 'bg-navy-100 text-navy-700',
  state: 'bg-mauve-50 text-mauve-600',
  action: 'bg-sand-100 text-sand-600',
  input: 'bg-mist-50 text-mist-700'
}

const DS_COLORS = ['#1976d2', '#6e56cf', '#1677ff']

export default function PatternCard({ pattern }: { pattern: Pattern }) {
  const mustCount = pattern.baseline.checklist.must.length
  const shouldCount = pattern.baseline.checklist.should.length

  return (
    <Link
      href={`/patterns/${pattern.slug}`}
      className='group block bg-white rounded-xl border border-mist-200 hover:border-sand-300 hover:shadow-sm transition-all p-5'>
      <div className='flex items-start justify-between mb-3'>
        <div className='flex-1 min-w-0 pr-3'>
          <h2 className='font-semibold text-navy text-[15px] group-hover:text-sand transition-colors'>{pattern.name}</h2>
          <p className='text-sm text-mist-700 mt-1 line-clamp-2 leading-relaxed'>{pattern.description}</p>
        </div>
        <ArrowRight
          size={15}
          className='shrink-0 mt-0.5 text-mist-300 group-hover:text-sand group-hover:translate-x-0.5 transition-all'
        />
      </div>

      <div className='flex flex-wrap gap-1.5 mb-4'>
        {pattern.tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${TAG_COLORS[tag] ?? 'bg-pearl-200 text-mist-700'}`}>
            {tag}
          </span>
        ))}
      </div>

      <div className='flex items-center gap-4 text-xs text-mist-600 mb-4'>
        <span>
          <span className='font-semibold text-red-500'>{mustCount}</span> must
        </span>
        <span>
          <span className='font-semibold text-amber-500'>{shouldCount}</span> should
        </span>
        <span className='text-mist-400'>WCAG 2.1 AA</span>
      </div>

      <div className='flex items-center gap-1.5 pt-3 border-t border-mist-100'>
        <span className='text-xs text-mist-400 mr-1'>커버</span>
        {DS_COLORS.map((color, i) => (
          <span
            key={i}
            className='w-2.5 h-2.5 rounded-full'
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </Link>
  )
}
