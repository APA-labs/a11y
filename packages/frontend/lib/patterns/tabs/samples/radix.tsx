import './index.css'
import * as Tabs from '@radix-ui/react-tabs'

export default function App() {
  return (
    <div className='max-w-560 mx-auto p-24'>
      <Tabs.Root
        defaultValue='profile'
        activationMode='manual'>
        <Tabs.List
          aria-label='Account settings'
          className='tab-list'>
          <Tabs.Trigger
            value='profile'
            className='tab'>
            Profile
          </Tabs.Trigger>
          <Tabs.Trigger
            value='security'
            className='tab'>
            Security
          </Tabs.Trigger>
          <Tabs.Trigger
            value='notifications'
            className='tab'>
            Notifications
          </Tabs.Trigger>
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
    </div>
  )
}
