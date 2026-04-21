import './index.css'
import { Button, CircularProgress, Stack } from '@mui/material'
import { useState } from 'react'

export default function App() {
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <Stack
      spacing={2}
      direction='row'
      className='app'>
      <Button
        variant='contained'
        onClick={handleSave}
        disabled={loading}
        aria-busy={loading}
        startIcon={
          loading ? (
            <CircularProgress
              size={16}
              aria-hidden='true'
            />
          ) : undefined
        }
        sx={{ minHeight: 44 }}>
        {loading ? 'Saving...' : 'Save'}
      </Button>

      <Button
        variant='outlined'
        disabled
        aria-disabled='true'
        sx={{ minHeight: 44 }}>
        Disabled
      </Button>

      <Button
        variant='contained'
        color='error'
        aria-label='Delete selected item'
        sx={{ minHeight: 44 }}>
        Delete
      </Button>
    </Stack>
  )
}
