import './index.css'
import { useState } from 'react'
import * as Switch from '@radix-ui/react-switch'

const SETTINGS = [
  { id: 'push', label: 'Push notifications', defaultChecked: true },
  { id: 'email', label: 'Email notifications', defaultChecked: false },
  { id: 'sms', label: 'SMS alerts', defaultChecked: false }
]

export default function App() {
  const [settings, setSettings] = useState<Record<string, boolean>>(Object.fromEntries(SETTINGS.map((s) => [s.id, s.defaultChecked])))

  const toggle = (id: string, val: boolean) => setSettings((prev) => ({ ...prev, [id]: val }))

  return (
    <div className='app stack'>
      <p className='font-bold mt-0 mb-0'>Notification preferences</p>
      {SETTINGS.map((s) => (
        <div
          key={s.id}
          className='row justify-between'>
          <label
            htmlFor={s.id}
            className='cursor-pointer'>
            {s.label}
          </label>
          <Switch.Root
            id={s.id}
            checked={settings[s.id]}
            onCheckedChange={(val) => toggle(s.id, val)}
            className='switch-root'>
            <Switch.Thumb className='switch-thumb' />
          </Switch.Root>
        </div>
      ))}
    </div>
  )
}
