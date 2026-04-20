import './index.css'
import { Radio } from 'antd'

export default function App() {
  const OPTIONS = [
    { label: 'Standard shipping', value: 'standard' },
    { label: 'Express shipping', value: 'express' }
  ]

  return (
    <div className='app'>
      <p
        id='shipping-label'
        className='label mb-8'>
        Shipping speed
      </p>
      <Radio.Group
        options={OPTIONS}
        defaultValue='standard'
        aria-labelledby='shipping-label'
      />
    </div>
  )
}
