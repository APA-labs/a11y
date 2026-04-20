import './index.css'
import { useState } from 'react'
import { Switch, FormControlLabel, FormGroup, ToggleButton, ToggleButtonGroup, Typography, Box, Divider } from '@mui/material'

export default function App() {
  const [notifications, setNotifications] = useState(true)
  const [marketing, setMarketing] = useState(false)
  const [alignment, setAlignment] = useState('left')

  return (
    <div className='app stack gap-24'>
      <div>
        <Typography
          variant='subtitle1'
          component='h2'
          gutterBottom>
          Notification Preferences
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                slotProps={{
                  input: { role: 'switch', 'aria-checked': notifications } as React.AriaAttributes & React.HTMLAttributes<HTMLInputElement>
                }}
              />
            }
            label='Push notifications'
          />
          <FormControlLabel
            control={
              <Switch
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                slotProps={{ input: { role: 'switch', 'aria-checked': marketing } as React.AriaAttributes & React.HTMLAttributes<HTMLInputElement> }}
              />
            }
            label='Marketing emails'
          />
        </FormGroup>
      </div>

      <Divider />

      <div>
        <Typography
          variant='subtitle1'
          component='h2'
          gutterBottom>
          Text Alignment
        </Typography>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={(_, val) => val && setAlignment(val)}
          aria-label='Text alignment'>
          <ToggleButton
            value='left'
            aria-label='Left align'>
            L
          </ToggleButton>
          <ToggleButton
            value='center'
            aria-label='Center align'>
            C
          </ToggleButton>
          <ToggleButton
            value='right'
            aria-label='Right align'>
            R
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  )
}
