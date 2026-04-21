import './index.css'
import { useState } from 'react'
import { Disclosure, Heading, DisclosurePanel, Button } from 'react-aria-components'

const ITEMS = [
  { id: 'req', title: 'System Requirements', content: 'OS: Windows 10 or later, macOS 10.15 or later. RAM: 4GB minimum.' },
  { id: 'install', title: 'Installation', content: 'Download the installer and follow the on-screen instructions.' }
]

export default function App() {
  const [expanded, setExpanded] = useState<string | null>('req')

  return (
    <div className='app stack-sm max-w-480'>
      {ITEMS.map((item) => (
        <Disclosure
          key={item.id}
          isExpanded={expanded === item.id}
          onExpandedChange={(open) => setExpanded(open ? item.id : null)}
          className='accordion-item-sep'>
          <Heading>
            <Button
              slot='trigger'
              className='accordion-trigger-btn'>
              {item.title}
              <span aria-hidden>{expanded === item.id ? '▲' : '▼'}</span>
            </Button>
          </Heading>
          <DisclosurePanel className='accordion-content-text'>{item.content}</DisclosurePanel>
        </Disclosure>
      ))}
    </div>
  )
}
