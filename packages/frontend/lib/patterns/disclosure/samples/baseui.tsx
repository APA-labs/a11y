import './index.css'
import { Collapsible } from '@base-ui/react/collapsible'

export default function App() {
  return (
    <div className='app max-w-480'>
      <Collapsible.Root className='accordion-item'>
        <Collapsible.Trigger className='accordion-trigger-padded'>
          Recovery keys
          <span aria-hidden>›</span>
        </Collapsible.Trigger>
        <Collapsible.Panel className='accordion-panel'>
          <div>alien-bean-pasta</div>
          <div>wild-irish-burrito</div>
          <div>horse-battery-staple</div>
        </Collapsible.Panel>
      </Collapsible.Root>
    </div>
  )
}
