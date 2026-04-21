import './index.css'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'

export default function App() {
  return (
    <NavigationMenu.Root className='nav-relative-pad'>
      <NavigationMenu.List className='tab-list nav-radix-list'>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href='/'
            className='menu-item nav-link-block'
            aria-current='page'>
            Home
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className='btn btn-ghost'>
            Products <span aria-hidden>▾</span>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className='panel stack nav-content-min180'>
            <NavigationMenu.Link
              href='/products/all'
              className='menu-item nav-link-block'>
              All Products
            </NavigationMenu.Link>
            <NavigationMenu.Link
              href='/products/new'
              className='menu-item nav-link-block'>
              New Arrivals
            </NavigationMenu.Link>
            <NavigationMenu.Link
              href='/products/sale'
              className='menu-item nav-link-block'>
              Sale
            </NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className='btn btn-ghost'>
            Company <span aria-hidden>▾</span>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className='panel stack nav-content-min180'>
            <NavigationMenu.Link
              href='/about'
              className='menu-item nav-link-block'>
              About us
            </NavigationMenu.Link>
            <NavigationMenu.Link
              href='/careers'
              className='menu-item nav-link-block'>
              Careers
            </NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link
            href='/contact'
            className='menu-item nav-link-block'>
            Contact
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Viewport className='nav-viewport' />
    </NavigationMenu.Root>
  )
}
