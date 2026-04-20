import './index.css'
import { Badge, Space, Button } from 'antd'

export default function App() {
  const unread = 5

  return (
    <div className='app'>
      <Space size='large'>
        <Button
          type='text'
          aria-label={`Messages, ${unread} unread`}
          title={`${unread} unread messages`}>
          <Badge
            count={unread}
            title={`${unread} unread messages`}>
            <span aria-hidden>💬</span>
          </Badge>
        </Button>

        <Badge
          status='success'
          text='Deployment ready'
        />
        <Badge
          status='error'
          text='Build failed'
        />
        <Badge
          status='warning'
          text='Action required'
        />
      </Space>
    </div>
  )
}
