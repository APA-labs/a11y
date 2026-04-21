import './index.css'
import { useState } from 'react'

type SortDir = 'none' | 'ascending' | 'descending'

export default function App() {
  const [sortDir, setSortDir] = useState<SortDir>('none')

  const toggleSort = () => {
    setSortDir((d) => (d === 'ascending' ? 'descending' : 'ascending'))
  }

  return (
    <div className='app'>
      <table aria-label='2024년 직원 목록'>
        <caption>2024년 직원 현황</caption>
        <thead>
          <tr>
            <th
              scope='col'
              aria-sort={sortDir}>
              <button
                className='btn btn-ghost'
                onClick={toggleSort}>
                이름 {sortDir === 'ascending' ? '▲' : sortDir === 'descending' ? '▼' : '⇅'}
              </button>
            </th>
            <th scope='col'>부서</th>
            <th scope='col'>직급</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>홍길동</td>
            <td>개발팀</td>
            <td>시니어</td>
          </tr>
          <tr>
            <td>김철수</td>
            <td>디자인팀</td>
            <td>주니어</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
