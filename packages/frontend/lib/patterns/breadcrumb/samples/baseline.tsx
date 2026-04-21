import './index.css'

export default function App() {
  return (
    <nav aria-label='breadcrumb'>
      <ol className='breadcrumb'>
        <li>
          <a href='/'>Home</a>
        </li>
        <li
          aria-hidden='true'
          className='breadcrumb-sep'>
          /
        </li>
        <li>
          <a href='/products'>Products</a>
        </li>
        <li
          aria-hidden='true'
          className='breadcrumb-sep'>
          /
        </li>
        <li>
          <a href='/products/shoes'>Shoes</a>
        </li>
        <li
          aria-hidden='true'
          className='breadcrumb-sep'>
          /
        </li>
        <li aria-current='page'>Sneakers</li>
      </ol>
    </nav>
  )
}
