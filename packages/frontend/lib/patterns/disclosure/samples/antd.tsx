import './index.css'
import { Collapse } from 'antd'

const items = [
  {
    key: '1',
    label: 'Section Title',
    children: <p>Content goes here.</p>
  }
]

export default function App() {
  return (
    <div className='app'>
      <Collapse items={items} />
    </div>
  )
}
