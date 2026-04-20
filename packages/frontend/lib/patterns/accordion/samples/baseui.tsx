import './index.css'
import { Accordion } from '@base-ui/react/accordion'

const ITEMS = [
  { value: 'q1', heading: 'What is Base UI?', content: 'Base UI is a library of unstyled React components for design systems and web apps.' },
  {
    value: 'q2',
    heading: 'Is it accessible?',
    content: 'Yes. All components follow WAI-ARIA patterns and handle keyboard navigation automatically.'
  },
  { value: 'q3', heading: 'Can I style it?', content: 'Yes. Apply any CSS solution — inline styles, CSS modules, Tailwind, or CSS-in-JS.' }
]

export default function App() {
  return (
    <Accordion.Root className='app accordion-root'>
      {ITEMS.map((item) => (
        <Accordion.Item
          key={item.value}
          value={item.value}
          className='accordion-item-sep'>
          <Accordion.Header>
            <Accordion.Trigger className='accordion-trigger-btn'>
              {item.heading}
              <span aria-hidden>+</span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className='accordion-content-text'>{item.content}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
