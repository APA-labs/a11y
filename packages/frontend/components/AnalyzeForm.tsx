'use client'

import { Loader2, Sparkles } from 'lucide-react'
import { useState } from 'react'

import { getTranslations } from '../lib/i18n'

import type { Lang } from '../lib/i18n'

interface Props {
  lang: Lang
}

export default function AnalyzeForm({ lang }: Props) {
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const t = getTranslations(lang)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      })
      if (!res.ok) throw new Error(`서버 오류: ${res.status}`)
      const data = await res.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-2xl space-y-6'>
      <form
        onSubmit={handleSubmit}
        className='space-y-4'>
        <div>
          <label
            htmlFor='component-desc'
            className='block text-sm font-medium text-slate-700 mb-1.5'>
            {t.analyze.descriptionLabel}
          </label>
          <textarea
            id='component-desc'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.analyze.descriptionPlaceholder}
            rows={5}
            required
            aria-required='true'
            aria-describedby='desc-hint'
            className='w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none placeholder:text-slate-400'
          />
          <p
            id='desc-hint'
            className='mt-1.5 text-xs text-slate-500'>
            {t.analyze.descriptionHint}
          </p>
        </div>

        <button
          type='submit'
          disabled={loading || !description.trim()}
          aria-busy={loading}
          className='flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500'>
          {loading ? (
            <>
              <Loader2
                size={15}
                className='animate-spin'
                aria-hidden
              />
              {t.analyze.analyzing}
            </>
          ) : (
            <>
              <Sparkles
                size={15}
                aria-hidden
              />
              {t.analyze.submitButton}
            </>
          )}
        </button>
      </form>

      {error && (
        <div
          role='alert'
          className='p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700'>
          {error}
        </div>
      )}

      {result && (
        <div>
          <h3 className='text-sm font-semibold text-slate-700 mb-2'>{t.analyze.resultTitle}</h3>
          <pre className='overflow-x-auto p-4 bg-[#1e293b] rounded-xl text-xs text-slate-200 font-mono leading-relaxed'>{result}</pre>
        </div>
      )}
    </div>
  )
}
