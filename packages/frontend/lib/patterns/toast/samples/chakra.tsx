import './index.css'
import { Button, Toast, Toaster, createToaster } from '@chakra-ui/react'

const toaster = createToaster({ placement: 'top-end', duration: 5000 })

export default function App() {
  const showToast = () => {
    toaster.success({
      title: 'Saved',
      description: 'Your changes have been saved successfully.'
    })
  }

  return (
    <div className='app'>
      <Button
        colorPalette='blue'
        onClick={showToast}>
        Save
      </Button>
      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast.Root>
            <Toast.Title>{toast.title}</Toast.Title>
            <Toast.Description>{toast.description}</Toast.Description>
            <Toast.CloseTrigger />
          </Toast.Root>
        )}
      </Toaster>
    </div>
  )
}
