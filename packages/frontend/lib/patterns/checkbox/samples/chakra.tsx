import './index.css'
import { useState } from 'react'
import { Checkbox } from '@chakra-ui/react'

export default function App() {
  const [checked, setChecked] = useState(false)
  return (
    <div className='app'>
      <Checkbox.Root
        checked={checked}
        onCheckedChange={(e) => setChecked(!!e.checked)}>
        <Checkbox.HiddenInput />
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Label>I agree to the terms of service</Checkbox.Label>
      </Checkbox.Root>
    </div>
  )
}
