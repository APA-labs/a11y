import type { Pattern } from './types'

export const patterns: Pattern[] = [
  {
    slug: 'button',
    name: 'Button',
    description: '사용자가 액션을 트리거하는 기본 인터랙티브 요소',
    wcagCriteria: ['1.4.3 Contrast', '2.1.1 Keyboard', '2.4.7 Focus Visible', '4.1.2 Name, Role, Value'],
    tags: ['interactive', 'form', 'action'],
    baseline: {
      checklist: {
        must: [
          { id: 'btn-m1', title: '키보드 접근 가능', description: 'Tab으로 포커스 이동, Enter/Space로 활성화 가능해야 합니다.', level: 'must' },
          { id: 'btn-m2', title: '명확한 레이블', description: '버튼 목적을 설명하는 텍스트 또는 aria-label이 있어야 합니다.', level: 'must' },
          { id: 'btn-m3', title: '포커스 표시', description: '키보드 포커스 시 명확한 시각적 표시(focus ring)가 있어야 합니다.', level: 'must' },
          { id: 'btn-m4', title: '색상 대비 4.5:1', description: '텍스트와 배경 사이 최소 4.5:1 대비율을 충족해야 합니다.', level: 'must' },
          {
            id: 'btn-m5',
            title: 'disabled 상태 전달',
            description: 'aria-disabled 또는 disabled 속성으로 비활성 상태를 명시해야 합니다.',
            level: 'must'
          }
        ],
        should: [
          { id: 'btn-s1', title: '로딩 상태 안내', description: 'aria-busy="true"와 스크린리더용 로딩 메시지를 제공하세요.', level: 'should' },
          { id: 'btn-s2', title: '아이콘 버튼 레이블', description: '아이콘만 있는 버튼에는 반드시 aria-label을 추가하세요.', level: 'should' },
          { id: 'btn-s3', title: '터치 타겟 44×44px', description: '모바일 환경에서 최소 44×44px 터치 타겟을 확보하세요.', level: 'should' }
        ],
        avoid: [
          {
            id: 'btn-a1',
            title: 'div/span으로 버튼 구현 금지',
            description: '<div onClick>는 키보드 접근성이 없습니다. <button>을 사용하세요.',
            level: 'avoid'
          },
          { id: 'btn-a2', title: '색상만으로 상태 구분 금지', description: '활성/비활성 상태를 색상만으로 나타내지 마세요.', level: 'avoid' }
        ]
      },
      codeSample: {
        language: 'tsx',
        label: 'Baseline (HTML)',
        code: `<button
  type="button"
  aria-label="파일 저장"
  aria-disabled={isLoading}
  aria-busy={isLoading}
  className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
>
  {isLoading ? <span aria-hidden>⏳</span> : '저장'}
</button>`
      }
    },
    designSystems: {
      material: {
        id: 'material',
        name: 'Material Design (MUI)',
        color: '#1976d2',
        additionalChecks: [
          {
            id: 'btn-mui-1',
            title: 'Ripple 효과 접근성',
            description: 'MUI의 TouchRipple은 시각적 피드백만 제공하므로 추가적인 aria 피드백이 필요합니다.',
            level: 'should'
          },
          {
            id: 'btn-mui-2',
            title: 'variant별 대비 검증',
            description: 'outlined variant는 border 색상까지 대비 3:1을 충족해야 합니다.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI Button',
          code: `import { Button, CircularProgress } from '@mui/material'

<Button
  variant="contained"
  disabled={isLoading}
  aria-busy={isLoading}
  startIcon={isLoading ? <CircularProgress size={16} aria-hidden /> : undefined}
  sx={{ minWidth: 44, minHeight: 44 }}
>
  {isLoading ? '저장 중...' : '저장'}
</Button>`
        },
        notes: [
          'MUI Button은 기본적으로 <button> 요소를 렌더링합니다.',
          'component prop으로 <a>로 변경 시 href와 role을 명시적으로 관리하세요.',
          'disableRipple prop은 접근성에 영향 없이 사용 가능합니다.'
        ]
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          {
            id: 'btn-radix-1',
            title: 'asChild 패턴 주의',
            description: 'asChild로 <a>를 렌더링 시 role="button"이 제거됩니다. 의도를 명확히 하세요.',
            level: 'must'
          },
          {
            id: 'btn-radix-2',
            title: 'Slot 접근성 검증',
            description: 'asChild 사용 시 자식 컴포넌트가 필요한 aria 속성을 전달받는지 확인하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Radix + Tailwind',
          code: `import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, isLoading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        aria-busy={isLoading}
        aria-disabled={isLoading || props.disabled}
        className={cn(
          'focus-visible:ring-2 focus-visible:ring-offset-2',
          'min-h-[44px] min-w-[44px]'
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)`
        },
        notes: [
          'Radix는 headless 컴포넌트로 스타일을 직접 제어합니다.',
          'focus-visible:ring 클래스로 키보드 포커스만 표시하는 것을 권장합니다.',
          '@radix-ui/react-slot의 Slot은 props를 자식 요소로 전달합니다.'
        ]
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          {
            id: 'btn-antd-1',
            title: 'danger 버튼 aria 보완',
            description: 'danger prop은 시각적 표시만 합니다. aria-label로 "삭제" 등 목적을 명시하세요.',
            level: 'must'
          },
          {
            id: 'btn-antd-2',
            title: 'loading 스피너 숨김 처리',
            description: 'Ant Design의 loading 스피너는 aria-hidden이 없어 스크린리더에 노출됩니다.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design Button',
          code: `import { Button } from 'antd'

<Button
  type="primary"
  loading={isLoading}
  aria-label={isLoading ? '저장 중' : '저장'}
  style={{ minWidth: 44, minHeight: 44 }}
  onClick={() => {}}
>
  저장
</Button>

{/* 삭제 버튼: danger + 명시적 레이블 */}
<Button
  danger
  aria-label="항목 삭제"
  onClick={() => {}}
>
  삭제
</Button>`
        },
        notes: [
          'Ant Design Button은 내부적으로 <button> 요소를 사용합니다.',
          'htmlType prop으로 submit/reset/button type을 지정하세요.',
          'Block prop으로 full-width 버튼 구현 시 레이아웃 맥락을 고려하세요.'
        ]
      }
    }
  },
  {
    slug: 'text-input',
    name: 'Text Input',
    description: '사용자가 텍스트를 입력하는 폼 컨트롤',
    wcagCriteria: ['1.3.1 Info and Relationships', '1.4.3 Contrast', '2.1.1 Keyboard', '3.3.1 Error Identification', '3.3.2 Labels or Instructions'],
    tags: ['form', 'input', 'interactive'],
    baseline: {
      checklist: {
        must: [
          {
            id: 'inp-m1',
            title: '레이블 연결 필수',
            description: '<label for>로 input과 연결하거나 aria-label/aria-labelledby를 사용해야 합니다.',
            level: 'must'
          },
          {
            id: 'inp-m2',
            title: '오류 메시지 연결',
            description: 'aria-describedby로 오류 메시지를 input에 연결하고 aria-invalid="true"를 설정해야 합니다.',
            level: 'must'
          },
          { id: 'inp-m3', title: '필수 입력 표시', description: 'required 또는 aria-required="true"로 필수 여부를 명시해야 합니다.', level: 'must' },
          { id: 'inp-m4', title: '색상 대비 4.5:1', description: '입력 텍스트와 배경 사이 최소 4.5:1 대비율이 필요합니다.', level: 'must' }
        ],
        should: [
          {
            id: 'inp-s1',
            title: 'placeholder 단독 사용 금지',
            description: 'placeholder는 레이블을 대체할 수 없습니다. 항상 visible label과 함께 사용하세요.',
            level: 'should'
          },
          {
            id: 'inp-s2',
            title: 'autocomplete 속성 추가',
            description: '이름, 이메일 등 개인정보 필드에 autocomplete 속성을 설정하세요.',
            level: 'should'
          },
          { id: 'inp-s3', title: '도움말 텍스트 연결', description: 'aria-describedby로 힌트/도움말 텍스트를 연결하세요.', level: 'should' }
        ],
        avoid: [
          {
            id: 'inp-a1',
            title: 'placeholder를 레이블로 사용 금지',
            description: '포커스 시 placeholder가 사라져 사용자가 맥락을 잃습니다.',
            level: 'avoid'
          },
          {
            id: 'inp-a2',
            title: '색상만으로 오류 표시 금지',
            description: '빨간 테두리만으로 오류를 나타내지 마세요. 텍스트 메시지를 함께 제공하세요.',
            level: 'avoid'
          }
        ]
      },
      codeSample: {
        language: 'tsx',
        label: 'Baseline (HTML)',
        code: `<div>
  <label htmlFor="email">
    이메일 <span aria-hidden>*</span>
  </label>
  <input
    id="email"
    type="email"
    required
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby={hasError ? 'email-error' : 'email-hint'}
    autoComplete="email"
  />
  {hasError && (
    <p id="email-error" role="alert">
      올바른 이메일 형식을 입력해주세요.
    </p>
  )}
  <p id="email-hint">예: user@example.com</p>
</div>`
      }
    },
    designSystems: {
      material: {
        id: 'material',
        name: 'Material Design (MUI)',
        color: '#1976d2',
        additionalChecks: [
          {
            id: 'inp-mui-1',
            title: 'TextField helperText와 aria 연결',
            description: 'MUI TextField의 helperText는 자동으로 aria-describedby로 연결됩니다. FormHelperText id를 수동 설정하지 마세요.',
            level: 'should'
          },
          {
            id: 'inp-mui-2',
            title: 'InputLabel shrink 동작 확인',
            description: 'floating label이 축소될 때 스크린리더에 레이블이 유지되는지 확인하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI TextField',
          code: `import { TextField } from '@mui/material'

<TextField
  id="email"
  label="이메일"
  type="email"
  required
  error={hasError}
  helperText={hasError ? '올바른 이메일 형식을 입력해주세요.' : '예: user@example.com'}
  inputProps={{
    'aria-required': true,
    autoComplete: 'email',
  }}
  fullWidth
/>`
        },
        notes: [
          'MUI TextField는 label, input, helperText의 aria 연결을 자동 처리합니다.',
          'error prop이 true면 helperText에 role="alert"가 자동 추가됩니다.',
          'variant="outlined"의 border 색상은 대비 3:1을 확인하세요.'
        ]
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          {
            id: 'inp-radix-1',
            title: 'Form.Message 활용',
            description: '@radix-ui/react-form의 Form.Message는 aria-live를 자동 관리합니다.',
            level: 'should'
          },
          {
            id: 'inp-radix-2',
            title: 'Form.Label 연결 검증',
            description: 'Form.Label과 Form.Control의 htmlFor/id 연결을 명시적으로 확인하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Radix Form',
          code: `import * as Form from '@radix-ui/react-form'

<Form.Root>
  <Form.Field name="email">
    <Form.Label>
      이메일 <span aria-hidden>*</span>
    </Form.Label>
    <Form.Control asChild>
      <input
        type="email"
        required
        autoComplete="email"
        className="focus-visible:ring-2"
      />
    </Form.Control>
    <Form.Message match="valueMissing">
      이메일을 입력해주세요.
    </Form.Message>
    <Form.Message match="typeMismatch">
      올바른 이메일 형식을 입력해주세요.
    </Form.Message>
  </Form.Field>
</Form.Root>`
        },
        notes: [
          '@radix-ui/react-form은 HTML5 validation과 aria를 자동으로 연결합니다.',
          'Form.Message는 validation 조건에 따라 자동으로 aria-live로 동작합니다.',
          '커스텀 validation은 serverInvalid prop으로 처리하세요.'
        ]
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          {
            id: 'inp-antd-1',
            title: 'Form.Item rules와 aria 동기화',
            description: 'Ant Design Form의 rules 검증 메시지는 aria-describedby로 연결되지 않을 수 있습니다. 수동 확인이 필요합니다.',
            level: 'must'
          },
          {
            id: 'inp-antd-2',
            title: 'prefix/suffix 아이콘 aria-hidden',
            description: 'Input의 prefix/suffix 아이콘에 aria-hidden을 추가하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design Form.Item',
          code: `import { Form, Input } from 'antd'

<Form.Item
  name="email"
  label="이메일"
  required
  rules={[
    { required: true, message: '이메일을 입력해주세요.' },
    { type: 'email', message: '올바른 이메일 형식을 입력해주세요.' },
  ]}
>
  <Input
    type="email"
    autoComplete="email"
    aria-required="true"
  />
</Form.Item>`
        },
        notes: [
          'Ant Design Form.Item은 레이블과 input을 자동으로 연결합니다.',
          'validateTrigger로 실시간 검증 시점을 조절할 수 있습니다.',
          'Form.Item의 tooltip prop으로 추가 설명을 제공할 수 있습니다.'
        ]
      }
    }
  },
  {
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
  const triggerRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    // 포커스 이동
    document.getElementById('modal-close')?.focus()
    // 배경 inert
    document.getElementById('root').inert = true
    return () => { document.getElementById('root').inert = false }
  }, [isOpen])

  if (!isOpen) return null
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <h2 id={titleId}>{title}</h2>
      <div id={descId}>{children}</div>
      <button id="modal-close" onClick={onClose}>닫기</button>
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
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
  // keepMounted 사용 주의!
>
  <DialogTitle id="dialog-title">
    파일 삭제
  </DialogTitle>
  <DialogContent>
    <p id="dialog-description">
      이 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
    </p>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setIsOpen(false)}>취소</Button>
    <Button onClick={() => {}} color="error" autoFocus>
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

<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Trigger asChild>
    <button>파일 삭제</button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
    <Dialog.Content
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      onInteractOutside={(e) => e.preventDefault()}
    >
      <Dialog.Title>파일 삭제</Dialog.Title>
      <Dialog.Description>
        이 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
      </Dialog.Description>
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
  title="파일 삭제"
  destroyOnClose
  footer={[
    <Button key="cancel" onClick={() => setIsOpen(false)}>
      취소
    </Button>,
    <Button key="delete" type="primary" danger onClick={() => {}}>
      삭제
    </Button>,
  ]}
>
  <p>이 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
</Modal>`
        },
        notes: [
          'Ant Design Modal은 포커스 트랩을 기본 지원합니다.',
          'focusTriggerAfterClose prop으로 닫힘 후 포커스 복원 동작을 제어합니다.',
          'Modal.confirm()은 자동으로 접근성 속성을 적용합니다.'
        ]
      }
    }
  },
  {
    slug: 'toggle',
    name: 'Toggle / Switch',
    description: '두 가지 상태(on/off) 사이를 전환하는 컨트롤',
    wcagCriteria: ['1.3.1 Info and Relationships', '2.1.1 Keyboard', '4.1.2 Name, Role, Value'],
    tags: ['form', 'interactive', 'state'],
    baseline: {
      checklist: {
        must: [
          { id: 'tog-m1', title: 'role="switch" 사용', description: 'role="switch"와 aria-checked로 on/off 상태를 명시해야 합니다.', level: 'must' },
          { id: 'tog-m2', title: '레이블 연결', description: '토글의 목적을 설명하는 레이블이 연결되어야 합니다.', level: 'must' },
          { id: 'tog-m3', title: '키보드 작동', description: 'Space 키로 토글을 활성화할 수 있어야 합니다.', level: 'must' },
          { id: 'tog-m4', title: '상태 변화 안내', description: '상태 변경 시 스크린리더에 변경 사항이 전달되어야 합니다.', level: 'must' }
        ],
        should: [
          { id: 'tog-s1', title: 'on/off 텍스트 제공', description: '색상 외에 텍스트(켜짐/꺼짐)로 상태를 표시하세요.', level: 'should' },
          { id: 'tog-s2', title: '터치 타겟 44×44px', description: '모바일에서 충분한 터치 영역을 확보하세요.', level: 'should' }
        ],
        avoid: [
          {
            id: 'tog-a1',
            title: '색상만으로 상태 구분 금지',
            description: '녹색/회색만으로 on/off를 나타내지 마세요. 색맹 사용자가 인식할 수 없습니다.',
            level: 'avoid'
          },
          {
            id: 'tog-a2',
            title: 'checkbox로 스위치 구현 금지',
            description: 'checkbox는 시각적으로 토글처럼 보여도 의미론적으로 다릅니다. role="switch"를 사용하세요.',
            level: 'avoid'
          }
        ]
      },
      codeSample: {
        language: 'tsx',
        label: 'Baseline (HTML)',
        code: `<label htmlFor="notifications">알림 설정</label>
<button
  id="notifications"
  role="switch"
  aria-checked={isEnabled}
  onClick={() => setIsEnabled(!isEnabled)}
  className={cn(
    'relative inline-flex h-6 w-11 rounded-full transition-colors',
    'focus-visible:ring-2 focus-visible:ring-offset-2',
    isEnabled ? 'bg-blue-600' : 'bg-gray-300'
  )}
>
  <span className="sr-only">{isEnabled ? '켜짐' : '꺼짐'}</span>
  <span
    aria-hidden
    className={cn(
      'inline-block h-5 w-5 rounded-full bg-white shadow transition-transform',
      isEnabled ? 'translate-x-5' : 'translate-x-0'
    )}
  />
</button>`
      }
    },
    designSystems: {
      material: {
        id: 'material',
        name: 'Material Design (MUI)',
        color: '#1976d2',
        additionalChecks: [
          {
            id: 'tog-mui-1',
            title: 'FormControlLabel 연결',
            description: 'MUI Switch는 FormControlLabel과 함께 사용해 레이블을 연결하세요.',
            level: 'must'
          },
          {
            id: 'tog-mui-2',
            title: 'inputProps aria-label 추가',
            description: 'FormControlLabel 없이 단독 사용 시 inputProps에 aria-label을 추가하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI Switch',
          code: `import { Switch, FormControlLabel } from '@mui/material'

<FormControlLabel
  control={
    <Switch
      checked={isEnabled}
      onChange={(e) => setIsEnabled(e.target.checked)}
      inputProps={{ 'aria-label': '알림 설정' }}
    />
  }
  label="알림 설정"
/>`
        },
        notes: [
          'MUI Switch는 내부적으로 <input type="checkbox">를 사용합니다.',
          'role="switch"는 자동으로 적용되지 않으므로 inputProps로 추가하세요.',
          'color prop 변경 시 대비율을 재검증하세요.'
        ]
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          {
            id: 'tog-radix-1',
            title: 'Switch.Thumb 시각적 표시',
            description: 'Switch.Thumb은 aria-hidden으로 처리되며 시각적 표시만 담당합니다. 충분한 색상 대비를 유지하세요.',
            level: 'should'
          },
          {
            id: 'tog-radix-2',
            title: 'onCheckedChange 상태 관리',
            description: 'controlled 모드에서 checked prop과 onCheckedChange를 함께 사용하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Radix Switch',
          code: `import * as Switch from '@radix-ui/react-switch'

<div className="flex items-center gap-2">
  <label htmlFor="notifications" className="text-sm font-medium">
    알림 설정
  </label>
  <Switch.Root
    id="notifications"
    checked={isEnabled}
    onCheckedChange={setIsEnabled}
    className={cn(
      'w-11 h-6 rounded-full transition-colors',
      'focus-visible:ring-2 focus-visible:ring-offset-2',
      isEnabled ? 'bg-blue-600' : 'bg-gray-200'
    )}
  >
    <Switch.Thumb
      className={cn(
        'block w-5 h-5 bg-white rounded-full shadow transition-transform',
        isEnabled ? 'translate-x-5' : 'translate-x-0'
      )}
    />
  </Switch.Root>
</div>`
        },
        notes: [
          'Radix Switch는 role="switch"와 aria-checked를 자동으로 관리합니다.',
          'Switch.Root에 연결된 label은 htmlFor/id로 연결하세요.',
          'Thumb은 자동으로 aria-hidden 처리됩니다.'
        ]
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          {
            id: 'tog-antd-1',
            title: 'checkedChildren 텍스트 제공',
            description: 'checkedChildren과 unCheckedChildren으로 on/off 상태를 텍스트로 표시하세요.',
            level: 'should'
          },
          {
            id: 'tog-antd-2',
            title: 'aria-label 추가',
            description: 'Ant Design Switch에 aria-label을 직접 추가해 목적을 명시하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design Switch',
          code: `import { Switch } from 'antd'

<div className="flex items-center gap-2">
  <label htmlFor="notifications">알림 설정</label>
  <Switch
    id="notifications"
    checked={isEnabled}
    onChange={setIsEnabled}
    checkedChildren="켜짐"
    unCheckedChildren="꺼짐"
    aria-label="알림 설정"
  />
</div>`
        },
        notes: [
          'Ant Design Switch는 내부적으로 role="switch"를 사용합니다.',
          'checkedChildren/unCheckedChildren으로 상태를 텍스트로 나타내면 색맹 사용자에게 유용합니다.',
          'loading prop 사용 시 aria-busy를 함께 설정하세요.'
        ]
      }
    }
  },
  // ── Disclosure ──
  {
    slug: 'disclosure',
    name: 'Disclosure',
    description: '버튼 클릭으로 콘텐츠를 표시하거나 숨기는 패턴',
    wcagCriteria: ['2.1.1 Keyboard', '4.1.2 Name, Role, Value'],
    tags: ['interactive', 'content', 'toggle'],
    baseline: {
      checklist: {
        must: [
          {
            id: 'disclosure-button-role',
            title: 'button 역할 사용',
            description: '콘텐츠를 표시/숨기는 컨트롤은 role="button" 또는 <button>이어야 합니다.',
            level: 'must'
          },
          {
            id: 'disclosure-aria-expanded',
            title: 'aria-expanded로 상태 반영',
            description: '콘텐츠가 보일 때 aria-expanded="true", 숨겨질 때 aria-expanded="false"를 설정해야 합니다.',
            level: 'must'
          },
          {
            id: 'disclosure-keyboard',
            title: 'Enter/Space로 토글',
            description: 'Enter 또는 Space로 콘텐츠 가시성을 토글할 수 있어야 합니다.',
            level: 'must'
          }
        ],
        should: [
          {
            id: 'disclosure-aria-controls',
            title: 'aria-controls로 콘텐츠 참조',
            description: '버튼이 aria-controls로 제어하는 콘텐츠 요소의 ID를 가리켜야 합니다.',
            level: 'should'
          },
          {
            id: 'disclosure-focus-indicator',
            title: '포커스 표시',
            description: '키보드 탐색을 위한 명확한 포커스 링이 있어야 합니다.',
            level: 'should'
          },
          {
            id: 'disclosure-hidden-content',
            title: '접힌 콘텐츠 숨김 처리',
            description: '접힌 콘텐츠는 display:none 또는 hidden 속성으로 보조 기술에서 완전히 제거해야 합니다.',
            level: 'should'
          }
        ],
        avoid: [
          {
            id: 'disclosure-no-expanded-state',
            title: 'aria-expanded 생략 금지',
            description: 'aria-expanded 없이는 스크린리더가 열림/닫힘 상태를 알릴 수 없습니다.',
            level: 'avoid'
          },
          {
            id: 'disclosure-visibility-only',
            title: 'CSS visibility/opacity만 사용 금지',
            description: 'visibility:hidden이나 opacity:0만으로 숨기면 접근성 트리에서 제거되지 않습니다.',
            level: 'avoid'
          }
        ]
      },
      codeSample: {
        language: 'tsx',
        label: 'Baseline (React)',
        code: `import { useState } from 'react'

export function Disclosure({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="disclosure-content"
        onClick={() => setOpen(!open)}
      >
        {title}
      </button>
      <div id="disclosure-content" hidden={!open}>
        {children}
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
            id: 'disclosure-mui-1',
            title: 'Collapse 컴포넌트 활용',
            description: 'MUI Collapse로 애니메이션을 추가해도 hidden 속성 대신 display:none이 적용되어 접근성이 유지됩니다.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI Disclosure',
          code: `import { useState } from 'react'
import { Button, Collapse, Box } from '@mui/material'

export function MuiDisclosure({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <Box>
      <Button
        aria-expanded={open}
        aria-controls="mui-disclosure-content"
        onClick={() => setOpen(!open)}
        variant="text"
      >
        {title}
      </Button>
      <Collapse in={open}>
        <Box id="mui-disclosure-content">{children}</Box>
      </Collapse>
    </Box>
  )
}`
        },
        notes: [
          'MUI Collapse는 in={false}일 때 DOM에서 완전히 제거하려면 unmountOnExit prop을 추가하세요.',
          'Button 대신 IconButton 사용 시 aria-label을 반드시 추가하세요.'
        ]
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          {
            id: 'disclosure-radix-1',
            title: 'Collapsible.Root 사용',
            description: 'Radix Collapsible은 aria-expanded와 hidden 속성을 자동으로 관리합니다.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Radix Collapsible',
          code: `import * as Collapsible from '@radix-ui/react-collapsible'

export function RadixDisclosure({ title, children }) {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger asChild>
        <button type="button">{title}</button>
      </Collapsible.Trigger>
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible.Root>
  )
}`
        },
        notes: ['Radix Collapsible.Trigger는 aria-expanded를 자동으로 설정합니다.', 'Collapsible.Content는 닫힐 때 display:none으로 처리됩니다.']
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          {
            id: 'disclosure-antd-1',
            title: 'Collapse 패널 접근성 확인',
            description: 'Ant Collapse는 기본적으로 접근성 속성을 제공하지만 header prop에 의미있는 텍스트를 반드시 포함하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design Collapse',
          code: `import { Collapse } from 'antd'

const items = [
  {
    key: '1',
    label: 'Section Title',
    children: <p>Content goes here.</p>,
  },
]

export function AntDisclosure() {
  return <Collapse items={items} />
}`
        },
        notes: ['Ant Design Collapse는 내부적으로 aria-expanded를 관리합니다.', 'destroyInactivePanel prop으로 닫힌 패널 DOM 제거 여부를 제어하세요.']
      }
    }
  },

  // ── Tabs ──
  {
    slug: 'tabs',
    name: 'Tabs',
    description: '콘텐츠 영역을 탭으로 구분하여 전환하는 패턴',
    wcagCriteria: ['2.1.1 Keyboard', '4.1.2 Name, Role, Value'],
    tags: ['navigation', 'interactive', 'layout'],
    baseline: {
      checklist: {
        must: [
          {
            id: 'tabs-tablist-role',
            title: '탭 컨테이너에 tablist 역할',
            description: '탭 목록을 감싸는 요소에 role="tablist"가 있어야 합니다.',
            level: 'must'
          },
          { id: 'tabs-tab-role', title: '각 탭에 tab 역할', description: '각 탭 요소에 role="tab"이 있어야 합니다.', level: 'must' },
          {
            id: 'tabs-tabpanel-role',
            title: '각 패널에 tabpanel 역할',
            description: '각 콘텐츠 섹션에 role="tabpanel"과 고유 id가 있어야 합니다.',
            level: 'must'
          },
          {
            id: 'tabs-aria-controls',
            title: '탭이 패널을 참조',
            description: '각 탭에 aria-controls로 연결된 tabpanel의 id를 지정해야 합니다.',
            level: 'must'
          },
          {
            id: 'tabs-aria-selected',
            title: '활성 탭에 aria-selected',
            description: '활성 탭은 aria-selected="true", 나머지는 aria-selected="false"여야 합니다.',
            level: 'must'
          },
          {
            id: 'tabs-keyboard-arrow',
            title: '화살표 키로 탭 이동',
            description: '좌우 화살표 키로 탭 간 이동, Tab 키로 활성 패널 진입이 가능해야 합니다.',
            level: 'must'
          }
        ],
        should: [
          {
            id: 'tabs-aria-labelledby',
            title: '패널이 탭으로 레이블됨',
            description: '각 tabpanel이 aria-labelledby로 제어 탭의 id를 참조해야 합니다.',
            level: 'should'
          },
          {
            id: 'tabs-roving-tabindex',
            title: 'roving tabindex 사용',
            description: '활성 탭만 tabindex="0", 나머지는 tabindex="-1"이어야 합니다.',
            level: 'should'
          },
          {
            id: 'tabs-home-end',
            title: 'Home/End로 첫/마지막 탭 이동',
            description: 'Home 키로 첫 탭, End 키로 마지막 탭으로 이동할 수 있어야 합니다.',
            level: 'should'
          }
        ],
        avoid: [
          {
            id: 'tabs-no-role',
            title: 'ARIA 역할 생략 금지',
            description: 'CSS/JS만으로 탭을 구현하면 스크린리더가 패턴을 인식하지 못합니다.',
            level: 'avoid'
          },
          {
            id: 'tabs-hidden-panels-in-dom',
            title: '비활성 패널 노출 금지',
            description: '비활성 tabpanel은 hidden 속성이나 display:none으로 숨겨야 합니다.',
            level: 'avoid'
          }
        ]
      },
      codeSample: {
        language: 'tsx',
        label: 'Baseline (React)',
        code: `import { useState } from 'react'

const TABS = [
  { id: 'tab-1', label: 'Tab 1', content: 'Panel 1 content' },
  { id: 'tab-2', label: 'Tab 2', content: 'Panel 2 content' },
]

export function Tabs() {
  const [active, setActive] = useState('tab-1')

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') setActive(TABS[Math.min(index + 1, TABS.length - 1)].id)
    if (e.key === 'ArrowLeft') setActive(TABS[Math.max(index - 1, 0)].id)
    if (e.key === 'Home') setActive(TABS[0].id)
    if (e.key === 'End') setActive(TABS[TABS.length - 1].id)
  }

  return (
    <div>
      <div role="tablist">
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            id={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={\`panel-\${tab.id}\`}
            tabIndex={active === tab.id ? 0 : -1}
            onClick={() => setActive(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {TABS.map((tab) => (
        <div
          key={tab.id}
          id={\`panel-\${tab.id}\`}
          role="tabpanel"
          aria-labelledby={tab.id}
          hidden={active !== tab.id}
        >
          {tab.content}
        </div>
      ))}
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
            id: 'tabs-mui-1',
            title: 'TabPanel과 Tabs 연결',
            description: 'MUI Tabs의 value와 TabPanel의 value를 일치시켜 활성 패널을 제어하세요.',
            level: 'must'
          },
          {
            id: 'tabs-mui-2',
            title: 'aria-label 또는 aria-labelledby',
            description: 'MUI Tabs 컴포넌트에 aria-label 또는 aria-labelledby를 추가하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI Tabs',
          code: `import { useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'

export function MuiTabs() {
  const [value, setValue] = useState(0)
  return (
    <Box>
      <Tabs value={value} onChange={(_, v) => setValue(v)} aria-label="content tabs">
        <Tab label="Tab 1" id="tab-0" aria-controls="panel-0" />
        <Tab label="Tab 2" id="tab-1" aria-controls="panel-1" />
      </Tabs>
      <div role="tabpanel" id="panel-0" aria-labelledby="tab-0" hidden={value !== 0}>
        Panel 1
      </div>
      <div role="tabpanel" id="panel-1" aria-labelledby="tab-1" hidden={value !== 1}>
        Panel 2
      </div>
    </Box>
  )
}`
        },
        notes: [
          'MUI Tabs는 화살표 키 탐색과 roving tabindex를 자동으로 처리합니다.',
          'TabScrollButton이 표시될 경우 스크린리더 사용자에게 스크롤 방향을 안내하세요.'
        ]
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          {
            id: 'tabs-radix-1',
            title: 'Tabs.Root의 activationMode',
            description: 'activationMode="manual"로 설정하면 화살표로 포커스만 이동하고 Enter/Space로 선택합니다. 자동 활성화보다 접근성이 높습니다.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Radix Tabs',
          code: `import * as Tabs from '@radix-ui/react-tabs'

export function RadixTabs() {
  return (
    <Tabs.Root defaultValue="tab1" activationMode="manual">
      <Tabs.List aria-label="Content tabs">
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Panel 1 content</Tabs.Content>
      <Tabs.Content value="tab2">Panel 2 content</Tabs.Content>
    </Tabs.Root>
  )
}`
        },
        notes: ['Radix Tabs는 모든 ARIA 역할과 키보드 탐색을 자동으로 처리합니다.', 'Tabs.List에 aria-label을 추가해 탭 그룹의 목적을 명시하세요.']
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          {
            id: 'tabs-antd-1',
            title: 'accessKey 충돌 주의',
            description: 'Ant Design Tabs의 키보드 단축키가 브라우저 단축키와 충돌하지 않는지 확인하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design Tabs',
          code: `import { Tabs } from 'antd'

const items = [
  { key: '1', label: 'Tab 1', children: 'Panel 1 content' },
  { key: '2', label: 'Tab 2', children: 'Panel 2 content' },
]

export function AntTabs() {
  return <Tabs defaultActiveKey="1" items={items} />
}`
        },
        notes: [
          'Ant Design Tabs는 기본적으로 접근성 속성을 처리합니다.',
          'tabBarExtraContent 사용 시 해당 콘텐츠도 키보드로 접근 가능한지 확인하세요.'
        ]
      }
    }
  },

  // ── Tooltip ──
  {
    slug: 'tooltip',
    name: 'Tooltip',
    description: '요소에 추가 설명을 제공하는 팝업 텍스트 패턴',
    wcagCriteria: ['1.4.13 Content on Hover or Focus', '4.1.2 Name, Role, Value'],
    tags: ['overlay', 'informational', 'hover'],
    baseline: {
      checklist: {
        must: [
          { id: 'tooltip-role', title: 'tooltip 역할 사용', description: '툴팁 텍스트를 담은 요소에 role="tooltip"이 있어야 합니다.', level: 'must' },
          {
            id: 'tooltip-aria-describedby',
            title: 'aria-describedby로 연결',
            description: '트리거 요소에 aria-describedby로 툴팁의 id를 연결해야 합니다.',
            level: 'must'
          },
          {
            id: 'tooltip-escape-dismiss',
            title: 'Escape로 닫기',
            description: 'Escape 키로 툴팁을 닫을 수 있어야 하며 포커스는 이동하지 않아야 합니다.',
            level: 'must'
          }
        ],
        should: [
          {
            id: 'tooltip-focus-trigger',
            title: '포커스 시 표시',
            description: '마우스 호버뿐 아니라 키보드 포커스 시에도 툴팁이 표시되어야 합니다.',
            level: 'should'
          },
          {
            id: 'tooltip-no-focusable-content',
            title: '툴팁 내 포커스 가능 요소 금지',
            description: '툴팁에는 링크나 버튼 등 인터랙티브 요소를 포함하면 안 됩니다.',
            level: 'should'
          },
          {
            id: 'tooltip-persistent-on-hover',
            title: '툴팁 위 호버 시 유지',
            description: 'WCAG 1.4.13에 따라 포인터가 툴팁 위로 이동해도 툴팁이 유지되어야 합니다.',
            level: 'should'
          },
          {
            id: 'tooltip-delay',
            title: '짧은 지연 후 표시',
            description: '우발적 트리거를 방지하기 위해 300–500ms 지연 후 표시하세요.',
            level: 'should'
          }
        ],
        avoid: [
          {
            id: 'tooltip-interactive-content',
            title: '툴팁 내 인터랙티브 요소 금지',
            description: '버튼, 링크, 폼 컨트롤은 툴팁이 아닌 dialog 패턴을 사용하세요.',
            level: 'avoid'
          },
          {
            id: 'tooltip-title-attribute-only',
            title: 'HTML title 속성만 사용 금지',
            description: 'title 속성은 키보드 접근성이 없으며 스크린리더마다 동작이 다릅니다.',
            level: 'avoid'
          }
        ]
      },
      codeSample: {
        language: 'tsx',
        label: 'Baseline (React)',
        code: `import { useState, useId } from 'react'

export function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)
  const id = useId()

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span
        aria-describedby={visible ? id : undefined}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        onKeyDown={(e) => e.key === 'Escape' && setVisible(false)}
      >
        {children}
      </span>
      {visible && (
        <span
          id={id}
          role="tooltip"
          style={{ position: 'absolute', bottom: '100%', left: 0, whiteSpace: 'nowrap' }}
        >
          {label}
        </span>
      )}
    </span>
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
            id: 'tooltip-mui-1',
            title: 'enterDelay 설정',
            description: 'enterDelay prop으로 300ms 이상의 지연을 추가해 우발적 표시를 방지하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI Tooltip',
          code: `import { Tooltip, IconButton } from '@mui/material'
import { InfoOutlined } from '@mui/icons-material'

<Tooltip title="추가 정보입니다" enterDelay={300} arrow>
  <IconButton aria-label="정보">
    <InfoOutlined />
  </IconButton>
</Tooltip>`
        },
        notes: [
          'MUI Tooltip은 role="tooltip"과 aria-describedby를 자동으로 처리합니다.',
          '커스텀 children을 사용할 경우 forwardRef를 구현해야 합니다.'
        ]
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          {
            id: 'tooltip-radix-1',
            title: 'TooltipProvider 최상위 배치',
            description: 'TooltipProvider를 앱 최상위에 배치해 delayDuration을 전역으로 관리하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Radix Tooltip',
          code: `import * as Tooltip from '@radix-ui/react-tooltip'

export function RadixTooltip({ label, children }) {
  return (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="top" sideOffset={4}>
            {label}
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}`
        },
        notes: ['Radix Tooltip은 role="tooltip"과 aria-describedby를 자동으로 처리합니다.', 'Portal로 렌더링하면 z-index 문제를 방지할 수 있습니다.']
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          {
            id: 'tooltip-antd-1',
            title: 'mouseEnterDelay 설정',
            description: 'mouseEnterDelay prop으로 지연 시간을 설정하세요 (기본값 0.1초는 너무 짧을 수 있습니다).',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design Tooltip',
          code: `import { Tooltip, Button } from 'antd'

<Tooltip title="저장합니다" mouseEnterDelay={0.3}>
  <Button>저장</Button>
</Tooltip>`
        },
        notes: ['Ant Design Tooltip은 내부적으로 접근성 속성을 처리합니다.', 'color prop 변경 시 텍스트 대비율을 재확인하세요.']
      }
    }
  },

  // ── Accordion ──
  {
    slug: 'accordion',
    name: 'Accordion',
    description: '섹션별로 콘텐츠를 접고 펼칠 수 있는 패턴',
    wcagCriteria: ['2.1.1 Keyboard', '4.1.2 Name, Role, Value', '1.3.1 Info and Relationships'],
    tags: ['content', 'interactive', 'collapsible'],
    baseline: {
      checklist: {
        must: [
          {
            id: 'accordion-header-button',
            title: '헤더에 button 역할',
            description: '각 섹션 제목은 role="button" 또는 <button>을 사용해야 합니다.',
            level: 'must'
          },
          {
            id: 'accordion-aria-expanded',
            title: '각 헤더 버튼에 aria-expanded',
            description: '패널이 열릴 때 aria-expanded="true", 닫힐 때 aria-expanded="false"여야 합니다.',
            level: 'must'
          },
          {
            id: 'accordion-aria-controls',
            title: '헤더 버튼이 패널을 참조',
            description: '각 헤더 버튼에 aria-controls로 패널의 id를 지정해야 합니다.',
            level: 'must'
          },
          {
            id: 'accordion-keyboard-enter-space',
            title: 'Enter/Space로 패널 토글',
            description: 'Enter 또는 Space로 패널을 열고 닫을 수 있어야 합니다.',
            level: 'must'
          }
        ],
        should: [
          {
            id: 'accordion-heading-wrapper',
            title: '버튼을 heading으로 감싸기',
            description: '문서 구조에 맞는 h2–h6 heading 요소 내에 버튼을 배치하세요.',
            level: 'should'
          },
          {
            id: 'accordion-arrow-key-nav',
            title: '화살표 키로 헤더 탐색',
            description: '아래 화살표로 다음 헤더, 위 화살표로 이전 헤더로 이동할 수 있어야 합니다.',
            level: 'should'
          },
          {
            id: 'accordion-home-end',
            title: 'Home/End로 첫/마지막 헤더 이동',
            description: 'Home으로 첫 번째, End로 마지막 헤더로 이동할 수 있어야 합니다.',
            level: 'should'
          }
        ],
        avoid: [
          {
            id: 'accordion-no-heading',
            title: 'heading 없이 버튼만 사용 금지',
            description: 'heading 없이 버튼만 사용하면 스크린리더의 문서 구조 탐색이 불가합니다.',
            level: 'avoid'
          },
          {
            id: 'accordion-single-expand-forced',
            title: '예고 없는 단일 확장 강제 금지',
            description: '다른 패널을 자동으로 닫는 경우 사용자에게 이 동작을 명확히 알려야 합니다.',
            level: 'avoid'
          }
        ]
      },
      codeSample: {
        language: 'tsx',
        label: 'Baseline (React)',
        code: `import { useState } from 'react'

const ITEMS = [
  { id: 'item-1', heading: 'Section 1', content: 'Content for section 1' },
  { id: 'item-2', heading: 'Section 2', content: 'Content for section 2' },
]

export function Accordion() {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div>
      {ITEMS.map((item) => (
        <div key={item.id}>
          <h3>
            <button
              type="button"
              aria-expanded={open === item.id}
              aria-controls={\`panel-\${item.id}\`}
              onClick={() => setOpen(open === item.id ? null : item.id)}
            >
              {item.heading}
            </button>
          </h3>
          <div
            id={\`panel-\${item.id}\`}
            role="region"
            aria-labelledby={item.id}
            hidden={open !== item.id}
          >
            <p>{item.content}</p>
          </div>
        </div>
      ))}
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
            id: 'accordion-mui-1',
            title: 'AccordionSummary 헤딩 연결',
            description: 'AccordionSummary를 h3 등 heading으로 감싸서 문서 구조를 유지하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI Accordion',
          code: `import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

<Accordion>
  <h3 style={{ margin: 0 }}>
    <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel-content" id="panel-header">
      Section 1
    </AccordionSummary>
  </h3>
  <AccordionDetails id="panel-content">
    <Typography>Content here.</Typography>
  </AccordionDetails>
</Accordion>`
        },
        notes: ['MUI Accordion은 aria-expanded를 자동으로 처리합니다.', 'disableGutters와 square prop으로 스타일을 조정할 수 있습니다.']
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          {
            id: 'accordion-radix-1',
            title: 'type="single" vs "multiple"',
            description: 'type="single"이면 하나의 패널만 열립니다. 이 동작을 시각적으로 명확하게 표시하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Radix Accordion',
          code: `import * as Accordion from '@radix-ui/react-accordion'

export function RadixAccordion() {
  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value="item-1">
        <Accordion.Header>
          <Accordion.Trigger>Section 1</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Content for section 1</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}`
        },
        notes: ['Radix Accordion.Header는 h3를 기본으로 렌더링합니다.', 'aria-expanded와 data-state 속성이 자동으로 관리됩니다.']
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          {
            id: 'accordion-antd-1',
            title: 'accordion prop 사용',
            description: 'accordion={true}로 설정하면 한 번에 하나의 패널만 열립니다. 이 동작을 사용자에게 알리세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design Collapse',
          code: `import { Collapse } from 'antd'

const items = [
  { key: '1', label: 'Section 1', children: <p>Content 1</p> },
  { key: '2', label: 'Section 2', children: <p>Content 2</p> },
]

export function AntAccordion() {
  return <Collapse accordion items={items} />
}`
        },
        notes: [
          'Ant Design Collapse는 기본적으로 접근성 속성을 처리합니다.',
          'showArrow={false}로 화살표를 숨기더라도 시각적 상태 변화는 유지하세요.'
        ]
      }
    }
  },

  // ── Combobox ──
  {
    slug: 'combobox',
    name: 'Combobox',
    description: '텍스트 입력과 선택 목록이 결합된 자동완성 패턴',
    wcagCriteria: ['2.1.1 Keyboard', '4.1.2 Name, Role, Value', '1.3.1 Info and Relationships'],
    tags: ['form', 'interactive', 'input', 'autocomplete'],
    baseline: {
      checklist: {
        must: [
          { id: 'combobox-role', title: 'input에 combobox 역할', description: '텍스트 입력 요소에 role="combobox"가 있어야 합니다.', level: 'must' },
          {
            id: 'combobox-aria-expanded',
            title: 'aria-expanded로 팝업 상태 반영',
            description: '팝업이 열릴 때 aria-expanded="true", 닫힐 때 aria-expanded="false"여야 합니다.',
            level: 'must'
          },
          {
            id: 'combobox-aria-controls',
            title: '팝업 참조',
            description: 'aria-controls로 listbox 또는 팝업 요소의 id를 가리켜야 합니다.',
            level: 'must'
          },
          {
            id: 'combobox-aria-autocomplete',
            title: '자동완성 동작 선언',
            description: 'aria-autocomplete를 none/list/inline/both 중 하나로 설정해야 합니다.',
            level: 'must'
          },
          {
            id: 'combobox-keyboard-arrow',
            title: '화살표 키로 팝업 탐색',
            description: '아래 화살표로 팝업을 열고 첫 옵션으로 이동, 위/아래 화살표로 옵션 간 이동이 가능해야 합니다.',
            level: 'must'
          },
          {
            id: 'combobox-escape-closes',
            title: 'Escape로 팝업 닫기',
            description: 'Escape 키로 팝업을 닫되 입력값은 변경하지 않아야 합니다.',
            level: 'must'
          }
        ],
        should: [
          {
            id: 'combobox-aria-activedescendant',
            title: 'aria-activedescendant 사용',
            description: '포커스가 입력창에 있을 때 aria-activedescendant로 현재 강조된 옵션의 id를 설정하세요.',
            level: 'should'
          },
          {
            id: 'combobox-enter-selects',
            title: 'Enter로 옵션 선택',
            description: 'Enter 키로 강조된 옵션을 선택하고 팝업을 닫아야 합니다.',
            level: 'should'
          },
          { id: 'combobox-label', title: '가시적 레이블', description: '<label> 요소 또는 aria-label로 목적을 명시하세요.', level: 'should' }
        ],
        avoid: [
          {
            id: 'combobox-no-keyboard-support',
            title: '마우스 전용 팝업 금지',
            description: '팝업 열기와 옵션 선택을 마우스 클릭만으로 가능하게 만들지 마세요.',
            level: 'avoid'
          },
          {
            id: 'combobox-focus-trap',
            title: '팝업 내 포커스 트랩 금지',
            description: 'Tab 키가 팝업을 닫고 다음 요소로 이동해야 합니다. 포커스를 listbox에 가두지 마세요.',
            level: 'avoid'
          }
        ]
      },
      codeSample: {
        language: 'tsx',
        label: 'Baseline (React)',
        code: `import { useState, useId } from 'react'

const OPTIONS = ['Apple', 'Banana', 'Cherry']

export function Combobox({ label }: { label: string }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputId = useId()
  const listId = useId()

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActiveIndex((i) => Math.min(i + 1, OPTIONS.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      setSelected(OPTIONS[activeIndex])
      setOpen(false)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={activeIndex >= 0 ? \`opt-\${activeIndex}\` : undefined}
        value={selected}
        readOnly
        onKeyDown={handleKeyDown}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <ul id={listId} role="listbox">
          {OPTIONS.map((opt, i) => (
            <li
              key={opt}
              id={\`opt-\${i}\`}
              role="option"
              aria-selected={selected === opt}
              onClick={() => { setSelected(opt); setOpen(false) }}
            >
              {opt}
            </li>
          ))}
        </ul>
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
            id: 'combobox-mui-1',
            title: 'Autocomplete 레이블 연결',
            description: 'MUI Autocomplete에 id와 getOptionLabel을 설정하고 renderInput의 label을 지정하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI Autocomplete',
          code: `import { Autocomplete, TextField } from '@mui/material'

const OPTIONS = ['Apple', 'Banana', 'Cherry']

<Autocomplete
  id="fruit-select"
  options={OPTIONS}
  renderInput={(params) => (
    <TextField {...params} label="과일 선택" />
  )}
/>`
        },
        notes: [
          'MUI Autocomplete는 combobox 역할과 aria-expanded를 자동으로 처리합니다.',
          'freeSolo prop 사용 시 사용자 입력값 처리 방식을 스크린리더에 안내하세요.'
        ]
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          {
            id: 'combobox-radix-1',
            title: 'Combobox 직접 구현',
            description: 'Radix는 별도 Combobox 컴포넌트가 없으므로 Popover + Command를 조합해 구현하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Radix Combobox (Popover + Command)',
          code: `import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Command } from 'cmdk'

export function RadixCombobox() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button role="combobox" aria-expanded={open} aria-haspopup="listbox">
          {value || 'Select...'}
        </button>
      </Popover.Trigger>
      <Popover.Content>
        <Command>
          <Command.Input />
          <Command.List>
            <Command.Item onSelect={(v) => { setValue(v); setOpen(false) }}>Apple</Command.Item>
            <Command.Item onSelect={(v) => { setValue(v); setOpen(false) }}>Banana</Command.Item>
          </Command.List>
        </Command>
      </Popover.Content>
    </Popover.Root>
  )
}`
        },
        notes: [
          'cmdk 라이브러리와 조합하면 완전한 접근성을 갖춘 Combobox를 구현할 수 있습니다.',
          'Radix Select는 네이티브 select를 대체하는 단순 선택 목록에 더 적합합니다.'
        ]
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          {
            id: 'combobox-antd-1',
            title: 'showSearch와 filterOption 설정',
            description: 'showSearch를 활성화하고 filterOption으로 검색 동작을 정의하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design AutoComplete',
          code: `import { AutoComplete } from 'antd'

const OPTIONS = [
  { value: 'Apple' },
  { value: 'Banana' },
]

<AutoComplete
  options={OPTIONS}
  placeholder="과일을 입력하세요"
  filterOption={(input, option) =>
    (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
  }
  aria-label="과일 선택"
/>`
        },
        notes: ['Ant Design AutoComplete는 접근성 속성을 자동으로 처리합니다.', '빈 결과 상태를 사용자에게 알리는 notFoundContent를 설정하세요.']
      }
    }
  },

  // ── Checkbox ──
  {
    slug: 'checkbox',
    name: 'Checkbox',
    description: '항목을 선택하거나 해제할 수 있는 체크박스 패턴',
    wcagCriteria: ['2.1.1 Keyboard', '4.1.2 Name, Role, Value', '1.3.1 Info and Relationships'],
    tags: ['form', 'interactive', 'selection'],
    baseline: {
      checklist: {
        must: [
          {
            id: 'checkbox-role',
            title: 'checkbox 역할',
            description: '네이티브 <input type="checkbox"> 또는 role="checkbox"를 사용해야 합니다.',
            level: 'must'
          },
          {
            id: 'checkbox-aria-checked',
            title: 'aria-checked로 상태 반영',
            description: '체크됨: aria-checked="true", 미체크: aria-checked="false", 중간 상태: aria-checked="mixed"여야 합니다.',
            level: 'must'
          },
          {
            id: 'checkbox-label',
            title: '접근 가능한 레이블',
            description: '<label>, aria-labelledby, 또는 aria-label로 레이블을 제공해야 합니다.',
            level: 'must'
          },
          {
            id: 'checkbox-space-toggles',
            title: 'Space 키로 토글',
            description: '포커스 시 Space 키로 체크 상태를 토글할 수 있어야 합니다.',
            level: 'must'
          }
        ],
        should: [
          {
            id: 'checkbox-group-role',
            title: '그룹에 group 역할',
            description: '관련 체크박스는 role="group"과 aria-labelledby로 그룹 레이블을 연결하세요.',
            level: 'should'
          },
          { id: 'checkbox-focus-indicator', title: '포커스 표시', description: '커스텀 체크박스에 명확한 포커스 링을 제공하세요.', level: 'should' },
          {
            id: 'checkbox-error-linked',
            title: '오류 메시지 연결',
            description: '유효성 오류 메시지를 aria-describedby로 체크박스와 연결하세요.',
            level: 'should'
          }
        ],
        avoid: [
          {
            id: 'checkbox-div-only',
            title: 'role 없는 div/span 금지',
            description: '비의미적 요소로 체크박스를 만들 때 role="checkbox"와 키보드 처리를 빠뜨리지 마세요.',
            level: 'avoid'
          },
          {
            id: 'checkbox-hidden-native',
            title: '대체 없이 네이티브 숨김 금지',
            description: 'display:none이나 visibility:hidden으로 네이티브 체크박스를 숨기면 접근성을 잃습니다.',
            level: 'avoid'
          }
        ]
      },
      codeSample: {
        language: 'tsx',
        label: 'Baseline (React)',
        code: `export function Checkbox({
  id,
  label,
  checked,
  onChange,
  indeterminate = false,
}: {
  id: string
  label: string
  checked: boolean
  onChange: (v: boolean) => void
  indeterminate?: boolean
}) {
  return (
    <label htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        ref={(el) => { if (el) el.indeterminate = indeterminate }}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
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
            id: 'checkbox-mui-1',
            title: 'FormControlLabel로 레이블 연결',
            description: 'MUI Checkbox는 FormControlLabel로 감싸 레이블을 연결하세요.',
            level: 'must'
          },
          {
            id: 'checkbox-mui-2',
            title: 'indeterminate 상태 처리',
            description: 'indeterminate prop으로 중간 선택 상태를 표현할 수 있으며 aria-checked="mixed"가 자동 설정됩니다.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI Checkbox',
          code: `import { Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material'

<FormGroup>
  <FormLabel component="legend">알림 설정</FormLabel>
  <FormControlLabel
    control={<Checkbox checked={emailChecked} onChange={(e) => setEmailChecked(e.target.checked)} />}
    label="이메일 알림"
  />
  <FormControlLabel
    control={<Checkbox checked={smsChecked} onChange={(e) => setSmsChecked(e.target.checked)} />}
    label="SMS 알림"
  />
</FormGroup>`
        },
        notes: ['MUI Checkbox는 네이티브 input을 사용하므로 기본 접근성이 보장됩니다.', 'color prop 변경 시 4.5:1 대비율을 확인하세요.']
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          {
            id: 'checkbox-radix-1',
            title: 'Checkbox.Indicator 숨김 처리',
            description: 'Checkbox.Indicator는 체크 표시만 담당하며 aria-hidden으로 처리됩니다.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Radix Checkbox',
          code: `import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

export function RadixCheckbox({ id, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Checkbox.Root id={id} className="checkbox-root">
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label htmlFor={id}>{label}</label>
    </div>
  )
}`
        },
        notes: [
          'Radix Checkbox는 role="checkbox"와 aria-checked를 자동으로 처리합니다.',
          'onCheckedChange의 값은 boolean | "indeterminate"이므로 타입을 확인하세요.'
        ]
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          {
            id: 'checkbox-antd-1',
            title: 'Checkbox.Group으로 그룹화',
            description: 'Checkbox.Group을 사용하면 관련 체크박스를 의미론적으로 그룹화할 수 있습니다.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design Checkbox Group',
          code: `import { Checkbox } from 'antd'

const OPTIONS = [
  { label: '이메일', value: 'email' },
  { label: 'SMS', value: 'sms' },
]

<Checkbox.Group
  options={OPTIONS}
  onChange={(values) => console.log(values)}
  aria-label="알림 수신 방법"
/>`
        },
        notes: ['Ant Design Checkbox는 네이티브 input을 사용해 접근성을 유지합니다.', 'indeterminate prop으로 중간 선택 상태를 표현할 수 있습니다.']
      }
    }
  },

  // ── Radio Group ──
  {
    slug: 'radio-group',
    name: 'Radio Group',
    description: '여러 옵션 중 하나를 선택하는 라디오 버튼 그룹',
    wcagCriteria: ['2.1.1 Keyboard', '4.1.2 Name, Role, Value', '1.3.1 Info and Relationships'],
    tags: ['form', 'interactive', 'selection'],
    baseline: {
      checklist: {
        must: [
          {
            id: 'radio-group-role',
            title: '컨테이너에 radiogroup 역할',
            description: '모든 라디오 버튼을 감싸는 요소에 role="radiogroup"이 있어야 합니다.',
            level: 'must'
          },
          {
            id: 'radio-role',
            title: '각 옵션에 radio 역할',
            description: '각 라디오 버튼에 role="radio" 또는 네이티브 <input type="radio">를 사용해야 합니다.',
            level: 'must'
          },
          {
            id: 'radio-aria-checked',
            title: 'aria-checked로 선택 상태',
            description: '선택된 라디오는 aria-checked="true", 나머지는 aria-checked="false"여야 합니다.',
            level: 'must'
          },
          {
            id: 'radio-group-label',
            title: '그룹 레이블',
            description: 'radiogroup에 aria-labelledby 또는 aria-label로 그룹 목적을 명시해야 합니다.',
            level: 'must'
          },
          {
            id: 'radio-arrow-key-selection',
            title: '화살표 키로 이동 및 선택',
            description: '오른쪽/아래 화살표로 다음 옵션 선택, 왼쪽/위 화살표로 이전 옵션 선택이 가능해야 합니다.',
            level: 'must'
          }
        ],
        should: [
          {
            id: 'radio-roving-tabindex',
            title: 'roving tabindex 사용',
            description: '선택된 라디오만 tabindex="0", 나머지는 tabindex="-1"이어야 합니다.',
            level: 'should'
          },
          {
            id: 'radio-focus-wraps',
            title: '경계에서 포커스 순환',
            description: '마지막 옵션에서 아래 화살표를 누르면 첫 번째로 순환해야 합니다.',
            level: 'should'
          }
        ],
        avoid: [
          {
            id: 'radio-tab-between-options',
            title: 'Tab으로 각 옵션 이동 금지',
            description: '각 라디오를 Tab 정류장으로 만들지 마세요. 그룹 전체를 하나의 Tab 정류장으로 처리하세요.',
            level: 'avoid'
          },
          {
            id: 'radio-no-group-label',
            title: '그룹 레이블 누락 금지',
            description: '그룹 레이블 없이 라디오 버튼만 나열하면 사용자가 그룹 목적을 알 수 없습니다.',
            level: 'avoid'
          }
        ]
      },
      codeSample: {
        language: 'tsx',
        label: 'Baseline (React)',
        code: `import { useState } from 'react'

const OPTIONS = ['Option A', 'Option B', 'Option C']

export function RadioGroup({ legend }: { legend: string }) {
  const [selected, setSelected] = useState(OPTIONS[0])

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next = index
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (index + 1) % OPTIONS.length
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (index - 1 + OPTIONS.length) % OPTIONS.length
    if (next !== index) {
      e.preventDefault()
      setSelected(OPTIONS[next])
    }
  }

  return (
    <fieldset>
      <legend>{legend}</legend>
      {OPTIONS.map((opt, i) => (
        <label key={opt}>
          <input
            type="radio"
            name="group"
            value={opt}
            checked={selected === opt}
            tabIndex={selected === opt ? 0 : -1}
            onChange={() => setSelected(opt)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          />
          {opt}
        </label>
      ))}
    </fieldset>
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
            id: 'radio-mui-1',
            title: 'RadioGroup과 FormLabel 연결',
            description: 'RadioGroup을 FormControl로 감싸고 FormLabel로 그룹 레이블을 제공하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI Radio Group',
          code: `import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'

<FormControl>
  <FormLabel id="shipping-label">배송 속도</FormLabel>
  <RadioGroup aria-labelledby="shipping-label" defaultValue="standard">
    <FormControlLabel value="standard" control={<Radio />} label="일반 배송 (3–5일)" />
    <FormControlLabel value="express" control={<Radio />} label="빠른 배송 (1–2일)" />
  </RadioGroup>
</FormControl>`
        },
        notes: [
          'MUI RadioGroup은 roving tabindex와 화살표 키 탐색을 자동으로 처리합니다.',
          'row prop으로 수평 배열 시에도 위아래 화살표 키가 동작합니다.'
        ]
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          {
            id: 'radio-radix-1',
            title: 'RadioGroup.Root에 aria-label 추가',
            description: 'Radix RadioGroup.Root에 aria-label 또는 aria-labelledby로 그룹 목적을 명시하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Radix Radio Group',
          code: `import * as RadioGroup from '@radix-ui/react-radio-group'

export function RadixRadioGroup() {
  return (
    <RadioGroup.Root defaultValue="standard" aria-label="배송 속도">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>
          <RadioGroup.Item value="standard">
            <RadioGroup.Indicator />
          </RadioGroup.Item>
          일반 배송
        </label>
        <label>
          <RadioGroup.Item value="express">
            <RadioGroup.Indicator />
          </RadioGroup.Item>
          빠른 배송
        </label>
      </div>
    </RadioGroup.Root>
  )
}`
        },
        notes: [
          'Radix RadioGroup은 role="radiogroup", roving tabindex, 화살표 키 탐색을 자동으로 처리합니다.',
          'RadioGroup.Indicator는 선택 상태의 시각적 표시만 담당하며 aria-hidden으로 처리됩니다.'
        ]
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          {
            id: 'radio-antd-1',
            title: 'Radio.Group에 레이블 제공',
            description: 'Radio.Group을 감싸는 요소에 aria-label 또는 연결된 레이블을 제공하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design Radio Group',
          code: `import { Radio } from 'antd'

const OPTIONS = [
  { label: '일반 배송', value: 'standard' },
  { label: '빠른 배송', value: 'express' },
]

<div>
  <p id="shipping-label">배송 속도</p>
  <Radio.Group
    options={OPTIONS}
    defaultValue="standard"
    aria-labelledby="shipping-label"
  />
</div>`
        },
        notes: [
          'Ant Design Radio.Group은 네이티브 input을 사용해 기본 접근성을 유지합니다.',
          'optionType="button"으로 버튼 스타일 라디오를 사용할 때도 레이블을 반드시 제공하세요.'
        ]
      }
    }
  },

  // ── Link ──
  {
    slug: 'link',
    name: 'Link',
    description: '다른 페이지나 리소스로 이동하는 하이퍼링크 패턴',
    wcagCriteria: ['2.1.1 Keyboard', '2.4.4 Link Purpose', '4.1.2 Name, Role, Value'],
    tags: ['navigation', 'interactive'],
    baseline: {
      checklist: {
        must: [
          {
            id: 'link-role',
            title: '네이티브 <a> 또는 role="link"',
            description: '네이티브 <a href>를 사용하세요. 비의미적 요소를 링크로 사용할 경우 role="link"와 키보드 처리를 추가해야 합니다.',
            level: 'must'
          },
          {
            id: 'link-accessible-name',
            title: '설명적 접근 가능 이름',
            description: '링크 텍스트 또는 aria-label이 목적지를 설명해야 합니다. "클릭하세요", "더보기" 같은 모호한 텍스트를 피하세요.',
            level: 'must'
          },
          {
            id: 'link-keyboard-enter',
            title: 'Enter로 활성화',
            description: '포커스된 링크에서 Enter 키를 누르면 이동이 실행되어야 합니다.',
            level: 'must'
          },
          { id: 'link-href', title: '유효한 href', description: '<a> 요소에 href 속성이 있어야 키보드 포커스가 기본으로 적용됩니다.', level: 'must' }
        ],
        should: [
          {
            id: 'link-new-tab-warning',
            title: '새 탭 열기 시 안내',
            description: '새 탭에서 열리는 링크는 텍스트나 aria-label에 이를 표시하세요 (예: "(새 탭에서 열림)").',
            level: 'should'
          },
          {
            id: 'link-focus-indicator',
            title: '포커스 표시',
            description: '기본 아웃라인을 제거할 경우 더 강한 대안을 제공하세요.',
            level: 'should'
          },
          {
            id: 'link-distinguishable',
            title: '텍스트와 구별 가능',
            description: '본문 내 링크는 색상 외에 밑줄 등으로도 구별할 수 있어야 합니다.',
            level: 'should'
          }
        ],
        avoid: [
          {
            id: 'link-empty-href',
            title: '빈 href 또는 # 금지',
            description: '<a href="#">이나 <a href="javascript:void(0)">는 탐색이 아닌 액션에 사용하지 마세요. 대신 <button>을 사용하세요.',
            level: 'avoid'
          },
          {
            id: 'link-image-without-alt',
            title: '이미지 링크에 alt 텍스트 누락 금지',
            description: '이미지만 있는 링크는 alt 텍스트 없이는 접근 가능 이름이 없습니다.',
            level: 'avoid'
          }
        ]
      },
      codeSample: {
        language: 'tsx',
        label: 'Baseline (React)',
        code: `export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {children}
      <span className="sr-only"> (새 탭에서 열림)</span>
    </a>
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
            id: 'link-mui-1',
            title: 'MUI Link 컴포넌트 사용',
            description: 'MUI Link는 <a>를 기반으로 하므로 기본 접근성이 유지됩니다. underline prop을 "always"로 설정하는 것을 권장합니다.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI Link',
          code: `import { Link } from '@mui/material'

<Link href="/about" underline="always">
  회사 소개
</Link>

{/* 외부 링크 */}
<Link href="https://example.com" target="_blank" rel="noreferrer">
  외부 사이트
  <span className="sr-only"> (새 탭에서 열림)</span>
</Link>`
        },
        notes: ['MUI Link는 component prop으로 Next.js Link 등 라우터와 통합할 수 있습니다.', 'color prop 변경 시 대비율을 확인하세요.']
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          {
            id: 'link-radix-1',
            title: 'asChild로 라우터 링크 통합',
            description: 'Radix는 별도 Link 컴포넌트가 없으므로 네이티브 <a>나 Next.js Link를 직접 사용하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Radix + Next.js Link',
          code: `import NextLink from 'next/link'

{/* Radix 컴포넌트 내 링크는 asChild 패턴 활용 */}
<NextLink href="/patterns/button" className="text-indigo-600 hover:underline">
  Button 패턴 보기
</NextLink>`
        },
        notes: ['네이티브 <a>의 기본 접근성을 최대한 활용하세요.', 'Radix Themes를 사용하는 경우 Theme.Link 컴포넌트가 포함되어 있습니다.']
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          {
            id: 'link-antd-1',
            title: 'Typography.Link 사용',
            description: 'Ant Design의 Typography.Link는 <a>를 기반으로 하며 기본 스타일과 접근성을 제공합니다.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design Typography.Link',
          code: `import { Typography } from 'antd'

const { Link } = Typography

<Link href="/about">회사 소개</Link>

{/* 외부 링크 */}
<Link href="https://example.com" target="_blank">
  외부 사이트
  <span className="sr-only"> (새 탭에서 열림)</span>
</Link>`
        },
        notes: [
          'Ant Design Typography.Link는 href 없이 onClick만 사용하면 <button>처럼 동작합니다.',
          'disabled prop을 사용할 때 색상 대비를 확인하세요.'
        ]
      }
    }
  }
]

export function getPattern(slug: string): Pattern | undefined {
  return patterns.find((p) => p.slug === slug)
}
