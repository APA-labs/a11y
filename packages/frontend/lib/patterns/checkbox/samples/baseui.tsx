import './index.css'
import { useState } from 'react'
import { Checkbox } from '@base-ui/react/checkbox'

export default function App() {
  const [emailChecked, setEmailChecked] = useState(true)
  const [smsChecked, setSmsChecked] = useState(false)
  return (
    <div className='app stack'>
      <label>
        <Checkbox.Root
          checked={emailChecked}
          onCheckedChange={setEmailChecked}>
          <Checkbox.Indicator>✓</Checkbox.Indicator>
        </Checkbox.Root>
        Email notifications
      </label>
      <label>
        <Checkbox.Root
          checked={smsChecked}
          onCheckedChange={setSmsChecked}>
          <Checkbox.Indicator>✓</Checkbox.Indicator>
        </Checkbox.Root>
        SMS notifications
      </label>
    </div>
  )
}
