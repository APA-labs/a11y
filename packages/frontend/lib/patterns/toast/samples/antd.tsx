import './index.css'
import { Button, notification, Space } from 'antd'

export default function App() {
  const [api, contextHolder] = notification.useNotification()

  const openNotification = () => {
    api.success({
      message: 'Saved',
      description: 'Your changes have been saved successfully.',
      duration: 5,
      placement: 'topRight'
    })
  }

  return (
    <div className='app'>
      {contextHolder}
      <Space>
        <Button
          type='primary'
          onClick={openNotification}>
          Save
        </Button>
      </Space>
    </div>
  )
}
