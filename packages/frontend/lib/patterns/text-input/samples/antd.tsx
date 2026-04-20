import { useState } from 'react'
import { Form, Input, Button, Space } from 'antd'

export default function App() {
  const [form] = Form.useForm()
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className='p-24 max-w-480'>
      <Form
        form={form}
        layout='vertical'
        onFinish={(values) => setSubmitted(true)}
        validateTrigger='onBlur'>
        <Form.Item
          label='Full Name'
          name='name'
          rules={[{ required: true, message: 'Please enter your name.' }]}>
          <Input
            placeholder='John Doe'
            autoComplete='name'
          />
        </Form.Item>

        <Form.Item
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Please enter your email.' },
            { type: 'email', message: 'Please enter a valid email address.' }
          ]}>
          <Input
            type='email'
            placeholder='you@example.com'
            autoComplete='email'
            prefix={<span aria-hidden>@</span>}
          />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please enter a password.' }]}>
          <Input.Password
            placeholder='Enter password'
            autoComplete='new-password'
          />
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {submitted && (
        <p
          role='status'
          className='text-success mt-8'>
          Form submitted successfully!
        </p>
      )}
    </div>
  )
}
