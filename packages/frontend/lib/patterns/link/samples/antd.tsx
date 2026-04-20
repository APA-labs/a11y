import './index.css'
import { Typography } from 'antd'

const { Link } = Typography

export default function App() {
  return (
    <div className='app stack'>
      <Link href='/about'>About Us</Link>
      <Link
        href='https://example.com'
        target='_blank'>
        External site
        <span className='sr-only'> (opens in new tab)</span>
      </Link>
    </div>
  )
}
