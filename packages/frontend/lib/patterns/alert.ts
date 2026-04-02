import type { Pattern } from '../types'

export const alertPattern: Pattern = {
  slug: 'alert',
  name: 'Alert / Toast',
  description: '사용자 작업을 방해하지 않고 중요 메시지를 전달하는 알림 컴포넌트',
  wcagCriteria: ['1.3.1 Info and Relationships', '1.4.1 Use of Color', '2.2.3 No Timing', '4.1.3 Status Messages'],
  tags: ['feedback', 'live-region', 'notification'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'alert-m1',
          title: 'role 명시',
          description: '긴급 알림은 role="alert"(aria-live="assertive"), 비긴급은 role="status"(aria-live="polite")를 사용해야 합니다.',
          level: 'must'
        },
        {
          id: 'alert-m2',
          title: '키보드 포커스 이동 금지',
          description: 'Alert/Toast는 사용자 작업을 방해하지 않아야 합니다. 표시될 때 자동으로 키보드 포커스를 이동시키지 마세요.',
          level: 'must'
        },
        {
          id: 'alert-m3',
          title: '닫기 버튼 키보드 접근 가능',
          description: '닫기(dismiss) 버튼이 있는 경우 키보드로 접근하고 활성화할 수 있어야 합니다.',
          level: 'must'
        },
        {
          id: 'alert-m4',
          title: '충분한 표시 시간',
          description: '자동으로 사라지는 토스트는 사용자가 읽기에 충분한 시간(최소 5초)을 제공해야 합니다. WCAG 2.2.3 요구사항입니다.',
          level: 'must'
        }
      ],
      should: [
        {
          id: 'alert-s1',
          title: '색상 외 아이콘으로 유형 구분',
          description: 'success/error/warning/info를 색상만으로 구분하지 말고 아이콘을 함께 사용하세요.',
          level: 'should'
        },
        {
          id: 'alert-s2',
          title: '자동 닫힘 일시정지',
          description: '사용자가 호버하거나 포커스를 두면 자동 닫힘 타이머를 일시정지하세요.',
          level: 'should'
        },
        {
          id: 'alert-s3',
          title: '알림 쌓임 관리',
          description: '동시에 여러 토스트가 표시되면 스크린리더 사용자에게 과부하가 됩니다. 최대 개수를 제한하세요.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'alert-a1',
          title: '너무 빠른 자동 닫힘',
          description: '3초 미만으로 자동 닫히면 WCAG 2.2.3(타이밍 조정 가능) 실패입니다. 충분한 시간을 주거나 수동 닫기만 허용하세요.',
          level: 'avoid'
        },
        {
          id: 'alert-a2',
          title: '색상만으로 심각도 전달',
          description: '빨간색=오류처럼 색상만으로 의미를 전달하면 색맹 사용자가 인식할 수 없습니다.',
          level: 'avoid'
        },
        {
          id: 'alert-a3',
          title: '페이지 로드 시 미리 존재하는 alert',
          description: '페이지 로드 시 이미 DOM에 있는 role="alert" 요소는 스크린리더가 자동으로 읽지 않습니다. 동적으로 삽입하세요.',
          level: 'avoid'
        }
      ]
    },
    codeSample: {
      language: 'tsx',
      label: 'Baseline (React)',
      code: `function AlertDemo() {
  const [alerts, setAlerts] = useState([])

  const addAlert = (message, type = 'info') => {
    const id = Date.now()
    setAlerts((prev) => [...prev, { id, message, type }])
    setTimeout(() => removeAlert(id), 5000)
  }

  const removeAlert = (id) => setAlerts((prev) => prev.filter((a) => a.id !== id))

  return (
    <div>
      <button onClick={() => addAlert('Saved successfully.', 'success')}>Save</button>

      {/* Screen reader live region (visually hidden) */}
      <div
        role='status'
        aria-live='polite'
        aria-atomic='true'
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        {alerts.map((a) => a.message).join('. ')}
      </div>

      {/* Visual toast */}
      <div
        style={{ position: 'fixed', top: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 8 }}
        aria-label='Notifications'>
        {alerts.map((alert) => (
          <div
            key={alert.id}
            role='alert'
            style={{
              padding: '12px 16px',
              borderRadius: 8,
              backgroundColor: alert.type === 'success' ? '#dcfce7' : '#fee2e2',
              border: '1px solid',
              borderColor: alert.type === 'success' ? '#86efac' : '#fca5a5',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
            <span>{alert.message}</span>
            <button
              onClick={() => removeAlert(alert.id)}
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
    material: {
      id: 'material',
      name: 'Material Design (MUI)',
      color: '#1976d2',
      additionalChecks: [
        {
          id: 'alert-mui-1',
          title: 'Snackbar + Alert 조합으로 토스트 구현',
          description:
            'MUI에서 토스트 알림은 Snackbar 안에 Alert를 넣어 사용합니다. Snackbar가 위치와 타이밍을, Alert가 role="alert"와 severity를 담당합니다.',
          level: 'must'
        },
        {
          id: 'alert-mui-2',
          title: 'autoHideDuration 최소 5000ms',
          description: 'autoHideDuration을 5000 미만으로 설정하면 WCAG 2.2.3(No Timing)에 위배됩니다. null로 설정하면 수동 닫기만 허용합니다.',
          level: 'must'
        },
        {
          id: 'alert-mui-3',
          title: '인라인 Alert와 토스트 Alert 구분',
          description: '페이지에 고정된 상태 메시지는 Alert 단독 사용, 일시적인 토스트는 Snackbar + Alert 조합을 사용하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Snackbar + Alert',
        code: `import { useState } from 'react'
import { Button, Snackbar, Alert, AlertTitle, Stack } from '@mui/material'

export default function App() {
  const [open, setOpen] = useState(false)
  const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success')

  const showAlert = (type: typeof severity) => {
    setSeverity(type)
    setOpen(true)
  }

  return (
    <Stack
      spacing={2}
      style={{ padding: 24 }}>
      <Stack
        direction='row'
        spacing={1}>
        <Button
          variant='outlined'
          color='success'
          onClick={() => showAlert('success')}>
          Success
        </Button>
        <Button
          variant='outlined'
          color='error'
          onClick={() => showAlert('error')}>
          Error
        </Button>
        <Button
          variant='outlined'
          color='warning'
          onClick={() => showAlert('warning')}>
          Warning
        </Button>
        <Button
          variant='outlined'
          color='info'
          onClick={() => showAlert('info')}>
          Info
        </Button>
      </Stack>

      <Alert severity='info'>
        <AlertTitle>Inline Alert</AlertTitle>
        This alert is always visible on the page.
      </Alert>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={(_, reason) => reason !== 'clickaway' && setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          variant='filled'>
          {severity === 'success' ? 'Changes saved successfully.' : \`\${severity} notification triggered.\`}
        </Alert>
      </Snackbar>
    </Stack>
  )
}`
      },
      notes: [
        'Alert 단독 사용 시 role="alert"가 자동 적용되어 스크린리더에 즉시 읽힙니다.',
        'Snackbar의 onClose reason이 "clickaway"일 때 닫지 않으면 의도치 않은 닫힘을 방지할 수 있습니다.',
        'severity prop (success/info/warning/error)이 아이콘, 색상, 접근 가능한 의미를 자동 적용합니다.',
        'autoHideDuration={null}로 설정하면 사용자가 명시적으로 닫기 전까지 유지됩니다.'
      ]
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'alert-radix-1',
          title: 'Toast.Viewport에 hotkey 안내',
          description: 'Toast.Viewport에 label prop으로 스크린리더 사용자에게 단축키(F8) 안내를 제공하세요.',
          level: 'should'
        },
        {
          id: 'alert-radix-2',
          title: 'type prop으로 긴급도 설정',
          description: '사용자 액션 결과는 type="foreground", 백그라운드 작업은 type="background"를 사용하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Toast',
        code: `import * as Toast from '@radix-ui/react-toast'

function ToastDemo() {
  const [open, setOpen] = useState(false)

  return (
    <Toast.Provider swipeDirection='right'>
      <button onClick={() => setOpen(true)}>Save</button>

      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        type='foreground'
        duration={5000}>
        <Toast.Title>Saved</Toast.Title>
        <Toast.Description>File saved successfully.</Toast.Description>
        <Toast.Close aria-label='Close'>×</Toast.Close>
      </Toast.Root>

      <Toast.Viewport
        label='Notifications. Press F8 to navigate.'
        style={{ position: 'fixed', bottom: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 50, maxWidth: 360 }}
      />
    </Toast.Provider>
  )
}`
      },
      notes: [
        'Radix Toast는 F8 단축키로 뷰포트에 포커스 이동을 지원합니다.',
        'swipeDirection으로 스와이프 제스처를 설정할 수 있습니다.',
        'aria-live 요구사항을 내부적으로 준수합니다.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'alert-antd-1',
          title: 'showIcon으로 아이콘 반드시 표시',
          description: 'type prop만으로는 색상만 변경됩니다. showIcon={true}를 함께 사용해 색상 외 아이콘으로도 severity를 전달하세요.',
          level: 'must'
        },
        {
          id: 'alert-antd-2',
          title: 'closable에 aria-* 속성 지원',
          description:
            'antd v5.15.0부터 closable prop에 aria-* 속성을 전달할 수 있습니다. closable={{ "aria-label": "알림 닫기" }}로 닫기 버튼 레이블을 명시하세요.',
          level: 'should'
        },
        {
          id: 'alert-antd-3',
          title: 'App.useApp() 훅으로 notification 사용',
          description: 'antd v5의 App wrapper와 useApp() 훅을 사용하면 ConfigProvider 컨텍스트를 올바르게 상속한 notification을 사용할 수 있습니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Alert',
        code: `import { useState } from 'react'
import { Alert, Button, Space, App } from 'antd'

function AlertDemo() {
  const { notification } = App.useApp()
  const [visible, setVisible] = useState(true)

  const showToast = () => {
    notification.success({
      message: 'Saved successfully',
      description: 'Your changes have been saved.',
      duration: 5,
      role: 'status'
    })
  }

  return (
    <Space
      direction='vertical'
      style={{ width: '100%', padding: '24px' }}>
      {visible && (
        <Alert
          title='File saved'
          description='Your changes have been saved successfully.'
          type='success'
          showIcon
          closable={{ 'aria-label': 'Close success alert' }}
          onClose={() => setVisible(false)}
        />
      )}
      <Alert
        title='Warning'
        description='Your session will expire in 5 minutes.'
        type='warning'
        showIcon
      />
      <Alert
        title='Error'
        description='Failed to connect to the server. Please try again.'
        type='error'
        showIcon
      />
      <Button
        type='primary'
        onClick={showToast}>
        Show notification toast
      </Button>
    </Space>
  )
}

export default function App() {
  return (
    <App>
      <AlertDemo />
    </App>
  )
}`
      },
      notes: [
        'Alert의 title prop(구 message)과 description prop으로 제목과 설명을 분리하세요.',
        'showIcon={true}와 type을 함께 사용하면 색상과 아이콘 모두로 severity를 전달합니다.',
        'closable prop에 aria-* 속성을 전달해 닫기 버튼 레이블을 명시하세요. (v5.15.0+)',
        'notification API 사용 시 duration: 5(5초)를 기본으로 설정하고, 중요한 알림은 duration: 0으로 수동 닫기를 요구하세요.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'alert-chakra-1',
          title: 'status별 role 설정',
          description: '오류/경고 알림은 role="alert", 일반 정보는 role="status"를 사용하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI Alert',
        code: `import { useState } from 'react'
import { Alert, Button, Stack } from '@chakra-ui/react'

export default function App() {
  const [showError, setShowError] = useState(true)

  return (
    <Stack
      gap={3}
      style={{ padding: '1.5rem', maxWidth: 480 }}>
      <Alert.Root status='info'>
        <Alert.Indicator aria-hidden />
        <Alert.Content>
          <Alert.Title>Information</Alert.Title>
          <Alert.Description>Your account settings have been updated.</Alert.Description>
        </Alert.Content>
      </Alert.Root>

      <Alert.Root status='success'>
        <Alert.Indicator aria-hidden />
        <Alert.Content>
          <Alert.Title>Success</Alert.Title>
          <Alert.Description>File uploaded successfully.</Alert.Description>
        </Alert.Content>
      </Alert.Root>

      <Alert.Root status='warning'>
        <Alert.Indicator aria-hidden />
        <Alert.Content>
          <Alert.Title>Warning</Alert.Title>
          <Alert.Description>Your session will expire in 10 minutes.</Alert.Description>
        </Alert.Content>
      </Alert.Root>

      {showError && (
        <Alert.Root
          status='error'
          role='alert'>
          <Alert.Indicator aria-hidden />
          <Alert.Content>
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>Unable to connect to the server. Please try again.</Alert.Description>
          </Alert.Content>
          <Button
            size='sm'
            variant='ghost'
            onClick={() => setShowError(false)}
            aria-label='Dismiss error alert'
            style={{ marginLeft: 'auto' }}>
            ✕
          </Button>
        </Alert.Root>
      )}
    </Stack>
  )
}`
      },
      notes: [
        'Alert.Root의 status prop(info/success/warning/error)이 시각적 스타일과 색상을 자동으로 설정합니다.',
        '동적으로 추가되는 긴급 알림에는 role="alert"를 명시해 스크린리더에 즉시 전달되게 하세요.',
        'Alert.Indicator는 자동으로 aria-hidden 처리되는 상태 아이콘입니다.',
        'neutral variant는 status="neutral"로 설정할 수 있습니다.'
      ]
    }
  }
}
