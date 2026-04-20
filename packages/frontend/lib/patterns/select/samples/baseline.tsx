function SelectDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!isOpen) setIsOpen(true)
      setActiveIndex((i) => Math.min(i + 1, options.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (isOpen) {
        setSelected(options[activeIndex])
        setIsOpen(false)
      } else setIsOpen(true)
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div>
      <label id='fruit-label'>Select fruit</label>
      <button
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-labelledby='fruit-label'
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen(!isOpen)}>
        {selected ?? 'Choose an option'}
      </button>
      {isOpen && (
        <ul
          role='listbox'
          aria-labelledby='fruit-label'
          tabIndex={-1}>
          {options.map((opt, i) => (
            <li
              key={opt}
              role='option'
              aria-selected={selected === opt}
              onClick={() => {
                setSelected(opt)
                setIsOpen(false)
              }}>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
