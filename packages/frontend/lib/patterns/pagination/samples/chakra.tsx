import './index.css'
import { useState } from 'react'
import { Pagination, ButtonGroup, Button } from '@chakra-ui/react'

const TOTAL = 87
const PAGE_SIZE = 10

export default function App() {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(TOTAL / PAGE_SIZE)
  const start = (page - 1) * PAGE_SIZE + 1
  const end = Math.min(page * PAGE_SIZE, TOTAL)

  return (
    <div className='p-24 stack gap-12 items-center'>
      <p
        className='mt-0 mb-0 text-muted'
        aria-live='polite'
        aria-atomic='true'>
        Showing {start}–{end} of {TOTAL} results
      </p>
      <Pagination.Root
        count={TOTAL}
        pageSize={PAGE_SIZE}
        page={page}
        onPageChange={(e) => setPage(e.page)}>
        <ButtonGroup
          variant='outline'
          size='sm'>
          <Pagination.PrevTrigger asChild>
            <Button aria-label='Previous page'>‹</Button>
          </Pagination.PrevTrigger>
          <Pagination.Items
            render={(page) => {
              const type = (page as { type: string }).type
              const isEllipsis = type === 'ellipsis'
              return (
                <Pagination.Item
                  key={page.value}
                  {...page}
                  aria-label={isEllipsis ? 'More pages' : `Page ${page.value}`}>
                  {isEllipsis ? '…' : page.value}
                </Pagination.Item>
              )
            }}
          />
          <Pagination.NextTrigger asChild>
            <Button aria-label='Next page'>›</Button>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </div>
  )
}
