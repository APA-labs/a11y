import './index.css'
import { useState } from 'react'
import { Popover, Button, Stack } from '@chakra-ui/react'

export default function App() {
  const [notifications, setNotifications] = useState(true)
  const [emails, setEmails] = useState(false)

  return (
    <div className='app'>
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button
            colorPalette='teal'
            variant='outline'>
            Notification settings
          </Button>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content className='min-w-260'>
            <Popover.Arrow>
              <Popover.ArrowTip />
            </Popover.Arrow>
            <Popover.CloseTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                aria-label='Close settings popover'
                className='popover-close'>
                ✕
              </Button>
            </Popover.CloseTrigger>
            <Popover.Body>
              <Popover.Title className='mb-12'>Notification Settings</Popover.Title>
              <Stack gap={3}>
                <label className='row justify-between'>
                  Push notifications
                  <input
                    type='checkbox'
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                </label>
                <label className='row justify-between'>
                  Email notifications
                  <input
                    type='checkbox'
                    checked={emails}
                    onChange={(e) => setEmails(e.target.checked)}
                  />
                </label>
              </Stack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </div>
  )
}
