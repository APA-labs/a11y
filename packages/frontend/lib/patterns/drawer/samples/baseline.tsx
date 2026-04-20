function DrawerDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const titleId = 'drawer-title'

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(true)}>
        Open menu
      </button>

      {isOpen && (
        <>
          <div
            role='dialog'
            aria-modal='true'
            aria-labelledby={titleId}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsOpen(false)
                triggerRef.current?.focus()
              }
            }}>
            <h2 id={titleId}>Menu</h2>
            <nav>
              <a href='/'>Home</a>
              <a href='/about'>About</a>
            </nav>
            <button
              onClick={() => {
                setIsOpen(false)
                triggerRef.current?.focus()
              }}>
              Close
            </button>
          </div>
          <div
            onClick={() => setIsOpen(false)}
            aria-hidden='true'
          />
        </>
      )}
    </>
  )
}
