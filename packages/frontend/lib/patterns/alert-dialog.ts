import type { Pattern } from '../types'

export const alertDialogPattern: Pattern = {
  slug: 'alert-dialog',
  name: 'Alert Dialog',
  description: '사용자 확인이 반드시 필요한 모달 대화상자 컴포넌트',
  wcagCriteria: ['2.1.2 No Keyboard Trap', '2.4.3 Focus Order', '4.1.2 Name, Role, Value'],
  tags: ['dialog', 'modal', 'interactive'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'alert-dialog-m1',
          title: 'role과 modal 속성',
          description: 'role="alertdialog"와 aria-modal="true"를 사용해 사용자 확인이 필요한 모달임을 명시해야 합니다.',
          level: 'must'
        },
        {
          id: 'alert-dialog-m2',
          title: '라벨과 설명 연결',
          description: 'aria-labelledby로 제목을, aria-describedby로 본문 설명을 연결해야 합니다. 설명은 사용자의 결정을 돕는 문장이어야 합니다.',
          level: 'must'
        },
        {
          id: 'alert-dialog-m3',
          title: '포커스 트랩',
          description: 'dialog가 열리면 Tab/Shift+Tab 포커스가 dialog 내부만 순환해야 하며, 외부 요소로 이동되지 않아야 합니다.',
          level: 'must'
        },
        {
          id: 'alert-dialog-m4',
          title: '초기 포커스와 복귀',
          description: '열릴 때 가장 덜 파괴적인 버튼(대개 취소)에 초기 포커스를 두고, 닫힐 때는 dialog를 트리거한 요소로 포커스를 복귀해야 합니다.',
          level: 'must'
        },
        {
          id: 'alert-dialog-m5',
          title: 'ESC로 닫기',
          description: 'ESC 키를 누르면 dialog가 닫혀야 하며, 이는 취소 동작과 동일하게 처리되어야 합니다.',
          level: 'must'
        },
        {
          id: 'alert-dialog-m6',
          title: '배경 비활성화',
          description: 'dialog 외부 요소는 inert 또는 aria-hidden으로 스크린리더와 포커스에서 제외해야 합니다.',
          level: 'must'
        }
      ],
      should: [
        {
          id: 'alert-dialog-s1',
          title: '버튼 라벨 명확화',
          description: '"확인"/"취소" 대신 "삭제"/"삭제 안 함"처럼 동작을 설명하는 라벨을 사용하세요.',
          level: 'should'
        },
        {
          id: 'alert-dialog-s2',
          title: '파괴적 동작은 강조',
          description: '파괴적 동작(삭제, 제거) 버튼은 색상과 위치로 주의를 환기시키고, 기본 포커스는 취소에 두세요.',
          level: 'should'
        },
        {
          id: 'alert-dialog-s3',
          title: '배경 클릭으로 닫기 주의',
          description: '중요한 확인 dialog는 overlay 클릭만으로 닫히지 않도록 해야 합니다. 사용자가 실수로 결정을 건너뛸 수 있습니다.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'alert-dialog-a1',
          title: 'role="dialog"만 사용',
          description: '사용자 확인이 반드시 필요한 경우 role="dialog"가 아니라 role="alertdialog"를 사용해야 스크린리더가 긴급성을 전달합니다.',
          level: 'avoid'
        },
        {
          id: 'alert-dialog-a2',
          title: '설명 없이 버튼만',
          description: '"정말 삭제하시겠습니까?"만 있고 무엇이 삭제되는지 설명이 없으면 사용자가 결정할 수 없습니다. 항목 이름과 결과를 명시하세요.',
          level: 'avoid'
        },
        {
          id: 'alert-dialog-a3',
          title: '페이지 로드 시 자동 열림',
          description:
            '사용자 액션 없이 페이지 로드 시 alert-dialog가 열리면 맥락을 잃어 당황스럽습니다. 반드시 사용자 동작에 대한 응답으로 열리게 하세요.',
          level: 'avoid'
        }
      ]
    },
    codeSample: {
      language: 'tsx',
      label: 'Baseline (React)',
      code: `import './index.css'
import { useEffect, useRef, useState } from 'react'

export default function App() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) cancelRef.current?.focus()
    else triggerRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className='app'>
      <button
        ref={triggerRef}
        className='btn btn-primary'
        onClick={() => setOpen(true)}>
        파일 삭제
      </button>

      {open ? (
        <div
          className='overlay'
          onClick={() => setOpen(false)}>
          <div
            role='alertdialog'
            aria-modal='true'
            aria-labelledby='confirm-title'
            aria-describedby='confirm-desc'
            className='dialog'
            onClick={(e) => e.stopPropagation()}>
            <h2
              id='confirm-title'
              className='dialog-title'>
              파일을 삭제하시겠습니까?
            </h2>
            <p id='confirm-desc'>report.pdf 파일이 영구적으로 삭제되며 복구할 수 없습니다.</p>
            <div className='row'>
              <button
                ref={cancelRef}
                className='btn btn-ghost'
                onClick={() => setOpen(false)}>
                취소
              </button>
              <button
                className='btn btn-primary'
                onClick={() => setOpen(false)}>
                삭제
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}`
    }
  },
  designSystems: {
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'alert-dialog-radix-1',
          title: 'AlertDialog.Cancel과 AlertDialog.Action 구분',
          description: 'Radix AlertDialog는 Cancel과 Action을 별도 컴포넌트로 제공합니다. Cancel은 안전한 취소, Action은 파괴적 동작에 사용하세요.',
          level: 'must'
        },
        {
          id: 'alert-dialog-radix-2',
          title: 'AlertDialog.Title과 Description 필수',
          description:
            'AlertDialog.Title은 aria-labelledby로, AlertDialog.Description은 aria-describedby로 Content에 자동 연결됩니다. 생략하면 접근 가능한 이름이 없어집니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix AlertDialog',
        code: `import './index.css'
import { useState } from 'react'
import * as AlertDialog from '@radix-ui/react-dialog'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className='app'>
      <AlertDialog.Root
        open={open}
        onOpenChange={setOpen}>
        <AlertDialog.Trigger className='btn btn-danger-outline'>Delete file</AlertDialog.Trigger>

        <AlertDialog.Portal>
          <AlertDialog.Overlay className='overlay' />
          <AlertDialog.Content
            className='dialog'
            role='alertdialog'>
            <AlertDialog.Title className='dialog-title bottom-space-8'>Delete File</AlertDialog.Title>
            <AlertDialog.Description className='hint bottom-space-20'>
              Are you sure you want to permanently delete this file? This action cannot be undone.
            </AlertDialog.Description>
            <div className='row justify-end'>
              <AlertDialog.Close className='btn'>Cancel</AlertDialog.Close>
              <button
                className='btn btn-danger-solid'
                onClick={() => setOpen(false)}>
                Delete
              </button>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  )
}`
      },
      notes: [
        'Radix AlertDialog는 role="alertdialog"를 Content에 자동 설정합니다.',
        'Cancel은 ESC 키와 동일하게 닫기 동작, Action은 확인 후 닫기 동작으로 구분됩니다.',
        'AlertDialog.Title과 Description은 각각 aria-labelledby, aria-describedby로 자동 연결됩니다.',
        '포커스 트랩, ESC 닫기, 열림/닫힘 시 포커스 관리가 자동으로 처리됩니다.'
      ]
    },
    baseui: {
      id: 'baseui',
      name: 'Base UI',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'alert-dialog-baseui-1',
          title: 'AlertDialog 전용 컴포넌트 사용',
          description:
            'Base UI는 Dialog와 AlertDialog를 별도로 제공합니다. 사용자 확인이 필요한 위험한 액션에는 반드시 @base-ui/react/alert-dialog를 사용하세요.',
          level: 'must'
        },
        {
          id: 'alert-dialog-baseui-2',
          title: 'Title과 Description 필수 제공',
          description: 'AlertDialog.Title은 aria-labelledby로, AlertDialog.Description은 aria-describedby로 자동 연결됩니다. 생략하지 마세요.',
          level: 'must'
        },
        {
          id: 'alert-dialog-baseui-3',
          title: 'Backdrop + Portal 구조 필수',
          description: 'AlertDialog.Portal과 AlertDialog.Backdrop을 반드시 사용하여 배경 비활성화와 포커스 트랩을 보장하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI AlertDialog',
        code: `import './index.css'
import { AlertDialog } from '@base-ui/react/alert-dialog'

export default function App() {
  return (
    <div className='app'>
      <AlertDialog.Root>
        <AlertDialog.Trigger className='btn btn-danger-outline'>Delete file</AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Backdrop className='overlay' />
          <AlertDialog.Popup className='dialog'>
            <AlertDialog.Title className='dialog-title bottom-space-8'>Delete File</AlertDialog.Title>
            <AlertDialog.Description className='hint bottom-space-20'>
              Are you sure you want to permanently delete this file? This action cannot be undone.
            </AlertDialog.Description>
            <div className='row justify-end'>
              <AlertDialog.Close className='btn'>Cancel</AlertDialog.Close>
              <AlertDialog.Close className='btn btn-danger-solid'>Delete</AlertDialog.Close>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  )
}`
      },
      notes: [
        'Base UI AlertDialog는 role="alertdialog"와 aria-modal="true"를 자동으로 설정합니다.',
        'AlertDialog.Title과 Description은 각각 aria-labelledby, aria-describedby로 자동 연결됩니다.',
        'Dialog와 달리 AlertDialog는 overlay 클릭으로 닫히지 않아 사용자가 실수로 결정을 건너뛸 수 없습니다.',
        'ESC 키로 닫기와 포커스 트랩이 자동으로 처리됩니다.'
      ]
    },
    material: {
      id: 'material',
      name: 'Material Design (MUI)',
      color: '#1976d2',
      additionalChecks: [
        {
          id: 'alert-dialog-mui-1',
          title: 'role="alertdialog" 명시적 추가',
          description:
            'MUI Dialog는 기본적으로 role="dialog"를 사용합니다. 사용자 확인이 필요한 경우 PaperProps에 role="alertdialog"를 명시적으로 추가하세요.',
          level: 'must'
        },
        {
          id: 'alert-dialog-mui-2',
          title: 'aria-labelledby와 aria-describedby 설정',
          description: 'Dialog에 aria-labelledby로 DialogTitle의 id를, aria-describedby로 DialogContentText의 id를 연결하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Alert Dialog',
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
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        slotProps={{ paper: { role: 'alertdialog' } }}>
        <DialogTitle id='alert-dialog-title'>Delete File</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to permanently delete this file? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            autoFocus>
            Cancel
          </Button>
          <Button
            onClick={() => setOpen(false)}
            color='error'
            variant='contained'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}`
      },
      notes: [
        'MUI Dialog는 기본 role="dialog"이므로 alertdialog가 필요하면 slotProps.paper.role로 변경합니다.',
        'autoFocus를 Cancel 버튼에 두면 파괴적 동작을 실수로 실행하는 것을 방지합니다.',
        'MUI Dialog는 포커스 트랩, ESC 닫기, 포커스 복원을 자동으로 처리합니다.',
        'aria-labelledby와 aria-describedby는 직접 설정해야 합니다.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'alert-dialog-chakra-1',
          title: 'Dialog.Root role="alertdialog" 설정',
          description: 'Chakra Dialog는 기본 role="dialog"입니다. 사용자 확인이 필요한 경우 role="alertdialog"를 명시적으로 추가하세요.',
          level: 'must'
        },
        {
          id: 'alert-dialog-chakra-2',
          title: '초기 포커스를 취소 버튼에',
          description: '파괴적 동작의 alert dialog에서는 initialFocusEl로 Cancel 버튼에 초기 포커스를 두세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI AlertDialog',
        code: `import './index.css'
import { useRef } from 'react'
import { Button, Dialog } from '@chakra-ui/react'

export default function App() {
  const cancelRef = useRef<HTMLButtonElement>(null)

  return (
    <div className='app'>
      <Dialog.Root
        role='alertdialog'
        initialFocusEl={() => cancelRef.current}>
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
            </Dialog.Header>
            <Dialog.Body>
              <Dialog.Description>Are you sure you want to permanently delete this file? This action cannot be undone.</Dialog.Description>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  ref={cancelRef}
                  variant='outline'>
                  Cancel
                </Button>
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
        'Chakra Dialog에 role="alertdialog"를 추가하면 스크린리더가 긴급성을 전달합니다.',
        'initialFocusEl로 Cancel 버튼에 초기 포커스를 두면 파괴적 동작 실수를 방지합니다.',
        'Dialog.Title은 aria-labelledby로, Dialog.Description은 aria-describedby로 자동 연결됩니다.',
        'closeOnInteractOutside={false}로 overlay 클릭 닫기를 비활성화할 수 있습니다.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'alert-dialog-antd-1',
          title: 'Modal.confirm으로 alert dialog 생성',
          description: 'Ant Design은 Modal.confirm()으로 확인 대화상자를 제공합니다. title과 content prop으로 접근 가능한 이름과 설명을 제공하세요.',
          level: 'must'
        },
        {
          id: 'alert-dialog-antd-2',
          title: 'okButtonProps.danger로 파괴적 동작 강조',
          description: 'okButtonProps에 danger={true}를 설정해 파괴적 동작 버튼을 시각적으로 강조하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Modal.confirm',
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
        okText='Delete'
        cancelText='Cancel'
        okButtonProps={{ danger: true }}
        onOk={() => setOpen(false)}
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
        'Ant Design Modal은 포커스 트랩, ESC 닫기, 포커스 복원을 자동으로 처리합니다.',
        'title prop은 내부적으로 aria-labelledby로 자동 연결됩니다.',
        'Modal.confirm()을 사용하면 간단한 확인 dialog를 명령형으로 생성할 수 있습니다.',
        'destroyOnHidden으로 닫힌 dialog를 DOM에서 제거하여 보조 기기 접근을 방지하세요.'
      ]
    }
  }
}
