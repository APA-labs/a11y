import { useState, type FormEvent } from 'react'
import { TextField, Button } from '@mui/material'

function MuiForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate>
      <TextField
        label='Email'
        type='email'
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          setError('')
        }}
        error={!!error}
        helperText={error || 'e.g. user@example.com'}
        inputProps={{ 'aria-required': true }}
      />
      <Button
        type='submit'
        variant='contained'>
        Submit
      </Button>
    </form>
  )
}
