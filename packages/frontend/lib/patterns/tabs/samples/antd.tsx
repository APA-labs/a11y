import './index.css'
import { useState } from 'react'
import { Tabs, Typography } from 'antd'

const TAB_ITEMS = [
  {
    key: 'profile',
    label: 'Profile',
    children: (
      <div className='tab-panel'>
        <Typography.Title
          level={5}
          className='mt-0'>
          Profile Settings
        </Typography.Title>
        <p className='text-muted'>Manage your profile information, avatar, and display name.</p>
      </div>
    )
  },
  {
    key: 'security',
    label: 'Security',
    children: (
      <div className='tab-panel'>
        <Typography.Title
          level={5}
          className='mt-0'>
          Security Settings
        </Typography.Title>
        <p className='text-muted'>Update your password and configure two-factor authentication.</p>
      </div>
    )
  },
  {
    key: 'notifications',
    label: 'Notifications',
    children: (
      <div className='tab-panel'>
        <Typography.Title
          level={5}
          className='mt-0'>
          Notification Preferences
        </Typography.Title>
        <p className='text-muted'>Choose which notifications you receive via email or push.</p>
      </div>
    )
  }
]

export default function App() {
  const [activeKey, setActiveKey] = useState('profile')

  return (
    <div className='p-24 max-w-560'>
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        items={TAB_ITEMS}
      />
    </div>
  )
}
