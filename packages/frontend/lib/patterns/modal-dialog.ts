import type { Pattern } from '../types'

export const modalDialogPattern: Pattern = {
  slug: 'modal-dialog',
  name: 'Modal Dialog',
  description: '현재 작업을 중단하고 사용자의 주의를 요구하는 오버레이 컴포넌트',
  wcagCriteria: ['1.3.1 Info and Relationships', '2.1.1 Keyboard', '2.1.2 No Keyboard Trap', '4.1.2 Name, Role, Value'],
  tags: ['overlay', 'interactive', 'focus-management'],
  baseline: {
    checklist: {
      must: [
        { id: 'modal-m1', title: 'role="dialog" 설정', description: 'role="dialog"와 aria-modal="true"를 설정해야 합니다.', level: 'must' },
        { id: 'modal-m2', title: 'aria-labelledby 연결', description: '모달 제목을 aria-labelledby로 dialog에 연결해야 합니다.', level: 'must' },
        { id: 'modal-m3', title: '포커스 트랩', description: '모달 내부로 포커스를 가두고 외부로 이동하지 않아야 합니다.', level: 'must' },
        {
          id: 'modal-m4',
          title: '열릴 때 포커스 이동',
          description: '모달 열림 시 첫 번째 포커스 가능 요소 또는 제목으로 포커스를 이동해야 합니다.',
          level: 'must'
        },
        { id: 'modal-m5', title: 'ESC 키로 닫기', description: 'Escape 키로 모달을 닫을 수 있어야 합니다.', level: 'must' },
        {
          id: 'modal-m6',
          title: '닫힐 때 포커스 복원',
          description: '모달 닫힘 시 모달을 열었던 트리거 요소로 포커스를 반환해야 합니다.',
          level: 'must'
        }
      ],
      should: [
        { id: 'modal-s1', title: '배경 스크롤 방지', description: '모달 열림 시 배경 콘텐츠 스크롤을 막아 혼란을 방지하세요.', level: 'should' },
        {
          id: 'modal-s2',
          title: '배경 inert 처리',
          description: '모달 외부 콘텐츠에 inert 속성을 적용해 스크린리더 접근을 차단하세요.',
          level: 'should'
        },
        {
          id: 'modal-s3',
          title: 'aria-describedby로 설명 추가',
          description: '모달 본문 설명이 있을 경우 aria-describedby로 연결하세요.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'modal-a1',
          title: '스크롤 가능한 배경 허용 금지',
          description: '모달 열림 중 배경이 스크롤되면 사용자가 맥락을 잃습니다.',
          level: 'avoid'
        },
        {
          id: 'modal-a2',
          title: '포커스 트랩 없는 구현 금지',
          description: 'Tab 키가 모달 외부로 나가면 시각 장애 사용자가 길을 잃습니다.',
          level: 'avoid'
        }
      ]
    },
    codeSample: {
      language: 'tsx',
      label: 'Baseline (HTML)',
      code: `function Modal({ isOpen, onClose, title, children }) {
  const titleId = useId()
  const descId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    // 포커스 이동
    document.getElementById('modal-close')?.focus()
    // 배경 inert
    document.getElementById('root').inert = true
    return () => {
      document.getElementById('root').inert = false
    }
  }, [isOpen])

  if (!isOpen) return null
  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby={titleId}
      aria-describedby={descId}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}>
      <h2 id={titleId}>{title}</h2>
      <div id={descId}>{children}</div>
      <button
        id='modal-close'
        onClick={onClose}>
        닫기
      </button>
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
          id: 'modal-mui-1',
          title: 'MUI Dialog keepMounted 주의',
          description: 'keepMounted prop 사용 시 숨겨진 Dialog가 DOM에 남아 스크린리더에 노출될 수 있습니다.',
          level: 'must'
        },
        {
          id: 'modal-mui-2',
          title: 'disablePortal 사용 금지',
          description: 'disablePortal은 포커스 트랩과 inert 처리를 방해합니다.',
          level: 'avoid'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Dialog',
        code: `import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
<Dialog
  open={isOpen}
  onClose={() => setIsOpen(false)}
  aria-labelledby='dialog-title'
  aria-describedby='dialog-description'
  // keepMounted 사용 주의!
>
  <DialogTitle id='dialog-title'>파일 삭제</DialogTitle>
  <DialogContent>
    <p id='dialog-description'>이 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setIsOpen(false)}>취소</Button>
    <Button
      onClick={() => {}}
      color='error'
      autoFocus>
      삭제
    </Button>
  </DialogActions>
</Dialog>`
      },
      notes: [
        'MUI Dialog는 포커스 트랩을 자동으로 처리합니다.',
        'autoFocus prop으로 열림 시 포커스 위치를 제어하세요.',
        'TransitionProps.onExited로 닫힘 후 포커스 복원을 처리할 수 있습니다.'
      ]
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'modal-radix-1',
          title: 'Dialog.Description 필수 제공',
          description: 'Dialog.Description이 없으면 Radix가 콘솔 경고를 발생시킵니다. visually-hidden으로라도 제공하세요.',
          level: 'must'
        },
        {
          id: 'modal-radix-2',
          title: 'Modal 외부 클릭 처리',
          description: 'onInteractOutside prop으로 외부 클릭 동작을 명시적으로 제어하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Dialog',
        code: `import * as Dialog from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
<Dialog.Root
  open={isOpen}
  onOpenChange={setIsOpen}>
  <Dialog.Trigger asChild>
    <button>파일 삭제</button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
    <Dialog.Content
      style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', backgroundColor: 'white', padding: 24, borderRadius: 8, minWidth: 320 }}
      onInteractOutside={(e) => e.preventDefault()}>
      <Dialog.Title>파일 삭제</Dialog.Title>
      <Dialog.Description>이 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</Dialog.Description>
      <Dialog.Close asChild>
        <button>취소</button>
      </Dialog.Close>
      <button onClick={() => {}}>삭제</button>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>`
      },
      notes: [
        'Radix Dialog는 포커스 트랩, ESC 닫기, 포커스 복원을 자동 처리합니다.',
        'Portal을 사용해 z-index 이슈 없이 body에 렌더링합니다.',
        'Dialog.Trigger를 사용하면 트리거 참조가 자동으로 관리됩니다.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'modal-antd-1',
          title: 'destroyOnClose 검토',
          description: '접근성 보조기기는 DOM 존재 여부에 민감합니다. destroyOnClose로 닫힌 모달을 DOM에서 제거하세요.',
          level: 'should'
        },
        {
          id: 'modal-antd-2',
          title: 'footer 버튼 순서',
          description: 'footer의 확인/취소 버튼 순서가 논리적 탭 순서와 일치하는지 확인하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Modal',
        code: `import { Modal, Button } from 'antd'
<Modal
  open={isOpen}
  onCancel={() => setIsOpen(false)}
  title='파일 삭제'
  destroyOnClose
  footer={[
    <Button
      key='cancel'
      onClick={() => setIsOpen(false)}>
      취소
    </Button>,
    <Button
      key='delete'
      type='primary'
      danger
      onClick={() => {}}>
      삭제
    </Button>
  ]}>
  <p>이 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
</Modal>`
      },
      notes: [
        'Ant Design Modal은 포커스 트랩을 기본 지원합니다.',
        'focusTriggerAfterClose prop으로 닫힘 후 포커스 복원 동작을 제어합니다.',
        'Modal.confirm()은 자동으로 접근성 속성을 적용합니다.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'modal-chakra-1',
          title: 'Dialog.CloseTrigger aria-label',
          description: '닫기 버튼에 아이콘만 사용할 경우 aria-label을 명시적으로 추가하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI Dialog',
        code: `import { Button, Dialog } from '@chakra-ui/react'
<Dialog.Root>
  <Dialog.Trigger asChild>
    <Button variant='outline'>파일 삭제</Button>
  </Dialog.Trigger>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>파일 삭제</Dialog.Title>
        <Dialog.CloseTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            aria-label='닫기'>
            ✕
          </Button>
        </Dialog.CloseTrigger>
      </Dialog.Header>
      <Dialog.Body>
        <Dialog.Description>이 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</Dialog.Description>
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.ActionTrigger asChild>
          <Button variant='outline'>취소</Button>
        </Dialog.ActionTrigger>
        <Button colorPalette='red'>삭제</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>`
      },
      notes: [
        'Chakra Dialog.Root는 포커스 트랩과 aria-modal을 자동으로 처리합니다.',
        'Dialog.Backdrop 클릭으로 닫기를 비활성화하려면 closeOnInteractOutside={false}를 사용하세요.',
        'Dialog.CloseTrigger는 자동으로 ESC 키 동작과 연결됩니다.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'modal-spectrum-1',
          title: 'Heading slot="title" 필수',
          description: 'Dialog의 제목은 반드시 Heading slot="title"을 사용해야 aria-labelledby가 자동 연결됩니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria Modal',
        code: `import { Button, DialogTrigger, Modal, Dialog, Heading } from 'react-aria-components'

const openBtnStyle = { padding: '8px 16px', borderRadius: 6, border: '1px solid #dc2626', background: '#fff', color: '#dc2626', cursor: 'pointer', fontSize: 14, fontWeight: 500 }
const overlayStyle = { position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }
const dialogStyle = { background: '#fff', borderRadius: 12, padding: 24, maxWidth: 400, width: '90%', outline: 'none', boxShadow: '0 8px 32px rgba(0,0,0,.15)' }
const btnStyle = { padding: '6px 14px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer', fontSize: 13 }

<DialogTrigger>
  <Button style={openBtnStyle}>파일 삭제</Button>
  <Modal isDismissable style={overlayStyle}>
    <Dialog style={dialogStyle}>
      {({ close }) => (
        <>
          <Heading slot='title' style={{ margin: '0 0 8px', fontSize: 16 }}>파일 삭제</Heading>
          <p style={{ margin: '0 0 16px', fontSize: 14, color: '#4b5563' }}>이 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button onPress={close} style={btnStyle}>취소</Button>
            <Button onPress={close} style={{ ...btnStyle, background: '#dc2626', color: '#fff', border: 'none' }}>삭제</Button>
          </div>
        </>
      )}
    </Dialog>
  </Modal>
</DialogTrigger>`
      },
      notes: [
        'React Aria Modal은 포커스 트랩, aria-modal, ESC 닫기를 자동 처리합니다.',
        'isDismissable prop으로 배경 클릭 닫기를 제어할 수 있습니다.',
        "Heading의 slot='title'은 Dialog와 aria-labelledby를 자동 연결합니다."
      ]
    }
  }
}
