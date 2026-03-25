'use client'

import * as RadixPopover from '@radix-ui/react-popover'
import { ExternalLink, Info } from 'lucide-react'

import { getWcagCriterion, getLevelColor } from '../lib/wcag-criteria'

interface WcagBadgeProps {
  criterion: string
}

export default function WcagBadge({ criterion }: WcagBadgeProps) {
  const info = getWcagCriterion(criterion)

  if (!info) {
    return <span className='text-xs px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 font-mono border border-violet-200'>{criterion}</span>
  }

  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>
        <button
          type='button'
          className='group inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 font-mono border border-violet-200 hover:bg-violet-100 hover:border-violet-300 transition-colors cursor-pointer'>
          {criterion}
          <Info size={11} />
        </button>
      </RadixPopover.Trigger>

      <RadixPopover.Portal>
        <RadixPopover.Content
          sideOffset={8}
          collisionPadding={12}
          style={{ transformOrigin: 'var(--radix-popover-content-transform-origin)' }}
          className='z-50 w-72 rounded-xl bg-white border border-mist-200 shadow-lg p-4 motion-safe:animate-[popIn_150ms_ease-out] outline-none'>
          {/* Arrow */}
          <RadixPopover.Arrow
            className='fill-white stroke-mist-200 stroke-1'
            width={12}
            height={6}
          />

          <div className='flex items-start justify-between gap-2 mb-2'>
            <div className='flex items-center gap-2'>
              <span className='font-mono text-sm font-semibold text-navy'>{info.id}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getLevelColor(info.level)}`}>Level {info.level}</span>
            </div>
          </div>

          <h4 className='text-sm font-medium text-navy mb-1'>{info.name}</h4>
          <p className='text-xs text-mist-600 leading-relaxed mb-2.5'>{info.description}</p>

          <div className='flex items-center justify-between pt-2 border-t border-mist-100'>
            <span className='text-[10px] text-mist-500 font-medium'>{info.principle}</span>
            <a
              href={info.url}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1 text-[11px] text-violet-600 hover:text-violet-700 font-medium transition-colors'>
              WCAG 문서
              <ExternalLink size={10} />
            </a>
          </div>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
}
