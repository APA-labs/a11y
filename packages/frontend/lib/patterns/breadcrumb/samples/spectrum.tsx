import './index.css'
import { Breadcrumbs, Item } from '@adobe/react-spectrum'

export default function App() {
  return (
    <Breadcrumbs>
      <Item
        key='home'
        href='/'>
        Home
      </Item>
      <Item
        key='products'
        href='/products'>
        Products
      </Item>
      <Item key='shoes'>Sneakers</Item>
    </Breadcrumbs>
  )
}
