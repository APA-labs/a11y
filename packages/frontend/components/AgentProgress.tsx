'use client'

import { CheckCircle, Circle, Loader2, XCircle } from 'lucide-react'

import type { AgentStep } from '@a11y/shared'

const TOOL_LABELS: Record<AgentStep['tool'], string> = {
  classify_pattern: '패턴 분류',
  get_rules: '규칙 로드',
  generate_component: '컴포넌트 생성',
  validate_component: '접근성 검증'
}

interface Props {
  steps: AgentStep[]
  loading: boolean
}

export default function AgentProgress({ steps, loading }: Props) {
  const allTools: AgentStep['tool'][] = ['classify_pattern', 'get_rules', 'generate_component', 'validate_component']

  return (
    <div
      aria-label='Agent 진행 상황'
      aria-live='polite'
      className='flex items-center gap-2 flex-wrap'>
      {allTools.map((tool, i) => {
        const step = steps.find((s) => s.tool === tool)
        const isRunning = step?.status === 'running' || (loading && !step && steps.length === i)

        return (
          <div
            key={tool}
            className='flex items-center gap-1.5'>
            {step?.status === 'done' ? (
              <CheckCircle
                size={14}
                className='text-emerald-500'
                aria-hidden
              />
            ) : step?.status === 'failed' ? (
              <XCircle
                size={14}
                className='text-red-500'
                aria-hidden
              />
            ) : isRunning ? (
              <Loader2
                size={14}
                className='animate-spin text-indigo-500'
                aria-hidden
              />
            ) : (
              <Circle
                size={14}
                className='text-slate-300'
                aria-hidden
              />
            )}
            <span
              className={`text-xs ${
                step?.status === 'done'
                  ? 'text-emerald-700'
                  : step?.status === 'failed'
                    ? 'text-red-600'
                    : isRunning
                      ? 'text-indigo-600 font-medium'
                      : 'text-slate-400'
              }`}>
              {TOOL_LABELS[tool]}
            </span>
            {i < allTools.length - 1 && <span className='text-slate-200 ml-1'>→</span>}
          </div>
        )
      })}
    </div>
  )
}
