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
        Open settings
      </button>

      {isOpen && (
        <div
          id='popover-content'
          role='dialog'
          aria-label='Settings'
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false)
              triggerRef.current?.focus()
            }
          }}>
          <h3>Settings</h3>
          <button>Enable notifications</button>
          <button
            onClick={() => {
              setIsOpen(false)
              triggerRef.current?.focus()
            }}>
            Close
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
          title: 'aria-describedby로 트리거와 팝오버 연결',
          description:
            '팝오버가 열릴 때 트리거 버튼에 aria-describedby={id}를 설정하고 Popover에 동일한 id를 부여해 스크린리더가 연결 관계를 파악하도록 하세요.',
          level: 'must'
        },
        {
          id: 'popover-mui-2',
          title: '팝오버 내 포커스 관리는 직접 구현',
          description:
            'MUI Popover는 Modal과 달리 포커스 트랩을 제공하지 않습니다. 대화형 콘텐츠가 있다면 열릴 때 포커스를 팝오버 내부로 이동하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Popover',
        code: `import { useState, useRef } from 'react'
import { Button, Popover, Typography, Box, Switch, FormControlLabel } from '@mui/material'

export default function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [notifications, setNotifications] = useState(true)
  const [emails, setEmails] = useState(false)
  const open = Boolean(anchorEl)
  const popoverId = open ? 'settings-popover' : undefined

  return (
    <Box style={{ padding: 24 }}>
      <Button
        variant='outlined'
        aria-describedby={popoverId}
        aria-expanded={open}
        aria-haspopup='dialog'
        onClick={(e) => setAnchorEl(e.currentTarget)}>
        Notification settings
      </Button>

      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
        <Box
          role='dialog'
          aria-label='Notification settings'
          sx={{ p: 2, minWidth: 240 }}>
          <Typography
            variant='subtitle1'
            component='h2'
            gutterBottom>
            Notification Settings
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                inputProps={{ 'aria-label': 'Push notifications' }}
              />
            }
            label='Push notifications'
          />
          <FormControlLabel
            control={
              <Switch
                checked={emails}
                onChange={(e) => setEmails(e.target.checked)}
                inputProps={{ 'aria-label': 'Email notifications' }}
              />
            }
            label='Email notifications'
          />
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              size='small'
              onClick={() => setAnchorEl(null)}>
              Close
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  )
}`
      },
      notes: [
        'MUI Popover는 Escape 키와 배경 클릭으로 자동으로 닫히며 트리거로 포커스가 복원됩니다.',
        'aria-describedby는 팝오버가 열릴 때만 설정(open ? id : undefined)하여 닫혔을 때 불필요한 참조를 방지하세요.',
        '대화형 콘텐츠를 포함한 팝오버는 role="dialog"와 aria-label을 Popover 내부 컨테이너에 추가하세요.',
        'MUI Popover는 포커스 트랩을 제공하지 않으므로 필요한 경우 직접 구현하거나 Dialog 컴포넌트를 사용하세요.'
      ]
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'popover-radix-1',
          title: 'Popover.Close에 aria-label 제공',
          description: '닫기 버튼에 아이콘이나 텍스트 심볼만 사용할 경우 aria-label을 추가해 스크린리더 사용자에게 동작을 알리세요.',
          level: 'must'
        },
        {
          id: 'popover-radix-2',
          title: 'sideOffset으로 팝오버 간격 조정',
          description: 'Popover.Content의 sideOffset prop으로 트리거와 팝오버 간의 간격을 설정하세요. 너무 가까우면 시각적으로 혼동될 수 있습니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Popover',
        code: `import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'

export default function App() {
  const [notifications, setNotifications] = useState(true)
  const [emails, setEmails] = useState(false)

  return (
    <div style={{ padding: 24 }}>
      <Popover.Root>
        <Popover.Trigger
          style={{
            padding: '8px 16px',
            borderRadius: 6,
            border: '1px solid #6e56cf',
            background: 'white',
            color: '#6e56cf',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500
          }}>
          Notification settings
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            sideOffset={8}
            style={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: 10,
              padding: 16,
              minWidth: 260,
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              zIndex: 100
            }}>
            <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600 }}>Notification settings</p>

            <label
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, fontSize: 14, cursor: 'pointer' }}>
              Push notifications
              <input
                type='checkbox'
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
            </label>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14, cursor: 'pointer' }}>
              Email notifications
              <input
                type='checkbox'
                checked={emails}
                onChange={(e) => setEmails(e.target.checked)}
              />
            </label>

            <Popover.Arrow style={{ fill: 'white', filter: 'drop-shadow(0 -1px 0 #e5e7eb)' }} />

            <Popover.Close
              aria-label='Close notification settings'
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 16,
                color: '#9ca3af',
                lineHeight: 1
              }}>
              ✕
            </Popover.Close>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}`
      },
      notes: [
        'Popover.Trigger에 aria-expanded가 자동으로 관리됩니다. Space/Enter로 열기, Escape로 닫기, 외부 클릭으로 닫기가 기본 지원됩니다.',
        'Popover.Portal로 감싸면 body 최상단에 렌더링되어 overflow:hidden이나 z-index 문제를 방지합니다.',
        'Popover.Content는 열릴 때 내부의 첫 번째 포커스 가능한 요소로 포커스가 이동합니다. 닫힐 때 Trigger로 포커스가 복원됩니다.',
        'side("top"|"right"|"bottom"|"left"), align("start"|"center"|"end"), sideOffset으로 팝오버 위치를 제어하세요.'
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
          description:
            'Ant Design Popover는 트리거 버튼에 aria-expanded를 자동으로 추가하지 않습니다. open 상태를 직접 관리하여 aria-expanded={open}을 추가하세요.',
          level: 'must'
        },
        {
          id: 'popover-antd-2',
          title: 'content 안에 닫기 버튼 포함',
          description:
            'Ant Design Popover는 기본적으로 Escape 키로 닫히지 않습니다. 키보드 사용자를 위해 팝오버 내부에 명시적 닫기 버튼을 항상 제공하세요.',
          level: 'must'
        },
        {
          id: 'popover-antd-3',
          title: 'trigger="click"으로 키보드 접근성 확보',
          description:
            'trigger="hover"만 설정하면 키보드 사용자가 팝오버를 열 수 없습니다. trigger="click"이나 trigger={["hover", "focus"]}로 설정하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Popover',
        code: `import { useState } from 'react'
import { Popover, Button, Space, Typography } from 'antd'

export default function App() {
  const [open, setOpen] = useState(false)

  const content = (
    <div style={{ width: 240 }}>
      <Typography.Text style={{ display: 'block', marginBottom: 8, color: '#595959', fontSize: 13 }}>
        Configure your notification preferences below.
      </Typography.Text>
      <Space
        direction='vertical'
        style={{ width: '100%', marginBottom: 12 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
          <input
            type='checkbox'
            defaultChecked
          />{' '}
          Email notifications
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
          <input type='checkbox' /> Push notifications
        </label>
      </Space>
      <Button
        size='small'
        onClick={() => setOpen(false)}
        aria-label='Close settings popover'>
        Close
      </Button>
    </div>
  )

  return (
    <div style={{ padding: '24px' }}>
      <Popover
        content={content}
        title='Notification Settings'
        open={open}
        onOpenChange={setOpen}
        trigger='click'
        placement='bottomLeft'>
        <Button
          type='default'
          aria-expanded={open}
          aria-haspopup='dialog'>
          ⚙ Settings
        </Button>
      </Popover>
    </div>
  )
}`
      },
      notes: [
        'trigger="click"으로 설정하면 키보드 Enter/Space로도 팝오버를 열 수 있습니다.',
        'open 상태를 직접 관리하고 트리거에 aria-expanded={open}과 aria-haspopup="dialog"를 추가해야 합니다.',
        'Ant Design Popover는 Escape 키 닫기를 자동 처리하지 않으므로 content 안에 닫기 버튼을 반드시 포함하세요.',
        'onOpenChange 콜백으로 외부 클릭 시 닫기 동작을 제어할 수 있습니다.'
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
        code: `import { useState } from 'react'
import { Popover, Button, Stack } from '@chakra-ui/react'

export default function App() {
  const [notifications, setNotifications] = useState(true)
  const [emails, setEmails] = useState(false)

  return (
    <div style={{ padding: '1.5rem' }}>
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button
            colorPalette='teal'
            variant='outline'>
            Notification settings
          </Button>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content style={{ minWidth: 260 }}>
            <Popover.Arrow>
              <Popover.ArrowTip />
            </Popover.Arrow>
            <Popover.CloseTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                aria-label='Close settings popover'
                style={{ position: 'absolute', top: 6, right: 6 }}>
                ✕
              </Button>
            </Popover.CloseTrigger>
            <Popover.Body>
              <Popover.Title style={{ marginBottom: 12 }}>Notification Settings</Popover.Title>
              <Stack gap={3}>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14 }}>
                  Push notifications
                  <input
                    type='checkbox'
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                </label>
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14 }}>
                  Email notifications
                  <input
                    type='checkbox'
                    checked={emails}
                    onChange={(e) => setEmails(e.target.checked)}
                  />
                </label>
              </Stack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </div>
  )
}`
      },
      notes: [
        'Chakra Popover.Root는 포커스 트랩, aria-expanded, Escape 키 닫기를 자동 처리합니다.',
        'Popover.CloseTrigger에 aria-label을 반드시 추가하세요.',
        'closeOnInteractOutside prop으로 외부 클릭 닫기 동작을 제어하세요.',
        'autoFocus 기본값은 true로 팝오버 열릴 때 첫 번째 포커스 가능 요소로 포커스가 이동합니다.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'popover-spectrum-1',
          title: 'placement prop으로 위치 제어',
          description:
            "placement='top' | 'bottom' | 'left' | 'right' 등으로 팝오버 위치를 지정하세요. shouldFlip={true}(기본)로 뷰포트 경계에서 자동 반전됩니다.",
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria Popover',
        code: `import { useState } from 'react'
import { DialogTrigger, Button, Popover, Dialog, Heading, Switch } from 'react-aria-components'

export default function App() {
  const [wifi, setWifi] = useState(true)
  const [bluetooth, setBluetooth] = useState(false)

  return (
    <div style={{ padding: '1.5rem' }}>
      <DialogTrigger>
        <Button style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer', fontSize: 14 }}>
          ⚙ Settings
        </Button>
        <Popover
          placement='bottom start'
          style={{ background: '#fff', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,.12)', padding: 16, outline: 'none', minWidth: 220 }}>
          <Dialog style={{ outline: 'none' }}>
            <Heading
              slot='title'
              style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600 }}>
              Quick Settings
            </Heading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Switch
                isSelected={wifi}
                onChange={setWifi}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: 13 }}>
                {({ isSelected }) => (
                  <>
                    Wi-Fi
                    <div
                      style={{
                        width: 36,
                        height: 20,
                        borderRadius: 10,
                        background: isSelected ? '#e03' : '#d1d5db',
                        padding: 2,
                        transition: 'background .2s'
                      }}>
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          background: '#fff',
                          transform: isSelected ? 'translateX(16px)' : 'translateX(0)',
                          transition: 'transform .2s'
                        }}
                      />
                    </div>
                  </>
                )}
              </Switch>
              <Switch
                isSelected={bluetooth}
                onChange={setBluetooth}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: 13 }}>
                {({ isSelected }) => (
                  <>
                    Bluetooth
                    <div
                      style={{
                        width: 36,
                        height: 20,
                        borderRadius: 10,
                        background: isSelected ? '#e03' : '#d1d5db',
                        padding: 2,
                        transition: 'background .2s'
                      }}>
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          background: '#fff',
                          transform: isSelected ? 'translateX(16px)' : 'translateX(0)',
                          transition: 'transform .2s'
                        }}
                      />
                    </div>
                  </>
                )}
              </Switch>
            </div>
          </Dialog>
        </Popover>
      </DialogTrigger>
    </div>
  )
}`
      },
      notes: [
        "Popover는 DialogTrigger와 함께 사용합니다. Dialog 내부의 Heading에 slot='title'을 지정하면 aria-labelledby가 자동 연결됩니다.",
        'placement prop으로 위치를 지정하고 shouldFlip(기본 true)으로 뷰포트 경계에서 자동 반전됩니다.',
        'ESC 키로 팝오버를 닫고 트리거로 포커스가 자동 복원됩니다.',
        'isNonModal prop을 설정하면 팝오버 외부 요소와 상호작용할 수 있습니다.'
      ]
    },
    baseui: {
      id: 'baseui',
      name: 'Base UI',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'popover-baseui-1',
          title: 'Popover.Title과 Popover.Description 제공',
          description:
            'Popover.Title은 aria-labelledby로, Popover.Description은 aria-describedby로 자동 연결됩니다. 의미 있는 팝오버에는 반드시 포함하세요.',
          level: 'should'
        },
        {
          id: 'popover-baseui-2',
          title: 'Portal과 Positioner 사용',
          description: 'Popover.Portal은 body에 렌더링하고 Popover.Positioner는 앵커 기반 위치 계산을 처리합니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI Popover',
        code: `import { Popover } from '@base-ui-components/react/popover'

export default function App() {
  return (
    <div style={{ padding: '1.5rem' }}>
      <Popover.Root>
        <Popover.Trigger
          style={{
            padding: '8px 20px',
            borderRadius: 6,
            border: '1px solid #e5e7eb',
            background: '#fff',
            cursor: 'pointer',
            fontSize: 14
          }}>
          Notification settings
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner sideOffset={8}>
            <Popover.Popup
              style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                padding: '16px',
                minWidth: 240,
                boxShadow: '0 4px 16px rgba(0,0,0,.1)'
              }}>
              <Popover.Arrow
                style={{
                  fill: '#fff',
                  stroke: '#e5e7eb',
                  strokeWidth: 1
                }}
              />
              <Popover.Title style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 600 }}>Notifications</Popover.Title>
              <Popover.Description style={{ margin: '0 0 12px', fontSize: 13, color: '#6b7280' }}>
                You are all caught up. Good job!
              </Popover.Description>
              <Popover.Close
                style={{
                  padding: '6px 14px',
                  borderRadius: 6,
                  border: '1px solid #e5e7eb',
                  background: '#fff',
                  cursor: 'pointer',
                  fontSize: 13
                }}>
                Dismiss
              </Popover.Close>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}`
      },
      notes: [
        'Popover.Trigger는 aria-expanded와 aria-haspopup을 자동으로 관리합니다.',
        'Popover.Title은 aria-labelledby로, Popover.Description은 aria-describedby로 자동 연결됩니다.',
        'Popover.Positioner의 sideOffset prop으로 트리거와의 간격을 설정하세요.',
        'Escape 키로 팝오버를 닫고 트리거로 포커스가 자동 복원됩니다.',
        'open/onOpenChange prop으로 제어 모드, defaultOpen으로 비제어 모드로 사용하세요.'
      ]
    }
  }
}
