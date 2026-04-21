import './index.css'
import * as RadioGroup from '@radix-ui/react-radio-group'

export default function App() {
  return (
    <div className='app'>
      <RadioGroup.Root
        defaultValue='standard'
        aria-label='Shipping speed'
        className='stack gap-8'>
        <label className='row'>
          <RadioGroup.Item
            value='standard'
            className='radio-btn'>
            <RadioGroup.Indicator className='radio-indicator' />
          </RadioGroup.Item>
          Standard shipping
        </label>
        <label className='row'>
          <RadioGroup.Item
            value='express'
            className='radio-btn'>
            <RadioGroup.Indicator className='radio-indicator' />
          </RadioGroup.Item>
          Express shipping
        </label>
      </RadioGroup.Root>
    </div>
  )
}
