import './index.css'
import { useState } from 'react'
import { Switch, Stack } from '@chakra-ui/react'

const SETTINGS = [
  { id: 'push', label: 'Push notifications', default: true },
  { id: 'email', label: 'Email notifications', default: false },
  { id: 'sms', label: 'SMS alerts', default: false }
]

export default function App() {
  const [values, setValues] = useState<Record<string, boolean>>(Object.fromEntries(SETTINGS.map((s) => [s.id, s.default])))

  return (
    <div className='app stack max-w-360'>
      <p className='font-bold mt-0 mb-0'>Notification Preferences</p>
      {SETTINGS.map((s) => (
        <Switch.Root
          key={s.id}
          colorPalette='teal'
          checked={values[s.id]}
          onCheckedChange={(e) => setValues((prev) => ({ ...prev, [s.id]: e.checked }))}>
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>{s.label}</Switch.Label>
        </Switch.Root>
      ))}
    </div>
  )
}
