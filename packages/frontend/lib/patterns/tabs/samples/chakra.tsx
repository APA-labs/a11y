import './index.css'
import { Tabs } from '@chakra-ui/react'

export default function App() {
  return (
    <Tabs.Root
      defaultValue='profile'
      className='max-w-560 p-24'>
      <Tabs.List aria-label='Account settings'>
        <Tabs.Trigger value='profile'>Profile</Tabs.Trigger>
        <Tabs.Trigger value='security'>Security</Tabs.Trigger>
        <Tabs.Trigger value='notifications'>Notifications</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content
        value='profile'
        className='tab-content'>
        Manage your profile information, avatar, and display name.
      </Tabs.Content>
      <Tabs.Content
        value='security'
        className='tab-content'>
        Update your password and configure two-factor authentication.
      </Tabs.Content>
      <Tabs.Content
        value='notifications'
        className='tab-content'>
        Choose which notifications you receive via email or push.
      </Tabs.Content>
    </Tabs.Root>
  )
}
