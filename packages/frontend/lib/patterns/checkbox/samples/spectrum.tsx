import './index.css'
import { useState } from 'react'
import { Checkbox } from '@adobe/react-spectrum'

export default function App() {
  const [isSelected, setIsSelected] = useState(false)
  return (
    <div className='app'>
      <Checkbox
        isSelected={isSelected}
        onChange={setIsSelected}>
        I agree to the terms of service
      </Checkbox>
    </div>
  )
}
