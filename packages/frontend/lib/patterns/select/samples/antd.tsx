import './index.css'
import { useState } from 'react'
import { Form, Select, Button, Typography } from 'antd'

const FRUIT_OPTIONS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
  { value: 'mango', label: 'Mango', disabled: true }
]

const COUNTRY_OPTIONS = [
  { value: 'kr', label: 'South Korea' },
  { value: 'us', label: 'United States' },
  { value: 'jp', label: 'Japan' },
  { value: 'de', label: 'Germany' }
]

export default function App() {
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(null)

  return (
    <div className='p-24 max-w-480'>
      <Typography.Title
        level={4}
        className='mb-24'>
        Preferences
      </Typography.Title>

      <Form
        layout='vertical'
        onFinish={(values) => setSubmitted(values)}>
        <Form.Item
          label='Favorite fruit'
          name='fruit'
          rules={[{ required: true, message: 'Please select a fruit' }]}>
          <Select
            placeholder='Choose a fruit'
            options={FRUIT_OPTIONS}
            virtual={false}
          />
        </Form.Item>

        <Form.Item
          label='Country'
          name='country'
          rules={[{ required: true, message: 'Please select a country' }]}>
          <Select
            placeholder='Search or select a country'
            options={COUNTRY_OPTIONS}
            showSearch
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            notFoundContent='No matching country'
          />
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'>
            Save preferences
          </Button>
        </Form.Item>
      </Form>

      {submitted && (
        <div
          role='status'
          className='status-badge mt-16'>
          Saved: {submitted.fruit}, {submitted.country}
        </div>
      )}
    </div>
  )
}
