import './index.css'
import { useState } from 'react'
import { Drawer, Box, Button, Typography, List, ListItem, ListItemButton, ListItemText, Divider, IconButton } from '@mui/material'

const NAV_ITEMS = ['Home', 'About', 'Services', 'Contact']

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className='app'>
      <Button
        variant='outlined'
        onClick={() => setOpen(true)}
        aria-haspopup='dialog'>
        Open navigation
      </Button>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='drawer-heading'>
        <Box
          sx={{ width: 280 }}
          role='presentation'>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
            <Typography
              id='drawer-heading'
              variant='h6'
              component='h2'>
              Navigation
            </Typography>
            <IconButton
              onClick={() => setOpen(false)}
              aria-label='Close navigation drawer'
              size='small'>
              ✕
            </IconButton>
          </Box>
          <Divider />
          <nav aria-label='Main navigation'>
            <List>
              {NAV_ITEMS.map((item) => (
                <ListItem
                  key={item}
                  disablePadding>
                  <ListItemButton onClick={() => setOpen(false)}>
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </nav>
        </Box>
      </Drawer>
    </div>
  )
}
