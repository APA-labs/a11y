import type { Pattern } from '../types'

export const tablePattern: Pattern = {
  slug: 'table',
  name: 'Table',
  description: '의미론적 헤더, 캡션, 정렬 상태를 갖춘 데이터 테이블 컴포넌트',
  wcagCriteria: ['1.3.1 Info and Relationships', '2.1.1 Keyboard', '4.1.2 Name, Role, Value'],
  tags: ['data', 'structure', 'semantic'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'table-m1',
          title: '테이블에 라벨 제공',
          description:
            '테이블에 aria-label 또는 aria-labelledby로 라벨을 제공해야 합니다. 어떤 데이터를 담은 테이블인지 스크린리더 사용자가 알 수 있어야 합니다.',
          level: 'must'
        },
        {
          id: 'table-m2',
          title: 'th 요소에 scope 속성',
          description: 'th 요소에 scope="col" 또는 scope="row"를 사용해 헤더가 어느 방향을 대표하는지 명시해야 합니다.',
          level: 'must'
        },
        {
          id: 'table-m3',
          title: '복잡한 테이블에 id/headers 연결',
          description: '행/열 헤더가 중첩된 복잡한 테이블에서는 th에 id를 부여하고 td에 headers 속성으로 연결해야 합니다.',
          level: 'must'
        },
        {
          id: 'table-m4',
          title: 'th/td 의미론 유지',
          description: '헤더 셀은 반드시 th, 데이터 셀은 td로 구분해야 스크린리더가 행/열 관계를 올바르게 전달합니다.',
          level: 'must'
        }
      ],
      should: [
        {
          id: 'table-s1',
          title: 'caption 요소로 설명 제공',
          description: 'table 요소 바로 아래 caption을 추가해 테이블 목적을 설명하세요. 시각적으로 숨겨도 스크린리더에 전달됩니다.',
          level: 'should'
        },
        {
          id: 'table-s2',
          title: '정렬 가능한 열에 aria-sort',
          description: '정렬 기능이 있는 열 헤더에 aria-sort="ascending" 또는 aria-sort="descending"을 설정하고, 정렬 버튼은 th 내부에 두세요.',
          level: 'should'
        },
        {
          id: 'table-s3',
          title: '빈 셀에 설명 제공',
          description: '빈 td에는 시각적으로는 안 보이더라도 스크린리더용 설명(예: "해당 없음")을 sr-only 텍스트로 제공하세요.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'table-a1',
          title: '레이아웃 목적으로 table 사용',
          description:
            '레이아웃을 위해 table을 사용하지 마세요. 레이아웃 테이블이라면 role="presentation"을 추가해 스크린리더가 테이블로 인식하지 않도록 해야 합니다.',
          level: 'avoid'
        },
        {
          id: 'table-a2',
          title: 'th 없이 td만 사용',
          description: '모든 셀을 td로만 만들면 스크린리더가 행/열 관계를 파악할 수 없습니다. 헤더 행과 열에는 반드시 th를 사용하세요.',
          level: 'avoid'
        },
        {
          id: 'table-a3',
          title: 'div 중첩으로 table 재구현',
          description: '복잡한 인터랙션이 필요해 role="grid"를 쓰는 경우가 아니라면, 의미론적 table 대신 div로 표를 만들지 마세요.',
          level: 'avoid'
        }
      ]
    },
    codeSample: {
      language: 'tsx',
      label: 'Baseline (React)',
      code: `import './index.css'
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
}`
    }
  },
  designSystems: {
    material: {
      id: 'material',
      name: 'Material Design (MUI)',
      color: '#1976d2',
      additionalChecks: [
        {
          id: 'table-mui-1',
          title: 'TableHead 내부 TableCell은 자동 th 렌더링',
          description: 'MUI TableCell은 TableHead 내부에서 자동으로 <th>로 렌더링됩니다. scope 속성은 직접 추가해야 합니다.',
          level: 'must'
        },
        {
          id: 'table-mui-2',
          title: 'aria-label로 테이블 목적 전달',
          description: 'Table 컴포넌트에 aria-label을 추가하여 스크린리더 사용자에게 테이블 목적을 전달하세요.',
          level: 'must'
        },
        {
          id: 'table-mui-3',
          title: 'TableSortLabel로 정렬 상태 전달',
          description: 'TableSortLabel을 사용하면 aria-sort가 자동으로 설정되어 정렬 상태를 스크린리더에 전달합니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Table',
        code: `import './index.css'
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
}`
      },
      notes: [
        'MUI TableCell은 TableHead 내부에서 자동으로 <th>를 렌더링합니다.',
        'TableContainer는 넓은 테이블에 수평 스크롤을 제공합니다.',
        'TableSortLabel로 정렬 가능한 열 헤더를 만들면 aria-sort가 자동 설정됩니다.',
        'component="th" scope="row"로 행 헤더를 명시적으로 설정하세요.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'table-antd-1',
          title: 'columns에 key 또는 dataIndex 필수',
          description: '각 column에 key 또는 dataIndex를 설정해야 React 렌더링과 접근성 매핑이 올바르게 동작합니다.',
          level: 'must'
        },
        {
          id: 'table-antd-2',
          title: 'aria-label로 테이블 목적 전달',
          description: 'Ant Table은 내부적으로 <table>을 렌더링하지만 aria-label을 자동으로 추가하지 않습니다. 직접 설정하세요.',
          level: 'must'
        },
        {
          id: 'table-antd-3',
          title: 'sorter 사용 시 aria-sort 자동 설정',
          description: 'columns에 sorter 함수를 설정하면 정렬 시 aria-sort가 자동으로 관리됩니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Table',
        code: `import './index.css'
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
}`
      },
      notes: [
        'Ant Design Table은 내부적으로 의미론적 <table>, <th>, <td>를 렌더링합니다.',
        'columns의 sorter prop으로 정렬을 활성화하면 헤더에 정렬 버튼이 자동 생성됩니다.',
        'rowSelection prop으로 행 선택 기능을 추가할 때 aria-checked가 자동 관리됩니다.',
        'pagination={false}로 간단한 테이블을 표현할 수 있습니다.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'table-chakra-1',
          title: 'Table.ColumnHeader 사용',
          description: 'Chakra Table.ColumnHeader는 <th>로 렌더링됩니다. 데이터 셀에는 Table.Cell을 사용하세요.',
          level: 'must'
        },
        {
          id: 'table-chakra-2',
          title: 'Table.Caption으로 설명 제공',
          description: 'Table.Caption을 사용하면 <caption>이 렌더링되어 스크린리더가 테이블 목적을 전달합니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI Table',
        code: `import './index.css'
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
}`
      },
      notes: [
        'Chakra Table은 의미론적 <table>, <thead>, <tbody>, <th>, <td>를 자동으로 렌더링합니다.',
        'Table.Caption은 <caption>으로 렌더링되어 스크린리더가 테이블 설명을 읽습니다.',
        'Table.ColumnHeader는 <th>로 렌더링되므로 별도의 scope 속성 없이 열 헤더로 인식됩니다.',
        'size prop으로 sm, md, lg 사이즈를 지정할 수 있습니다.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'table-spectrum-1',
          title: 'Column isRowHeader 설정',
          description: '행을 식별하는 열에 isRowHeader를 설정하면 스크린리더가 행 내 다른 셀을 읽을 때 컨텍스트를 제공합니다.',
          level: 'must'
        },
        {
          id: 'table-spectrum-2',
          title: 'aria-label로 테이블 목적 전달',
          description: 'Table에 aria-label을 추가하여 스크린리더 사용자에게 테이블 목적을 전달하세요.',
          level: 'must'
        },
        {
          id: 'table-spectrum-3',
          title: 'allowsSorting으로 정렬 접근성',
          description: 'Column에 allowsSorting을 설정하면 aria-sort가 자동 관리되고 키보드로 정렬을 토글할 수 있습니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria Table',
        code: `import './index.css'
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
}`
      },
      notes: [
        'React Aria Table은 의미론적 <table> 마크업과 키보드 탐색을 자동으로 제공합니다.',
        'Column에 isRowHeader를 설정하면 해당 열이 행 헤더(th scope="row")로 렌더링됩니다.',
        'allowsSorting과 sortDescriptor prop으로 정렬 기능과 aria-sort를 자동 관리합니다.',
        'selectionMode="multiple"로 행 선택 기능을 추가하면 체크박스와 aria-selected가 자동 적용됩니다.'
      ]
    }
  }
}
