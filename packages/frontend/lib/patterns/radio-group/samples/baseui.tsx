import './index.css'
import { useState } from 'react'
import { RadioGroup } from '@base-ui/react/radio-group'
import { Radio } from '@base-ui/react/radio'

const options = [
  { value: 'email', label: '이메일' },
  { value: 'sms', label: 'SMS' },
  { value: 'push', label: '푸시 알림' }
]

export default function App() {
  const [value, setValue] = useState('email')

  return (
    <div className='app stack'>
      <p
        id='notification-label'
        className='label mb-8'>
        알림 수단
      </p>
      <RadioGroup
        value={value}
        onValueChange={setValue}
        aria-labelledby='notification-label'
        className='stack gap-8'>
        {options.map((opt) => (
          <label
            key={opt.value}
            className='row cursor-pointer'>
            <Radio.Root
              value={opt.value}
              className='radio-btn'>
              <Radio.Indicator className='radio-indicator' />
            </Radio.Root>
            <span className='cursor-pointer'>{opt.label}</span>
          </label>
        ))}
      </RadioGroup>
    </div>
  )
}
