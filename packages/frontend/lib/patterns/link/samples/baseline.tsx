import './index.css'

export default function App() {
  return (
    <div className='app stack'>
      <a href='/about'>About Us</a>
      <a
        href='https://example.com'
        target='_blank'
        rel='noreferrer noopener'>
        External site
        <span className='sr-only'> (opens in new tab)</span>
      </a>
    </div>
  )
}
