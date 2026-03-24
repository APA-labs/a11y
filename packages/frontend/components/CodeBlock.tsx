'use client'

import { Check, Copy, Eye, Code } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import type { CodeSample } from '../lib/types'

const SandpackPreviewBlock = dynamic(() => import('./SandpackPreview'), {
  ssr: false,
  loading: () => (
    <div
      className='rounded-b-xl bg-slate-900 flex items-center justify-center'
      style={{ height: 260 }}>
      <span className='text-sm text-mist-400'>로딩 중...</span>
    </div>
  )
})

export default function CodeBlock({ sample }: { sample: CodeSample }) {
  const [copied, setCopied] = useState(false)
  const [tab, setTab] = useState<'code' | 'preview'>('code')

  const canPreview = ['tsx', 'jsx', 'ts', 'js', 'html'].includes(sample.language)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sample.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='rounded-xl border border-mist-200 bg-navy-800'>
      {/* Header */}
      <div className='flex items-center justify-between px-4 py-2.5 bg-navy-900 border-b border-navy-800 rounded-t-xl'>
        <div className='flex items-center gap-2'>
          <span className='text-xs font-mono text-mist-400'>{sample.label}</span>
          <span className='text-xs px-1.5 py-0.5 rounded bg-navy-700 text-mist-400 font-mono'>{sample.language}</span>
        </div>

        <div className='flex items-center gap-1'>
          {canPreview && (
            <>
              <button
                onClick={() => setTab('code')}
                aria-pressed={tab === 'code'}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${
                  tab === 'code' ? 'bg-navy-600 text-white' : 'text-mist-400 hover:text-white hover:bg-navy-700'
                }`}>
                <Code size={12} />
                <span>코드</span>
              </button>
              <button
                onClick={() => setTab('preview')}
                aria-pressed={tab === 'preview'}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${
                  tab === 'preview' ? 'bg-navy-600 text-white' : 'text-mist-400 hover:text-white hover:bg-navy-700'
                }`}>
                <Eye size={12} />
                <span>미리보기</span>
              </button>
            </>
          )}

          <button
            onClick={handleCopy}
            aria-label={copied ? '복사됨' : '코드 복사'}
            className='flex items-center gap-1.5 text-xs text-mist-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-navy-700 ml-1'>
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
      </div>

      {/* Content */}
      {tab === 'code' ? (
        <pre className='overflow-x-auto p-4 text-sm leading-relaxed scrollbar-thin rounded-b-xl'>
          <code className='text-slate-200 font-mono whitespace-pre'>{sample.code}</code>
        </pre>
      ) : (
        <SandpackPreviewBlock
          key={sample.code}
          code={sample.code}
          language={sample.language}
        />
      )}
    </div>
  )
}
