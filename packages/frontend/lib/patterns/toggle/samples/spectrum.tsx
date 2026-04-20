import './index.css'
import { useState } from 'react'
import { Switch, ToggleButton } from 'react-aria-components'

const SETTINGS = [
  { id: 'wifi', label: 'Wi-Fi', default: true },
  { id: 'bluetooth', label: 'Bluetooth', default: false }
]

export default function App() {
  const [settings, setSettings] = useState<Record<string, boolean>>(Object.fromEntries(SETTINGS.map((s) => [s.id, s.default])))
  const [pinned, setPinned] = useState(false)

  const toggle = (id: string, val: boolean) => setSettings((prev) => ({ ...prev, [id]: val }))

  return (
    <div className='app stack max-w-320'>
      <p className='font-bold mt-0 mb-0'>Settings</p>
      {SETTINGS.map((s) => (
        <Switch
          key={s.id}
          isSelected={settings[s.id]}
          onChange={(val) => toggle(s.id, val)}
          className='row cursor-pointer'>
          <div className='switch-sm'>
            <div className='switch-thumb-sm' />
          </div>
          {s.label}
        </Switch>
      ))}

      <div className='stack gap-8'>
        <p className='font-bold mt-0 mb-0'>ToggleButton</p>
        <ToggleButton
          isSelected={pinned}
          onChange={setPinned}
          aria-label='Pin this item'
          className='btn btn-toggle'>
          {pinned ? '★ Pinned' : '☆ Pin'}
        </ToggleButton>
      </div>
    </div>
  )
}
