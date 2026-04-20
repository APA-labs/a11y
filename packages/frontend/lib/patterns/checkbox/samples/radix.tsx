import './index.css'
import { useState } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'

const ITEMS = [
  { id: 'email', label: 'Email notifications' },
  { id: 'sms', label: 'SMS notifications' },
  { id: 'push', label: 'Push notifications' }
]

export default function App() {
  const [checked, setChecked] = useState<Record<string, boolean>>({ email: true, sms: false, push: false })

  return (
    <div className='app stack'>
      <p className='mb-0 font-bold'>Notification preferences</p>
      {ITEMS.map((item) => (
        <div
          key={item.id}
          className='checkbox-row'>
          <Checkbox.Root
            id={item.id}
            className='checkbox-root'
            checked={checked[item.id]}
            onCheckedChange={(val) => setChecked((prev) => ({ ...prev, [item.id]: val === true }))}>
            <Checkbox.Indicator>
              <span
                aria-hidden
                className='checkbox-indicator'>
                ✓
              </span>
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label
            htmlFor={item.id}
            className='cursor-pointer'>
            {item.label}
          </label>
        </div>
      ))}
    </div>
  )
}
