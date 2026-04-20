import './index.css'
import { Link } from '@chakra-ui/react'

export default function App() {
  return (
    <p>
      For more details, see the{' '}
      <Link
        href='https://example.com'
        colorPalette='teal'
        target='_blank'
        rel='noopener noreferrer'>
        official docs
        <span className='sr-only'> (opens in new tab)</span>
      </Link>
      .
    </p>
  )
}
