import './index.css'
import { useState } from 'react'
import { Switch, Typography, Space } from 'antd'

const SETTINGS = [
  { id: 'push', label: 'Push notifications', defaultChecked: true },
  { id: 'email', label: 'Email notifications', defaultChecked: false },
  { id: 'sms', label: 'SMS alerts', defaultChecked: false }
]

export default function App() {
  const [values, setValues] = useState<Record<string, boolean>>(Object.fromEntries(SETTINGS.map((s) => [s.id, s.defaultChecked])))

  const toggle = (id: string, checked: boolean) => setValues((prev) => ({ ...prev, [id]: checked }))

  return (
    <div className='app stack max-w-360'>
      <Typography.Title
        level={5}
        className='mt-0 mb-0'>
        Notification Preferences
      </Typography.Title>
      <Space
        direction='vertical'
        className='w-full'
        size={16}>
        {SETTINGS.map((s) => (
          <div
            key={s.id}
            className='row justify-between'>
            <label
              htmlFor={s.id}
              className='cursor-pointer'>
              {s.label}
            </label>
            <Switch
              id={s.id}
              checked={values[s.id]}
              onChange={(checked) => toggle(s.id, checked)}
              checkedChildren='On'
              unCheckedChildren='Off'
            />
          </div>
        ))}
      </Space>
    </div>
  )
}
