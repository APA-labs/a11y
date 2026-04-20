import './index.css'
import { useState } from 'react'
import { Tag, Space } from 'antd'

export default function App() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Accessibility'])

  const handleClose = (removed: string) => {
    setTags((prev) => prev.filter((t) => t !== removed))
  }

  return (
    <div className='app'>
      <Space
        wrap
        role='group'
        aria-label='Selected skills'>
        {tags.map((t) => (
          <Tag
            key={t}
            closable
            closeIcon={<span aria-label={`Remove ${t}`}>×</span>}
            onClose={(e) => {
              e.preventDefault()
              handleClose(t)
            }}>
            {t}
          </Tag>
        ))}
      </Space>
    </div>
  )
}
