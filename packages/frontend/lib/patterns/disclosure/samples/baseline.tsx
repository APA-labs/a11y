import { useState } from 'react'

export function Disclosure({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        type='button'
        aria-expanded={open}
        aria-controls='disclosure-content'
        onClick={() => setOpen(!open)}>
        {title}
      </button>
      <div
        id='disclosure-content'
        hidden={!open}>
        {children}
      </div>
    </div>
  )
}
