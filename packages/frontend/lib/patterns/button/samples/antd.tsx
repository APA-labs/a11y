import './index.css'
import { Button, Space } from 'antd'
import { useState } from 'react'

export default function App() {
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <Space
      className='app'
      wrap>
      <Button
        type='primary'
        loading={loading}
        aria-busy={loading}
        aria-label={loading ? 'Saving, please wait' : 'Save'}
        className='max-h-44'
        onClick={handleSave}>
        {loading ? 'Saving...' : 'Save'}
      </Button>

      <Button
        type='default'
        disabled
        aria-disabled='true'
        className='max-h-44'>
        Disabled
      </Button>

      <Button
        danger
        aria-label='Delete selected item'
        className='max-h-44'>
        Delete
      </Button>

      <Button
        variant='outlined'
        color='primary'
        className='max-h-44'>
        Outlined
      </Button>
    </Space>
  )
}
