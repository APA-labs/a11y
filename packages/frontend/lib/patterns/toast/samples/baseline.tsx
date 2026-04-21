import './index.css'
import { useRef, useState } from 'react'

interface ToastItem {
  id: number
  message: string
  type: 'success' | 'error'
}

export default function App() {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({})

  const remove = (id: number) => {
    clearTimeout(timers.current[id])
    delete timers.current[id]
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const add = (message: string, type: ToastItem['type']) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    timers.current[id] = setTimeout(() => remove(id), 5000)
  }

  const pause = (id: number) => clearTimeout(timers.current[id])
  const resume = (id: number) => {
    timers.current[id] = setTimeout(() => remove(id), 5000)
  }

  return (
    <div className='app stack'>
      <button
        className='btn btn-primary'
        onClick={() => add('저장되었습니다.', 'success')}>
        Save
      </button>

      <div
        className='stack'
        aria-label='Notifications'>
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.type === 'error' ? 'alert' : 'status'}
            aria-live={t.type === 'error' ? 'assertive' : 'polite'}
            onMouseEnter={() => pause(t.id)}
            onMouseLeave={() => resume(t.id)}
            onFocus={() => pause(t.id)}
            onBlur={() => resume(t.id)}
            className='row'>
            <span>{t.message}</span>
            <button
              className='btn btn-ghost'
              onClick={() => remove(t.id)}
              aria-label='Dismiss notification'>
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
