import { useState } from 'react'

function DatePickerDemo() {
  const [date, setDate] = useState('')
  const [error, setError] = useState('')
  const hintId = 'date-format-hint'
  const errorId = 'date-error'

  const validateDate = (value: string) => {
    if (!value) return ''
    const d = new Date(value)
    if (isNaN(d.getTime())) return 'Invalid date.'
    return ''
  }

  return (
    <div>
      <label htmlFor='date-input'>Date</label>
      <input
        id='date-input'
        type='date'
        value={date}
        onChange={(e) => {
          setDate(e.target.value)
          setError(validateDate(e.target.value))
        }}
        aria-describedby={`${hintId}${error ? ` ${errorId}` : ''}`}
        aria-invalid={!!error}
      />
      <p id={hintId}>Format: YYYY-MM-DD</p>
      {error && (
        <p
          id={errorId}
          role='alert'>
          {error}
        </p>
      )}
    </div>
  )
}
