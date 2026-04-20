import './index.css'
import { useState } from 'react'
import { AppBar, Toolbar, Button, Menu, MenuItem, Box, Typography } from '@mui/material'

const currentPath = '/'

export default function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const menuOpen = Boolean(anchorEl)
  const menuId = menuOpen ? 'products-menu' : undefined

  return (
    <Box>
      <AppBar
        position='static'
        component='header'>
        <Toolbar
          component='nav'
          aria-label='Main navigation'
          sx={{ gap: 1 }}>
          <Typography
            variant='h6'
            sx={{ flexGrow: 0, mr: 2 }}>
            My App
          </Typography>

          <Button
            color='inherit'
            href='/'
            component='a'
            aria-current={currentPath === '/' ? 'page' : undefined}>
            Home
          </Button>

          <Button
            color='inherit'
            href='/about'
            component='a'
            aria-current={currentPath === '/about' ? 'page' : undefined}>
            About
          </Button>

          <Button
            color='inherit'
            aria-haspopup='menu'
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={(e) => setAnchorEl(e.currentTarget)}>
            Products ▾
          </Button>

          <Menu
            id={menuId}
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{ 'aria-label': 'Products submenu' }}>
            <MenuItem
              component='a'
              href='/products/all'
              onClick={() => setAnchorEl(null)}>
              All Products
            </MenuItem>
            <MenuItem
              component='a'
              href='/products/new'
              onClick={() => setAnchorEl(null)}>
              New Arrivals
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
