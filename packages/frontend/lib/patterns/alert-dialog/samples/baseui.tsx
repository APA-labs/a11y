import './index.css'
import { AlertDialog } from '@base-ui/react/alert-dialog'

export default function App() {
  return (
    <div className='app'>
      <AlertDialog.Root>
        <AlertDialog.Trigger className='btn btn-danger-outline'>Delete file</AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Backdrop className='overlay' />
          <AlertDialog.Popup className='dialog'>
            <AlertDialog.Title className='dialog-title bottom-space-8'>Delete File</AlertDialog.Title>
            <AlertDialog.Description className='hint bottom-space-20'>
              Are you sure you want to permanently delete this file? This action cannot be undone.
            </AlertDialog.Description>
            <div className='row justify-end'>
              <AlertDialog.Close className='btn'>Cancel</AlertDialog.Close>
              <AlertDialog.Close className='btn btn-danger-solid'>Delete</AlertDialog.Close>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  )
}
