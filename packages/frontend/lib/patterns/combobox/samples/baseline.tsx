import { useState, useId } from 'react'

const OPTIONS = ['Apple', 'Banana', 'Cherry']

export function Combobox({ label }: { label: string }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputId = useId()
  const listId = useId()

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActiveIndex((i) => Math.min(i + 1, OPTIONS.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      setSelected(OPTIONS[activeIndex] ?? '')
      setOpen(false)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        role='combobox'
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete='list'
        aria-activedescendant={activeIndex >= 0 ? `opt-${activeIndex}` : undefined}
        value={selected}
        readOnly
        onKeyDown={handleKeyDown}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <ul
          id={listId}
          role='listbox'>
          {OPTIONS.map((opt, i) => (
            <li
              key={opt}
              id={`opt-${i}`}
              role='option'
              aria-selected={selected === opt}
              onClick={() => {
                setSelected(opt)
                setOpen(false)
              }}>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
