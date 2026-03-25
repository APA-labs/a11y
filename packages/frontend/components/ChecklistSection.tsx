import { AlertCircle, CheckCircle2, MinusCircle } from 'lucide-react'

import type { ChecklistItem } from '../lib/types'

const CONFIG = {
  must: {
    label: 'Must',
    icon: AlertCircle,
    containerClass: 'bg-red-50 border-red-100',
    iconClass: 'text-red-500',
    labelClass: 'text-red-600 bg-red-100',
    titleClass: 'text-navy'
  },
  should: {
    label: 'Should',
    icon: CheckCircle2,
    containerClass: 'bg-amber-50 border-amber-100',
    iconClass: 'text-amber-500',
    labelClass: 'text-amber-700 bg-amber-100',
    titleClass: 'text-navy'
  },
  avoid: {
    label: 'Avoid',
    icon: MinusCircle,
    containerClass: 'bg-mist-50 border-mist-200',
    iconClass: 'text-mist-500',
    labelClass: 'text-mist-700 bg-mist-200',
    titleClass: 'text-navy-700'
  }
}

function ChecklistGroup({ items, level }: { items: ChecklistItem[]; level: 'must' | 'should' | 'avoid' }) {
  if (items.length === 0) return null
  const cfg = CONFIG[level]
  const Icon = cfg.icon

  return (
    <div>
      <div className='flex items-center gap-2 mb-2.5'>
        <Icon
          size={13}
          className={cfg.iconClass}
        />
        <span className={`text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${cfg.labelClass}`}>{cfg.label}</span>
        <span className='text-xs text-mist-500'>{items.length}개</span>
      </div>
      <ul className='space-y-2'>
        {items.map((item) => (
          <li
            key={item.id}
            className={`p-3 rounded-lg border text-sm ${cfg.containerClass}`}>
            <p className={`font-medium text-[13px] ${cfg.titleClass}`}>{item.title}</p>
            <p className='text-mist-600 text-xs mt-0.5 leading-relaxed'>{item.description}</p>
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
