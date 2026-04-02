import type { Pattern } from '../types'

export const paginationPattern: Pattern = {
  slug: 'pagination',
  name: 'Pagination',
  description: '여러 페이지의 콘텐츠를 탐색하는 페이지 번호 컴포넌트',
  wcagCriteria: ['2.1.1 Keyboard', '2.4.4 Link Purpose', '4.1.2 Name, Role, Value'],
  tags: ['navigation', 'interactive'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'pagination-m1',
          title: '<nav> 랜드마크와 aria-label',
          description: '페이지네이션을 <nav> 요소로 감싸고 aria-label="pagination" 또는 "페이지 탐색"으로 레이블을 제공해야 합니다.',
          level: 'must'
        },
        {
          id: 'pagination-m2',
          title: '각 버튼에 aria-label 제공',
          description: '"이전", "다음", "1페이지로 이동" 등 버튼의 목적을 설명하는 aria-label을 제공해야 합니다.',
          level: 'must'
        },
        {
          id: 'pagination-m3',
          title: 'aria-current="page" 설정',
          description: '현재 활성 페이지 버튼에 aria-current="page"를 설정해야 합니다.',
          level: 'must'
        },
        {
          id: 'pagination-m4',
          title: '비활성 버튼에 aria-disabled',
          description: '이전/다음 버튼이 비활성일 때 aria-disabled="true"로 표시하고 포커스는 유지하세요.',
          level: 'must'
        }
      ],
      should: [
        {
          id: 'pagination-s1',
          title: '총 페이지 수 안내',
          description: '스크린리더 사용자에게 "12페이지 중 3페이지"처럼 현재 위치 컨텍스트를 제공하세요.',
          level: 'should'
        },
        {
          id: 'pagination-s2',
          title: '페이지 변경 시 알림',
          description: '페이지 변경 후 새 콘텐츠가 로드되면 role="status"로 스크린리더에 변경 사항을 알리세요.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'pagination-a1',
          title: '숫자만 있는 버튼',
          description: '"3" 같은 숫자만 있는 버튼은 맥락 없이 읽힙니다. aria-label="3페이지로 이동"을 추가하세요.',
          level: 'avoid'
        },
        {
          id: 'pagination-a2',
          title: '비활성 버튼 포커스 완전 제거',
          description: 'disabled 버튼에서 포커스를 제거하면 키보드 사용자가 구조를 탐색할 수 없습니다.',
          level: 'avoid'
        }
      ]
    },
    codeSample: {
      language: 'tsx',
      label: 'Baseline (React)',
      code: `function PaginationDemo() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5

  const btnStyle = (active) => ({
    padding: '6px 12px',
    border: '1px solid #d1d5db',
    borderRadius: 6,
    background: active ? '#2563eb' : '#fff',
    color: active ? '#fff' : '#374151',
    fontWeight: active ? 700 : 400,
    cursor: 'pointer'
  })

  return (
    <nav aria-label='Pagination'>
      <ul style={{ display: 'flex', gap: 4, listStyle: 'none', padding: 0, margin: 0 }}>
        <li>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            aria-label='Previous page'
            aria-disabled={currentPage === 1}
            disabled={currentPage === 1}
            style={{ ...btnStyle(false), opacity: currentPage === 1 ? 0.4 : 1 }}>
            ‹
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <button
              onClick={() => setCurrentPage(page)}
              aria-label={\`Go to page \${page}\`}
              aria-current={page === currentPage ? 'page' : undefined}
              style={btnStyle(page === currentPage)}>
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
            style={{ ...btnStyle(false), opacity: currentPage === totalPages ? 0.4 : 1 }}>
            ›
          </button>
        </li>
      </ul>
      <div
        role='status'
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        Page {currentPage} of {totalPages}
      </div>
    </nav>
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
          id: 'pagination-mui-1',
          title: 'getItemAriaLabel로 aria-label 커스텀',
          description:
            'MUI Pagination의 기본 aria-label은 영어입니다. getItemAriaLabel prop으로 다국어 레이블을 제공하고 현재 페이지 상태를 포함하세요.',
          level: 'should'
        },
        {
          id: 'pagination-mui-2',
          title: 'Pagination 컨테이너에 aria-label 제공',
          description:
            'MUI Pagination은 <nav>로 렌더링되지만 aria-label이 없어 스크린리더가 다른 nav와 구분하기 어렵습니다. 감싸는 nav에 aria-label을 추가하거나 componentsProps를 활용하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Pagination',
        code: `import { useState } from 'react'
import { Pagination, Typography, Box } from '@mui/material'

export default function App() {
  const [page, setPage] = useState(1)
  const totalPages = 10

  return (
    <Box style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
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
          if (type === 'page') return \`Go to page \${pageNum}\${selected ? ', current page' : ''}\`
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
}`
      },
      notes: [
        'MUI Pagination은 자동으로 <nav> 랜드마크를 사용하며 현재 페이지에 aria-current="true"를 적용합니다.',
        'getItemAriaLabel(type, page, selected) 콜백으로 모든 버튼의 aria-label을 한 번에 커스텀하세요.',
        'showFirstButton, showLastButton prop으로 첫/마지막 페이지 이동 버튼을 추가하세요.',
        'aria-live 영역으로 현재 페이지 변경을 스크린리더에 알리면 접근성이 향상됩니다.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'pagination-antd-1',
          title: 'aria-live로 페이지 변경 알림',
          description: '페이지가 변경될 때 콘텐츠가 동적으로 교체되므로 aria-live="polite" 영역으로 현재 페이지 번호를 스크린리더에 알려야 합니다.',
          level: 'must'
        },
        {
          id: 'pagination-antd-2',
          title: 'ConfigProvider locale로 aria-label 언어 설정',
          description:
            'Ant Design Pagination의 기본 aria-label은 영어입니다. ConfigProvider에 locale={enUS}(또는 koKR)를 설정하면 이전/다음 버튼 레이블이 해당 언어로 변경됩니다.',
          level: 'should'
        },
        {
          id: 'pagination-antd-3',
          title: 'showSizeChanger 시 레이블 제공',
          description: 'showSizeChanger={true}로 페이지 크기 선택기를 활성화할 경우 Form.Item 또는 aria-label로 선택기의 목적을 설명하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Pagination',
        code: `import { useState } from 'react'
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
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: 16, padding: '12px 16px', background: '#fafafa', borderRadius: 6, border: '1px solid #f0f0f0' }}>
        <p style={{ margin: 0, fontSize: 14, color: '#595959' }}>
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
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        Page {current} of {Math.ceil(TOTAL / PAGE_SIZE)}
      </div>
    </div>
  )
}`
      },
      notes: [
        'Ant Design Pagination은 현재 페이지에 aria-current="page"를 자동 적용하고 <ul> 목록 구조를 사용합니다.',
        'ConfigProvider locale={enUS}로 이전/다음 버튼의 aria-label을 영어로 설정하세요.',
        'aria-live="polite" 영역을 별도로 추가해 페이지 변경을 스크린리더에 즉시 알릴 수 있습니다.',
        'showQuickJumper로 페이지 직접 이동 입력 필드를 제공하면 키보드 사용자 편의가 향상됩니다.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'pg-chakra-1',
          title: '페이지 버튼 aria-label',
          description: '각 페이지 버튼에 aria-label을 추가해 스크린리더가 페이지 번호를 읽을 수 있게 하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI Pagination',
        code: `import { useState } from 'react'
import { Pagination, ButtonGroup, Button } from '@chakra-ui/react'

const TOTAL = 87
const PAGE_SIZE = 10

export default function App() {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(TOTAL / PAGE_SIZE)
  const start = (page - 1) * PAGE_SIZE + 1
  const end = Math.min(page * PAGE_SIZE, TOTAL)

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
      <p
        style={{ margin: 0, fontSize: 14, color: '#718096' }}
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
            render={(page) => (
              <Pagination.Item
                key={page.value}
                {...page}
                aria-label={page.type === 'ellipsis' ? 'More pages' : \`Page \${page.value}\`}>
                {page.type === 'ellipsis' ? '…' : page.value}
              </Pagination.Item>
            )}
          />
          <Pagination.NextTrigger asChild>
            <Button aria-label='Next page'>›</Button>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </div>
  )
}`
      },
      notes: [
        'Pagination.Root의 count와 pageSize prop으로 총 페이지 수를 자동 계산합니다.',
        'Pagination.Items의 render prop으로 각 페이지 버튼을 커스텀하세요.',
        '각 페이지 버튼에 aria-label을 추가해 스크린리더가 페이지 번호를 읽을 수 있게 하세요.',
        'aria-live 영역으로 현재 표시 범위를 스크린리더에 알리세요.'
      ]
    }
  }
}
