import './index.css'
import { useState, useRef } from 'react'
import { Button, Popover, Typography, Box, Switch, FormControlLabel } from '@mui/material'

export default function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [notifications, setNotifications] = useState(true)
  const [emails, setEmails] = useState(false)
  const open = Boolean(anchorEl)
  const popoverId = open ? 'settings-popover' : undefined

  return (
    <div className='app'>
      <Button
        variant='outlined'
        aria-describedby={popoverId}
        aria-expanded={open}
        aria-haspopup='dialog'
        onClick={(e) => setAnchorEl(e.currentTarget)}>
        Notification settings
      </Button>

      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
        <Box
          role='dialog'
          aria-label='Notification settings'
          sx={{ p: 2, minWidth: 240 }}>
          <Typography
            variant='subtitle1'
            component='h2'
            gutterBottom>
            Notification Settings
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                inputProps={{ 'aria-label': 'Push notifications' }}
              />
            }
            label='Push notifications'
          />
          <FormControlLabel
            control={
              <Switch
                checked={emails}
                onChange={(e) => setEmails(e.target.checked)}
                inputProps={{ 'aria-label': 'Email notifications' }}
              />
            }
            label='Email notifications'
          />
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              size='small'
              onClick={() => setAnchorEl(null)}>
              Close
            </Button>
          </Box>
        </Box>
      </Popover>
    </div>
  )
}
