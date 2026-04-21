import './index.css'
import { Breadcrumb } from 'antd'

export default function App() {
  return (
    <Breadcrumb
      aria-label='breadcrumb'
      items={[
        { title: <a href='/'>Home</a> },
        { title: <a href='/products'>Products</a> },
        { title: <a href='/products/shoes'>Shoes</a> },
        { title: 'Sneakers' }
      ]}
      itemRender={(item, _params, items) => {
        const isLast = items.indexOf(item) === items.length - 1
        return isLast ? <span aria-current='page'>{item.title}</span> : item.title
      }}
    />
  )
}
