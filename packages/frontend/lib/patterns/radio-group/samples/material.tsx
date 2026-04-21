import './index.css'
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'

export default function App() {
  return (
    <div className='app'>
      <FormControl>
        <FormLabel id='shipping-label'>Shipping Speed</FormLabel>
        <RadioGroup
          aria-labelledby='shipping-label'
          defaultValue='standard'>
          <FormControlLabel
            value='standard'
            control={<Radio />}
            label='Standard shipping (3–5 days)'
          />
          <FormControlLabel
            value='express'
            control={<Radio />}
            label='Express shipping (1–2 days)'
          />
        </RadioGroup>
      </FormControl>
    </div>
  )
}
