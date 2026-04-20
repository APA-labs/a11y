import './index.css'
import { Disclosure, DisclosureGroup, Heading, DisclosurePanel, Button } from 'react-aria-components'

const ITEMS = [
  { id: 'shipping', title: 'Shipping Info', content: 'Ships within 2–3 business days after order confirmation.' },
  { id: 'returns', title: 'Return Policy', content: 'Returns accepted within 7 days of receipt in original condition.' },
  { id: 'warranty', title: 'Warranty', content: '1-year limited warranty covering manufacturing defects.' }
]

export default function App() {
  return (
    <DisclosureGroup
      defaultExpandedKeys={['shipping']}
      className='app max-w-480'>
      {ITEMS.map((item) => (
        <Disclosure
          key={item.id}
          id={item.id}
          className='accordion-item-sep'>
          <Heading>
            <Button
              slot='trigger'
              className='accordion-trigger-btn'>
              {item.title}
              <span aria-hidden>›</span>
            </Button>
          </Heading>
          <DisclosurePanel className='accordion-content-text'>{item.content}</DisclosurePanel>
        </Disclosure>
      ))}
    </DisclosureGroup>
  )
}
