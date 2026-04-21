import { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'

export default function App() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const emailError = submitted && !email.includes('@')
  const nameError = submitted && name.trim() === ''

  return (
    <Box
      component='form'
      noValidate
      className='p-24 max-w-400 stack gap-16'>
      <Typography variant='h6'>Create Account</Typography>

      <TextField
        id='full-name'
        label='Full Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        error={nameError}
        helperText={nameError ? 'Full name is required.' : 'As it appears on your ID'}
        inputProps={{ autoComplete: 'name', 'aria-required': 'true' }}
        fullWidth
      />

      <TextField
        id='email-address'
        label='Email Address'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        error={emailError}
        helperText={emailError ? 'Please enter a valid email address.' : 'e.g. user@example.com'}
        inputProps={{ autoComplete: 'email', 'aria-required': 'true' }}
        fullWidth
      />

      <Button
        type='submit'
        variant='contained'
        onClick={() => setSubmitted(true)}
        sx={{ alignSelf: 'flex-start', minHeight: 44 }}>
        Create Account
      </Button>
    </Box>
  )
}
