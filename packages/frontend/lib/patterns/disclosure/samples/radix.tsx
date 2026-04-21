import './index.css'
import { useState } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className='app max-w-480'>
      <Collapsible.Root
        open={open}
        onOpenChange={setOpen}
        className='accordion-item'>
        <Collapsible.Trigger className='accordion-trigger-padded'>
          System requirements
          <span aria-hidden>{open ? '▲' : '▼'}</span>
        </Collapsible.Trigger>
        <Collapsible.Content className='accordion-panel'>
          <ul>
            <li>OS: Windows 10 or later, macOS 10.15 or later</li>
            <li>Memory: 4 GB RAM minimum</li>
            <li>Storage: 2 GB available disk space</li>
          </ul>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  )
}
