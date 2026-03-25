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
      <button onClick={() => addAlert('저장되었습니다.', 'success')}>저장</button>

      {/* 스크린리더 라이브 영역 (시각적으로 숨김) */}
      <div
        role='status'
        aria-live='polite'
        aria-atomic='true'
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        {alerts.map((a) => a.message).join('. ')}
      </div>

      {/* 시각적 토스트 */}
      <div
        style={{ position: 'fixed', top: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 8 }}
        aria-label='알림'>
        {alerts.map((alert) => (
          <div
            key={alert.id}
            role='alert'
            style={{ padding: '12px 16px', borderRadius: 8, backgroundColor: alert.type === 'success' ? '#dcfce7' : '#fee2e2', border: '1px solid', borderColor: alert.type === 'success' ? '#86efac' : '#fca5a5', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>{alert.message}</span>
            <button
              onClick={() => removeAlert(alert.id)}
              aria-label='알림 닫기'>
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
          title: 'Snackbar + Alert 조합',
          description: 'MUI에서 토스트 알림은 Snackbar 안에 Alert를 넣어 사용합니다. Snackbar가 위치를, Alert가 의미론적 role을 담당합니다.',
          level: 'must'
        },
        {
          id: 'alert-mui-2',
          title: 'autoHideDuration 최소 5000ms',
          description: 'autoHideDuration을 5000 미만으로 설정하면 WCAG 2.2.3에 위배됩니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Snackbar + Alert',
        code: `import { Snackbar, Alert } from '@mui/material'
<Snackbar
  open={isOpen}
  autoHideDuration={5000}
  onClose={() => setIsOpen(false)}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
  <Alert
    onClose={() => setIsOpen(false)}
    severity='success'
    variant='filled'>
    파일이 저장되었습니다.
  </Alert>
</Snackbar>`
      },
      notes: [
        'MUI Alert 단독 사용 시 role="alert"가 자동 적용됩니다.',
        'Snackbar의 onClose는 Escape 키 및 외부 클릭에 반응합니다.',
        'severity prop (success/info/warning/error)이 아이콘과 색상을 자동 적용합니다.'
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
      <button onClick={() => setOpen(true)}>저장</button>

      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        type='foreground'
        duration={5000}>
        <Toast.Title>저장 완료</Toast.Title>
        <Toast.Description>파일이 저장되었습니다.</Toast.Description>
        <Toast.Close aria-label='닫기'>×</Toast.Close>
      </Toast.Root>

      <Toast.Viewport
        label='알림 목록. F8을 눌러 이동하세요.'
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
          title: 'message/notification 접근성 한계',
          description:
            'Ant Design의 message.success() 등 명령형 API는 aria-live 영역에 삽입되지 않을 수 있습니다. Alert 컴포넌트를 직접 사용하는 방식을 권장합니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Alert',
        code: `import { Alert, notification, Button, Space } from 'antd'

function AntdAlertDemo() {
  const openNotification = () => {
    notification.success({
      message: '저장 완료',
      description: '파일이 저장되었습니다.',
      duration: 5
    })
  }

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Alert
        message='저장 완료'
        description='파일이 성공적으로 저장되었습니다.'
        type='success'
        showIcon
        closable
        onClose={() => {}}
      />
      <Button onClick={openNotification}>토스트 알림 열기</Button>
    </Space>
  )
}`
      },
      notes: [
        'Alert 컴포넌트의 showIcon prop은 severity 유형을 아이콘으로 자동 표시합니다.',
        'notification API는 duration을 0으로 설정하면 수동으로 닫기 전까지 유지됩니다.',
        'closable prop 사용 시 닫기 버튼이 자동으로 추가됩니다.'
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
        code: `import { Alert } from '@chakra-ui/react'
<Alert.Root
  status='error'
  role='alert'>
  <Alert.Indicator aria-hidden />
  <Alert.Content>
    <Alert.Title>오류 발생</Alert.Title>
    <Alert.Description>서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.</Alert.Description>
  </Alert.Content>
</Alert.Root>`
      },
      notes: [
        'Chakra Alert.Root의 status prop이 시각적 스타일과 aria 속성을 결정합니다.',
        "동적으로 추가되는 알림에는 role='alert'를 명시하세요.",
        'Alert.Indicator는 자동으로 aria-hidden 처리됩니다.'
      ]
    }
  }
}
