import './index.css'
import { Form, Input, Button, Space } from 'antd'

export default function App() {
  const [form] = Form.useForm()

  const onFinish = (values: Record<string, unknown>) => {
    console.log('Submitted:', values)
  }

  return (
    <div className='p-24 max-w-480'>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        scrollToFirstError
        validateTrigger='onBlur'>
        <Form.Item
          label='Username'
          name='username'
          rules={[
            { required: true, message: 'Please enter your username.' },
            { min: 3, message: 'Username must be at least 3 characters.' }
          ]}>
          <Input
            placeholder='Enter username'
            autoComplete='username'
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
          />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            { required: true, message: 'Please enter a password.' },
            { min: 8, message: 'Password must be at least 8 characters.' }
          ]}>
          <Input.Password
            placeholder='Minimum 8 characters'
            autoComplete='new-password'
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type='primary'
              htmlType='submit'>
              Create Account
            </Button>
            <Button
              htmlType='reset'
              onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}
