import './index.css'
import { useState } from 'react'
import { Popover, Button, Space, Typography } from 'antd'

export default function App() {
  const [open, setOpen] = useState(false)

  const content = (
    <div className='min-w-240'>
      <Typography.Text className='hint mb-8'>Configure your notification preferences below.</Typography.Text>
      <Space
        direction='vertical'
        className='w-full mb-12'>
        <label className='row'>
          <input
            type='checkbox'
            defaultChecked
          />{' '}
          Email notifications
        </label>
        <label className='row'>
          <input type='checkbox' /> Push notifications
        </label>
      </Space>
      <Button
        size='small'
        onClick={() => setOpen(false)}
        aria-label='Close settings popover'>
        Close
      </Button>
    </div>
  )

  return (
    <div className='app'>
      <Popover
        content={content}
        title='Notification Settings'
        open={open}
        onOpenChange={setOpen}
        trigger='click'
        placement='bottomLeft'>
        <Button
          type='default'
          aria-expanded={open}
          aria-haspopup='dialog'>
          ⚙ Settings
        </Button>
      </Popover>
    </div>
  )
}
