import './index.css'
import { useState } from 'react'
import * as Toast from '@radix-ui/react-toast'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <Toast.Provider duration={5000}>
      <button
        className='btn btn-primary'
        onClick={() => setOpen(true)}>
        Save
      </button>

      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className='toast-root'>
        <Toast.Title className='font-bold'>Saved</Toast.Title>
        <Toast.Description className='text-sm'>Your changes have been saved successfully.</Toast.Description>
        <Toast.Close
          className='btn btn-ghost btn-sm'
          aria-label='Dismiss notification'>
          ✕
        </Toast.Close>
      </Toast.Root>

      <Toast.Viewport className='toast-viewport' />
    </Toast.Provider>
  )
}
