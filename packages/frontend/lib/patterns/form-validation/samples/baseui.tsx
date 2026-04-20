import './index.css'
import { Field } from '@base-ui/react/field'

export default function App() {
  return (
    <form
      className='app max-w-360 stack'
      onSubmit={(e) => {
        e.preventDefault()
        alert('Submitted!')
      }}>
      <Field.Root name='name'>
        <Field.Label className='label'>
          Full name <span aria-hidden>*</span>
        </Field.Label>
        <Field.Control
          as='input'
          required
          minLength={2}
          placeholder='Enter your full name'
          className='input'
        />
        <Field.Error
          match='valueMissing'
          className='error'>
          Please enter your full name.
        </Field.Error>
        <Field.Error
          match='tooShort'
          className='error'>
          Name must be at least 2 characters.
        </Field.Error>
      </Field.Root>

      <Field.Root name='email'>
        <Field.Label className='label'>
          Email <span aria-hidden>*</span>
        </Field.Label>
        <Field.Control
          as='input'
          type='email'
          required
          placeholder='you@example.com'
          className='input'
        />
        <Field.Error
          match='valueMissing'
          className='error'>
          Please enter your email.
        </Field.Error>
        <Field.Error
          match='typeMismatch'
          className='error'>
          Please enter a valid email address.
        </Field.Error>
        <Field.Description className='hint'>We will never share your email.</Field.Description>
      </Field.Root>

      <button
        type='submit'
        className='btn btn-primary w-full'>
        Submit
      </button>
    </form>
  )
}
