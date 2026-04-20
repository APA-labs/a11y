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
          <Radio.Root
            key={opt.value}
            value={opt.value}
            className='row cursor-pointer'>
            <div className='radio-btn'>{value === opt.value && <span className='radio-indicator' />}</div>
            <Radio.Label className='cursor-pointer'>{opt.label}</Radio.Label>
          </Radio.Root>
        ))}
      </RadioGroup>
    </div>
  )
}
