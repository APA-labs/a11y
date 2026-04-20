import './index.css'
import { useState } from 'react'
import { Tag, HStack } from '@chakra-ui/react'

export default function App() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Accessibility'])

  const remove = (t: string) => setTags((prev) => prev.filter((x) => x !== t))

  return (
    <div className='app'>
      <HStack
        gap='8px'
        role='group'
        aria-label='Selected skills'>
        {tags.map((t) => (
          <Tag.Root
            key={t}
            colorPalette='teal'
            variant='surface'>
            <Tag.Label>{t}</Tag.Label>
            <Tag.EndElement>
              <Tag.CloseTrigger
                aria-label={`Remove ${t}`}
                onClick={() => remove(t)}
              />
            </Tag.EndElement>
          </Tag.Root>
        ))}
      </HStack>
    </div>
  )
}
