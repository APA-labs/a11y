'use client'

import { Loader2, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function AnalyzeForm() {
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('http://localhost:3001/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
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
    <div className="max-w-2xl space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="component-desc" className="block text-sm font-medium text-slate-700 mb-1.5">
            컴포넌트 설명
          </label>
          <textarea
            id="component-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="예: 사용자가 알림을 켜고 끄는 토글 스위치. 설정 페이지 내에 위치하며 모바일 환경에서도 사용됩니다."
            rows={5}
            required
            aria-required="true"
            aria-describedby="desc-hint"
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none placeholder:text-slate-400"
          />
          <p id="desc-hint" className="mt-1.5 text-xs text-slate-500">
            컴포넌트의 목적, 위치, 사용 맥락을 자세히 설명할수록 정확한 분석이 가능합니다.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !description.trim()}
          aria-busy={loading}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
        >
          {loading ? (
            <>
              <Loader2 size={15} className="animate-spin" aria-hidden />
              분석 중...
            </>
          ) : (
            <>
              <Sparkles size={15} aria-hidden />
              AI 분석 시작
            </>
          )}
        </button>
      </form>

      {error && (
        <div role="alert" className="p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      {result && (
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-2">분석 결과</h3>
          <pre className="overflow-x-auto p-4 bg-[#1e293b] rounded-xl text-xs text-slate-200 font-mono leading-relaxed">
            {result}
          </pre>
        </div>
      )}
    </div>
  )
}
