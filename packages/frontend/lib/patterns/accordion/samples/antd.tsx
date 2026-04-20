import './index.css'
import { Collapse } from 'antd'
import type { CollapseProps } from 'antd'

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'What is Ant Design?',
    children: <p className='mb-0'>Ant Design is an enterprise-class UI design language and React component library.</p>
  },
  {
    key: '2',
    label: 'Is it accessible?',
    children: <p className='mb-0'>Ant Design Collapse manages aria-expanded automatically and supports keyboard navigation.</p>
  },
  {
    key: '3',
    label: 'Disabled panel',
    children: <p className='mb-0'>This panel cannot be collapsed.</p>,
    collapsible: 'disabled'
  }
]

export default function App() {
  return (
    <div className='app max-w-560'>
      <Collapse
        accordion
        items={items}
        defaultActiveKey={['1']}
      />
    </div>
  )
}
