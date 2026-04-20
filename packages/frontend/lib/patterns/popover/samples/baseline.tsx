function PopoverDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <div>
      <button
        ref={triggerRef}
        aria-expanded={isOpen}
        aria-haspopup='dialog'
        aria-controls='popover-content'
        onClick={() => setIsOpen(!isOpen)}>
        Open settings
      </button>

      {isOpen && (
        <div
          id='popover-content'
          role='dialog'
          aria-label='Settings'
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false)
              triggerRef.current?.focus()
            }
          }}>
          <h3>Settings</h3>
          <button>Enable notifications</button>
          <button
            onClick={() => {
              setIsOpen(false)
              triggerRef.current?.focus()
            }}>
            Close
          </button>
        </div>
      )}
    </div>
  )
}
