import './index.css'
import { Accordion } from '@chakra-ui/react'

const ITEMS = [
  { value: 'shipping', label: 'Shipping Info', body: 'Ships within 2–3 business days after order confirmation.' },
  { value: 'returns', label: 'Return Policy', body: 'Returns accepted within 7 days of receipt in original condition.' },
  { value: 'warranty', label: 'Warranty', body: '1-year limited warranty covering manufacturing defects.' }
]

export default function App() {
  return (
    <Accordion.Root
      collapsible
      defaultValue={['shipping']}
      className='app max-w-480'>
      {ITEMS.map((item) => (
        <Accordion.Item
          key={item.value}
          value={item.value}
          className='accordion-item-sep'>
          <Accordion.ItemTrigger className='accordion-trigger-btn'>
            {item.label}
            <Accordion.ItemIndicator aria-hidden />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody className='accordion-content-text'>{item.body}</Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
