import './index.css'
import { useState } from 'react'
import { Pagination, ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'

const PAGE_SIZE = 10
const TOTAL = 87

export default function App() {
  const [current, setCurrent] = useState(1)

  const handleChange = (page: number) => {
    setCurrent(page)
  }

  const start = (current - 1) * PAGE_SIZE + 1
  const end = Math.min(current * PAGE_SIZE, TOTAL)

  return (
    <div className='p-24'>
      <div className='info-box mb-16'>
        <p className='mt-0 mb-0'>
          Showing {start}–{end} of {TOTAL} results
        </p>
      </div>

      <ConfigProvider locale={enUS}>
        <Pagination
          current={current}
          total={TOTAL}
          pageSize={PAGE_SIZE}
          onChange={handleChange}
          showSizeChanger={false}
          showQuickJumper
        />
      </ConfigProvider>

      <div
        role='status'
        aria-live='polite'
        aria-atomic='true'
        className='sr-only'>
        Page {current} of {Math.ceil(TOTAL / PAGE_SIZE)}
      </div>
    </div>
  )
}
