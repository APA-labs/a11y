import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import type { Pattern } from '../lib/types'

const TAG_COLORS: Record<string, string> = {
  interactive: 'bg-violet-50 text-violet-700',
  form: 'bg-mauve-100 text-mauve-700',
  overlay: 'bg-mist-100 text-mist-700',
  'focus-management': 'bg-navy-100 text-navy-700',
  state: 'bg-mauve-50 text-mauve-600',
  action: 'bg-violet-100 text-violet-600',
  input: 'bg-mist-50 text-mist-700'
}

const DS_COLORS = ['#1976d2', '#6e56cf', '#1677ff']

export default function PatternCard({ pattern }: { pattern: Pattern }) {
  const mustCount = pattern.baseline.checklist.must.length
  const shouldCount = pattern.baseline.checklist.should.length
  const previewSrc = `/previews/${pattern.slug}.png`

  return (
    <Link
      href={`/patterns/${pattern.slug}`}
      className='group block bg-white rounded-xl border border-mist-200 hover:border-violet-300 hover:shadow-sm transition-all overflow-hidden'>
      {/* 썸네일 */}
      <div
        className='relative w-full bg-pearl-100 border-b border-mist-100 overflow-hidden'
        style={{ height: 160 }}>
        <Image
          src={previewSrc}
          alt={`${pattern.name} 미리보기`}
          fill
          className='object-cover object-top'
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
          unoptimized
        />
        {/* 이미지 없을 때 fallback */}
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <span className='text-xs text-mist-400 font-mono'>{pattern.name}</span>
        </div>
      </div>

      {/* 카드 본문 */}
      <div className='p-4'>
        <div className='flex items-start justify-between mb-2'>
          <div className='flex-1 min-w-0 pr-2'>
            <h2 className='font-semibold text-navy text-[15px] group-hover:text-violet-600 transition-colors'>{pattern.name}</h2>
            <p className='text-xs text-mist-700 mt-0.5 line-clamp-2 leading-relaxed'>{pattern.description}</p>
          </div>
          <ArrowRight
            size={14}
            className='shrink-0 mt-0.5 text-mist-300 group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all'
          />
        </div>

        <div className='flex flex-wrap gap-1 mb-3'>
          {pattern.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${TAG_COLORS[tag] ?? 'bg-pearl-200 text-mist-700'}`}>
              {tag}
            </span>
          ))}
        </div>

        <div className='flex items-center justify-between pt-2.5 border-t border-mist-100'>
          <div className='flex items-center gap-3 text-xs text-mist-600'>
            <span>
              <span className='font-semibold text-red-500'>{mustCount}</span> must
            </span>
            <span>
              <span className='font-semibold text-amber-500'>{shouldCount}</span> should
            </span>
          </div>
          <div className='flex items-center gap-1'>
            {DS_COLORS.map((color, i) => (
              <span
                key={i}
                className='w-2 h-2 rounded-full'
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
