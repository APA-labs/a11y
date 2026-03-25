import type { Pattern } from '../types'

export const breadcrumbPattern: Pattern = {
  slug: 'breadcrumb',
  name: 'Breadcrumb',
  description: '현재 페이지의 계층적 위치를 나타내는 탐색 경로 컴포넌트',
  wcagCriteria: ['2.4.4 Link Purpose', '2.4.8 Location', '4.1.2 Name, Role, Value'],
  tags: ['navigation', 'landmark'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'breadcrumb-m1',
          title: '<nav> 랜드마크 사용',
          description: '브레드크럼 전체를 <nav> 요소로 감싸고 aria-label="breadcrumb"로 레이블을 제공해야 합니다.',
          level: 'must'
        },
        {
          id: 'breadcrumb-m2',
          title: 'aria-current="page" 설정',
          description: '현재 페이지를 나타내는 항목에 aria-current="page"를 설정해야 합니다.',
          level: 'must'
        },
        {
          id: 'breadcrumb-m3',
          title: '<ol> 목록 사용',
          description: '브레드크럼 항목은 <ol>로 마크업해야 스크린리더가 항목 수와 순서를 인식합니다.',
          level: 'must'
        }
      ],
      should: [
        {
          id: 'breadcrumb-s1',
          title: '구분자를 aria-hidden으로 숨김',
          description: '/ 또는 > 구분자는 CSS content로 생성하거나 aria-hidden="true"로 스크린리더에서 숨기세요.',
          level: 'should'
        },
        {
          id: 'breadcrumb-s2',
          title: '마지막 항목은 링크 아닌 텍스트',
          description: '현재 페이지는 링크 대신 일반 텍스트로 표현하는 것이 더 명확합니다.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'breadcrumb-a1',
          title: 'div/span 나열로 구현',
          description: '목록 마크업 없이 div/span만 사용하면 스크린리더 사용자가 항목 수와 구조를 파악할 수 없습니다.',
          level: 'avoid'
        },
        {
          id: 'breadcrumb-a2',
          title: '구분자를 링크 텍스트에 포함',
          description: '"> Home > Products"처럼 구분자가 링크 텍스트에 포함되면 스크린리더가 구분자까지 읽습니다.',
          level: 'avoid'
        }
      ]
    },
    codeSample: {
      language: 'tsx',
      label: 'Baseline (HTML)',
      code: `<nav aria-label='breadcrumb'>
  <ol className='flex items-center gap-2 text-sm list-none p-0'>
    <li>
      <a href='/'>홈</a>
    </li>
    <li aria-hidden='true'>/</li>
    <li>
      <a href='/products'>제품</a>
    </li>
    <li aria-hidden='true'>/</li>
    <li>
      <a href='/products/shoes'>신발</a>
    </li>
    <li aria-hidden='true'>/</li>
    <li aria-current='page'>운동화</li>
  </ol>
</nav>`
    }
  },
  designSystems: {
    material: {
      id: 'material',
      name: 'Material Design (MUI)',
      color: '#1976d2',
      additionalChecks: [
        {
          id: 'breadcrumb-mui-1',
          title: 'aria-label 직접 지정',
          description: 'MUI Breadcrumbs는 <nav> 역할을 하지만 aria-label을 자동으로 추가하지 않습니다. aria-label="breadcrumb"를 직접 추가하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Breadcrumbs',
        code: `import { Breadcrumbs, Link, Typography } from '@mui/material'
<Breadcrumbs aria-label='breadcrumb'>
  <Link
    href='/'
    underline='hover'
    color='inherit'>
    홈
  </Link>
  <Link
    href='/products'
    underline='hover'
    color='inherit'>
    제품
  </Link>
  <Link
    href='/products/shoes'
    underline='hover'
    color='inherit'>
    신발
  </Link>
  <Typography
    color='text.primary'
    aria-current='page'>
    운동화
  </Typography>
</Breadcrumbs>`
      },
      notes: [
        'MUI Breadcrumbs는 자동으로 구분자를 렌더링하며 aria-hidden이 적용됩니다.',
        'separator prop으로 구분자를 커스텀할 수 있습니다.',
        '마지막 항목은 Typography로 처리해 링크가 아닌 텍스트로 표현하세요.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'breadcrumb-antd-1',
          title: 'itemRender로 aria-current 추가',
          description: 'Ant Design Breadcrumb는 현재 페이지에 aria-current를 자동으로 추가하지 않습니다. itemRender prop으로 커스텀하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Breadcrumb',
        code: `import { Breadcrumb } from 'antd'
<Breadcrumb
  aria-label='breadcrumb'
  items={[{ title: <a href='/'>홈</a> }, { title: <a href='/products'>제품</a> }, { title: <a href='/products/shoes'>신발</a> }, { title: '운동화' }]}
  itemRender={(item, params, items) => {
    const isLast = items.indexOf(item) === items.length - 1
    return isLast ? <span aria-current='page'>{item.title}</span> : item.title
  }}
/>`
      },
      notes: [
        'Ant Design Breadcrumb에 aria-label 속성을 직접 추가해야 합니다.',
        'itemRender prop으로 마지막 항목에 aria-current="page"를 추가하세요.',
        'separator prop으로 구분자를 변경할 수 있으며, 기본 구분자는 aria-hidden이 적용됩니다.'
      ]
    }
  }
}
