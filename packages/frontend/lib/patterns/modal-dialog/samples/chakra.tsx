import './index.css'
import { Button, Dialog } from '@chakra-ui/react'

export default function App() {
  return (
    <div className='app'>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button
            colorPalette='red'
            variant='outline'>
            Delete file
          </Button>
        </Dialog.Trigger>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete File</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                  aria-label='Close dialog'
                  className='dialog-close-top-right'>
                  ✕
                </Button>
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <Dialog.Description>Are you sure you want to permanently delete this file? This action cannot be undone.</Dialog.Description>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant='outline'>Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette='red'>Delete</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </div>
  )
}
