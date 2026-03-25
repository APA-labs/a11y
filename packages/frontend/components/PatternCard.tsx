'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { DS_META, DS_ORDER } from '../lib/types'

import type { Pattern } from '../lib/types'


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
        style={{ height: 100 }}>
        <Image
          src={previewSrc}
          alt={`${pattern.name} 미리보기`}
          fill
          className='object-cover scale-100 hover:scale-105 transition-transform'
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
          unoptimized
        />
      </div>

      {/* 카드 본문 */}
      <div className='p-3'>
        <div className='flex items-start justify-between mb-1.5'>
          <div className='flex-1 min-w-0 pr-1'>
            <h2 className='font-semibold text-navy text-[13px] group-hover:text-violet-600 transition-colors leading-tight'>{pattern.name}</h2>
            <p className='text-[11px] text-mist-600 mt-0.5 leading-snug'>{pattern.description}</p>
          </div>
          <ArrowRight
            size={12}
            className='shrink-0 mt-0.5 text-mist-300 group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all'
          />
        </div>

        <div className='flex items-center justify-between pt-2 border-t border-mist-100'>
          <div className='flex items-center gap-2 text-[11px] text-mist-600'>
            <span><span className='font-semibold text-red-500'>{mustCount}</span> must</span>
            <span><span className='font-semibold text-amber-500'>{shouldCount}</span> should</span>
          </div>
          <div className='flex items-center gap-0.5'>
            {DS_ORDER.filter((id) => pattern.designSystems[id] != null).map((id) => (
              <span
                key={id}
                className='w-1.5 h-1.5 rounded-full'
                title={DS_META[id].name}
                style={{ backgroundColor: DS_META[id].color }}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
