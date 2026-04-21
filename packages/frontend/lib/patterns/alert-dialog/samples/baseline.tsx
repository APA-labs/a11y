import './index.css'
import { useEffect, useRef, useState } from 'react'

export default function App() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) cancelRef.current?.focus()
    else triggerRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className='app'>
      <button
        ref={triggerRef}
        className='btn btn-primary'
        onClick={() => setOpen(true)}>
        파일 삭제
      </button>

      {open ? (
        <div
          className='overlay'
          onClick={() => setOpen(false)}>
          <div
            role='alertdialog'
            aria-modal='true'
            aria-labelledby='confirm-title'
            aria-describedby='confirm-desc'
            className='dialog'
            onClick={(e) => e.stopPropagation()}>
            <h2
              id='confirm-title'
              className='dialog-title'>
              파일을 삭제하시겠습니까?
            </h2>
            <p id='confirm-desc'>report.pdf 파일이 영구적으로 삭제되며 복구할 수 없습니다.</p>
            <div className='row'>
              <button
                ref={cancelRef}
                className='btn btn-ghost'
                onClick={() => setOpen(false)}>
                취소
              </button>
              <button
                className='btn btn-primary'
                onClick={() => setOpen(false)}>
                삭제
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
