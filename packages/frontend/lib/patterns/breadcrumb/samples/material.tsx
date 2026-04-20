import './index.css'
import { Breadcrumbs, Link, Typography } from '@mui/material'

export default function App() {
  return (
    <Breadcrumbs aria-label='breadcrumb'>
      <Link
        href='/'
        underline='hover'
        color='inherit'>
        Home
      </Link>
      <Link
        href='/products'
        underline='hover'
        color='inherit'>
        Products
      </Link>
      <Link
        href='/products/shoes'
        underline='hover'
        color='inherit'>
        Shoes
      </Link>
      <Typography
        color='text.primary'
        aria-current='page'>
        Sneakers
      </Typography>
    </Breadcrumbs>
  )
}
