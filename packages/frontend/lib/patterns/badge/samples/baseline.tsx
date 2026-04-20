import './index.css'

export default function App() {
  const unread = 3

  return (
    <div className='app row'>
      <button
        type='button'
        aria-label={`Inbox, ${unread} unread messages`}
        className='badge-wrap badge-icon'>
        <span aria-hidden>📥</span>
        {unread > 0 ? (
          <span
            aria-hidden
            className='badge-count'>
            {unread > 99 ? '99+' : unread}
          </span>
        ) : null}
      </button>

      <span className='badge-status'>
        <span
          aria-hidden
          className='badge-status-dot success'
        />
        <span>Online</span>
      </span>
    </div>
  )
}
