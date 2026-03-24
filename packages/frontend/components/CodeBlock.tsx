'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import type { CodeSample } from '../lib/types'

export default function CodeBlock({ sample }: { sample: CodeSample }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sample.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='rounded-xl border border-slate-200 bg-[#1e293b]'>
      {/* Header */}
      <div className='flex items-center justify-between px-4 py-2.5 bg-[#0f172a] border-b border-slate-700/60 rounded-t-xl'>
        <div className='flex items-center gap-2'>
          <span className='text-xs font-mono text-slate-400'>{sample.label}</span>
          <span className='text-xs px-1.5 py-0.5 rounded bg-slate-700 text-slate-400 font-mono'>{sample.language}</span>
        </div>
        <button
          onClick={handleCopy}
          aria-label={copied ? '복사됨' : '코드 복사'}
          className='flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-slate-700'>
          {copied ? (
            <>
              <Check
                size={13}
                className='text-emerald-400'
              />
              <span className='text-emerald-400'>복사됨</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>복사</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <pre className='overflow-x-auto p-4 text-sm leading-relaxed scrollbar-thin rounded-b-xl'>
        <code className='text-slate-200 font-mono whitespace-pre'>{sample.code}</code>
      </pre>
    </div>
  )
}
