import './index.css'
import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'

export default function App() {
  const [notifications, setNotifications] = useState(true)
  const [emails, setEmails] = useState(false)

  return (
    <div className='app'>
      <Popover.Root>
        <Popover.Trigger className='btn btn-radix'>Notification settings</Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            sideOffset={8}
            className='panel min-w-260'>
            <p className='font-bold mt-0 mb-12'>Notification settings</p>

            <label className='row justify-between cursor-pointer mb-8'>
              Push notifications
              <input
                type='checkbox'
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
            </label>
            <label className='row justify-between cursor-pointer'>
              Email notifications
              <input
                type='checkbox'
                checked={emails}
                onChange={(e) => setEmails(e.target.checked)}
              />
            </label>

            <Popover.Arrow className='popover-arrow' />

            <Popover.Close
              aria-label='Close notification settings'
              className='dialog-close-top-right btn-ghost'>
              ✕
            </Popover.Close>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
