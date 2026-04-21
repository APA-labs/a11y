import './index.css'
import { Dialog } from '@base-ui/react/dialog'

export default function App() {
  return (
    <div className='app'>
      <Dialog.Root>
        <Dialog.Trigger className='btn btn-primary'>View notifications</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop className='overlay' />
          <Dialog.Popup className='dialog'>
            <Dialog.Title className='dialog-title bottom-space-8'>Notifications</Dialog.Title>
            <Dialog.Description className='hint bottom-space-20'>You are all caught up. Good job!</Dialog.Description>
            <div className='row justify-end'>
              <Dialog.Close className='btn'>Close</Dialog.Close>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
