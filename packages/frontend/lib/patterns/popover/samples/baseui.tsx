import './index.css'
import { Popover } from '@base-ui/react/popover'

export default function App() {
  return (
    <div className='app'>
      <Popover.Root>
        <Popover.Trigger className='btn'>Notification settings</Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner sideOffset={8}>
            <Popover.Popup className='panel min-w-240'>
              <Popover.Arrow className='popover-arrow-bordered' />
              <Popover.Title className='font-bold mt-0 mb-4'>Notifications</Popover.Title>
              <Popover.Description className='hint mt-0 mb-12'>You are all caught up. Good job!</Popover.Description>
              <Popover.Close className='btn btn-sm'>Dismiss</Popover.Close>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
