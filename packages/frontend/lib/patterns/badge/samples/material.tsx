import './index.css'
import { Badge, IconButton, Stack } from '@mui/material'

export default function App() {
  const mailCount = 4
  const cartCount = 100

  const notificationsLabel = (n: number) => {
    if (n === 0) return 'No new notifications'
    if (n > 99) return 'more than 99 notifications'
    return `${n} notifications`
  }

  return (
    <div className='app'>
      <Stack
        direction='row'
        spacing={3}>
        <IconButton aria-label={`Inbox, ${notificationsLabel(mailCount)}`}>
          <Badge
            badgeContent={mailCount}
            color='primary'>
            <span aria-hidden>📧</span>
          </Badge>
        </IconButton>

        <IconButton aria-label={`Cart, ${notificationsLabel(cartCount)}`}>
          <Badge
            badgeContent={cartCount}
            color='secondary'
            max={99}>
            <span aria-hidden>🛒</span>
          </Badge>
        </IconButton>

        <IconButton aria-label='Profile, status online'>
          <Badge
            variant='dot'
            color='success'>
            <span aria-hidden>👤</span>
          </Badge>
        </IconButton>
      </Stack>
    </div>
  )
}
