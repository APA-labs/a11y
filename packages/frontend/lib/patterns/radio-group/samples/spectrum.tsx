import './index.css'
import { useState } from 'react'
import { RadioGroup, Radio } from '@adobe/react-spectrum'

export default function App() {
  const [value, setValue] = useState('option-1')

  return (
    <div className='app'>
      <RadioGroup
        label='Select option'
        value={value}
        onChange={setValue}>
        <Radio value='option-1'>Option 1</Radio>
        <Radio value='option-2'>Option 2</Radio>
        <Radio value='option-3'>Option 3</Radio>
      </RadioGroup>
    </div>
  )
}
