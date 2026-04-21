import { useState } from 'react'

const TABS = [
  { id: 'tab-1', label: 'Tab 1', content: 'Panel 1 content' },
  { id: 'tab-2', label: 'Tab 2', content: 'Panel 2 content' }
]

export function Tabs() {
  const [active, setActive] = useState('tab-1')

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') setActive(TABS[Math.min(index + 1, TABS.length - 1)]!.id)
    if (e.key === 'ArrowLeft') setActive(TABS[Math.max(index - 1, 0)]!.id)
    if (e.key === 'Home') setActive(TABS[0]!.id)
    if (e.key === 'End') setActive(TABS[TABS.length - 1]!.id)
  }

  return (
    <div>
      <div role='tablist'>
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            id={tab.id}
            role='tab'
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={active === tab.id ? 0 : -1}
            onClick={() => setActive(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, i)}>
            {tab.label}
          </button>
        ))}
      </div>
      {TABS.map((tab) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role='tabpanel'
          aria-labelledby={tab.id}
          hidden={active !== tab.id}>
          {tab.content}
        </div>
      ))}
    </div>
  )
}
