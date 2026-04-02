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
          title: 'Collapsible.Trigger의 aria-expanded 자동 관리',
          description: 'Collapsible.Trigger는 열림/닫힘 상태에 따라 aria-expanded를 자동으로 설정합니다. 별도 구현이 필요 없습니다.',
          level: 'should'
        },
        {
          id: 'disclosure-radix-2',
          title: 'open/onOpenChange로 제어 모드 사용',
          description: 'open prop과 onOpenChange 콜백을 함께 사용하면 제어 컴포넌트로 동작합니다. defaultOpen은 비제어 초기값입니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Collapsible',
        code: `import { useState } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ maxWidth: 480, margin: '24px auto', padding: '0 16px' }}>
      <Collapsible.Root
        open={open}
        onOpenChange={setOpen}
        style={{ border: '1px solid #e2e8f0', borderRadius: 8 }}>
        <Collapsible.Trigger
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '14px 16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 15,
            fontWeight: 500,
            textAlign: 'left'
          }}>
          System requirements
          <span
            aria-hidden
            style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', display: 'inline-block' }}>
            ›
          </span>
        </Collapsible.Trigger>
        <Collapsible.Content style={{ padding: '0 16px 16px', fontSize: 14, color: '#4a5568', lineHeight: 1.6 }}>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>OS: Windows 10 or later, macOS 10.15 or later</li>
            <li>Memory: 4 GB RAM minimum</li>
            <li>Storage: 2 GB available disk space</li>
          </ul>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  )
}`
      },
      notes: [
        'Collapsible.Trigger는 aria-expanded와 aria-controls를 자동으로 관리합니다.',
        'open + onOpenChange(제어 모드) 또는 defaultOpen(비제어 모드)으로 열림 상태를 관리하세요.',
        'Collapsible.Content는 닫힐 때 display:none으로 처리됩니다. 애니메이션은 data-state="open" | "closed" 속성으로 CSS 적용이 가능합니다.',
        'asChild prop을 Collapsible.Trigger에 사용하면 원하는 HTML 요소로 렌더링할 수 있습니다.'
      ]
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
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'disclosure-spectrum-1',
          title: 'Heading > Button slot="trigger" 구조 준수',
          description: "Heading 내부의 Button에 반드시 slot='trigger'를 지정해야 aria-expanded와 aria-controls가 자동 관리됩니다.",
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria Disclosure',
        code: `import { useState } from 'react'
import { Disclosure, Heading, DisclosurePanel, Button } from 'react-aria-components'

const ITEMS = [
  { id: 'req', title: 'System Requirements', content: 'OS: Windows 10 or later, macOS 10.15 or later. RAM: 4GB minimum.' },
  { id: 'install', title: 'Installation', content: 'Download the installer and follow the on-screen instructions.' }
]

export default function App() {
  const [expanded, setExpanded] = useState<string | null>('req')

  return (
    <div style={{ padding: '1.5rem', maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {ITEMS.map((item) => (
        <Disclosure
          key={item.id}
          isExpanded={expanded === item.id}
          onExpandedChange={(open) => setExpanded(open ? item.id : null)}
          style={{ borderBottom: '1px solid #e5e7eb' }}>
          <Heading>
            <Button
              slot='trigger'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '12px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                textAlign: 'left'
              }}>
              {item.title}
              <span aria-hidden>{expanded === item.id ? '▲' : '▼'}</span>
            </Button>
          </Heading>
          <DisclosurePanel style={{ padding: '0 0 12px', fontSize: 14, color: '#4b5563' }}>{item.content}</DisclosurePanel>
        </Disclosure>
      ))}
    </div>
  )
}`
      },
      notes: [
        "Heading 내부의 Button에 slot='trigger'를 지정하면 aria-expanded와 aria-controls가 자동 관리됩니다.",
        'isExpanded/onExpandedChange로 제어 컴포넌트, defaultExpanded로 비제어 컴포넌트로 사용하세요.',
        'DisclosurePanel의 --disclosure-panel-height CSS 변수로 애니메이션을 구현할 수 있습니다.',
        'isDisabled prop으로 특정 항목을 비활성화할 수 있습니다.'
      ]
    },
    baseui: {
      id: 'baseui',
      name: 'Base UI',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'disclosure-baseui-1',
          title: 'Collapsible.Trigger는 aria-expanded 자동 관리',
          description: 'Base UI Collapsible.Trigger는 열림/닫힘 상태에 따라 aria-expanded와 aria-controls를 자동으로 설정합니다.',
          level: 'should'
        },
        {
          id: 'disclosure-baseui-2',
          title: 'hiddenUntilFound로 검색 가능한 패널 구현',
          description: 'hiddenUntilFound prop을 사용하면 브라우저 Ctrl+F 검색이 닫힌 패널 내용도 찾을 수 있습니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI Collapsible',
        code: `import { Collapsible } from '@base-ui-components/react/collapsible'

export default function App() {
  return (
    <div style={{ maxWidth: 480, margin: '24px auto', padding: '0 16px' }}>
      <Collapsible.Root style={{ border: '1px solid #e2e8f0', borderRadius: 8 }}>
        <Collapsible.Trigger
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '14px 16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 15,
            fontWeight: 500,
            textAlign: 'left'
          }}>
          Recovery keys
          <span aria-hidden>›</span>
        </Collapsible.Trigger>
        <Collapsible.Panel style={{ padding: '0 16px 16px', fontSize: 14, color: '#4a5568', lineHeight: 1.8 }}>
          <div>alien-bean-pasta</div>
          <div>wild-irish-burrito</div>
          <div>horse-battery-staple</div>
        </Collapsible.Panel>
      </Collapsible.Root>
    </div>
  )
}`
      },
      notes: [
        'Collapsible.Trigger는 aria-expanded와 aria-controls를 자동으로 관리합니다.',
        'defaultOpen(비제어) 또는 open/onOpenChange(제어 모드)로 열림 상태를 관리하세요.',
        'Collapsible.Panel은 닫힐 때 DOM에서 제거됩니다. keepMounted prop으로 DOM 유지 여부를 제어할 수 있습니다.',
        'hiddenUntilFound prop을 사용하면 브라우저 내 검색(Ctrl+F)에서 닫힌 패널 내용도 찾을 수 있습니다.',
        'data-panel-open 속성이 Collapsible.Trigger에, data-open 속성이 Collapsible.Panel에 자동 설정됩니다.'
      ]
    }
  }
}
