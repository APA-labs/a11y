import './index.css'
import { AutoComplete } from 'antd'

const OPTIONS = [{ value: 'Apple' }, { value: 'Banana' }]

export default function App() {
  return (
    <div className='app'>
      <AutoComplete
        options={OPTIONS}
        placeholder='Type a fruit'
        filterOption={(input, option) => (option?.value ?? '').toLowerCase().includes(input.toLowerCase())}
        aria-label='Select fruit'
      />
    </div>
  )
}
