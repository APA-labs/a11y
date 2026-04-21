import { Tooltip, Button, Stack, Typography } from '@mui/material'

export default function App() {
  return (
    <Stack
      spacing={3}
      className='p-32 items-start'>
      <Typography variant='h6'>Tooltip examples</Typography>

      <Tooltip
        title='Save your current changes to the server'
        enterDelay={300}
        arrow>
        <Button
          variant='contained'
          aria-label='Save file'>
          Save
        </Button>
      </Tooltip>

      <Tooltip
        title='This action cannot be undone'
        enterDelay={300}
        placement='right'
        arrow>
        <Button
          variant='outlined'
          color='error'
          aria-label='Delete selected item'>
          Delete
        </Button>
      </Tooltip>

      <Tooltip
        title='Keyboard shortcut: Ctrl+Z'
        enterDelay={300}
        arrow>
        <span>
          <Button
            disabled
            aria-label='Undo last action'>
            Undo
          </Button>
        </span>
      </Tooltip>
    </Stack>
  )
}
