import './index.css'
import { MenuTrigger, Menu, MenuItem, MenuSection, Separator, Button, Popover, Text, Header } from 'react-aria-components'

export default function App() {
  return (
    <nav
      aria-label='Main navigation'
      className='app'>
      <MenuTrigger>
        <Button className='btn'>File ▾</Button>
        <Popover className='panel nav-spectrum-popover'>
          <Menu
            onAction={(key) => alert(`Action: ${key}`)}
            className='nav-spectrum-menu'>
            <MenuSection>
              <Header
                className='label'
                className='label nav-spectrum-section-header'>
                Actions
              </Header>
              <MenuItem
                id='new'
                className='nav-spectrum-menuitem'>
                <Text slot='label'>New file</Text>
                <Text slot='description'>Create a new document</Text>
              </MenuItem>
              <MenuItem
                id='open'
                className='nav-spectrum-menuitem'>
                <Text slot='label'>Open...</Text>
              </MenuItem>
            </MenuSection>
            <Separator className='nav-spectrum-separator' />
            <MenuItem
              id='quit'
              className='nav-spectrum-menuitem nav-spectrum-quit'>
              Quit
            </MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
    </nav>
  )
}
