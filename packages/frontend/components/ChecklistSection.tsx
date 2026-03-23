import { AlertCircle, CheckCircle2, MinusCircle } from 'lucide-react'

import type { ChecklistItem } from '../lib/types'

const CONFIG = {
  must: {
    label: 'Must',
    icon: AlertCircle,
    containerClass: 'bg-red-50 border-red-100',
    iconClass: 'text-red-500',
    labelClass: 'text-red-700 bg-red-100',
    titleClass: 'text-slate-800'
  },
  should: {
    label: 'Should',
    icon: CheckCircle2,
    containerClass: 'bg-amber-50 border-amber-100',
    iconClass: 'text-amber-500',
    labelClass: 'text-amber-700 bg-amber-100',
    titleClass: 'text-slate-800'
  },
  avoid: {
    label: 'Avoid',
    icon: MinusCircle,
    containerClass: 'bg-slate-50 border-slate-200',
    iconClass: 'text-slate-400',
    labelClass: 'text-slate-600 bg-slate-200',
    titleClass: 'text-slate-700'
  }
}

function ChecklistGroup({ items, level }: { items: ChecklistItem[]; level: 'must' | 'should' | 'avoid' }) {
  if (items.length === 0) return null
  const cfg = CONFIG[level]
  const Icon = cfg.icon

  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <Icon
          size={14}
          className={cfg.iconClass}
        />
        <span className={`text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${cfg.labelClass}`}>{cfg.label}</span>
        <span className='text-xs text-slate-400'>{items.length}개</span>
      </div>
      <ul className='space-y-2'>
        {items.map((item) => (
          <li
            key={item.id}
            className={`flex gap-3 p-3 rounded-lg border text-sm ${cfg.containerClass}`}>
            <Icon
              size={15}
              className={`shrink-0 mt-0.5 ${cfg.iconClass}`}
            />
            <div>
              <p className={`font-medium ${cfg.titleClass}`}>{item.title}</p>
              <p className='text-slate-500 text-xs mt-0.5 leading-relaxed'>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface Props {
  must: ChecklistItem[]
  should: ChecklistItem[]
  avoid: ChecklistItem[]
}

export default function ChecklistSection({ must, should, avoid }: Props) {
  return (
    <div className='space-y-5'>
      <ChecklistGroup
        items={must}
        level='must'
      />
      <ChecklistGroup
        items={should}
        level='should'
      />
      <ChecklistGroup
        items={avoid}
        level='avoid'
      />
    </div>
  )
}
