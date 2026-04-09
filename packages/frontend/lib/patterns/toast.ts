import type { Pattern } from '../types'

export const toastPattern: Pattern = {
  slug: 'toast',
  name: 'Toast',
  description: '자동 소멸되는 가벼운 알림 컴포넌트',
  wcagCriteria: ['1.4.1 Use of Color', '2.2.3 No Timing', '4.1.3 Status Messages'],
  tags: ['feedback', 'notification', 'ephemeral'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'toast-m1',
          title: 'role 설정',
          description:
            '비긴급 알림은 role="status"(aria-live="polite"), 오류/경고 등 긴급 알림은 role="alert"(aria-live="assertive")를 사용해야 합니다.',
          level: 'must'
        },
        {
          id: 'toast-m2',
          title: '키보드 포커스 이동 금지',
          description: 'Toast는 현재 작업을 방해하지 않아야 합니다. 표시될 때 사용자의 포커스를 가로채지 마세요.',
          level: 'must'
        },
        {
          id: 'toast-m3',
          title: '충분한 표시 시간',
          description:
            '자동 소멸되는 toast는 최소 5초 이상 노출해야 하며, 사용자가 시간을 늘리거나 영구 표시로 전환할 수 있어야 합니다. WCAG 2.2.3 요구사항입니다.',
          level: 'must'
        },
        {
          id: 'toast-m4',
          title: '닫기 버튼 키보드 접근',
          description: '닫기 버튼이 있는 경우 키보드로 접근하고 활성화할 수 있어야 하며, aria-label로 닫기 동작을 명시해야 합니다.',
          level: 'must'
        },
        {
          id: 'toast-m5',
          title: 'hover/focus 시 타이머 일시정지',
          description: '사용자가 toast 위에 포커스를 두거나 마우스를 올리면 자동 닫힘 타이머를 일시정지해야 합니다.',
          level: 'must'
        }
      ],
      should: [
        {
          id: 'toast-s1',
          title: '색상 외 아이콘으로 유형 구분',
          description: 'success/error/warning/info를 색상만으로 구분하지 말고 아이콘과 텍스트 라벨을 함께 제공하세요.',
          level: 'should'
        },
        {
          id: 'toast-s2',
          title: '동시 표시 개수 제한',
          description: '동시에 여러 toast가 쌓이면 스크린리더가 과부하됩니다. 최대 개수를 제한하고 오래된 순서로 자동 제거하세요.',
          level: 'should'
        },
        {
          id: 'toast-s3',
          title: '중요한 정보는 toast로만 전달하지 말 것',
          description: '사용자가 놓칠 수 있으므로 중요한 오류나 확인이 필요한 내용은 toast가 아니라 alert-dialog나 인라인 메시지로 전달하세요.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'toast-a1',
          title: '3초 미만 자동 닫힘',
          description: 'WCAG 2.2.3 실패 항목입니다. 저시력 사용자와 스크린리더 사용자가 메시지를 읽을 시간이 부족합니다.',
          level: 'avoid'
        },
        {
          id: 'toast-a2',
          title: 'toast 내부에 복잡한 폼/버튼',
          description: 'toast는 간단한 안내/실행 취소 용도로 사용하고, 복잡한 상호작용이 필요하면 dialog 또는 inline 메시지를 사용하세요.',
          level: 'avoid'
        },
        {
          id: 'toast-a3',
          title: '색상만으로 심각도 전달',
          description: '빨간색=오류처럼 색상만으로 의미를 전달하면 색각이상 사용자가 인식할 수 없습니다.',
          level: 'avoid'
        }
      ]
    },
    codeSample: {
      language: 'tsx',
      label: 'Baseline (React)',
      code: `import './index.css'
import { useRef, useState } from 'react'

interface ToastItem {
  id: number
  message: string
  type: 'success' | 'error'
}

export default function App() {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({})

  const remove = (id: number) => {
    clearTimeout(timers.current[id])
    delete timers.current[id]
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const add = (message: string, type: ToastItem['type']) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    timers.current[id] = setTimeout(() => remove(id), 5000)
  }

  const pause = (id: number) => clearTimeout(timers.current[id])
  const resume = (id: number) => {
    timers.current[id] = setTimeout(() => remove(id), 5000)
  }

  return (
    <div className='app stack'>
      <button
        className='btn btn-primary'
        onClick={() => add('저장되었습니다.', 'success')}>
        Save
      </button>

      <div
        className='stack'
        aria-label='Notifications'>
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.type === 'error' ? 'alert' : 'status'}
            aria-live={t.type === 'error' ? 'assertive' : 'polite'}
            onMouseEnter={() => pause(t.id)}
            onMouseLeave={() => resume(t.id)}
            onFocus={() => pause(t.id)}
            onBlur={() => resume(t.id)}
            className='row'>
            <span>{t.message}</span>
            <button
              className='btn btn-ghost'
              onClick={() => remove(t.id)}
              aria-label='Dismiss notification'>
              ×
            </button>
          </div>
        ))}
      </div>
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
          id: 'toast-radix-1',
          title: 'Toast.Provider label prop 필수',
          description: 'Toast.Provider에 label prop을 설정하면 스크린리더가 toast 영역의 목적을 인식합니다. 기본값은 "Notification"입니다.',
          level: 'must'
        },
        {
          id: 'toast-radix-2',
          title: 'Toast.Action에 altText 필수',
          description: 'Toast.Action에 altText prop을 설정하면 스크린리더 사용자가 toast 외부에서도 동일한 작업을 수행할 수 있는 대안을 안내합니다.',
          level: 'must'
        },
        {
          id: 'toast-radix-3',
          title: 'duration으로 표시 시간 제어',
          description: 'Provider의 duration 기본값은 5000ms입니다. 긴 메시지는 duration을 늘리고, 중요한 에러는 Infinity로 설정하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Toast',
        code: `import './index.css'
import { useState } from 'react'
import * as Toast from '@radix-ui/react-toast'

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <Toast.Provider duration={5000}>
      <button
        className='btn btn-primary'
        onClick={() => setOpen(true)}>
        Save
      </button>

      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className='toast-root'>
        <Toast.Title className='font-bold'>Saved</Toast.Title>
        <Toast.Description className='text-sm'>Your changes have been saved successfully.</Toast.Description>
        <Toast.Close
          className='btn btn-ghost btn-sm'
          aria-label='Dismiss notification'>
          ✕
        </Toast.Close>
      </Toast.Root>

      <Toast.Viewport className='toast-viewport' />
    </Toast.Provider>
  )
}`
      },
      notes: [
        'Radix Toast는 자동 닫힘, hover/focus 시 타이머 일시정지를 자동으로 처리합니다.',
        'Toast.Viewport은 F8 핫키로 접근 가능하며 hotkey prop으로 변경할 수 있습니다.',
        'Toast.Action의 altText는 toast가 사라진 후에도 동일한 작업을 수행할 수 있는 경로를 안내합니다.',
        'type="foreground"는 aria-live="assertive", type="background"는 aria-live="polite"에 매핑됩니다.'
      ]
    },
    material: {
      id: 'material',
      name: 'Material Design (MUI)',
      color: '#1976d2',
      additionalChecks: [
        {
          id: 'toast-mui-1',
          title: 'autoHideDuration은 5000ms 이상',
          description: 'WCAG 2.2.3 준수를 위해 autoHideDuration을 최소 5000ms 이상으로 설정하세요.',
          level: 'must'
        },
        {
          id: 'toast-mui-2',
          title: 'action prop으로 닫기 버튼 제공',
          description: 'Snackbar의 action prop에 닫기 버튼을 추가하여 키보드 사용자가 직접 닫을 수 있게 하세요.',
          level: 'must'
        },
        {
          id: 'toast-mui-3',
          title: 'Alert와 조합 시 severity 설정',
          description: 'Snackbar 내부에 Alert를 사용하면 severity에 따른 아이콘과 색상이 자동으로 적용됩니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Snackbar',
        code: `import './index.css'
import { useState } from 'react'
import { Snackbar, Alert, Button } from '@mui/material'

export default function App() {
  const [open, setOpen] = useState(false)

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  return (
    <div className='app'>
      <Button
        variant='contained'
        onClick={() => setOpen(true)}>
        Save
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity='success'
          variant='filled'>
          Your changes have been saved successfully.
        </Alert>
      </Snackbar>
    </div>
  )
}`
      },
      notes: [
        'MUI Snackbar는 role="presentation"을 사용하고, 내부 Alert가 role="alert"를 제공합니다.',
        'autoHideDuration으로 자동 닫힘 시간을 설정합니다. WCAG 2.2.3에 따라 5000ms 이상을 권장합니다.',
        'Alert의 severity prop(success, error, warning, info)에 따라 아이콘과 색상이 자동 적용됩니다.',
        'onClose의 reason이 "clickaway"인 경우를 제외하면 의도치 않은 닫힘을 방지할 수 있습니다.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'toast-chakra-1',
          title: 'Toaster 컴포넌트를 레이아웃에 배치',
          description: 'Chakra v3에서는 createToaster()로 toaster 인스턴스를 생성하고 Toaster 컴포넌트를 레이아웃 루트에 렌더링해야 합니다.',
          level: 'must'
        },
        {
          id: 'toast-chakra-2',
          title: 'duration 5000ms 이상',
          description: 'createToaster의 duration 옵션을 최소 5000ms 이상으로 설정하여 WCAG 2.2.3을 준수하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI Toaster',
        code: `import './index.css'
import { Button, createToaster } from '@chakra-ui/react'

const toaster = createToaster({ placement: 'top-end', duration: 5000 })

export default function App() {
  const showToast = () => {
    toaster.success({
      title: 'Saved',
      description: 'Your changes have been saved successfully.'
    })
  }

  return (
    <div className='app'>
      <Button
        colorPalette='blue'
        onClick={showToast}>
        Save
      </Button>
      <toaster.Toaster />
    </div>
  )
}`
      },
      notes: [
        'Chakra v3에서는 toaster.create()로 toast를 명령형으로 생성합니다.',
        'Toaster 컴포넌트를 루트에 한 번만 렌더링하면 toast가 자동으로 표시됩니다.',
        'type prop(success, error, warning, info)에 따라 아이콘과 색상이 자동 적용됩니다.',
        'pauseOnHover가 기본적으로 활성화되어 hover 시 타이머가 일시정지됩니다.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'toast-antd-1',
          title: 'notification API의 role 확인',
          description: 'Ant Design notification은 기본적으로 role="alert"를 사용합니다. 비긴급 알림에는 message API를 고려하세요.',
          level: 'should'
        },
        {
          id: 'toast-antd-2',
          title: 'duration 5초 이상',
          description: 'notification의 duration 기본값은 4.5초입니다. WCAG 2.2.3 준수를 위해 5초 이상으로 설정하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Notification',
        code: `import './index.css'
import { Button, notification, Space } from 'antd'

export default function App() {
  const [api, contextHolder] = notification.useNotification()

  const openNotification = () => {
    api.success({
      message: 'Saved',
      description: 'Your changes have been saved successfully.',
      duration: 5,
      placement: 'topRight'
    })
  }

  return (
    <div className='app'>
      {contextHolder}
      <Space>
        <Button
          type='primary'
          onClick={openNotification}>
          Save
        </Button>
      </Space>
    </div>
  )
}`
      },
      notes: [
        'Ant Design notification.useNotification()은 contextHolder를 렌더링해야 합니다.',
        'duration은 초 단위이며 기본값 4.5초입니다. 0으로 설정하면 자동 닫힘이 비활성화됩니다.',
        'placement prop으로 표시 위치를 topLeft, topRight, bottomLeft, bottomRight로 지정할 수 있습니다.',
        'api.success(), api.error(), api.warning(), api.info()로 유형별 아이콘이 자동 적용됩니다.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'toast-spectrum-1',
          title: 'ToastRegion을 앱 루트에 배치',
          description: 'ToastRegion 컴포넌트를 앱 루트에 렌더링해야 toast가 올바르게 표시됩니다.',
          level: 'must'
        },
        {
          id: 'toast-spectrum-2',
          title: 'ToastQueue로 명령형 생성',
          description: 'ToastQueue.positive(), ToastQueue.negative() 등으로 유형별 toast를 생성합니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria Toast',
        code: `import './index.css'
import { UNSTABLE_ToastRegion as ToastRegion, UNSTABLE_ToastQueue as ToastQueue, UNSTABLE_Toast as Toast, Button } from 'react-aria-components'

const queue = new ToastQueue({ maxVisibleToasts: 3 })

export default function App() {
  return (
    <div className='app'>
      <Button
        className='btn btn-primary'
        onPress={() => queue.add({ title: 'Saved', description: 'Your changes have been saved.' }, { timeout: 5000 })}>
        Save
      </Button>
      <ToastRegion
        queue={queue}
        className='toast-viewport'>
        {(toast) => (
          <Toast
            toast={toast}
            className='toast-root'>
            <div className='row justify-between w-full'>
              <div>
                <div className='font-bold'>{toast.content.title}</div>
                <div className='text-sm'>{toast.content.description}</div>
              </div>
              <Button
                slot='close'
                className='btn btn-ghost btn-sm'
                aria-label='Dismiss'>
                ✕
              </Button>
            </div>
          </Toast>
        )}
      </ToastRegion>
    </div>
  )
}`
      },
      notes: [
        'React Aria Toast는 현재 UNSTABLE_ 접두사가 붙은 실험적 API입니다.',
        'ToastQueue로 명령형으로 toast를 추가하며, timeout 옵션으로 자동 닫힘 시간을 설정합니다.',
        'ToastRegion은 aria-label="Notifications"를 자동으로 설정합니다.',
        'maxVisibleToasts로 동시 표시 개수를 제한할 수 있습니다.'
      ]
    }
  }
}
