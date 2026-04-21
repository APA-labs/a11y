import './index.css'
import { Table } from 'antd'

export default function App() {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Role', dataIndex: 'role', key: 'role' }
  ]

  const data = [
    { key: '1', name: 'Alice', department: 'Engineering', role: 'Senior' },
    { key: '2', name: 'Bob', department: 'Design', role: 'Junior' },
    { key: '3', name: 'Carol', department: 'Marketing', role: 'Lead' }
  ]

  return (
    <div className='app'>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        aria-label='Employee list'
      />
    </div>
  )
}
