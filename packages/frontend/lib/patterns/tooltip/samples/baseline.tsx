import { useState, useId } from 'react'

export function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)
  const id = useId()

  return (
    <span className='tooltip-wrapper'>
      <span
        aria-describedby={visible ? id : undefined}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        onKeyDown={(e) => e.key === 'Escape' && setVisible(false)}>
        {children}
      </span>
      {visible && (
        <span
          id={id}
          role='tooltip'
          className='tooltip-popup'>
          {label}
        </span>
      )}
    </span>
  )
}
