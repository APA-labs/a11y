import './index.css'
import * as Form from '@radix-ui/react-form'

export default function App() {
  return (
    <Form.Root
      className='app max-w-400'
      onSubmit={(e) => {
        e.preventDefault()
      }}>
      <Form.Field
        name='username'
        className='field mb-16'>
        <Form.Label className='label'>Username</Form.Label>
        <Form.Control asChild>
          <input
            type='text'
            required
            minLength={3}
            className='input'
            placeholder='Enter username'
          />
        </Form.Control>
        <Form.Message
          match='valueMissing'
          className='error'>
          Please enter a username.
        </Form.Message>
        <Form.Message
          match='tooShort'
          className='error'>
          Username must be at least 3 characters.
        </Form.Message>
      </Form.Field>

      <Form.Field
        name='email'
        className='field mb-16'>
        <Form.Label className='label'>Email</Form.Label>
        <Form.Control asChild>
          <input
            type='email'
            required
            className='input'
            placeholder='you@example.com'
          />
        </Form.Control>
        <Form.Message
          match='valueMissing'
          className='error'>
          Please enter your email.
        </Form.Message>
        <Form.Message
          match='typeMismatch'
          className='error'>
          Please enter a valid email address.
        </Form.Message>
      </Form.Field>

      <Form.Submit className='btn btn-radix w-full'>Create account</Form.Submit>
    </Form.Root>
  )
}
