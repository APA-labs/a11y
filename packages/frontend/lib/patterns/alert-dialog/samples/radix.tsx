import './index.css'
import { useState } from 'react'
import * as AlertDialog from '@radix-ui/react-dialog'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className='app'>
      <AlertDialog.Root
        open={open}
        onOpenChange={setOpen}>
        <AlertDialog.Trigger className='btn btn-danger-outline'>Delete file</AlertDialog.Trigger>

        <AlertDialog.Portal>
          <AlertDialog.Overlay className='overlay' />
          <AlertDialog.Content
            className='dialog'
            role='alertdialog'>
            <AlertDialog.Title className='dialog-title bottom-space-8'>Delete File</AlertDialog.Title>
            <AlertDialog.Description className='hint bottom-space-20'>
              Are you sure you want to permanently delete this file? This action cannot be undone.
            </AlertDialog.Description>
            <div className='row justify-end'>
              <AlertDialog.Close className='btn'>Cancel</AlertDialog.Close>
              <button
                className='btn btn-danger-solid'
                onClick={() => setOpen(false)}>
                Delete
              </button>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  )
}
