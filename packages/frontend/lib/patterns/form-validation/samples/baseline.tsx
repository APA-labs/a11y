function FormWithValidation() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const errorId = 'email-error'

  const validate = () => {
    if (!email) return 'Please enter your email.'
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) return 'Please enter a valid email address.'
    return ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validate()
    setError(err)
    if (err) document.getElementById('email-input')?.focus()
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate>
      <div>
        <label htmlFor='email-input'>
          Email <span aria-hidden>*</span>
        </label>
        <input
          id='email-input'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-required='true'
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
        {error && (
          <p
            id={errorId}
            role='alert'>
            {error}
          </p>
        )}
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}
