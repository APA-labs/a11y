import './index.css'
import { Form, TextField, Label, Input, FieldError, Button, Text } from 'react-aria-components'

export default function App() {
  return (
    <Form
      className='app max-w-360 stack'
      onSubmit={(e) => {
        e.preventDefault()
        alert('Submitted!')
      }}>
      <TextField
        name='name'
        isRequired>
        <Label className='label'>Full name</Label>
        <Input
          className='input'
          placeholder='Enter your full name'
        />
        <FieldError className='error' />
      </TextField>

      <TextField
        name='username'
        isRequired
        validate={(v) => (v.length >= 3 ? null : 'Username must be at least 3 characters.')}>
        <Label className='label'>Username</Label>
        <Input
          className='input'
          placeholder='Choose a username'
        />
        <Text
          slot='description'
          className='hint'>
          Minimum 3 characters.
        </Text>
        <FieldError className='error' />
      </TextField>

      <div className='row'>
        <Button
          type='submit'
          className='btn btn-accent w-full'>
          Submit
        </Button>
        <Button
          type='reset'
          className='btn w-full'>
          Reset
        </Button>
      </div>
    </Form>
  )
}
