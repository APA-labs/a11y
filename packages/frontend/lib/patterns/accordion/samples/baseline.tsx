import { useState } from 'react'

const ITEMS = [
  { id: 'item-1', heading: 'Section 1', content: 'Content for section 1' },
  { id: 'item-2', heading: 'Section 2', content: 'Content for section 2' }
]

export function Accordion() {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div>
      {ITEMS.map((item) => (
        <div key={item.id}>
          <h3>
            <button
              type='button'
              aria-expanded={open === item.id}
              aria-controls={`panel-${item.id}`}
              onClick={() => setOpen(open === item.id ? null : item.id)}>
              {item.heading}
            </button>
          </h3>
          <div
            id={`panel-${item.id}`}
            role='region'
            aria-labelledby={item.id}
            hidden={open !== item.id}>
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
