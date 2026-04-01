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
    // Move focus
    document.getElementById('modal-close')?.focus()
    // Set background to inert
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
        Close
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
          title: 'aria-labelledby와 aria-describedby 명시',
          description:
            'Dialog에 aria-labelledby로 DialogTitle의 id를, aria-describedby로 DialogContent의 id를 연결하세요. 자동 처리되지 않으므로 직접 설정해야 합니다.',
          level: 'must'
        },
        {
          id: 'modal-mui-2',
          title: 'keepMounted 사용 금지',
          description: 'keepMounted={true}는 닫힌 Dialog를 DOM에 유지합니다. 스크린리더가 숨겨진 콘텐츠를 읽을 수 있으므로 사용하지 마세요.',
          level: 'avoid'
        },
        {
          id: 'modal-mui-3',
          title: 'autoFocus로 초기 포커스 제어',
          description: '모달 열릴 때 포커스를 특정 요소로 이동하려면 해당 요소에 autoFocus prop을 추가하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Dialog',
        code: `import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from '@mui/material'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ padding: 24 }}>
      <Button
        variant='outlined'
        color='error'
        onClick={() => setOpen(true)}>
        Delete file
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='delete-dialog-title'
        aria-describedby='delete-dialog-description'>
        <DialogTitle id='delete-dialog-title'>Delete File</DialogTitle>
        <DialogContent>
          <DialogContentText id='delete-dialog-description'>
            Are you sure you want to permanently delete this file? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => setOpen(false)}
            color='error'
            variant='contained'
            autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}`
      },
      notes: [
        'MUI Dialog는 포커스 트랩, Escape 닫기, 배경 클릭 닫기, 포커스 복원을 자동으로 처리합니다.',
        'aria-labelledby와 aria-describedby는 MUI가 자동 처리하지 않으므로 직접 설정해야 합니다.',
        'autoFocus prop으로 모달 열릴 때 첫 포커스 위치를 지정하세요. 일반적으로 기본 확인 버튼에 설정합니다.',
        'DialogContentText는 자동으로 올바른 색상 대비와 타이포그래피를 적용합니다.'
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
    <button>Delete file</button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
    <Dialog.Content
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 8,
        minWidth: 320
      }}
      onInteractOutside={(e) => e.preventDefault()}>
      <Dialog.Title>Delete File</Dialog.Title>
      <Dialog.Description>Are you sure you want to delete this file? This action cannot be undone.</Dialog.Description>
      <Dialog.Close asChild>
        <button>Cancel</button>
      </Dialog.Close>
      <button onClick={() => {}}>Delete</button>
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
  title='Delete File'
  destroyOnClose
  footer={[
    <Button
      key='cancel'
      onClick={() => setIsOpen(false)}>
      Cancel
    </Button>,
    <Button
      key='delete'
      type='primary'
      danger
      onClick={() => {}}>
      Delete
    </Button>
  ]}>
  <p>Are you sure you want to delete this file? This action cannot be undone.</p>
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
    <Button variant='outline'>Delete file</Button>
  </Dialog.Trigger>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Delete File</Dialog.Title>
        <Dialog.CloseTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            aria-label='Close'>
            ✕
          </Button>
        </Dialog.CloseTrigger>
      </Dialog.Header>
      <Dialog.Body>
        <Dialog.Description>Are you sure you want to delete this file? This action cannot be undone.</Dialog.Description>
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.ActionTrigger asChild>
          <Button variant='outline'>Cancel</Button>
        </Dialog.ActionTrigger>
        <Button colorPalette='red'>Delete</Button>
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
  <Button style={openBtnStyle}>Delete file</Button>
  <Modal isDismissable style={overlayStyle}>
    <Dialog style={dialogStyle}>
      {({ close }) => (
        <>
          <Heading slot='title' style={{ margin: '0 0 8px', fontSize: 16 }}>Delete File</Heading>
          <p style={{ margin: '0 0 16px', fontSize: 14, color: '#4b5563' }}>Are you sure you want to delete this file? This action cannot be undone.</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button onPress={close} style={btnStyle}>Cancel</Button>
            <Button onPress={close} style={{ ...btnStyle, background: '#dc2626', color: '#fff', border: 'none' }}>Delete</Button>
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
    },
    baseui: {
      id: 'baseui',
      name: 'Base UI',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'dialog-baseui-1',
          title: 'Portal + Backdrop 구조 필수',
          description: 'Dialog.Portal과 Dialog.Backdrop을 반드시 사용하여 모달 외부 클릭 차단 및 포커스 트랩을 보장하세요.',
          level: 'must'
        },
        {
          id: 'dialog-baseui-2',
          title: 'Dialog.Title과 Dialog.Description 제공',
          description: 'Dialog.Title은 aria-labelledby로, Dialog.Description은 aria-describedby로 자동 연결됩니다. 생략하지 마세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI Dialog',
        code: `import { Dialog } from '@base-ui/react/dialog'

export default function App() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>View notifications</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Title>Notifications</Dialog.Title>
          <Dialog.Description>You are all caught up. Good job!</Dialog.Description>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}`
      },
      notes: [
        'Dialog.Popup은 자동으로 포커스 트랩, Escape 키 닫기, aria-modal="true"를 처리합니다.',
        'Dialog.Title은 aria-labelledby로, Dialog.Description은 aria-describedby로 자동 연결됩니다.',
        'Dialog.Portal은 body에 렌더링하여 z-index 충돌을 방지합니다.'
      ]
    }
  }
}
