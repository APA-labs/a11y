import './index.css'
import { Button } from '@base-ui/react/button'
import { useState } from 'react'

export default function App() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className='app row'>
      <Button
        disabled={isLoading}
        focusableWhenDisabled
        aria-busy={isLoading}
        className='btn btn-primary max-h-44'
        onClick={() => {
          setIsLoading(true)
          setTimeout(() => setIsLoading(false), 2000)
        }}>
        {isLoading ? 'Saving...' : 'Save'}
      </Button>

      <Button
        disabled
        focusableWhenDisabled
        className='btn max-h-44'>
        Disabled
      </Button>

      <Button
        aria-label='Delete selected item'
        className='btn btn-danger-solid max-h-44'>
        Delete
      </Button>
    </div>
  )
}
