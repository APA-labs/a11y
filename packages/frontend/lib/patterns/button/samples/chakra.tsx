import './index.css'
import { Button, Stack } from '@chakra-ui/react'
import { useState } from 'react'

export default function App() {
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <Stack
      direction='row'
      gap={3}
      className='app'
      wrap='wrap'>
      <Button
        colorPalette='teal'
        loading={loading}
        loadingText='Saving...'
        onClick={handleSave}>
        Save
      </Button>

      <Button
        colorPalette='teal'
        variant='outline'>
        Outlined
      </Button>

      <Button
        disabled
        aria-disabled='true'>
        Disabled
      </Button>

      <Button
        colorPalette='red'
        variant='solid'
        aria-label='Delete selected item'>
        Delete
      </Button>
    </Stack>
  )
}
