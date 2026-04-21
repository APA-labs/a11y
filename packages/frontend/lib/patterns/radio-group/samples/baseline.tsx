import './index.css'
import { useState } from 'react'

const OPTIONS = ['Option A', 'Option B', 'Option C']

export function RadioGroup({ legend }: { legend: string }) {
  const [selected, setSelected] = useState(OPTIONS[0])

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next = index
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (index + 1) % OPTIONS.length
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (index - 1 + OPTIONS.length) % OPTIONS.length
    if (next !== index) {
      e.preventDefault()
      setSelected(OPTIONS[next])
    }
  }

  return (
    <fieldset>
      <legend>{legend}</legend>
      {OPTIONS.map((opt, i) => (
        <label key={opt}>
          <input
            type='radio'
            name='group'
            value={opt}
            checked={selected === opt}
            tabIndex={selected === opt ? 0 : -1}
            onChange={() => setSelected(opt)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          />
          {opt}
        </label>
      ))}
    </fieldset>
  )
}
