'use client'

import { Check, Code, Copy, Eye } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import type { Lang } from '@/lib/i18n'
import type { CodeSample } from '@/lib/types'

const SandpackPreviewBlock = dynamic(() => import('./SandpackPreview'), {
  ssr: false,
  loading: () => (
    <div
      className='rounded-b-xl bg-mist-50 dark:bg-navy-900 flex items-center justify-center'
      style={{ height: 260 }}>
      <span className='text-sm text-mist-400'>Loading...</span>
    </div>
  )
})

const T = {
  ko: { code: '코드', preview: '미리보기', copy: '복사', copied: '복사됨' },
  en: { code: 'Code', preview: 'Preview', copy: 'Copy', copied: 'Copied' }
} as const

const PREVIEWABLE_LANGUAGES = new Set(['tsx', 'jsx', 'ts', 'js', 'html'])

export default function CodeBlock({
  sample,
  lang = 'ko',
  disablePreview = false,
  slug
}: {
  sample: CodeSample
  lang?: Lang
  disablePreview?: boolean
  slug?: string
}) {
  const t = T[lang]
  const [copied, setCopied] = useState(false)
  const languageAllowsPreview = PREVIEWABLE_LANGUAGES.has(sample.language)
  const canPreview = !disablePreview && (sample.preview ?? languageAllowsPreview)
  const [tab, setTab] = useState<'code' | 'preview'>(canPreview ? 'preview' : 'code')

  useEffect(() => {
    if (!canPreview) setTab('code')
  }, [canPreview])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sample.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='rounded-xl border border-mist-200 dark:border-navy-700 overflow-hidden'>
      {/* Header */}
      <div className='flex items-center justify-between px-4 py-2.5 bg-mist-50 dark:bg-navy-900 border-b border-mist-200 dark:border-navy-700'>
        <div className='flex items-center gap-2'>
          <span className='text-xs font-mono text-mist-600 dark:text-mist-400'>{sample.label}</span>
          <span className='text-xs px-1.5 py-0.5 rounded bg-mist-200 dark:bg-navy-700 text-mist-600 dark:text-mist-400 font-mono'>
            {sample.language}
          </span>
        </div>

        <div className='flex items-center gap-1'>
          {canPreview && (
            <>
              <button
                onClick={() => setTab('code')}
                aria-pressed={tab === 'code'}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${
                  tab === 'code'
                    ? 'bg-white dark:bg-navy-700 text-navy dark:text-white shadow-sm'
                    : 'text-mist-500 dark:text-mist-400 hover:text-navy dark:hover:text-white'
                }`}>
                <Code size={12} />
                <span>{t.code}</span>
              </button>
              <button
                onClick={() => setTab('preview')}
                aria-pressed={tab === 'preview'}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${
                  tab === 'preview'
                    ? 'bg-white dark:bg-navy-700 text-navy dark:text-white shadow-sm'
                    : 'text-mist-500 dark:text-mist-400 hover:text-navy dark:hover:text-white'
                }`}>
                <Eye size={12} />
                <span>{t.preview}</span>
              </button>
            </>
          )}

          <button
            onClick={handleCopy}
            aria-label={copied ? t.copied : t.copy}
            className='flex items-center gap-1.5 text-xs text-mist-500 dark:text-mist-400 hover:text-navy dark:hover:text-white transition-colors px-2 py-1 rounded hover:bg-mist-100 dark:hover:bg-navy-700 ml-1'>
            {copied ? (
              <>
                <Check
                  size={13}
                  className='text-emerald-500'
                />
                <span className='text-emerald-500'>{t.copied}</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>{t.copy}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      {tab === 'code' || !canPreview ? (
        <pre className='overflow-x-auto p-4 text-sm leading-relaxed scrollbar-thin bg-[#f8f9fc] dark:bg-navy-900 rounded-b-xl'>
          <code className='text-slate-700 dark:text-slate-200 font-mono whitespace-pre'>{sample.code}</code>
        </pre>
      ) : (
        <SandpackPreviewBlock
          key={sample.code}
          code={sample.code}
          language={sample.language}
          slug={slug}
        />
      )}
    </div>
  )
}
