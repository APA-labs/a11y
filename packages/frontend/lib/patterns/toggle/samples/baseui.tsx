import './index.css'
import { useState } from 'react'
import { Switch } from '@base-ui/react/switch'

const SETTINGS = [
  { id: 'push', label: 'Push notifications', defaultChecked: true },
  { id: 'email', label: 'Email notifications', defaultChecked: false }
]

export default function App() {
  const [values, setValues] = useState<Record<string, boolean>>(Object.fromEntries(SETTINGS.map((s) => [s.id, s.defaultChecked])))

  return (
    <div className='app stack max-w-320'>
      <p className='font-bold mt-0 mb-0'>Notification Preferences</p>
      {SETTINGS.map((s) => (
        <label
          key={s.id}
          className='row justify-between cursor-pointer'>
          {s.label}
          <Switch.Root
            checked={values[s.id]}
            onCheckedChange={(checked) => setValues((prev) => ({ ...prev, [s.id]: checked }))}
            className='switch-root'>
            <Switch.Thumb className='switch-thumb' />
          </Switch.Root>
        </label>
      ))}
    </div>
  )
}
