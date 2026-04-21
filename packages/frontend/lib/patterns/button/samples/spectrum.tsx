import './index.css'
import { useState } from 'react'
import { Button } from 'react-aria-components'

export default function App() {
  const [isPending, setPending] = useState(false)

  const handleSave = () => {
    setPending(true)
    setTimeout(() => setPending(false), 2000)
  }

  return (
    <div className='app row'>
      <Button
        isPending={isPending}
        onPress={handleSave}
        className='btn btn-accent max-h-44'>
        {isPending ? 'Saving...' : 'Save'}
      </Button>

      <Button
        isDisabled
        className='btn max-h-44'>
        Disabled
      </Button>

      <Button
        aria-label='Delete selected item'
        className='btn btn-danger-outline max-h-44'>
        Delete
      </Button>
    </div>
  )
}
