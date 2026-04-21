import './index.css'
import { useState } from 'react'
import { Alert, Button } from 'antd'

export default function App() {
  const [message, setMessage] = useState('')

  return (
    <div className='app stack'>
      <Button
        type='primary'
        onClick={() => setMessage('Your changes have been saved.')}>
        Save
      </Button>

      {message ? (
        <Alert
          type='success'
          message='Success'
          description={message}
          showIcon
          closable
          onClose={() => setMessage('')}
          role='alert'
        />
      ) : null}
    </div>
  )
}
