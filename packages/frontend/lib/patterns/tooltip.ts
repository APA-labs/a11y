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
      onKeyDown={(e) => e.key === 'Escape' && setVisible(false)}
    >
      {children}
    </span>
    {visible && (
      <span
        id={id}
        role="tooltip"
        style={{ position: 'absolute', bottom: '100%', left: 0, whiteSpace: 'nowrap' }}
      >
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
          title: 'enterDelay 설정',
          description: 'enterDelay prop으로 300ms 이상의 지연을 추가해 우발적 표시를 방지하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Tooltip',
        code: `import { Tooltip, IconButton } from '@mui/material'
import { InfoOutlined } from '@mui/icons-material'

<Tooltip title="추가 정보입니다" enterDelay={300} arrow>
<IconButton aria-label="정보">
  <InfoOutlined />
</IconButton>
</Tooltip>`
      },
      notes: ['MUI Tooltip은 role="tooltip"과 aria-describedby를 자동으로 처리합니다.', '커스텀 children을 사용할 경우 forwardRef를 구현해야 합니다.']
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'tooltip-radix-1',
          title: 'TooltipProvider 최상위 배치',
          description: 'TooltipProvider를 앱 최상위에 배치해 delayDuration을 전역으로 관리하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Tooltip',
        code: `import * as Tooltip from '@radix-ui/react-tooltip'

export function RadixTooltip({ label, children }) {
return (
  <Tooltip.Provider delayDuration={300}>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        {children}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side="top" sideOffset={4}>
          {label}
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
)
}`
      },
      notes: ['Radix Tooltip은 role="tooltip"과 aria-describedby를 자동으로 처리합니다.', 'Portal로 렌더링하면 z-index 문제를 방지할 수 있습니다.']
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'tooltip-antd-1',
          title: 'mouseEnterDelay 설정',
          description: 'mouseEnterDelay prop으로 지연 시간을 설정하세요 (기본값 0.1초는 너무 짧을 수 있습니다).',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Tooltip',
        code: `import { Tooltip, Button } from 'antd'

<Tooltip title="저장합니다" mouseEnterDelay={0.3}>
<Button>저장</Button>
</Tooltip>`
      },
      notes: ['Ant Design Tooltip은 내부적으로 접근성 속성을 처리합니다.', 'color prop 변경 시 텍스트 대비율을 재확인하세요.']
    },
    shadcn: {
      id: 'shadcn',
      name: 'shadcn/ui',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'tip-shadcn-1',
          title: '트리거 요소 aria-label',
          description: '아이콘 전용 버튼에 tooltip을 연결할 때 트리거 요소에 aria-label을 반드시 제공하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'shadcn/ui Tooltip',
        code: `import {
Tooltip,
TooltipContent,
TooltipProvider,
TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

<TooltipProvider>
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline" size="icon" aria-label="설정">
      ⚙️
    </Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>설정 열기</p>
  </TooltipContent>
</Tooltip>
</TooltipProvider>`
      },
      notes: [
        'shadcn Tooltip은 Radix UI 기반으로 hover/focus 시 자동 표시됩니다.',
        'TooltipProvider를 앱 루트에 설치해 일관된 딜레이를 설정하세요.',
        '아이콘 전용 트리거에는 aria-label을 반드시 추가하세요.'
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
        code: `import { Tooltip, Button } from '@chakra-ui/react'

<Tooltip content="설정 열기">
<Button variant="outline" size="sm" aria-label="설정">
  ⚙️
</Button>
</Tooltip>`
      },
      notes: [
        'Chakra Tooltip은 hover/focus 이벤트를 자동으로 처리합니다.',
        'showDelay/closeDelay prop으로 표시 타이밍을 조절하세요.',
        'content prop에 설명 텍스트를 제공하세요.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [],
      codeSample: {
        language: 'tsx',
        label: 'React Aria Tooltip',
        code: `import { TooltipTrigger, Tooltip, Button } from 'react-aria-components'

<TooltipTrigger delay={500}>
<Button aria-label="설정">⚙️</Button>
<Tooltip>설정 열기</Tooltip>
</TooltipTrigger>`
      },
      notes: [
        'React Aria TooltipTrigger는 hover, focus, keyboard를 모두 처리합니다.',
        'delay prop으로 표시 딜레이를 설정하세요 (기본 1200ms).',
        'Tooltip은 자동으로 aria-describedby로 트리거에 연결됩니다.'
      ]
    }
  }
}
