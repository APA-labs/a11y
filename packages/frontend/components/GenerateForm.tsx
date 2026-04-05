'use client'

import { ChevronDown, ChevronUp, Loader2, Wand2 } from 'lucide-react'
import { useState } from 'react'

import AgentProgress from './AgentProgress'
import SandpackPreviewBlock from './SandpackPreview'

import type { GenerateResponse } from '@a11y/shared'

export default function GenerateForm() {
  const [description, setDescription] = useState('')
  const [existingCode, setExistingCode] = useState('')
  const [showExisting, setShowExisting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GenerateResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('http://localhost:3001/api/generate', {
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
            className='block text-sm font-medium text-slate-700 mb-1.5'>
            컴포넌트 설명
          </label>
          <textarea
            id='generate-desc'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='예: 키보드로 열고 닫을 수 있는 드롭다운 메뉴'
            rows={4}
            required
            aria-required='true'
            className='w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none placeholder:text-slate-400'
          />
        </div>

        <div>
          <button
            type='button'
            onClick={() => setShowExisting((v) => !v)}
            aria-expanded={showExisting}
            aria-controls='existing-code-panel'
            className='flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors'>
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
            기존 코드 붙여넣기 (선택사항)
          </button>
          {showExisting && (
            <div id='existing-code-panel'>
              <textarea
                value={existingCode}
                onChange={(e) => setExistingCode(e.target.value)}
                placeholder='접근성을 개선할 기존 HTML/JSX 코드를 붙여넣으세요'
                rows={5}
                className='mt-2 w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none placeholder:text-slate-400 font-mono'
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
              생성 중...
            </>
          ) : (
            <>
              <Wand2
                size={15}
                aria-hidden
              />
              접근성 컴포넌트 생성
            </>
          )}
        </button>
      </form>

      {(loading || result) && (
        <div className='space-y-1'>
          <p className='text-xs font-medium text-slate-500'>Agent 진행 상황</p>
          <AgentProgress
            steps={result?.steps ?? []}
            loading={loading}
          />
        </div>
      )}

      {error && (
        <div
          role='alert'
          className='p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700'>
          {error}
        </div>
      )}

      {result && result.jsx && (
        <div className='space-y-4'>
          <div>
            <h3 className='text-sm font-semibold text-slate-700 mb-2'>생성된 컴포넌트</h3>
            <SandpackPreviewBlock
              code={result.jsx}
              language='react'
            />
          </div>

          {result.appliedRules.length > 0 && (
            <div>
              <h3 className='text-sm font-semibold text-slate-700 mb-2'>적용된 접근성 규칙</h3>
              <ul className='space-y-1'>
                {result.appliedRules.map((rule, i) => (
                  <li
                    key={i}
                    className='flex items-start gap-2 text-sm text-slate-600'>
                    <span
                      className='text-emerald-500 mt-0.5'
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
              <h3 className='text-sm font-semibold text-amber-700 mb-2'>남은 접근성 이슈</h3>
              <ul className='space-y-1'>
                {result.violations.map((v, i) => (
                  <li
                    key={i}
                    className='flex items-start gap-2 text-sm text-amber-700'>
                    <span
                      className='mt-0.5'
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
