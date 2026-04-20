import './index.css'
import { Checkbox } from 'antd'

const OPTIONS = [
  { label: 'Email', value: 'email' },
  { label: 'SMS', value: 'sms' }
]

export default function App() {
  return (
    <div className='app'>
      <Checkbox.Group
        options={OPTIONS}
        onChange={(values) => console.log(values)}
        aria-label='Notification method'
      />
    </div>
  )
}
