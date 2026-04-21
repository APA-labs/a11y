import './index.css'
import { TextField, Label, Input, Text, FieldError } from 'react-aria-components'

export default function App() {
  return (
    <div className='p-24 max-w-360 stack gap-16'>
      <TextField isRequired>
        <Label className='label'>Full name</Label>
        <Input
          className='input'
          placeholder='Enter your full name'
        />
        <FieldError className='error' />
      </TextField>

      <TextField
        isRequired
        type='email'>
        <Label className='label'>Email</Label>
        <Input
          className='input'
          placeholder='you@example.com'
          autoComplete='email'
        />
        <Text
          slot='description'
          className='hint'>
          We will never share your email.
        </Text>
        <FieldError className='error' />
      </TextField>

      <TextField isReadOnly>
        <Label className='label'>Username</Label>
        <Input
          className='input'
          defaultValue='@devongovett'
        />
      </TextField>
    </div>
  )
}
