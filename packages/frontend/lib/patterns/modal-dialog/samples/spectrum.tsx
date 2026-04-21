import './index.css'
import { Button, DialogTrigger, Modal, ModalOverlay, Dialog, Heading } from 'react-aria-components'

export default function App() {
  return (
    <div className='app'>
      <DialogTrigger>
        <Button className='btn btn-primary btn-accent'>Delete file</Button>
        <ModalOverlay className='overlay center'>
          <Modal className='dialog-spectrum'>
            <Dialog className='outline-none'>
              {({ close }) => (
                <>
                  <Heading
                    slot='title'
                    className='dialog-title bottom-space-8'>
                    Delete File
                  </Heading>
                  <p className='hint bottom-space-20'>Are you sure? This action cannot be undone.</p>
                  <div className='row justify-end'>
                    <Button
                      onPress={close}
                      className='btn btn-sm'>
                      Cancel
                    </Button>
                    <Button
                      onPress={close}
                      className='btn btn-primary btn-danger-solid'>
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </div>
  )
}
