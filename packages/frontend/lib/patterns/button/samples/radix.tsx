import './index.css'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  isLoading?: boolean
  children?: React.ReactNode
}

function Button({ asChild, isLoading, children, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      aria-busy={isLoading}
      aria-disabled={isLoading || props.disabled}
      className='btn'
      {...props}>
      {children}
    </Comp>
  )
}

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <div className='app'>
      <Button
        isLoading={isLoading}
        onClick={() => setIsLoading(!isLoading)}>
        {isLoading ? 'Saving...' : 'Save'}
      </Button>
    </div>
  )
}
