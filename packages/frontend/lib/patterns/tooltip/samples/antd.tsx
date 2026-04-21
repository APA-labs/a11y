import { Tooltip, Button, Space } from 'antd'

export default function App() {
  return (
    <div className='p-32'>
      <Space
        size={12}
        wrap>
        <Tooltip
          title='Save your current changes (Ctrl+S)'
          trigger={['hover', 'focus']}
          mouseEnterDelay={0.3}>
          <Button type='primary'>Save</Button>
        </Tooltip>

        <Tooltip
          title='Copy to clipboard'
          trigger={['hover', 'focus']}
          mouseEnterDelay={0.3}>
          <Button aria-label='Copy to clipboard'>⎘</Button>
        </Tooltip>

        <Tooltip
          title='Delete this item permanently'
          trigger={['hover', 'focus']}
          mouseEnterDelay={0.3}
          color='#dc2626'>
          <Button
            danger
            aria-label='Delete item'>
            ✕
          </Button>
        </Tooltip>
      </Space>
    </div>
  )
}
