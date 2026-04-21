import './index.css'
import { useRef } from 'react'
import { Button, Dialog } from '@chakra-ui/react'

export default function App() {
  const cancelRef = useRef<HTMLButtonElement>(null)

  return (
    <div className='app'>
      <Dialog.Root
        role='alertdialog'
        initialFocusEl={() => cancelRef.current}>
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
            </Dialog.Header>
            <Dialog.Body>
              <Dialog.Description>Are you sure you want to permanently delete this file? This action cannot be undone.</Dialog.Description>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  ref={cancelRef}
                  variant='outline'>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button colorPalette='red'>Delete</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </div>
  )
}
