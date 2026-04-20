import './index.css'
import { useState } from 'react'
import { Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material'

export default function App() {
  const [emailChecked, setEmailChecked] = useState(false)
  const [smsChecked, setSmsChecked] = useState(false)

  return (
    <div className='app'>
      <FormGroup>
        <FormLabel component='legend'>Notification Settings</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={emailChecked}
              onChange={(e) => setEmailChecked(e.target.checked)}
            />
          }
          label='Email notifications'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={smsChecked}
              onChange={(e) => setSmsChecked(e.target.checked)}
            />
          }
          label='SMS notifications'
        />
      </FormGroup>
    </div>
  )
}
