import './index.css'
import { useState } from 'react'
import { Chip, Stack } from '@mui/material'

export default function App() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Accessibility'])

  const handleDelete = (target: string) => {
    setTags((prev) => prev.filter((t) => t !== target))
  }

  return (
    <div className='app'>
      <Stack
        direction='row'
        spacing={1}
        role='group'
        aria-label='Selected skills'>
        {tags.map((t) => (
          <Chip
            key={t}
            label={t}
            onDelete={() => handleDelete(t)}
            aria-label={`${t}, press Backspace to remove`}
          />
        ))}
      </Stack>
    </div>
  )
}
