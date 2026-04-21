import './index.css'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

export default function App() {
  const rows = [
    { name: 'Alice', department: 'Engineering', role: 'Senior' },
    { name: 'Bob', department: 'Design', role: 'Junior' },
    { name: 'Carol', department: 'Marketing', role: 'Lead' }
  ]

  return (
    <div className='app'>
      <TableContainer>
        <Table aria-label='Employee list'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell
                  component='th'
                  scope='row'>
                  {row.name}
                </TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>{row.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
