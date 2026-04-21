import './index.css'
import { useState } from 'react'
import { Tabs, Tab, Box, Typography } from '@mui/material'

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`
  }
}

interface TabPanelProps {
  children: React.ReactNode
  value: number
  index: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role='tabpanel'
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      hidden={value !== index}
      className='tab-panel'>
      {value === index && <Typography>{children}</Typography>}
    </div>
  )
}

export default function App() {
  const [value, setValue] = useState(0)

  return (
    <Box className='p-24 w-full'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          aria-label='Account settings tabs'>
          <Tab
            label='Profile'
            {...a11yProps(0)}
          />
          <Tab
            label='Security'
            {...a11yProps(1)}
          />
          <Tab
            label='Notifications'
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel
        value={value}
        index={0}>
        Manage your profile information, avatar, and display name.
      </TabPanel>
      <TabPanel
        value={value}
        index={1}>
        Update your password and configure two-factor authentication.
      </TabPanel>
      <TabPanel
        value={value}
        index={2}>
        Choose which notifications you receive via email or push.
      </TabPanel>
    </Box>
  )
}
