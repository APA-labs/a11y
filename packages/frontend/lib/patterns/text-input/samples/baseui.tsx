import './index.css'
import { Field } from '@base-ui/react/field'
import { Input } from '@base-ui/react/input'

export default function App() {
  return (
    <div className='p-24 max-w-360 stack gap-16'>
      <Field.Root name='name'>
        <Field.Label className='label'>
          Full name <span aria-hidden>*</span>
        </Field.Label>
        <Field.Control
          render={<Input className='input' />}
          required
          placeholder='Enter your full name'
        />
        <Field.Error
          match='valueMissing'
          className='error'>
          Please enter your full name.
        </Field.Error>
        <Field.Description className='hint'>Visible on your profile.</Field.Description>
      </Field.Root>

      <Field.Root name='email'>
        <Field.Label className='label'>
          Email <span aria-hidden>*</span>
        </Field.Label>
        <Field.Control
          render={
            <Input
              type='email'
              className='input'
            />
          }
          required
          placeholder='you@example.com'
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
      </Field.Root>
    </div>
  )
}
