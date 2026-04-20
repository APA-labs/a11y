import './index.css'
import { useState } from 'react'
import { TagGroup, TagList, Tag, Button, Label } from 'react-aria-components'

interface SkillItem {
  id: string
  name: string
}

export default function App() {
  const [items, setItems] = useState<SkillItem[]>([
    { id: 'react', name: 'React' },
    { id: 'ts', name: 'TypeScript' },
    { id: 'a11y', name: 'Accessibility' }
  ])

  const handleRemove = (keys: Set<string | number>) => {
    setItems((prev) => prev.filter((i) => !keys.has(i.id)))
  }

  return (
    <div className='app'>
      <TagGroup
        selectionMode='none'
        onRemove={handleRemove}>
        <Label>Selected skills</Label>
        <TagList
          items={items}
          className='chip-list'>
          {(item) => (
            <Tag
              id={item.id}
              textValue={item.name}
              className='chip'>
              {item.name}
              <Button
                slot='remove'
                aria-label={`Remove ${item.name}`}
                className='chip-remove'>
                ×
              </Button>
            </Tag>
          )}
        </TagList>
      </TagGroup>
    </div>
  )
}
