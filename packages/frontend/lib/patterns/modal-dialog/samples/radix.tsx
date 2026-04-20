import './index.css'
import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className='app'>
      <Dialog.Root
        open={open}
        onOpenChange={setOpen}>
        <Dialog.Trigger className='btn btn-danger-outline'>Delete file</Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className='overlay' />
          <Dialog.Content className='dialog dialog-wide'>
            <Dialog.Title className='dialog-title bottom-space-8'>Delete File</Dialog.Title>
            <Dialog.Description className='hint bottom-space-20'>
              Are you sure you want to permanently delete this file? This action cannot be undone.
            </Dialog.Description>

            <div className='row justify-end'>
              <Dialog.Close className='btn'>Cancel</Dialog.Close>
              <button
                className='btn btn-primary btn-danger-solid'
                onClick={() => setOpen(false)}>
                Delete
              </button>
            </div>

            <Dialog.Close
              aria-label='Close dialog'
              className='dialog-close btn-ghost'>
              ✕
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
