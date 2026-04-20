import './index.css'
import { useState } from 'react'
import { Alert, AlertTitle, Button } from '@mui/material'

export default function App() {
  const [message, setMessage] = useState('')

  return (
    <div className='app stack'>
      <Button
        variant='contained'
        onClick={() => setMessage('Your changes have been saved.')}>
        Save
      </Button>

      {message ? (
        <Alert
          severity='success'
          onClose={() => setMessage('')}>
          <AlertTitle>Success</AlertTitle>
          {message}
        </Alert>
      ) : null}
    </div>
  )
}
