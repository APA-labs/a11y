'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      type='button'
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className='p-2 text-mist-600 hover:text-navy dark:text-mist-400 dark:hover:text-white hover:bg-mist-100 dark:hover:bg-navy-800 rounded-md transition-colors'>
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
