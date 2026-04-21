import { TooltipTrigger, Tooltip, Button } from 'react-aria-components'

const ACTIONS = [
  { id: 'edit', label: 'Edit', icon: '✎' },
  { id: 'copy', label: 'Copy', icon: '⧉' },
  { id: 'delete', label: 'Delete', icon: '✕' }
]

export default function App() {
  return (
    <div className='row gap-8 p-24'>
      {ACTIONS.map((action) => (
        <TooltipTrigger
          key={action.id}
          delay={700}
          closeDelay={300}>
          <Button
            aria-label={action.label}
            className='btn-icon'>
            {action.icon}
          </Button>
          <Tooltip className='tooltip-content-dark'>{action.label}</Tooltip>
        </TooltipTrigger>
      ))}
    </div>
  )
}
