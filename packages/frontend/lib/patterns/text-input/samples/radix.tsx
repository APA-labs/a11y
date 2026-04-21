import * as Form from '@radix-ui/react-form'
;<Form.Root>
  <Form.Field name='email'>
    <Form.Label>
      Email <span aria-hidden>*</span>
    </Form.Label>
    <Form.Control asChild>
      <input
        type='email'
        required
        autoComplete='email'
        className='input'
      />
    </Form.Control>
    <Form.Message match='valueMissing'>Please enter your email.</Form.Message>
    <Form.Message match='typeMismatch'>Please enter a valid email address.</Form.Message>
  </Form.Field>
</Form.Root>
