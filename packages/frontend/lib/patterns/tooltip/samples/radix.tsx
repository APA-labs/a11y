import './index.css'
import * as Tooltip from '@radix-ui/react-tooltip'

export default function App() {
  return (
    <Tooltip.Provider delayDuration={300}>
      <div className='row gap-16 p-32'>
        <Tooltip.Root>
          <Tooltip.Trigger className='btn'>Save</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side='top'
              sideOffset={6}
              className='tooltip-content-dark'>
              Save your current changes (Ctrl+S)
              <Tooltip.Arrow className='tooltip-arrow-dark' />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger
            aria-label='Copy to clipboard'
            className='btn-icon'>
            ⎘
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side='top'
              sideOffset={6}
              className='tooltip-content-dark'>
              Copy to clipboard
              <Tooltip.Arrow className='tooltip-arrow-dark' />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger
            aria-label='Delete item'
            className='btn-icon btn-icon-danger'>
            ✕
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side='top'
              sideOffset={6}
              className='tooltip-content-error'>
              Delete this item permanently
              <Tooltip.Arrow className='tooltip-arrow-error' />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>
    </Tooltip.Provider>
  )
}
