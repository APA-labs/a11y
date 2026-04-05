'use client'

import { ChevronDown, ChevronUp, ExternalLink, Loader2, Wand2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import AgentProgress from './AgentProgress'
import SandpackPreviewBlock from './SandpackPreview'
import { getTranslations } from '../lib/i18n'
import { getPatterns } from '../lib/patterns'

import type { Lang } from '../lib/i18n'
import type { GenerateResponse } from '@a11y/shared'

interface Props {
  lang: Lang
}

export default function GenerateForm({ lang }: Props) {
  const [description, setDescription] = useState('')
  const [existingCode, setExistingCode] = useState('')
  const [showExisting, setShowExisting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GenerateResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const t = getTranslations(lang)
  const patterns = getPatterns(lang)

  const findPatternSlug = (name: string): string | null => {
    const found = patterns.find((p) => p.name.toLowerCase() === name.toLowerCase() || p.slug === name.toLowerCase().replace(/\s+/g, '-'))
    return found?.slug ?? null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          ...(existingCode.trim() ? { existingCode: existingCode.trim() } : {})
        })
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error ?? `서버 오류: ${res.status}`)
      }
      const data = (await res.json()) as GenerateResponse
      setResult(data)
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
            htmlFor='generate-desc'
            className='block text-sm font-medium text-body mb-1.5'>
            {t.generate.descriptionLabel}
          </label>
          <textarea
            id='generate-desc'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.generate.descriptionPlaceholder}
            rows={4}
            required
            aria-required='true'
            className='w-full px-3 py-2.5 text-sm rounded-lg border border-outline bg-surface focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none placeholder:text-faint'
          />
        </div>

        <div>
          <button
            type='button'
            onClick={() => setShowExisting((v) => !v)}
            aria-expanded={showExisting}
            aria-controls='existing-code-panel'
            className='flex items-center gap-1.5 text-xs text-soft hover:text-body transition-colors'>
            {showExisting ? (
              <ChevronUp
                size={13}
                aria-hidden
              />
            ) : (
              <ChevronDown
                size={13}
                aria-hidden
              />
            )}
            {t.generate.existingCodeToggle}
          </button>
          {showExisting && (
            <div id='existing-code-panel'>
              <textarea
                value={existingCode}
                onChange={(e) => setExistingCode(e.target.value)}
                placeholder={t.generate.existingCodePlaceholder}
                rows={5}
                className='mt-2 w-full px-3 py-2.5 text-sm rounded-lg border border-outline bg-surface focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none placeholder:text-faint font-mono'
              />
            </div>
          )}
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
              {t.generate.generating}
            </>
          ) : (
            <>
              <Wand2
                size={15}
                aria-hidden
              />
              {t.generate.submitButton}
            </>
          )}
        </button>
      </form>

      {(loading || result) && (
        <div className='space-y-1'>
          <p className='text-xs font-medium text-soft'>{t.generate.agentProgress}</p>
          <AgentProgress
            steps={result?.steps ?? []}
            loading={loading}
          />
        </div>
      )}

      {error && (
        <div
          role='alert'
          className='p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 dark:bg-red-950 dark:border-red-900 dark:text-red-400'>
          {error}
        </div>
      )}

      {result && result.jsx && (
        <div className='space-y-4'>
          {result.patterns.length > 0 && (
            <div>
              <p className='text-xs font-medium text-soft mb-2'>{t.generate.detectedPatterns}</p>
              <div className='flex flex-wrap gap-2'>
                {result.patterns.map((name) => {
                  const slug = findPatternSlug(name)
                  return slug ? (
                    <Link
                      key={name}
                      href={`/${lang}/patterns/${slug}`}
                      className='inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-violet-100 text-violet-700 hover:bg-violet-200 transition-colors dark:bg-violet-900/40 dark:text-violet-300 dark:hover:bg-violet-900/60'>
                      {name}
                      <ExternalLink
                        size={10}
                        aria-hidden
                      />
                    </Link>
                  ) : (
                    <span
                      key={name}
                      className='inline-flex items-center px-2.5 py-1 text-xs rounded-full bg-mist-100 text-soft dark:bg-navy-800'>
                      {name}
                    </span>
                  )
                })}
              </div>
            </div>
          )}

          <div>
            <h3 className='text-sm font-semibold text-body mb-2'>{t.generate.generatedComponent}</h3>
            <SandpackPreviewBlock
              code={result.jsx}
              language='react'
            />
          </div>

          {result.appliedRules.length > 0 && (
            <div>
              <h3 className='text-sm font-semibold text-body mb-2'>{t.generate.appliedRules}</h3>
              <ul className='space-y-1'>
                {result.appliedRules.map((rule, i) => (
                  <li
                    key={i}
                    className='flex items-start gap-2 text-sm text-body'>
                    <span
                      className='text-emerald-500 mt-0.5 shrink-0'
                      aria-hidden>
                      ✓
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.violations.length > 0 && (
            <div>
              <h3 className='text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2'>{t.generate.remainingViolations}</h3>
              <ul className='space-y-1'>
                {result.violations.map((v, i) => (
                  <li
                    key={i}
                    className='flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400'>
                    <span
                      className='mt-0.5 shrink-0'
                      aria-hidden>
                      ⚠
                    </span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
