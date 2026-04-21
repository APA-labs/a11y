import './index.css'
import { Table } from '@chakra-ui/react'

export default function App() {
  const rows = [
    { name: 'Alice', department: 'Engineering', role: 'Senior' },
    { name: 'Bob', department: 'Design', role: 'Junior' },
    { name: 'Carol', department: 'Marketing', role: 'Lead' }
  ]

  return (
    <div className='app'>
      <Table.Root>
        <Table.Caption>Employee list</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Department</Table.ColumnHeader>
            <Table.ColumnHeader>Role</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.name}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.department}</Table.Cell>
              <Table.Cell>{row.role}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
