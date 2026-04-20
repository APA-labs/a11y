import './index.css'
import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Box, Typography } from '@mui/material'

export default function App() {
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className='app stack max-w-360'>
        <Typography variant='h6'>Schedule</Typography>

        <DatePicker
          label='Date of birth'
          value={birthDate}
          onChange={(newDate) => setBirthDate(newDate)}
          slotProps={{
            textField: {
              required: true,
              helperText: 'Format: MM/DD/YYYY',
              fullWidth: true
            }
          }}
        />

        <DatePicker
          label='Appointment date'
          value={appointmentDate}
          onChange={(newDate) => setAppointmentDate(newDate)}
          disablePast
          slotProps={{
            textField: {
              helperText: 'Select a future date',
              fullWidth: true
            }
          }}
        />
      </Box>
    </LocalizationProvider>
  )
}
