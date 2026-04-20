import './index.css'
import { UNSTABLE_ToastRegion as ToastRegion, UNSTABLE_ToastQueue as ToastQueue, UNSTABLE_Toast as Toast, Button } from 'react-aria-components'

const queue = new ToastQueue({ maxVisibleToasts: 3 })

export default function App() {
  return (
    <div className='app'>
      <Button
        className='btn btn-primary'
        onPress={() => queue.add({ title: 'Saved', description: 'Your changes have been saved.' }, { timeout: 5000 })}>
        Save
      </Button>
      <ToastRegion
        queue={queue}
        className='toast-viewport'>
        {(toast) => (
          <Toast
            toast={toast}
            className='toast-root'>
            <div className='row justify-between w-full'>
              <div>
                <div className='font-bold'>{toast.content.title}</div>
                <div className='text-sm'>{toast.content.description}</div>
              </div>
              <Button
                slot='close'
                className='btn btn-ghost btn-sm'
                aria-label='Dismiss'>
                ✕
              </Button>
            </div>
          </Toast>
        )}
      </ToastRegion>
    </div>
  )
}
