import { useState } from 'react'

function TextInputDemo() {
  const [value, setValue] = useState('')
  const hasError = value.length > 0 && !/^[^@]+@[^@]+\.[^@]+$/.test(value)

  return (
    <div>
      <label htmlFor='email'>
        Email <span aria-hidden>*</span>
      </label>
      <input
        id='email'
        type='email'
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-required='true'
        aria-invalid={hasError}
        aria-describedby={hasError ? 'email-error' : 'email-hint'}
        autoComplete='email'
      />
      {hasError && (
        <p
          id='email-error'
          role='alert'>
          Please enter a valid email address.
        </p>
      )}
      <p id='email-hint'>e.g., user@example.com</p>
    </div>
  )
}
