import './index.css'
import { useState } from 'react'
import { Button, Collapse, Box } from '@mui/material'

export default function App() {
  const [open, setOpen] = useState(false)
  return (
    <Box className='app'>
      <Button
        aria-expanded={open}
        aria-controls='mui-disclosure-content'
        onClick={() => setOpen(!open)}
        variant='text'>
        System requirements
      </Button>
      <Collapse in={open}>
        <Box id='mui-disclosure-content'>OS: Windows 10+, macOS 10.15+. RAM: 4GB minimum.</Box>
      </Collapse>
    </Box>
  )
}
