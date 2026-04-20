import './index.css'
import { useState } from 'react'

export default function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5

  return (
    <div className='app'>
      <nav aria-label='Pagination'>
        <ul className='pagination'>
          <li>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              aria-label='Previous page'
              aria-disabled={currentPage === 1}
              disabled={currentPage === 1}
              className='page-btn'>
              ‹
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page}>
              <button
                onClick={() => setCurrentPage(page)}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
                className='page-btn'>
                {page}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              aria-label='Next page'
              aria-disabled={currentPage === totalPages}
              disabled={currentPage === totalPages}
              className='page-btn'>
              ›
            </button>
          </li>
        </ul>
        <div
          role='status'
          className='sr-only'>
          Page {currentPage} of {totalPages}
        </div>
      </nav>
    </div>
  )
}
