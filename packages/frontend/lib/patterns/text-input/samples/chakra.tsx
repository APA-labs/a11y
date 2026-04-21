import { useState } from 'react'
import { Field, Input, Button, Stack } from '@chakra-ui/react'

export default function App() {
  const [email, setEmail] = useState('')
  const [hasError, setHasError] = useState(false)

  const handleBlur = () => {
    setHasError(email.length > 0 && !email.includes('@'))
  }

  return (
    <Stack
      gap={4}
      className='p-24 max-w-400'>
      <Field.Root
        required
        invalid={hasError}>
        <Field.Label>
          Email <Field.RequiredIndicator />
        </Field.Label>
        <Input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlur}
          autoComplete='email'
          placeholder='user@example.com'
        />
        {hasError && <Field.ErrorText role='alert'>Please enter a valid email address.</Field.ErrorText>}
        <Field.HelperText>e.g. user@example.com</Field.HelperText>
      </Field.Root>

      <Button
        colorPalette='teal'
        type='submit'>
        Submit
      </Button>
    </Stack>
  )
}
