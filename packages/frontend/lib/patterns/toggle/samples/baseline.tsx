import './index.css'
import { useState } from 'react'

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false)

  return (
    <div className='app'>
      <label htmlFor='notifications'>Notification settings</label>
      <button
        id='notifications'
        role='switch'
        aria-checked={isEnabled}
        onClick={() => setIsEnabled(!isEnabled)}
        className='switch-root'>
        <span className='sr-only'>{isEnabled ? 'On' : 'Off'}</span>
        <span
          aria-hidden
          className='switch-thumb'
        />
      </button>
    </div>
  )
}
