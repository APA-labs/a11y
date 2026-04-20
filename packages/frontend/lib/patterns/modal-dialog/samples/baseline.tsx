import { useId, useRef, useState, useEffect } from 'react'

function Modal() {
  const titleId = useId()
  const descId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    // Move focus
    document.getElementById('modal-close')?.focus()
    // Set background to inert
    document.getElementById('root').inert = true
    return () => {
      document.getElementById('root').inert = false
    }
  }, [isOpen])

  return (
    <>
      {isOpen ? (
        <div
          role='dialog'
          aria-modal='true'
          aria-labelledby={titleId}
          aria-describedby={descId}
          onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}>
          <h2 id={titleId}>Modal Title</h2>
          <div id={descId}>Modal Description</div>
          <button
            id='modal-close'
            onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
      )}
    </>
  )
}
