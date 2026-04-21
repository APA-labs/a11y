import './index.css'
import { Link } from '@mui/material'

export default function App() {
  return (
    <div className='app stack'>
      <Link
        href='/about'
        underline='always'>
        About Us
      </Link>
      <Link
        href='https://example.com'
        target='_blank'
        rel='noreferrer'>
        External site
        <span className='sr-only'> (opens in new tab)</span>
      </Link>
    </div>
  )
}
