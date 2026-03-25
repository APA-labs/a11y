import type { Pattern } from '../types'

export const linkPattern: Pattern = {
  slug: 'link',
  name: 'Link',
  description: '다른 페이지나 리소스로 이동하는 하이퍼링크 패턴',
  wcagCriteria: ['2.1.1 Keyboard', '2.4.4 Link Purpose', '4.1.2 Name, Role, Value'],
  tags: ['navigation', 'interactive'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'link-role',
          title: '네이티브 <a> 또는 role="link"',
          description: '네이티브 <a href>를 사용하세요. 비의미적 요소를 링크로 사용할 경우 role="link"와 키보드 처리를 추가해야 합니다.',
          level: 'must'
        },
        {
          id: 'link-accessible-name',
          title: '설명적 접근 가능 이름',
          description: '링크 텍스트 또는 aria-label이 목적지를 설명해야 합니다. "클릭하세요", "더보기" 같은 모호한 텍스트를 피하세요.',
          level: 'must'
        },
        {
          id: 'link-keyboard-enter',
          title: 'Enter로 활성화',
          description: '포커스된 링크에서 Enter 키를 누르면 이동이 실행되어야 합니다.',
          level: 'must'
        },
        { id: 'link-href', title: '유효한 href', description: '<a> 요소에 href 속성이 있어야 키보드 포커스가 기본으로 적용됩니다.', level: 'must' }
      ],
      should: [
        {
          id: 'link-new-tab-warning',
          title: '새 탭 열기 시 안내',
          description: '새 탭에서 열리는 링크는 텍스트나 aria-label에 이를 표시하세요 (예: "(새 탭에서 열림)").',
          level: 'should'
        },
        {
          id: 'link-focus-indicator',
          title: '포커스 표시',
          description: '기본 아웃라인을 제거할 경우 더 강한 대안을 제공하세요.',
          level: 'should'
        },
        {
          id: 'link-distinguishable',
          title: '텍스트와 구별 가능',
          description: '본문 내 링크는 색상 외에 밑줄 등으로도 구별할 수 있어야 합니다.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'link-empty-href',
          title: '빈 href 또는 # 금지',
          description: '<a href="#">이나 <a href="javascript:void(0)">는 탐색이 아닌 액션에 사용하지 마세요. 대신 <button>을 사용하세요.',
          level: 'avoid'
        },
        {
          id: 'link-image-without-alt',
          title: '이미지 링크에 alt 텍스트 누락 금지',
          description: '이미지만 있는 링크는 alt 텍스트 없이는 접근 가능 이름이 없습니다.',
          level: 'avoid'
        }
      ]
    },
    codeSample: {
      language: 'tsx',
      label: 'Baseline (React)',
      code: `export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noreferrer noopener'>
      {children}
      <span className='sr-only'> (새 탭에서 열림)</span>
    </a>
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
          id: 'link-mui-1',
          title: 'MUI Link 컴포넌트 사용',
          description: 'MUI Link는 <a>를 기반으로 하므로 기본 접근성이 유지됩니다. underline prop을 "always"로 설정하는 것을 권장합니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Link',
        code: `import { Link } from '@mui/material'
<Link
  href='/about'
  underline='always'>
  회사 소개
</Link>

{
  /* 외부 링크 */
}
<Link
  href='https://example.com'
  target='_blank'
  rel='noreferrer'>
  외부 사이트
  <span className='sr-only'> (새 탭에서 열림)</span>
</Link>`
      },
      notes: ['MUI Link는 component prop으로 Next.js Link 등 라우터와 통합할 수 있습니다.', 'color prop 변경 시 대비율을 확인하세요.']
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'link-radix-1',
          title: 'asChild로 라우터 링크 통합',
          description: 'Radix는 별도 Link 컴포넌트가 없으므로 네이티브 <a>나 Next.js Link를 직접 사용하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix + Next.js Link',
        code: `import NextLink from 'next/link'

{
  /* Radix 컴포넌트 내 링크는 asChild 패턴 활용 */
}
<NextLink
  href='/patterns/button'
  className='text-indigo-600 hover:underline'>
  Button 패턴 보기
</NextLink>`
      },
      notes: ['네이티브 <a>의 기본 접근성을 최대한 활용하세요.', 'Radix Themes를 사용하는 경우 Theme.Link 컴포넌트가 포함되어 있습니다.']
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'link-antd-1',
          title: 'Typography.Link 사용',
          description: 'Ant Design의 Typography.Link는 <a>를 기반으로 하며 기본 스타일과 접근성을 제공합니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Typography.Link',
        code: `import { Typography } from 'antd'

const { Link } = Typography

<Link href="/about">회사 소개</Link>

{/* 외부 링크 */}
<Link href="https://example.com" target="_blank">
외부 사이트
<span className="sr-only"> (새 탭에서 열림)</span>
</Link>`
      },
      notes: [
        'Ant Design Typography.Link는 href 없이 onClick만 사용하면 <button>처럼 동작합니다.',
        'disabled prop을 사용할 때 색상 대비를 확인하세요.'
      ]
    }
  }
}
