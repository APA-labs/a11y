import './index.css'
import { useState } from 'react'
import { Menu } from 'antd'

const items = [
  {
    key: 'home',
    label: <a href='/'>Home</a>
  },
  {
    key: 'products',
    label: 'Products',
    children: [
      { key: 'all', label: <a href='/products'>All Products</a> },
      { key: 'new', label: <a href='/products/new'>New Arrivals</a> },
      { key: 'sale', label: <a href='/products/sale'>On Sale</a> }
    ]
  },
  {
    key: 'about',
    label: <a href='/about'>About</a>
  },
  {
    key: 'contact',
    label: <a href='/contact'>Contact</a>
  }
]

export default function App() {
  const [current, setCurrent] = useState('home')

  return (
    <nav aria-label='Main navigation'>
      <Menu
        mode='horizontal'
        items={items}
        selectedKeys={[current]}
        onClick={({ key }) => setCurrent(key)}
        className='nav-ant-menu-border-none'
      />
    </nav>
  )
}
