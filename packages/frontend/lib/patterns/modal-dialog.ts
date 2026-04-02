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
      code: `import { useId, useRef, useState, useEffect } from 'react'

function Modal() {
  const titleId = useId()
  const descId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

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

  return (
    <>
      {isOpen ? (
        <div
          role='dialog'
          aria-modal='true'
          aria-labelledby={titleId}
          aria-describedby={descId}
          onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}>
          <h2 id={titleId}>Modal Title</h2>
          <div id={descId}>Modal Description</div>
          <button
            id='modal-close'
            onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
      )}
    </>
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
        code: `import './index.css'
import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className='app'>
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
          title: 'Dialog.Title과 Dialog.Description 필수 제공',
          description:
            'Dialog.Title이 없으면 Radix가 콘솔 경고를 발생시킵니다. 시각적으로 숨기려면 VisuallyHidden으로 감싸세요. Dialog.Description도 내용을 스크린리더에 전달하므로 함께 제공하세요.',
          level: 'must'
        },
        {
          id: 'modal-radix-2',
          title: 'onInteractOutside로 외부 클릭 동작 제어',
          description: 'Dialog.Content의 onInteractOutside prop으로 배경 클릭 시 동작(닫기/막기)을 명시적으로 제어하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Dialog',
        code: `import './index.css'
import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className='app'>
      <Dialog.Root
        open={open}
        onOpenChange={setOpen}>
        <Dialog.Trigger
          className='btn btn-danger-outline'>
          Delete file
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className='overlay' />
          <Dialog.Content
            className='dialog dialog-wide'>
            <Dialog.Title
              className='dialog-title bottom-space-8'>
              Delete File
            </Dialog.Title>
            <Dialog.Description
              className='hint bottom-space-20'>
              Are you sure you want to permanently delete this file? This action cannot be undone.
            </Dialog.Description>

            <div
              className='row justify-end'>
              <Dialog.Close className='btn'>Cancel</Dialog.Close>
              <button
                className='btn btn-primary btn-danger-solid'
                onClick={() => setOpen(false)}
                Delete
              </button>
            </div>

            <Dialog.Close
              aria-label='Close dialog'
              className='dialog-close btn-ghost'>
              ✕
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}`
      },
      notes: [
        'Dialog.Trigger를 사용하면 트리거 요소 참조가 자동으로 관리되어 닫힐 때 포커스가 복원됩니다.',
        'Dialog.Portal은 body 최상단에 렌더링하여 z-index 스태킹 컨텍스트 문제를 방지합니다.',
        'Dialog.Title은 aria-labelledby로, Dialog.Description은 aria-describedby로 Dialog.Content에 자동 연결됩니다.',
        '포커스 트랩, Escape 키 닫기, aria-modal="true"가 자동으로 처리됩니다. onOpenChange={setOpen}으로 열림 상태를 제어하세요.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'modal-antd-1',
          title: 'title prop으로 모달 레이블 자동 연결',
          description:
            'title prop 설정 시 aria-labelledby가 자동으로 연결됩니다. 시각적 제목이 없는 경우에도 aria-label로 대체하여 스크린리더에 모달 목적을 전달하세요.',
          level: 'must'
        },
        {
          id: 'modal-antd-2',
          title: 'destroyOnHidden으로 닫힌 모달 정리',
          description: 'destroyOnHidden(v5.25.0+)으로 닫힌 모달을 DOM에서 제거하세요. 보조 기기가 숨겨진 모달 콘텐츠를 읽는 문제를 방지합니다.',
          level: 'should'
        },
        {
          id: 'modal-antd-3',
          title: 'keyboard={true}로 Escape 닫기 보장',
          description: 'keyboard 기본값은 true입니다. keyboard={false}로 설정하면 WCAG 2.1.2 No Keyboard Trap에 위반될 수 있으므로 변경하지 마세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Modal',
        code: `import './index.css'
import { useState } from 'react'
import { Modal, Button, Space } from 'antd'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className='app'>
      <Button
        type='primary'
        danger
        onClick={() => setOpen(true)}
        aria-haspopup='dialog'>
        Delete File
      </Button>

      <Modal
        title='Delete File'
        open={open}
        onCancel={() => setOpen(false)}
        keyboard
        destroyOnHidden
        footer={
          <Space>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              type='primary'
              danger
              onClick={() => setOpen(false)}>
              Delete
            </Button>
          </Space>
        }>
        <p>Are you sure you want to permanently delete this file? This action cannot be undone.</p>
      </Modal>
    </div>
  )
}`
      },
      notes: [
        'Ant Design Modal은 포커스 트랩, Escape 닫기, 닫힌 후 트리거로 포커스 복귀를 자동으로 처리합니다.',
        'title prop 설정 시 내부적으로 aria-labelledby가 모달 헤더에 자동 연결됩니다.',
        'destroyOnHidden(v5.25.0+)으로 닫힌 모달을 DOM에서 제거하세요. 구 버전은 destroyOnClose를 사용하세요.',
        'focusable={{ focusTriggerAfterClose: true }}(v6.2.0+)로 닫힌 후 포커스 복원 동작을 명시적으로 설정하세요.'
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
        code: `import './index.css'
import { Button, Dialog } from '@chakra-ui/react'

export default function App() {
  return (
    <div className='app'>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button
            colorPalette='red'
            variant='outline'>
            Delete file
          </Button>
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
                  aria-label='Close dialog'
                  className='dialog-close-top-right'>
                  ✕
                </Button>
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <Dialog.Description>Are you sure you want to permanently delete this file? This action cannot be undone.</Dialog.Description>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant='outline'>Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette='red'>Delete</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </div>
  )
}`
      },
      notes: [
        'Chakra Dialog.Root는 포커스 트랩, aria-modal, Escape 키 닫기를 자동으로 처리합니다.',
        'Dialog.Title은 aria-labelledby로 자동 연결됩니다. 반드시 포함하세요.',
        'Dialog.CloseTrigger에 aria-label을 추가하면 닫기 버튼 목적이 스크린리더에 전달됩니다.',
        'closeOnInteractOutside={false}로 외부 클릭 닫기를 비활성화할 수 있습니다.'
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
          description:
            'Dialog 제목에 반드시 Heading slot="title"을 사용해야 aria-labelledby가 자동 연결됩니다. 생략하면 dialog에 접근 가능한 이름이 없어집니다.',
          level: 'must'
        },
        {
          id: 'modal-spectrum-2',
          title: 'isDismissable로 배경 클릭 닫기 제어',
          description: 'isDismissable={true} 설정 시 배경 클릭으로 닫힙니다. 기본값은 false로 명시적 닫기 버튼이 필요합니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria Modal',
        code: `import './index.css'
import { Button, DialogTrigger, Modal, ModalOverlay, Dialog, Heading } from 'react-aria-components'

export default function App() {
  return (
    <div className='app'>
      <DialogTrigger>
        <Button className='btn btn-primary btn-accent'>Delete file</Button>
        <ModalOverlay className='overlay center'>
          <Modal className='dialog-spectrum'>
            <Dialog className='outline-none'>
              {({ close }) => (
                <>
                  <Heading
                    slot='title'
                    className='dialog-title bottom-space-8'>
                    Delete File
                  </Heading>
                  <p className='hint bottom-space-20'>Are you sure? This action cannot be undone.</p>
                  <div className='row justify-end'>
                    <Button
                      onPress={close}
                      className='btn btn-sm'>
                      Cancel
                    </Button>
                    <Button
                      onPress={close}
                      className='btn btn-primary btn-danger-solid'>
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </div>
  )
}`
      },
      notes: [
        'ModalOverlay로 백드롭을 커스터마이즈하고 Modal로 모달 콘텐츠를 감쌉니다.',
        'Dialog 내부에서 close 함수를 render prop으로 받아 닫기 버튼에 사용하세요.',
        "Heading slot='title'은 dialog의 aria-labelledby를 자동 연결합니다.",
        'Modal은 포커스 트랩, aria-modal, ESC 닫기, 포커스 복원을 모두 자동 처리합니다.'
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
        },
        {
          id: 'dialog-baseui-3',
          title: 'AlertDialog는 Dialog와 별도 컴포넌트',
          description:
            'Base UI는 Dialog와 AlertDialog를 별도로 제공합니다. 사용자 확인이 필요한 경우 @base-ui-components/react/alert-dialog를 사용하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI Dialog',
        code: `import './index.css'
import { Dialog } from '@base-ui-components/react/dialog'

export default function App() {
  return (
    <div className='app'>
      <Dialog.Root>
        <Dialog.Trigger className='btn btn-primary'>View notifications</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop className='overlay' />
          <Dialog.Popup className='dialog'>
            <Dialog.Title className='dialog-title bottom-space-8'>Notifications</Dialog.Title>
            <Dialog.Description className='hint bottom-space-20'>You are all caught up. Good job!</Dialog.Description>
            <div className='row justify-end'>
              <Dialog.Close className='btn'>Close</Dialog.Close>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}`
      },
      notes: [
        'Dialog.Popup은 자동으로 포커스 트랩, Escape 키 닫기, aria-modal="true"를 처리합니다.',
        'Dialog.Title은 aria-labelledby로, Dialog.Description은 aria-describedby로 자동 연결됩니다.',
        'Dialog.Portal은 body에 렌더링하여 z-index 충돌을 방지합니다.',
        'open/onOpenChange prop으로 제어 모드, defaultOpen으로 비제어 모드로 사용할 수 있습니다.',
        'AlertDialog(@base-ui-components/react/alert-dialog)는 사용자 확인이 필요한 위험한 액션에 사용하세요.'
      ]
    }
  }
}
