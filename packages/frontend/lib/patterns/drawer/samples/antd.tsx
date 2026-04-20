import './index.css'
import { useState } from 'react'
import { Drawer, Button, Space } from 'antd'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className='app'>
      <Button
        type='primary'
        onClick={() => setOpen(true)}
        aria-haspopup='dialog'>
        Open Settings
      </Button>

      <Drawer
        title='Settings'
        open={open}
        onClose={() => setOpen(false)}
        placement='right'
        keyboard
        footer={
          <Space>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              type='primary'
              onClick={() => setOpen(false)}>
              Save
            </Button>
          </Space>
        }>
        <div className='stack'>
          <p className='mt-0 mb-0'>Notification preferences</p>
          <label className='row'>
            <input type='checkbox' /> Email notifications
          </label>
          <label className='row'>
            <input
              type='checkbox'
              defaultChecked
            />{' '}
            Push notifications
          </label>
        </div>
      </Drawer>
    </div>
  )
}
