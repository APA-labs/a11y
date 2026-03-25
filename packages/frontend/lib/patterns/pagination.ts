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
      code: `function Pagination({ currentPage, totalPages, onPageChange }) {
return (
  <nav aria-label="페이지 탐색">
    <ul className="flex gap-1">
      <li>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="이전 페이지"
          aria-disabled={currentPage === 1}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
      </li>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <li key={page}>
          <button
            onClick={() => onPageChange(page)}
            aria-label={\`\${page}페이지로 이동\`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        </li>
      ))}
      <li>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="다음 페이지"
          aria-disabled={currentPage === totalPages}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </li>
    </ul>
    <div role="status" className="sr-only">
      {totalPages}페이지 중 {currentPage}페이지
    </div>
  </nav>
);
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
          description: 'MUI Pagination의 기본 aria-label은 영어입니다. getItemAriaLabel prop으로 한국어 레이블을 제공하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Pagination',
        code: `import { Pagination } from '@mui/material';

<Pagination
count={10}
page={currentPage}
onChange={(_, page) => setCurrentPage(page)}
getItemAriaLabel={(type, page, selected) => {
  if (type === 'page') return \`\${page}페이지로 이동\${selected ? ' (현재 페이지)' : ''}\`;
  if (type === 'first') return '첫 페이지로 이동';
  if (type === 'last') return '마지막 페이지로 이동';
  if (type === 'next') return '다음 페이지';
  if (type === 'previous') return '이전 페이지';
  return '';
}}
/>`
      },
      notes: [
        'MUI Pagination은 자동으로 <nav role="navigation"> 랜드마크를 사용합니다.',
        '현재 페이지에 aria-current가 자동으로 적용됩니다.',
        'getItemAriaLabel로 모든 버튼의 aria-label을 한 번에 커스텀할 수 있습니다.'
      ]
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'pagination-radix-1',
          title: '직접 구현 필요',
          description: 'Radix UI에는 Pagination 컴포넌트가 없습니다. 시맨틱 HTML과 ARIA를 직접 구현하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix (직접 구현)',
        code: `{/* Radix UI에 전용 컴포넌트 없음 — 시맨틱 HTML로 직접 구현 */}
<nav aria-label="페이지 탐색">
<ul className="flex items-center gap-1">
  <li>
    <button
      onClick={() => onPageChange(page - 1)}
      aria-label="이전 페이지"
      disabled={page === 1}
      aria-disabled={page === 1}
    >
      ←
    </button>
  </li>
  {pages.map(p => (
    <li key={p}>
      <button
        onClick={() => onPageChange(p)}
        aria-label={\`\${p}페이지로 이동\`}
        aria-current={p === page ? 'page' : undefined}
      >
        {p}
      </button>
    </li>
  ))}
  <li>
    <button
      onClick={() => onPageChange(page + 1)}
      aria-label="다음 페이지"
      disabled={page === total}
      aria-disabled={page === total}
    >
      →
    </button>
  </li>
</ul>
</nav>`
      },
      notes: [
        'Radix UI는 Pagination 컴포넌트를 제공하지 않습니다.',
        'shadcn/ui의 Pagination 컴포넌트는 접근성이 잘 구현된 좋은 참고 예시입니다.',
        '각 버튼에 aria-label을 반드시 추가하세요.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'pagination-antd-1',
          title: 'locale로 한국어 aria-label 설정',
          description: 'Ant Design Pagination의 기본 aria-label은 영어입니다. locale prop이나 ConfigProvider로 한국어를 설정하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Pagination',
        code: `import { Pagination, ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';

<ConfigProvider locale={koKR}>
<Pagination
  current={currentPage}
  total={100}
  pageSize={10}
  onChange={(page) => setCurrentPage(page)}
  showSizeChanger={false}
/>
</ConfigProvider>`
      },
      notes: [
        'ConfigProvider의 locale을 koKR로 설정하면 aria-label이 한국어로 변경됩니다.',
        'Ant Design Pagination은 자동으로 <ul> 목록 구조를 사용합니다.',
        '현재 페이지에 aria-current가 자동으로 적용됩니다.'
      ]
    },
    shadcn: {
      id: 'shadcn',
      name: 'shadcn/ui',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'pg-shadcn-1',
          title: 'aria-current="page" 추가',
          description: '현재 페이지 링크에 aria-current="page"를 추가하세요. isActive prop만으로는 부족합니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'shadcn/ui Pagination',
        code: `import {
Pagination,
PaginationContent,
PaginationItem,
PaginationLink,
PaginationNext,
PaginationPrevious,
} from '@/components/ui/pagination'

<Pagination>
<PaginationContent>
  <PaginationItem>
    <PaginationPrevious href="#" aria-label="이전 페이지" />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#" aria-label="1페이지">1</PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#" isActive aria-current="page" aria-label="현재 페이지, 2페이지">2</PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationLink href="#" aria-label="3페이지">3</PaginationLink>
  </PaginationItem>
  <PaginationItem>
    <PaginationNext href="#" aria-label="다음 페이지" />
  </PaginationItem>
</PaginationContent>
</Pagination>`
      },
      notes: [
        'shadcn Pagination은 nav 요소로 자동 렌더링됩니다.',
        "현재 페이지에 aria-current='page'를 명시적으로 추가하세요.",
        '이전/다음 버튼에 aria-label을 추가하세요.'
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
        code: `import { Pagination } from '@chakra-ui/react'

<Pagination.Root count={50} pageSize={10} page={page} onPageChange={(e) => setPage(e.page)}>
<Pagination.PrevTrigger aria-label="이전 페이지" />
{[1, 2, 3, 4, 5].map((p) => (
  <Pagination.Item key={p} value={p}>
    <Pagination.Link aria-label={p + '페이지'} aria-current={p === page ? 'page' : undefined}>
      {p}
    </Pagination.Link>
  </Pagination.Item>
))}
<Pagination.NextTrigger aria-label="다음 페이지" />
</Pagination.Root>`
      },
      notes: [
        'Chakra Pagination.Root는 페이지 상태를 자동 관리합니다.',
        'count와 pageSize로 총 페이지 수를 계산하세요.',
        '각 페이지 버튼에 aria-label을 추가해 접근성을 높이세요.'
      ]
    }
  }
}
