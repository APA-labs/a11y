import './index.css'
import { Cell, Column, Row, Table, TableHeader, TableBody } from 'react-aria-components'

export default function App() {
  const rows = [
    { id: 1, name: 'Alice', department: 'Engineering', role: 'Senior' },
    { id: 2, name: 'Bob', department: 'Design', role: 'Junior' },
    { id: 3, name: 'Carol', department: 'Marketing', role: 'Lead' }
  ]

  return (
    <div className='app'>
      <Table aria-label='Employee list'>
        <TableHeader>
          <Column isRowHeader>Name</Column>
          <Column>Department</Column>
          <Column>Role</Column>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id}>
              <Cell>{row.name}</Cell>
              <Cell>{row.department}</Cell>
              <Cell>{row.role}</Cell>
            </Row>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
