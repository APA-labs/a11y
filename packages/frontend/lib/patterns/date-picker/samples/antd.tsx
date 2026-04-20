import './index.css'
import { useState } from 'react'
import { DatePicker, Form, ConfigProvider } from 'antd'
import dayjs from 'dayjs'

export default function App() {
  const [value, setValue] = useState(null)

  const disablePastDates = (current) => {
    return current && current < dayjs().startOf('day')
  }

  return (
    <ConfigProvider>
      <div className='app stack'>
        <Form layout='vertical'>
          <Form.Item
            label='Appointment Date'
            name='date'
            rules={[{ required: true, message: 'Please select a date' }]}>
            <DatePicker
              value={value}
              onChange={(date) => setValue(date)}
              format='YYYY-MM-DD'
              placeholder='Select appointment date'
              disabledDate={disablePastDates}
              className='w-full'
            />
          </Form.Item>
          <Form.Item
            label='Birth Date'
            name='birthDate'>
            <DatePicker
              format='YYYY-MM-DD'
              placeholder='Select birth date'
              className='w-full'
            />
          </Form.Item>
        </Form>
        <span className='text-muted'>Selected: {value ? value.format('YYYY-MM-DD') : 'None'}</span>
      </div>
    </ConfigProvider>
  )
}
