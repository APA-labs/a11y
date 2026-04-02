import type { Pattern } from '../types'

export const tooltipPattern: Pattern = {
  slug: 'tooltip',
  name: 'Tooltip',
  description: '요소에 추가 설명을 제공하는 팝업 텍스트 패턴',
  wcagCriteria: ['1.4.13 Content on Hover or Focus', '4.1.2 Name, Role, Value'],
  tags: ['overlay', 'informational', 'hover'],
  baseline: {
    checklist: {
      must: [
        { id: 'tooltip-role', title: 'tooltip 역할 사용', description: '툴팁 텍스트를 담은 요소에 role="tooltip"이 있어야 합니다.', level: 'must' },
        {
          id: 'tooltip-aria-describedby',
          title: 'aria-describedby로 연결',
          description: '트리거 요소에 aria-describedby로 툴팁의 id를 연결해야 합니다.',
          level: 'must'
        },
        {
          id: 'tooltip-escape-dismiss',
          title: 'Escape로 닫기',
          description: 'Escape 키로 툴팁을 닫을 수 있어야 하며 포커스는 이동하지 않아야 합니다.',
          level: 'must'
        }
      ],
      should: [
        {
          id: 'tooltip-focus-trigger',
          title: '포커스 시 표시',
          description: '마우스 호버뿐 아니라 키보드 포커스 시에도 툴팁이 표시되어야 합니다.',
          level: 'should'
        },
        {
          id: 'tooltip-no-focusable-content',
          title: '툴팁 내 포커스 가능 요소 금지',
          description: '툴팁에는 링크나 버튼 등 인터랙티브 요소를 포함하면 안 됩니다.',
          level: 'should'
        },
        {
          id: 'tooltip-persistent-on-hover',
          title: '툴팁 위 호버 시 유지',
          description: 'WCAG 1.4.13에 따라 포인터가 툴팁 위로 이동해도 툴팁이 유지되어야 합니다.',
          level: 'should'
        },
        {
          id: 'tooltip-delay',
          title: '짧은 지연 후 표시',
          description: '우발적 트리거를 방지하기 위해 300–500ms 지연 후 표시하세요.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'tooltip-interactive-content',
          title: '툴팁 내 인터랙티브 요소 금지',
          description: '버튼, 링크, 폼 컨트롤은 툴팁이 아닌 dialog 패턴을 사용하세요.',
          level: 'avoid'
        },
        {
          id: 'tooltip-title-attribute-only',
          title: 'HTML title 속성만 사용 금지',
          description: 'title 속성은 키보드 접근성이 없으며 스크린리더마다 동작이 다릅니다.',
          level: 'avoid'
        }
      ]
    },
    codeSample: {
      language: 'tsx',
      label: 'Baseline (React)',
      code: `import { useState, useId } from 'react'

export function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)
  const id = useId()

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span
        aria-describedby={visible ? id : undefined}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        onKeyDown={(e) => e.key === 'Escape' && setVisible(false)}>
        {children}
      </span>
      {visible && (
        <span
          id={id}
          role='tooltip'
          style={{ position: 'absolute', bottom: '100%', left: 0, whiteSpace: 'nowrap' }}>
          {label}
        </span>
      )}
    </span>
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
          id: 'tooltip-mui-1',
          title: 'enterDelay 300ms 이상 설정',
          description: 'enterDelay prop으로 300ms 이상의 지연을 추가해 우발적 표시를 방지하세요. 기본값은 100ms로 너무 짧을 수 있습니다.',
          level: 'should'
        },
        {
          id: 'tooltip-mui-2',
          title: '아이콘 버튼 트리거에 aria-label 필수',
          description:
            'Tooltip의 title은 시각적 설명을 보조하지만 접근 가능한 이름을 대체하지 않습니다. 아이콘만 있는 버튼에는 반드시 aria-label을 제공하세요.',
          level: 'must'
        },
        {
          id: 'tooltip-mui-3',
          title: '커스텀 children에 forwardRef 구현',
          description:
            'Tooltip은 children에 DOM 이벤트 리스너를 주입합니다. 커스텀 컴포넌트를 children으로 사용할 경우 React.forwardRef로 ref를 전달해야 합니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Tooltip',
        code: `import { Tooltip, Button, Stack, Typography } from '@mui/material'

export default function App() {
  return (
    <Stack
      spacing={3}
      style={{ padding: 32, alignItems: 'flex-start' }}>
      <Typography variant='h6'>Tooltip examples</Typography>

      <Tooltip
        title='Save your current changes to the server'
        enterDelay={300}
        arrow>
        <Button
          variant='contained'
          aria-label='Save file'>
          Save
        </Button>
      </Tooltip>

      <Tooltip
        title='This action cannot be undone'
        enterDelay={300}
        placement='right'
        arrow>
        <Button
          variant='outlined'
          color='error'
          aria-label='Delete selected item'>
          Delete
        </Button>
      </Tooltip>

      <Tooltip
        title='Keyboard shortcut: Ctrl+Z'
        enterDelay={300}
        arrow>
        <span>
          <Button
            disabled
            aria-label='Undo last action'>
            Undo
          </Button>
        </span>
      </Tooltip>
    </Stack>
  )
}`
      },
      notes: [
        'MUI Tooltip은 role="tooltip"과 aria-describedby를 자동으로 설정합니다.',
        'enterDelay: 툴팁 표시 지연(ms), 기본값 100 — 300 이상 권장.',
        'leaveDelay: 툴팁 숨김 지연(ms), 기본값 0.',
        'disabled 버튼에 툴팁을 표시하려면 <span>으로 감싸야 합니다. disabled 버튼은 포인터 이벤트를 수신하지 않습니다.',
        '커스텀 children 컴포넌트는 React.forwardRef를 구현해야 이벤트 리스너가 올바르게 연결됩니다.'
      ]
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'tooltip-radix-1',
          title: 'Tooltip.Provider 배치로 delayDuration 전역 관리',
          description: 'Tooltip.Provider를 앱 루트 또는 컴포넌트 최상위에 배치해 모든 Tooltip.Root의 지연 시간을 일관되게 설정하세요.',
          level: 'should'
        },
        {
          id: 'tooltip-radix-2',
          title: 'Tooltip.Trigger에 접근 가능한 이름 필수',
          description:
            '아이콘 전용 트리거에는 aria-label을 추가하세요. Tooltip은 aria-describedby로 연결되어 보조 설명을 제공하지만 접근 가능한 이름을 대체하지 않습니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Tooltip',
        code: `import * as Tooltip from '@radix-ui/react-tooltip'

const btnStyle = {
  padding: '8px 16px',
  borderRadius: 6,
  border: '1px solid #d1d5db',
  background: 'white',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 500
}
const iconBtnStyle = {
  width: 36,
  height: 36,
  borderRadius: 6,
  border: '1px solid #d1d5db',
  background: 'white',
  cursor: 'pointer',
  fontSize: 16,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center'
}
const contentStyle = {
  background: '#1f2937',
  color: 'white',
  padding: '5px 10px',
  borderRadius: 4,
  fontSize: 12,
  lineHeight: 1.4,
  maxWidth: 200
}

export default function App() {
  return (
    <Tooltip.Provider delayDuration={300}>
      <div style={{ display: 'flex', gap: 16, padding: 32, flexWrap: 'wrap' }}>
        <Tooltip.Root>
          <Tooltip.Trigger style={btnStyle}>Save</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side='top'
              sideOffset={6}
              style={contentStyle}>
              Save your current changes (Ctrl+S)
              <Tooltip.Arrow style={{ fill: '#1f2937' }} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger
            aria-label='Copy to clipboard'
            style={iconBtnStyle}>
            ⎘
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side='top'
              sideOffset={6}
              style={contentStyle}>
              Copy to clipboard
              <Tooltip.Arrow style={{ fill: '#1f2937' }} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger
            aria-label='Delete item'
            style={{ ...iconBtnStyle, borderColor: '#fca5a5', color: '#dc2626' }}>
            ✕
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side='top'
              sideOffset={6}
              style={{ ...contentStyle, background: '#dc2626' }}>
              Delete this item permanently
              <Tooltip.Arrow style={{ fill: '#dc2626' }} />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>
    </Tooltip.Provider>
  )
}`
      },
      notes: [
        'Tooltip.Content는 role="tooltip"으로 렌더링되며, Tooltip.Trigger에 aria-describedby로 자동 연결됩니다.',
        'Tooltip.Provider의 delayDuration(기본 700ms)으로 표시 지연을 설정하세요. 300ms 권장.',
        'Tooltip.Portal로 body에 렌더링하면 overflow:hidden이나 z-index 문제를 방지합니다.',
        '아이콘 전용 트리거는 aria-label을 반드시 제공하세요. Tooltip 텍스트는 보조 설명이지 접근 가능한 이름이 아닙니다.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'tooltip-antd-1',
          title: 'trigger에 "focus" 포함',
          description:
            'trigger 기본값은 "hover"입니다. 키보드 사용자도 툴팁을 볼 수 있도록 trigger="focus" 또는 trigger={["hover", "focus"]}로 설정하세요.',
          level: 'must'
        },
        {
          id: 'tooltip-antd-2',
          title: 'mouseEnterDelay로 지연 시간 설정',
          description: 'mouseEnterDelay 기본값은 0.1초로 너무 짧을 수 있습니다. WCAG 1.4.13을 위해 0.3초(300ms) 이상으로 설정하세요.',
          level: 'should'
        },
        {
          id: 'tooltip-antd-3',
          title: '아이콘 전용 트리거에 aria-label 필수',
          description:
            '아이콘이나 기호만 있는 버튼에 Tooltip을 사용하는 경우 트리거 요소에 aria-label을 반드시 추가하세요. Tooltip의 title은 aria-describedby로 연결되며 접근 가능한 이름을 대체하지 않습니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Tooltip',
        code: `import { Tooltip, Button, Space } from 'antd'

export default function App() {
  return (
    <div style={{ padding: '32px' }}>
      <Space
        size={12}
        wrap>
        <Tooltip
          title='Save your current changes (Ctrl+S)'
          trigger={['hover', 'focus']}
          mouseEnterDelay={0.3}>
          <Button type='primary'>Save</Button>
        </Tooltip>

        <Tooltip
          title='Copy to clipboard'
          trigger={['hover', 'focus']}
          mouseEnterDelay={0.3}>
          <Button aria-label='Copy to clipboard'>⎘</Button>
        </Tooltip>

        <Tooltip
          title='Delete this item permanently'
          trigger={['hover', 'focus']}
          mouseEnterDelay={0.3}
          color='#dc2626'>
          <Button
            danger
            aria-label='Delete item'>
            ✕
          </Button>
        </Tooltip>
      </Space>
    </div>
  )
}`
      },
      notes: [
        'trigger={["hover", "focus"]}로 설정하면 마우스 호버와 키보드 포커스 모두에서 툴팁이 표시됩니다.',
        'mouseEnterDelay 기본값은 0.1초입니다. WCAG 1.4.13 준수를 위해 0.3초 이상으로 설정하세요.',
        '아이콘 전용 트리거에는 aria-label을 반드시 추가하세요. Tooltip title은 aria-describedby로 연결되어 보조 설명만 제공합니다.',
        'color prop으로 배경색 변경 시 텍스트와의 대비율(4.5:1 이상)을 재확인하세요.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'tip-chakra-1',
          title: '트리거 요소 aria-label',
          description: '아이콘 전용 버튼에 tooltip을 사용할 때 트리거에 aria-label을 추가하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI Tooltip',
        code: `import { Tooltip, Button, Stack } from '@chakra-ui/react'

export default function App() {
  return (
    <Stack
      direction='row'
      gap={4}
      style={{ padding: '2rem' }}
      wrap='wrap'>
      <Tooltip.Root
        openDelay={300}
        closeDelay={100}>
        <Tooltip.Trigger asChild>
          <Button
            colorPalette='teal'
            variant='solid'>
            Save
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>
            <Tooltip.Arrow>
              <Tooltip.ArrowTip />
            </Tooltip.Arrow>
            Save your current changes (Ctrl+S)
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>

      <Tooltip.Root
        openDelay={300}
        closeDelay={100}>
        <Tooltip.Trigger asChild>
          <Button
            variant='outline'
            aria-label='Copy to clipboard'>
            ⎘
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>
            <Tooltip.Arrow>
              <Tooltip.ArrowTip />
            </Tooltip.Arrow>
            Copy to clipboard
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    </Stack>
  )
}`
      },
      notes: [
        'Chakra Tooltip.Root는 hover와 focus 이벤트를 자동으로 처리합니다.',
        'openDelay(기본 400ms)와 closeDelay(기본 150ms) prop으로 표시 타이밍을 조절하세요.',
        '아이콘 전용 트리거에는 aria-label을 반드시 추가하세요. Tooltip 텍스트는 aria-describedby로 연결되며 접근 가능한 이름을 대체하지 않습니다.',
        'Tooltip.Content는 role="tooltip"으로 자동 렌더링됩니다.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'tooltip-spectrum-1',
          title: '터치스크린에서 툴팁 미표시 고려',
          description:
            '툴팁은 터치 인터랙션에서 표시되지 않습니다. 아이콘 전용 버튼은 aria-label을 반드시 제공하여 툴팁 없이도 목적을 전달해야 합니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria Tooltip',
        code: `import { TooltipTrigger, Tooltip, Button } from 'react-aria-components'

const ACTIONS = [
  { id: 'edit', label: 'Edit', icon: '✎' },
  { id: 'copy', label: 'Copy', icon: '⧉' },
  { id: 'delete', label: 'Delete', icon: '✕' }
]

export default function App() {
  return (
    <div style={{ padding: '1.5rem', display: 'flex', gap: 8 }}>
      {ACTIONS.map((action) => (
        <TooltipTrigger
          key={action.id}
          delay={700}
          closeDelay={300}>
          <Button
            aria-label={action.label}
            style={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              background: '#fff',
              cursor: 'pointer',
              fontSize: 16
            }}>
            {action.icon}
          </Button>
          <Tooltip style={{ background: '#1f2937', color: '#fff', padding: '4px 10px', borderRadius: 4, fontSize: 12 }}>{action.label}</Tooltip>
        </TooltipTrigger>
      ))}
    </div>
  )
}`
      },
      notes: [
        'TooltipTrigger는 hover와 focus에서 툴팁을 표시하고 자동으로 aria-describedby를 연결합니다.',
        'delay prop으로 표시 딜레이(기본 1500ms), closeDelay prop으로 닫힘 딜레이(기본 500ms)를 설정하세요.',
        '툴팁은 터치스크린에서 표시되지 않습니다. 아이콘 전용 버튼에는 aria-label을 필수로 제공하세요.',
        "trigger='focus' prop으로 hover 없이 포커스에서만 툴팁을 표시할 수 있습니다."
      ]
    },
    baseui: {
      id: 'baseui',
      name: 'Base UI',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'tooltip-baseui-1',
          title: 'Tooltip.Provider 루트에 배치',
          description: 'Tooltip.Provider를 앱 루트에 배치하면 여러 툴팁의 딜레이를 일관되게 관리할 수 있습니다.',
          level: 'should'
        },
        {
          id: 'tooltip-baseui-2',
          title: 'Trigger에 aria-label 필수',
          description: '툴팁은 시각적 보조일 뿐 접근 가능한 이름을 대체하지 않습니다. 트리거에 반드시 aria-label을 제공하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI Tooltip',
        code: `import { Tooltip } from '@base-ui/react/tooltip'

export default function App() {
  return (
    <Tooltip.Provider delay={300}>
      <Tooltip.Root>
        <Tooltip.Trigger aria-label='Bold'>B</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={8}>
            <Tooltip.Popup>Bold</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}`
      },
      notes: [
        'Tooltip은 포커스/호버 시 자동으로 표시되며 Escape 키로 닫힙니다.',
        'Base UI Tooltip은 시각적 보조 요소로 aria-describedby를 자동 연결하지 않습니다. 트리거에 aria-label을 직접 제공하세요.',
        'Tooltip.Portal로 body에 렌더링하여 overflow: hidden 문제를 방지하세요.'
      ]
    }
  }
}
