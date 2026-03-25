import type { Pattern } from '../types'

export const popoverPattern: Pattern = {
  slug: 'popover',
  name: 'Popover',
  description: '버튼으로 트리거하는 대화형 플로팅 패널 컴포넌트',
  wcagCriteria: ['2.1.1 Keyboard', '2.1.2 No Keyboard Trap', '4.1.2 Name, Role, Value'],
  tags: ['interactive', 'overlay', 'floating'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'popover-m1',
          title: '트리거에 aria-expanded 설정',
          description: '팝오버를 여는 트리거 버튼에 aria-expanded로 열림/닫힘 상태를 표시해야 합니다.',
          level: 'must'
        },
        {
          id: 'popover-m2',
          title: 'aria-haspopup 또는 aria-controls',
          description: '트리거에 aria-haspopup="dialog"를 추가하거나 aria-controls로 팝오버 패널 ID를 참조해야 합니다.',
          level: 'must'
        },
        {
          id: 'popover-m3',
          title: '포커스 관리',
          description: '팝오버 열릴 때 첫 번째 포커스 가능한 요소로 포커스 이동, 닫힐 때 트리거로 포커스 복귀해야 합니다.',
          level: 'must'
        },
        { id: 'popover-m4', title: 'Escape로 닫기', description: '팝오버가 열려 있을 때 Escape 키로 닫을 수 있어야 합니다.', level: 'must' }
      ],
      should: [
        {
          id: 'popover-s1',
          title: 'role="dialog"와 aria-label',
          description: '대화형 콘텐츠를 포함하는 팝오버에는 role="dialog"와 aria-label 또는 aria-labelledby를 제공하세요.',
          level: 'should'
        },
        { id: 'popover-s2', title: '배경 클릭으로 닫기', description: '팝오버 외부 영역을 클릭하면 닫히도록 구현하세요.', level: 'should' },
        {
          id: 'popover-s3',
          title: '포커스 트랩',
          description: '대화형 콘텐츠가 있는 팝오버는 Tab/Shift+Tab이 팝오버 내부에서만 순환하도록 구현하세요.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'popover-a1',
          title: 'hover로만 열기',
          description: 'hover로만 팝오버를 열면 키보드 사용자와 터치 사용자가 접근할 수 없습니다.',
          level: 'avoid'
        },
        {
          id: 'popover-a2',
          title: '팝오버에만 중요한 정보 배치',
          description: '팝오버는 보조 정보용입니다. 필수 액션은 팝오버 없이도 접근할 수 있어야 합니다.',
          level: 'avoid'
        }
      ]
    },
    codeSample: {
      language: 'tsx',
      label: 'Baseline (React)',
      code: `function PopoverDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  return (
    <div>
      <button
        ref={triggerRef}
        aria-expanded={isOpen}
        aria-haspopup='dialog'
        aria-controls='popover-content'
        onClick={() => setIsOpen(!isOpen)}>
        설정 열기
      </button>

      {isOpen && (
        <div
          id='popover-content'
          role='dialog'
          aria-label='설정'
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false)
              triggerRef.current?.focus()
            }
          }}>
          <h3>설정</h3>
          <button>알림 켜기</button>
          <button
            onClick={() => {
              setIsOpen(false)
              triggerRef.current?.focus()
            }}>
            닫기
          </button>
        </div>
      )}
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
          id: 'popover-mui-1',
          title: 'Popover anchorEl로 트리거 연결',
          description: 'MUI Popover는 anchorEl에 트리거 요소를 전달하면 위치가 자동 계산됩니다. aria-controls로도 연결하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Popover',
        code: `import { Button, Popover, Typography } from '@mui/material'

function MuiPopoverDemo() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const id = open ? 'popover' : undefined

  return (
    <>
      <Button
        aria-describedby={id}
        aria-expanded={open}
        onClick={(e) => setAnchorEl(e.currentTarget)}>
        설정 열기
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Typography sx={{ p: 2 }}>설정 내용</Typography>
      </Popover>
    </>
  )
}`
      },
      notes: [
        'MUI Popover는 Escape 키와 배경 클릭으로 자동으로 닫힙니다.',
        'aria-describedby로 트리거와 팝오버를 연결하세요.',
        '팝오버 내 포커스 관리는 직접 구현해야 합니다.'
      ]
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'popover-radix-1',
          title: '접근성 자동 처리',
          description: 'Radix Popover는 aria-expanded, 포커스 관리, Escape 닫기를 모두 자동으로 처리합니다. 별도 구현 불필요합니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Popover',
        code: `import * as Popover from '@radix-ui/react-popover'
<Popover.Root>
  <Popover.Trigger asChild>
    <button>설정 열기</button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Content
      sideOffset={5}
      aria-label='설정'>
      <h3>설정</h3>
      <button>알림 켜기</button>
      <Popover.Close aria-label='닫기'>×</Popover.Close>
      <Popover.Arrow />
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>`
      },
      notes: [
        'Radix Popover는 Space/Enter로 열기, Escape로 닫기, 트리거로 포커스 복귀를 자동 처리합니다.',
        'aria-expanded는 Popover.Trigger에 자동으로 적용됩니다.',
        'Popover.Portal로 감싸면 z-index 문제 없이 DOM 최상단에 렌더링됩니다.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'popover-antd-1',
          title: '트리거에 aria-expanded 직접 추가',
          description: 'Ant Design Popover는 트리거 버튼에 aria-expanded를 자동으로 추가하지 않습니다. open 상태를 직접 관리하여 추가하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Popover',
        code: `import { Popover, Button } from 'antd'

function AntdPopoverDemo() {
  const [open, setOpen] = useState(false)

  const content = (
    <div>
      <p>설정 내용</p>
      <Button onClick={() => setOpen(false)}>닫기</Button>
    </div>
  )

  return (
    <Popover
      content={content}
      title='설정'
      open={open}
      onOpenChange={setOpen}
      trigger='click'>
      <Button
        aria-expanded={open}
        aria-haspopup='dialog'>
        설정 열기
      </Button>
    </Popover>
  )
}`
      },
      notes: [
        'trigger="click"으로 설정하면 키보드 Enter/Space로도 열립니다.',
        '트리거 버튼에 aria-expanded와 aria-haspopup을 직접 추가해야 합니다.',
        'Ant Design Popover는 Escape 키로 닫히지 않으므로 닫기 버튼을 content 안에 포함하세요.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'pop-chakra-1',
          title: 'CloseTrigger aria-label',
          description: '닫기 버튼에 아이콘만 사용할 경우 aria-label을 명시적으로 추가하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI Popover',
        code: `import { Popover, Button } from '@chakra-ui/react'
<Popover.Root>
  <Popover.Trigger asChild>
    <Button variant='outline'>설정 열기</Button>
  </Popover.Trigger>
  <Popover.Positioner>
    <Popover.Content>
      <Popover.Arrow>
        <Popover.ArrowTip />
      </Popover.Arrow>
      <Popover.Body>
        <Popover.Title>알림 설정</Popover.Title>
        <p>알림 수신 방법을 설정하세요.</p>
      </Popover.Body>
      <Popover.CloseTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          aria-label='닫기'>
          ✕
        </Button>
      </Popover.CloseTrigger>
    </Popover.Content>
  </Popover.Positioner>
</Popover.Root>`
      },
      notes: [
        'Chakra Popover.Root는 포커스 트랩과 aria 속성을 자동 처리합니다.',
        'Popover.CloseTrigger에 aria-label을 추가하세요.',
        'closeOnInteractOutside prop으로 외부 클릭 닫기를 제어하세요.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [],
      codeSample: {
        language: 'tsx',
        label: 'React Aria Popover',
        code: `import { DialogTrigger, Button, Popover, Dialog, Heading } from 'react-aria-components'

const btnStyle = { padding: '8px 16px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer', fontSize: 14 }
const popoverStyle = { background: '#fff', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,.12)', padding: 16, outline: 'none', maxWidth: 280 }

<DialogTrigger>
  <Button style={btnStyle}>설정 열기</Button>
  <Popover style={popoverStyle}>
    <Dialog style={{ outline: 'none' }}>
      <Heading slot='title' style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 600 }}>알림 설정</Heading>
      <p style={{ margin: 0, fontSize: 13, color: '#4b5563' }}>알림 수신 방법을 설정하세요.</p>
    </Dialog>
  </Popover>
</DialogTrigger>`
      },
      notes: [
        'React Aria Popover는 DialogTrigger와 함께 사용합니다.',
        "Dialog의 Heading에 slot='title'을 설정하면 aria-labelledby가 자동 연결됩니다.",
        'Popover는 자동으로 포커스 관리와 aria 속성을 처리합니다.'
      ]
    }
  }
}
