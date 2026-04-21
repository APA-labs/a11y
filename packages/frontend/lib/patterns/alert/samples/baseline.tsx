import './index.css'
import { useState } from 'react'

export default function App() {
  const [message, setMessage] = useState('')

  const save = () => {
    setMessage('저장되었습니다.')
  }

  return (
    <div className='app stack'>
      <button
        className='btn btn-primary'
        onClick={save}>
        Save
      </button>

      <div
        role='status'
        aria-live='polite'
        aria-atomic='true'
        className='sr-only'>
        {message}
      </div>

      {message ? <p className='hint'>{message}</p> : null}
    </div>
  )
}
