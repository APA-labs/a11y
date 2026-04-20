import './index.css'
import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className='app'>
      <Button
        variant='outlined'
        color='error'
        onClick={() => setOpen(true)}>
        Delete file
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        PaperProps={{ role: 'alertdialog' }}>
        <DialogTitle id='alert-dialog-title'>Delete File</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to permanently delete this file? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            autoFocus>
            Cancel
          </Button>
          <Button
            onClick={() => setOpen(false)}
            color='error'
            variant='contained'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
