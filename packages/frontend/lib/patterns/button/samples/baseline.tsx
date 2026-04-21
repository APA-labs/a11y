import './index.css'
import { useState } from 'react'

export default function App() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className='app'>
      <button
        type='button'
        aria-label='Save file'
        aria-disabled={isLoading}
        aria-busy={isLoading}
        className='btn'
        onClick={() => {
          setIsLoading(true)
          setTimeout(() => setIsLoading(false), 1500)
        }}>
        {isLoading ? <span aria-hidden>⏳</span> : 'Save'}
      </button>
    </div>
  )
}
