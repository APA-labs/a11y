import type { Pattern } from '../types'

export const disclosurePattern: Pattern = {
  slug: 'disclosure',
  name: 'Disclosure',
  description: '버튼 클릭으로 콘텐츠를 표시하거나 숨기는 패턴',
  wcagCriteria: ['2.1.1 Keyboard', '4.1.2 Name, Role, Value'],
  tags: ['interactive', 'content', 'toggle'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'disclosure-button-role',
          title: 'button 역할 사용',
          description: '콘텐츠를 표시/숨기는 컨트롤은 role="button" 또는 <button>이어야 합니다.',
          level: 'must'
        },
        {
          id: 'disclosure-aria-expanded',
          title: 'aria-expanded로 상태 반영',
          description: '콘텐츠가 보일 때 aria-expanded="true", 숨겨질 때 aria-expanded="false"를 설정해야 합니다.',
          level: 'must'
        },
        {
          id: 'disclosure-keyboard',
          title: 'Enter/Space로 토글',
          description: 'Enter 또는 Space로 콘텐츠 가시성을 토글할 수 있어야 합니다.',
          level: 'must'
        }
      ],
      should: [
        {
          id: 'disclosure-aria-controls',
          title: 'aria-controls로 콘텐츠 참조',
          description: '버튼이 aria-controls로 제어하는 콘텐츠 요소의 ID를 가리켜야 합니다.',
          level: 'should'
        },
        {
          id: 'disclosure-focus-indicator',
          title: '포커스 표시',
          description: '키보드 탐색을 위한 명확한 포커스 링이 있어야 합니다.',
          level: 'should'
        },
        {
          id: 'disclosure-hidden-content',
          title: '접힌 콘텐츠 숨김 처리',
          description: '접힌 콘텐츠는 display:none 또는 hidden 속성으로 보조 기술에서 완전히 제거해야 합니다.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'disclosure-no-expanded-state',
          title: 'aria-expanded 생략 금지',
          description: 'aria-expanded 없이는 스크린리더가 열림/닫힘 상태를 알릴 수 없습니다.',
          level: 'avoid'
        },
        {
          id: 'disclosure-visibility-only',
          title: 'CSS visibility/opacity만 사용 금지',
          description: 'visibility:hidden이나 opacity:0만으로 숨기면 접근성 트리에서 제거되지 않습니다.',
          level: 'avoid'
        }
      ]
    },
    codeSample: {
      language: 'tsx',
      label: 'Baseline (React)',
      code: `import { useState } from 'react'

export function Disclosure({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        type='button'
        aria-expanded={open}
        aria-controls='disclosure-content'
        onClick={() => setOpen(!open)}>
        {title}
      </button>
      <div
        id='disclosure-content'
        hidden={!open}>
        {children}
      </div>
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
          id: 'disclosure-mui-1',
          title: 'Collapse 컴포넌트 활용',
          description: 'MUI Collapse로 애니메이션을 추가해도 hidden 속성 대신 display:none이 적용되어 접근성이 유지됩니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Disclosure',
        code: `import { useState } from 'react'
import { Button, Collapse, Box } from '@mui/material'

export function MuiDisclosure({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <Box>
      <Button
        aria-expanded={open}
        aria-controls='mui-disclosure-content'
        onClick={() => setOpen(!open)}
        variant='text'>
        {title}
      </Button>
      <Collapse in={open}>
        <Box id='mui-disclosure-content'>{children}</Box>
      </Collapse>
    </Box>
  )
}`
      },
      notes: [
        'MUI Collapse는 in={false}일 때 DOM에서 완전히 제거하려면 unmountOnExit prop을 추가하세요.',
        'Button 대신 IconButton 사용 시 aria-label을 반드시 추가하세요.'
      ]
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'disclosure-radix-1',
          title: 'Collapsible.Root 사용',
          description: 'Radix Collapsible은 aria-expanded와 hidden 속성을 자동으로 관리합니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Collapsible',
        code: `import * as Collapsible from '@radix-ui/react-collapsible'

export function RadixDisclosure({ title, children }) {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger asChild>
        <button type='button'>{title}</button>
      </Collapsible.Trigger>
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible.Root>
  )
}`
      },
      notes: ['Radix Collapsible.Trigger는 aria-expanded를 자동으로 설정합니다.', 'Collapsible.Content는 닫힐 때 display:none으로 처리됩니다.']
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'disclosure-antd-1',
          title: 'Collapse 패널 접근성 확인',
          description: 'Ant Collapse는 기본적으로 접근성 속성을 제공하지만 header prop에 의미있는 텍스트를 반드시 포함하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Collapse',
        code: `import { Collapse } from 'antd'

const items = [
  {
    key: '1',
    label: 'Section Title',
    children: <p>Content goes here.</p>
  }
]

export function AntDisclosure() {
  return <Collapse items={items} />
}`
      },
      notes: ['Ant Design Collapse는 내부적으로 aria-expanded를 관리합니다.', 'destroyInactivePanel prop으로 닫힌 패널 DOM 제거 여부를 제어하세요.']
    },
    shadcn: {
      id: 'shadcn',
      name: 'shadcn/ui',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'disc-shadcn-1',
          title: 'CollapsibleTrigger aria 관리',
          description: 'CollapsibleTrigger는 aria-expanded를 자동 관리합니다. asChild 패턴 사용 시에도 button 요소를 유지하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'shadcn/ui Collapsible',
        code: `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
<Collapsible
  open={isOpen}
  onOpenChange={setIsOpen}>
  <CollapsibleTrigger asChild>
    <Button variant='ghost'>시스템 요구사항 {isOpen ? '▲' : '▼'}</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p>운영체제: Windows 10 이상, macOS 10.15 이상</p>
  </CollapsibleContent>
</Collapsible>`
      },
      notes: [
        'shadcn Collapsible은 Radix UI 기반으로 aria-expanded를 자동 관리합니다.',
        'open/onOpenChange로 제어 컴포넌트로 사용 가능합니다.',
        'CollapsibleTrigger에 asChild를 사용해 시맨틱 button을 유지하세요.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [],
      codeSample: {
        language: 'tsx',
        label: 'React Aria Disclosure',
        code: `import { Disclosure, DisclosureHeader, DisclosurePanel, Button } from 'react-aria-components'
<Disclosure>
  <DisclosureHeader>
    <Button slot='trigger'>시스템 요구사항</Button>
  </DisclosureHeader>
  <DisclosurePanel>운영체제: Windows 10 이상, macOS 10.15 이상</DisclosurePanel>
</Disclosure>`
      },
      notes: [
        'React Aria Disclosure는 WAI-ARIA Disclosure 패턴을 완전히 구현합니다.',
        "DisclosureHeader의 Button에 slot='trigger'를 반드시 지정하세요.",
        'defaultExpanded prop으로 초기 열림 상태를 설정할 수 있습니다.'
      ]
    }
  }
}
