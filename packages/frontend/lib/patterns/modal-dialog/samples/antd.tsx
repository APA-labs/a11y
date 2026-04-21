import './index.css'
import { useState } from 'react'
import { Modal, Button, Space } from 'antd'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className='app'>
      <Button
        type='primary'
        danger
        onClick={() => setOpen(true)}
        aria-haspopup='dialog'>
        Delete File
      </Button>

      <Modal
        title='Delete File'
        open={open}
        onCancel={() => setOpen(false)}
        keyboard
        destroyOnHidden
        footer={
          <Space>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              type='primary'
              danger
              onClick={() => setOpen(false)}>
              Delete
            </Button>
          </Space>
        }>
        <p>Are you sure you want to permanently delete this file? This action cannot be undone.</p>
      </Modal>
    </div>
  )
}
