import type { Pattern } from '../types'

export const drawerPattern: Pattern = {
  slug: 'drawer',
  name: 'Drawer',
  description: '화면 가장자리에서 슬라이드하여 나타나는 사이드 패널 컴포넌트',
  wcagCriteria: ['2.1.1 Keyboard', '2.1.2 No Keyboard Trap', '4.1.2 Name, Role, Value'],
  tags: ['overlay', 'interactive', 'navigation'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'drawer-m1',
          title: 'role="dialog"와 aria-modal="true"',
          description: '드로어 패널에 role="dialog"와 aria-modal="true"를 설정해야 합니다.',
          level: 'must'
        },
        {
          id: 'drawer-m2',
          title: '레이블 제공',
          description: '드로어에 aria-labelledby 또는 aria-label로 레이블을 제공해야 합니다.',
          level: 'must'
        },
        {
          id: 'drawer-m3',
          title: '포커스 트랩',
          description: '드로어가 열렸을 때 Tab/Shift+Tab이 드로어 내부에서만 순환해야 합니다.',
          level: 'must'
        },
        { id: 'drawer-m4', title: 'Escape로 닫기', description: 'Escape 키로 드로어를 닫을 수 있어야 합니다.', level: 'must' },
        {
          id: 'drawer-m5',
          title: '포커스 관리',
          description: '드로어 열릴 때 내부 첫 포커스 가능 요소로 포커스 이동, 닫힐 때 트리거로 포커스 복귀해야 합니다.',
          level: 'must'
        }
      ],
      should: [
        {
          id: 'drawer-s1',
          title: '배경 inert 처리',
          description: '드로어가 열려 있을 때 배경 콘텐츠에 inert 속성으로 스크린리더가 배경을 읽지 못하게 하세요.',
          level: 'should'
        },
        {
          id: 'drawer-s2',
          title: '배경 오버레이 클릭으로 닫기',
          description: '드로어 외부 오버레이를 클릭하면 닫히도록 구현하세요.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'drawer-a1',
          title: '포커스 트랩 없이 배경 포커스 허용',
          description: '드로어가 열린 상태에서 배경 요소에 Tab으로 이동할 수 있으면 스크린리더 사용자가 경계를 파악하기 어렵습니다.',
          level: 'avoid'
        },
        {
          id: 'drawer-a2',
          title: '시각적 닫기 버튼 미제공',
          description: '모바일 사용자는 Escape 키가 없으므로 항상 시각적 닫기 버튼을 제공하세요.',
          level: 'avoid'
        }
      ]
    },
    codeSample: {
      language: 'tsx',
      label: 'Baseline (React)',
      code: `function DrawerDemo() {
const [isOpen, setIsOpen] = useState(false);
const triggerRef = useRef<HTMLButtonElement>(null);
const titleId = 'drawer-title';

return (
  <>
    <button ref={triggerRef} onClick={() => setIsOpen(true)}>
      메뉴 열기
    </button>

    {isOpen && (
      <>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false);
              triggerRef.current?.focus();
            }
          }}
        >
          <h2 id={titleId}>메뉴</h2>
          <nav>
            <a href="/">홈</a>
            <a href="/about">소개</a>
          </nav>
          <button onClick={() => { setIsOpen(false); triggerRef.current?.focus(); }}>
            닫기
          </button>
        </div>
        <div onClick={() => setIsOpen(false)} aria-hidden="true" />
      </>
    )}
  </>
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
          id: 'drawer-mui-1',
          title: 'variant="temporary"로 모달 동작',
          description: 'MUI Drawer의 variant="temporary"는 포커스 트랩과 배경 오버레이를 자동으로 처리합니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Drawer',
        code: `import { Drawer, Box, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function MuiDrawerDemo() {
const [open, setIsOpen] = useState(false);

return (
  <>
    <Button onClick={() => setIsOpen(true)}>메뉴 열기</Button>
    <Drawer
      open={open}
      onClose={() => setIsOpen(false)}
      aria-labelledby="drawer-title"
    >
      <Box sx={{ width: 280, p: 2 }} role="presentation">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography id="drawer-title" variant="h6">메뉴</Typography>
          <IconButton onClick={() => setIsOpen(false)} aria-label="드로어 닫기">
            <CloseIcon />
          </IconButton>
        </Box>
        <nav>
          <a href="/">홈</a>
          <a href="/about">소개</a>
        </nav>
      </Box>
    </Drawer>
  </>
);
}`
      },
      notes: [
        'MUI Drawer variant="temporary"는 Modal 기반으로 포커스 트랩과 Escape 닫기를 자동 처리합니다.',
        'aria-labelledby를 드로어 제목 ID와 연결하세요.',
        'keepMounted={false}로 설정하면 닫혔을 때 DOM에서 제거됩니다.'
      ]
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'drawer-radix-1',
          title: 'Dialog 기반으로 구현',
          description:
            'Radix UI에는 전용 Drawer가 없습니다. Dialog 컴포넌트에 CSS로 슬라이드 애니메이션을 추가하거나 vaul 라이브러리를 사용하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Dialog (Drawer 구현)',
        code: `import * as Dialog from '@radix-ui/react-dialog';

{/* Radix Dialog에 CSS transform으로 드로어 효과 */}
<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
<Dialog.Trigger asChild>
  <button>메뉴 열기</button>
</Dialog.Trigger>
<Dialog.Portal>
  <Dialog.Overlay className="drawer-overlay" />
  <Dialog.Content
    className="drawer-content" /* translateX 애니메이션 */
    aria-describedby={undefined}
  >
    <Dialog.Title>메뉴</Dialog.Title>
    <nav>
      <a href="/">홈</a>
      <a href="/about">소개</a>
    </nav>
    <Dialog.Close aria-label="드로어 닫기">닫기</Dialog.Close>
  </Dialog.Content>
</Dialog.Portal>
</Dialog.Root>`
      },
      notes: [
        'Radix Dialog는 포커스 트랩, Escape 닫기, 트리거로 포커스 복귀를 자동 처리합니다.',
        'CSS transform translateX로 슬라이드 인 효과를 구현하세요.',
        'shadcn/ui의 Sheet 컴포넌트가 이 패턴의 완성된 구현입니다.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'drawer-antd-1',
          title: '닫기 버튼 aria-label 확인',
          description:
            'Ant Design Drawer의 기본 닫기 버튼은 × 문자만 표시됩니다. 스크린리더를 위해 aria-label을 추가하거나 closable 영역을 커스텀하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Drawer',
        code: `import { Drawer, Button } from 'antd';

<>
<Button onClick={() => setIsOpen(true)}>메뉴 열기</Button>
<Drawer
  title="메뉴"
  open={isOpen}
  onClose={() => setIsOpen(false)}
  placement="left"
  closeIcon={<span aria-label="드로어 닫기">×</span>}
>
  <nav>
    <a href="/">홈</a>
    <a href="/about">소개</a>
  </nav>
</Drawer>
</>`
      },
      notes: [
        'Ant Design Drawer는 Escape 키로 자동으로 닫힙니다.',
        'placement prop으로 left/right/top/bottom 위치를 설정합니다.',
        'closeIcon prop으로 닫기 버튼을 커스텀하여 aria-label을 추가하세요.'
      ]
    },
    shadcn: {
      id: 'shadcn',
      name: 'shadcn/ui',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'drw-shadcn-1',
          title: 'DrawerTitle과 DrawerDescription 제공',
          description: 'DrawerTitle은 aria-labelledby로 자동 연결됩니다. 항상 제목을 제공하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'shadcn/ui Drawer',
        code: `import {
Drawer,
DrawerClose,
DrawerContent,
DrawerDescription,
DrawerHeader,
DrawerTitle,
DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

<Drawer>
<DrawerTrigger asChild>
  <Button variant="outline">메뉴 열기</Button>
</DrawerTrigger>
<DrawerContent>
  <DrawerHeader>
    <DrawerTitle>내비게이션 메뉴</DrawerTitle>
    <DrawerDescription>원하는 페이지로 이동하세요.</DrawerDescription>
  </DrawerHeader>
  <div className="p-4">
    <a href="/home" className="block py-2">홈</a>
    <a href="/about" className="block py-2">소개</a>
  </div>
  <DrawerClose asChild>
    <Button variant="outline">닫기</Button>
  </DrawerClose>
</DrawerContent>
</Drawer>`
      },
      notes: [
        'shadcn Drawer는 Vaul 기반으로 모바일 친화적인 바텀 시트를 제공합니다.',
        'DrawerTitle은 aria-labelledby로 자동 연결됩니다.',
        '포커스 트랩과 ESC 닫기가 자동 처리됩니다.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'drw-chakra-1',
          title: 'CloseTrigger aria-label',
          description: '닫기 버튼에 아이콘만 사용할 경우 aria-label을 명시적으로 추가하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI Drawer',
        code: `import { Drawer, Button } from '@chakra-ui/react'

<Drawer.Root>
<Drawer.Trigger asChild>
  <Button variant="outline">메뉴 열기</Button>
</Drawer.Trigger>
<Drawer.Backdrop />
<Drawer.Positioner>
  <Drawer.Content>
    <Drawer.CloseTrigger asChild>
      <Button variant="ghost" aria-label="닫기" position="absolute" top={2} right={2}>✕</Button>
    </Drawer.CloseTrigger>
    <Drawer.Header>
      <Drawer.Title>내비게이션 메뉴</Drawer.Title>
    </Drawer.Header>
    <Drawer.Body>
      <a href="/home">홈</a>
      <a href="/about">소개</a>
    </Drawer.Body>
    <Drawer.Footer>
      <Drawer.ActionTrigger asChild>
        <Button variant="outline">닫기</Button>
      </Drawer.ActionTrigger>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Positioner>
</Drawer.Root>`
      },
      notes: [
        'Chakra Drawer.Root는 포커스 트랩과 aria-modal을 자동 처리합니다.',
        'placement prop으로 bottom, left, right, top 방향을 지정하세요.',
        '닫기 버튼에 aria-label을 반드시 추가하세요.'
      ]
    }
  }
}
