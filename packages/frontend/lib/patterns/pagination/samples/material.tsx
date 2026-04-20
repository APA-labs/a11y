import './index.css'
import { useState } from 'react'
import { Pagination, Typography, Box } from '@mui/material'

export default function App() {
  const [page, setPage] = useState(1)
  const totalPages = 10

  return (
    <Box className='p-24 stack gap-16 items-center'>
      <Typography
        variant='body2'
        color='text.secondary'
        aria-live='polite'
        aria-atomic='true'>
        Page {page} of {totalPages}
      </Typography>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, newPage) => setPage(newPage)}
        color='primary'
        showFirstButton
        showLastButton
        getItemAriaLabel={(type, pageNum, selected) => {
          if (type === 'page') return `Go to page ${pageNum}${selected ? ', current page' : ''}`
          if (type === 'first') return 'Go to first page'
          if (type === 'last') return 'Go to last page'
          if (type === 'next') return 'Go to next page'
          if (type === 'previous') return 'Go to previous page'
          return ''
        }}
        slotProps={{ root: { 'aria-label': 'Pagination navigation' } as React.AriaAttributes }}
      />
    </Box>
  )
}
