import './index.css'
import { Autocomplete, TextField } from '@mui/material'

const OPTIONS = ['Apple', 'Banana', 'Cherry']

export default function App() {
  return (
    <div className='app'>
      <Autocomplete
        id='fruit-select'
        options={OPTIONS}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Select fruit'
          />
        )}
      />
    </div>
  )
}
