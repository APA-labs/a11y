import './index.css'
import { NavigationMenu } from '@base-ui/react/navigation-menu'

const ITEMS = [
  { id: 'overview', label: 'Overview', links: ['Quick Start', 'Accessibility', 'Releases'] },
  { id: 'handbook', label: 'Handbook', links: ['Styling', 'Animation', 'TypeScript'] }
]

export default function App() {
  return (
    <NavigationMenu.Root
      aria-label='Main navigation'
      className='app'>
      <NavigationMenu.List className='row'>
        {ITEMS.map((item) => (
          <NavigationMenu.Item key={item.id}>
            <NavigationMenu.Trigger className='btn btn-ghost row'>
              {item.label}
              <NavigationMenu.Icon>
                <span aria-hidden>▾</span>
              </NavigationMenu.Icon>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <ul className='menu'>
                {item.links.map((link) => (
                  <li key={link}>
                    <NavigationMenu.Link
                      render={<a href='#' />}
                      className='menu-item'>
                      {link}
                    </NavigationMenu.Link>
                  </li>
                ))}
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          sideOffset={10}
          className='nav-viewport'>
          <NavigationMenu.Popup className='panel'>
            <NavigationMenu.Viewport />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  )
}
