import type { ReactNode } from 'react'

export function renderWithCode(text: string): ReactNode {
  const parts = text.split(/(`[^`]+`)/)
  if (parts.length === 1) return text
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className='rounded bg-neutral-100 px-1 py-0.5 font-mono text-[0.8em] text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'>
          {part.slice(1, -1)}
        </code>
      )
    }
    return part
  })
}
