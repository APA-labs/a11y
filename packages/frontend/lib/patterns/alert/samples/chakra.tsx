import './index.css'
import { useState } from 'react'
import { Alert, Button } from '@chakra-ui/react'

export default function App() {
  const [message, setMessage] = useState('')

  return (
    <div className='app stack'>
      <Button
        colorPalette='blue'
        onClick={() => setMessage('Your changes have been saved.')}>
        Save
      </Button>

      {message ? (
        <Alert.Root status='success'>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Success</Alert.Title>
            <Alert.Description>{message}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      ) : null}
    </div>
  )
}
