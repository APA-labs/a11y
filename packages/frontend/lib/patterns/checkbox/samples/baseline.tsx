import { useState } from 'react'

export function Checkbox({ id = 'cb-example', label = 'Label', indeterminate = false }: { id?: string; label?: string; indeterminate?: boolean }) {
  const [checked, setChecked] = useState(false)
  return (
    <label htmlFor={id}>
      <input
        id={id}
        type='checkbox'
        checked={checked}
        ref={(el) => {
          if (el) el.indeterminate = indeterminate
        }}
        onChange={(e) => setChecked(e.target.checked)}
      />
      {label}
    </label>
  )
}
