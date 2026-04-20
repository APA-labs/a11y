import './index.css'
import { useState } from 'react'
import { Field, Input, Button, Stack } from '@chakra-ui/react'

export default function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const ne = name.trim() === '' ? 'Name is required.' : ''
    const ee = !email.includes('@') ? 'Please enter a valid email address.' : ''
    setNameError(ne)
    setEmailError(ee)
    if (!ne && !ee) setSubmitted(true)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate>
      <Stack
        gap={4}
        className='p-24 max-w-400'>
        <Field.Root
          required
          invalid={!!nameError}>
          <Field.Label>
            Full name <Field.RequiredIndicator />
          </Field.Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your name'
          />
          {nameError && <Field.ErrorText role='alert'>{nameError}</Field.ErrorText>}
        </Field.Root>

        <Field.Root
          required
          invalid={!!emailError}>
          <Field.Label>
            Email <Field.RequiredIndicator />
          </Field.Label>
          <Input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='you@example.com'
          />
          {emailError && <Field.ErrorText role='alert'>{emailError}</Field.ErrorText>}
          <Field.HelperText>e.g. user@example.com</Field.HelperText>
        </Field.Root>

        <Button
          type='submit'
          colorPalette='teal'>
          Submit
        </Button>

        {submitted && (
          <p
            role='status'
            className='text-success mt-0 mb-0 text-sm'>
            Form submitted successfully!
          </p>
        )}
      </Stack>
    </form>
  )
}
