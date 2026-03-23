'use client'

import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

import CodeBlock from './CodeBlock'

import type { DesignSystemVariant } from '../lib/types'

const DS_ORDER: Array<'material' | 'radix' | 'antd'> = ['material', 'radix', 'antd']

interface Props {
  designSystems: {
    material: DesignSystemVariant
    radix: DesignSystemVariant
    antd: DesignSystemVariant
  }
}

export default function DesignSystemTabs({ designSystems }: Props) {
  const [active, setActive] = useState<'material' | 'radix' | 'antd'>('material')
  const current = designSystems[active]

  return (
    <div>
      {/* Tabs */}
      <div className='flex gap-1 p-1 bg-slate-100 rounded-lg mb-5 w-fit'>
        {DS_ORDER.map((id) => {
          const ds = designSystems[id]
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`
                flex items-center gap-2 px-3.5 py-1.5 rounded-md text-sm font-medium transition-all
                ${isActive ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}
              `}>
              <span
                className='w-2 h-2 rounded-full shrink-0'
                style={{ backgroundColor: isActive ? ds.color : '#cbd5e1' }}
              />
              {ds.name}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className='space-y-6'>
        {/* Additional checks */}
        {current.additionalChecks.length > 0 && (
          <div>
            <h4 className='text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2'>
              <span
                className='w-2.5 h-2.5 rounded-full'
                style={{ backgroundColor: current.color }}
              />
              추가 체크포인트
            </h4>
            <ul className='space-y-2'>
              {current.additionalChecks.map((item) => {
                const isMust = item.level === 'must'
                return (
                  <li
                    key={item.id}
                    className={`flex gap-3 p-3 rounded-lg border text-sm ${isMust ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'}`}>
                    {isMust ? (
                      <AlertCircle
                        size={15}
                        className='shrink-0 mt-0.5 text-red-500'
                      />
                    ) : (
                      <CheckCircle2
                        size={15}
                        className='shrink-0 mt-0.5 text-amber-500'
                      />
                    )}
                    <div>
                      <p className='font-medium text-slate-800'>{item.title}</p>
                      <p className='text-xs text-slate-500 mt-0.5 leading-relaxed'>{item.description}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {/* Code sample */}
        <div>
          <h4 className='text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2'>
            <span
              className='w-2.5 h-2.5 rounded-full'
              style={{ backgroundColor: current.color }}
            />
            코드 샘플
          </h4>
          <CodeBlock sample={current.codeSample} />
        </div>

        {/* Notes */}
        {current.notes.length > 0 && (
          <div>
            <h4 className='text-sm font-semibold text-slate-700 mb-3'>구현 노트</h4>
            <ul className='space-y-1.5'>
              {current.notes.map((note, i) => (
                <li
                  key={i}
                  className='flex gap-2 text-sm text-slate-600'>
                  <span className='text-slate-300 shrink-0 mt-0.5'>•</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
