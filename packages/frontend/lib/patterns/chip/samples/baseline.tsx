import './index.css'
import { useState } from 'react'

export default function App() {
  const [tags, setTags] = useState(['Design', 'Engineering', 'Research'])

  const remove = (t: string) => setTags((prev) => prev.filter((x) => x !== t))

  return (
    <div className='app'>
      <ul
        role='group'
        aria-label='Selected filters'
        className='chip-list'>
        {tags.map((t) => (
          <li
            key={t}
            className='chip'>
            <span>{t}</span>
            <button
              type='button'
              aria-label={`Remove ${t}`}
              className='chip-remove'
              onClick={() => remove(t)}>
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
