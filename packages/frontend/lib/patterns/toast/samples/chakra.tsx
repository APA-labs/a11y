import './index.css'
import { Button, createToaster } from '@chakra-ui/react'

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
      <toaster.Toaster />
    </div>
  )
}
