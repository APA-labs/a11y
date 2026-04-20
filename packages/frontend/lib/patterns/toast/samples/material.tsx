import './index.css'
import { useState } from 'react'
import { Snackbar, Alert, Button } from '@mui/material'

export default function App() {
  const [open, setOpen] = useState(false)

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  return (
    <div className='app'>
      <Button
        variant='contained'
        onClick={() => setOpen(true)}>
        Save
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity='success'
          variant='filled'>
          Your changes have been saved successfully.
        </Alert>
      </Snackbar>
    </div>
  )
}
