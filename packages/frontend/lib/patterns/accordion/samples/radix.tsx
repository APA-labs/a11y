import './index.css'
import * as Accordion from '@radix-ui/react-accordion'

const ITEMS = [
  {
    value: 'item-1',
    heading: 'What is Radix UI?',
    content: 'Radix UI is a low-level UI component library focused on accessibility, customization, and developer experience.'
  },
  {
    value: 'item-2',
    heading: 'Is it accessible?',
    content: 'Yes. Radix components follow WAI-ARIA patterns and handle keyboard navigation automatically.'
  },
  {
    value: 'item-3',
    heading: 'Can I style it?',
    content: 'Radix is unstyled by default. Apply any CSS solution — inline styles, CSS modules, Tailwind, or CSS-in-JS.'
  }
]

export default function App() {
  return (
    <Accordion.Root
      type='single'
      collapsible
      className='app accordion-root'>
      {ITEMS.map((item) => (
        <Accordion.Item
          key={item.value}
          value={item.value}
          className='accordion-item-sep'>
          <Accordion.Header>
            <Accordion.Trigger className='accordion-trigger-btn'>
              {item.heading}
              <span aria-hidden>›</span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className='accordion-content-text'>{item.content}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
