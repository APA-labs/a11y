import './index.css'
import { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Box, Typography } from '@mui/material'

export default function App() {
  const [country, setCountry] = useState('')
  const [role, setRole] = useState('')
  const hasError = !role

  return (
    <Box className='p-24 stack gap-24 max-w-400'>
      <Typography variant='h6'>User Preferences</Typography>

      <FormControl fullWidth>
        <InputLabel id='country-label'>Country</InputLabel>
        <Select
          labelId='country-label'
          id='country-select'
          value={country}
          label='Country'
          onChange={(e) => setCountry(e.target.value)}>
          <MenuItem value='us'>United States</MenuItem>
          <MenuItem value='kr'>South Korea</MenuItem>
          <MenuItem value='jp'>Japan</MenuItem>
          <MenuItem value='de'>Germany</MenuItem>
        </Select>
        <FormHelperText>Select your country of residence</FormHelperText>
      </FormControl>

      <FormControl
        fullWidth
        error={hasError}
        required>
        <InputLabel id='role-label'>Role</InputLabel>
        <Select
          labelId='role-label'
          id='role-select'
          value={role}
          label='Role'
          onChange={(e) => setRole(e.target.value)}>
          <MenuItem value='developer'>Developer</MenuItem>
          <MenuItem value='designer'>Designer</MenuItem>
          <MenuItem value='manager'>Product Manager</MenuItem>
          <MenuItem
            value='qa'
            disabled>
            QA Engineer (unavailable)
          </MenuItem>
        </Select>
        {hasError && <FormHelperText>Please select your role</FormHelperText>}
      </FormControl>
    </Box>
  )
}
