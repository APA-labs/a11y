import './index.css'
import { Tabs, TabList, Tab, TabPanel } from 'react-aria-components'

const TABS = [
  { id: 'overview', label: 'Overview', content: 'General information about your account.' },
  { id: 'security', label: 'Security', content: 'Manage your password and two-factor authentication.' },
  { id: 'notifications', label: 'Notifications', content: 'Configure your notification preferences.' }
]

export default function App() {
  return (
    <div className='p-24 max-w-480'>
      <Tabs defaultSelectedKey='overview'>
        <TabList
          aria-label='Account settings'
          className='tab-list'>
          {TABS.map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              className='tab-aria'>
              {tab.label}
            </Tab>
          ))}
        </TabList>
        {TABS.map((tab) => (
          <TabPanel
            key={tab.id}
            id={tab.id}
            className='tab-content'>
            {tab.content}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  )
}
