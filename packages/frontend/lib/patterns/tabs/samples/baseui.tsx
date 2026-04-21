import './index.css'
import { Tabs } from '@base-ui/react/tabs'

export default function App() {
  return (
    <Tabs.Root
      defaultValue='overview'
      className='max-w-480 mx-auto p-24'>
      <Tabs.List
        aria-label='Content sections'
        className='tab-list'>
        {['overview', 'projects', 'account'].map((val) => (
          <Tabs.Tab
            key={val}
            value={val}
            className='tab'>
            {val.charAt(0).toUpperCase() + val.slice(1)}
          </Tabs.Tab>
        ))}
        <Tabs.Indicator className='tabs-indicator' />
      </Tabs.List>
      <Tabs.Panel
        value='overview'
        className='tab-content'>
        Overview content here.
      </Tabs.Panel>
      <Tabs.Panel
        value='projects'
        className='tab-content'>
        Projects content here.
      </Tabs.Panel>
      <Tabs.Panel
        value='account'
        className='tab-content'>
        Account settings here.
      </Tabs.Panel>
    </Tabs.Root>
  )
}
