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
          { id: 'btn-m5', title: 'disabled 상태 전달', description: 'aria-disabled 또는 disabled 속성으로 비활성 상태를 명시해야 합니다.', level: 'must' },
        ],
        should: [
          { id: 'btn-s1', title: '로딩 상태 안내', description: 'aria-busy="true"와 스크린리더용 로딩 메시지를 제공하세요.', level: 'should' },
          { id: 'btn-s2', title: '아이콘 버튼 레이블', description: '아이콘만 있는 버튼에는 반드시 aria-label을 추가하세요.', level: 'should' },
          { id: 'btn-s3', title: '터치 타겟 44×44px', description: '모바일 환경에서 최소 44×44px 터치 타겟을 확보하세요.', level: 'should' },
        ],
        avoid: [
          { id: 'btn-a1', title: 'div/span으로 버튼 구현 금지', description: '<div onClick>는 키보드 접근성이 없습니다. <button>을 사용하세요.', level: 'avoid' },
          { id: 'btn-a2', title: '색상만으로 상태 구분 금지', description: '활성/비활성 상태를 색상만으로 나타내지 마세요.', level: 'avoid' },
        ],
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
</button>`,
      },
    },
    designSystems: {
      material: {
        id: 'material',
        name: 'Material Design (MUI)',
        color: '#1976d2',
        additionalChecks: [
          { id: 'btn-mui-1', title: 'Ripple 효과 접근성', description: 'MUI의 TouchRipple은 시각적 피드백만 제공하므로 추가적인 aria 피드백이 필요합니다.', level: 'should' },
          { id: 'btn-mui-2', title: 'variant별 대비 검증', description: 'outlined variant는 border 색상까지 대비 3:1을 충족해야 합니다.', level: 'must' },
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
</Button>`,
        },
        notes: [
          'MUI Button은 기본적으로 <button> 요소를 렌더링합니다.',
          'component prop으로 <a>로 변경 시 href와 role을 명시적으로 관리하세요.',
          'disableRipple prop은 접근성에 영향 없이 사용 가능합니다.',
        ],
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          { id: 'btn-radix-1', title: 'asChild 패턴 주의', description: 'asChild로 <a>를 렌더링 시 role="button"이 제거됩니다. 의도를 명확히 하세요.', level: 'must' },
          { id: 'btn-radix-2', title: 'Slot 접근성 검증', description: 'asChild 사용 시 자식 컴포넌트가 필요한 aria 속성을 전달받는지 확인하세요.', level: 'should' },
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
)`,
        },
        notes: [
          'Radix는 headless 컴포넌트로 스타일을 직접 제어합니다.',
          'focus-visible:ring 클래스로 키보드 포커스만 표시하는 것을 권장합니다.',
          '@radix-ui/react-slot의 Slot은 props를 자식 요소로 전달합니다.',
        ],
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          { id: 'btn-antd-1', title: 'danger 버튼 aria 보완', description: 'danger prop은 시각적 표시만 합니다. aria-label로 "삭제" 등 목적을 명시하세요.', level: 'must' },
          { id: 'btn-antd-2', title: 'loading 스피너 숨김 처리', description: 'Ant Design의 loading 스피너는 aria-hidden이 없어 스크린리더에 노출됩니다.', level: 'should' },
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
  onClick={handleSave}
>
  저장
</Button>

{/* 삭제 버튼: danger + 명시적 레이블 */}
<Button
  danger
  aria-label="항목 삭제"
  onClick={handleDelete}
>
  삭제
</Button>`,
        },
        notes: [
          'Ant Design Button은 내부적으로 <button> 요소를 사용합니다.',
          'htmlType prop으로 submit/reset/button type을 지정하세요.',
          'Block prop으로 full-width 버튼 구현 시 레이아웃 맥락을 고려하세요.',
        ],
      },
    },
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
          { id: 'inp-m1', title: '레이블 연결 필수', description: '<label for>로 input과 연결하거나 aria-label/aria-labelledby를 사용해야 합니다.', level: 'must' },
          { id: 'inp-m2', title: '오류 메시지 연결', description: 'aria-describedby로 오류 메시지를 input에 연결하고 aria-invalid="true"를 설정해야 합니다.', level: 'must' },
          { id: 'inp-m3', title: '필수 입력 표시', description: 'required 또는 aria-required="true"로 필수 여부를 명시해야 합니다.', level: 'must' },
          { id: 'inp-m4', title: '색상 대비 4.5:1', description: '입력 텍스트와 배경 사이 최소 4.5:1 대비율이 필요합니다.', level: 'must' },
        ],
        should: [
          { id: 'inp-s1', title: 'placeholder 단독 사용 금지', description: 'placeholder는 레이블을 대체할 수 없습니다. 항상 visible label과 함께 사용하세요.', level: 'should' },
          { id: 'inp-s2', title: 'autocomplete 속성 추가', description: '이름, 이메일 등 개인정보 필드에 autocomplete 속성을 설정하세요.', level: 'should' },
          { id: 'inp-s3', title: '도움말 텍스트 연결', description: 'aria-describedby로 힌트/도움말 텍스트를 연결하세요.', level: 'should' },
        ],
        avoid: [
          { id: 'inp-a1', title: 'placeholder를 레이블로 사용 금지', description: '포커스 시 placeholder가 사라져 사용자가 맥락을 잃습니다.', level: 'avoid' },
          { id: 'inp-a2', title: '색상만으로 오류 표시 금지', description: '빨간 테두리만으로 오류를 나타내지 마세요. 텍스트 메시지를 함께 제공하세요.', level: 'avoid' },
        ],
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
</div>`,
      },
    },
    designSystems: {
      material: {
        id: 'material',
        name: 'Material Design (MUI)',
        color: '#1976d2',
        additionalChecks: [
          { id: 'inp-mui-1', title: 'TextField helperText와 aria 연결', description: 'MUI TextField의 helperText는 자동으로 aria-describedby로 연결됩니다. FormHelperText id를 수동 설정하지 마세요.', level: 'should' },
          { id: 'inp-mui-2', title: 'InputLabel shrink 동작 확인', description: 'floating label이 축소될 때 스크린리더에 레이블이 유지되는지 확인하세요.', level: 'must' },
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
/>`,
        },
        notes: [
          'MUI TextField는 label, input, helperText의 aria 연결을 자동 처리합니다.',
          'error prop이 true면 helperText에 role="alert"가 자동 추가됩니다.',
          'variant="outlined"의 border 색상은 대비 3:1을 확인하세요.',
        ],
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          { id: 'inp-radix-1', title: 'Form.Message 활용', description: '@radix-ui/react-form의 Form.Message는 aria-live를 자동 관리합니다.', level: 'should' },
          { id: 'inp-radix-2', title: 'Form.Label 연결 검증', description: 'Form.Label과 Form.Control의 htmlFor/id 연결을 명시적으로 확인하세요.', level: 'must' },
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
</Form.Root>`,
        },
        notes: [
          '@radix-ui/react-form은 HTML5 validation과 aria를 자동으로 연결합니다.',
          'Form.Message는 validation 조건에 따라 자동으로 aria-live로 동작합니다.',
          '커스텀 validation은 serverInvalid prop으로 처리하세요.',
        ],
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          { id: 'inp-antd-1', title: 'Form.Item rules와 aria 동기화', description: 'Ant Design Form의 rules 검증 메시지는 aria-describedby로 연결되지 않을 수 있습니다. 수동 확인이 필요합니다.', level: 'must' },
          { id: 'inp-antd-2', title: 'prefix/suffix 아이콘 aria-hidden', description: 'Input의 prefix/suffix 아이콘에 aria-hidden을 추가하세요.', level: 'should' },
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
</Form.Item>`,
        },
        notes: [
          'Ant Design Form.Item은 레이블과 input을 자동으로 연결합니다.',
          'validateTrigger로 실시간 검증 시점을 조절할 수 있습니다.',
          'Form.Item의 tooltip prop으로 추가 설명을 제공할 수 있습니다.',
        ],
      },
    },
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
          { id: 'modal-m4', title: '열릴 때 포커스 이동', description: '모달 열림 시 첫 번째 포커스 가능 요소 또는 제목으로 포커스를 이동해야 합니다.', level: 'must' },
          { id: 'modal-m5', title: 'ESC 키로 닫기', description: 'Escape 키로 모달을 닫을 수 있어야 합니다.', level: 'must' },
          { id: 'modal-m6', title: '닫힐 때 포커스 복원', description: '모달 닫힘 시 모달을 열었던 트리거 요소로 포커스를 반환해야 합니다.', level: 'must' },
        ],
        should: [
          { id: 'modal-s1', title: '배경 스크롤 방지', description: '모달 열림 시 배경 콘텐츠 스크롤을 막아 혼란을 방지하세요.', level: 'should' },
          { id: 'modal-s2', title: '배경 inert 처리', description: '모달 외부 콘텐츠에 inert 속성을 적용해 스크린리더 접근을 차단하세요.', level: 'should' },
          { id: 'modal-s3', title: 'aria-describedby로 설명 추가', description: '모달 본문 설명이 있을 경우 aria-describedby로 연결하세요.', level: 'should' },
        ],
        avoid: [
          { id: 'modal-a1', title: '스크롤 가능한 배경 허용 금지', description: '모달 열림 중 배경이 스크롤되면 사용자가 맥락을 잃습니다.', level: 'avoid' },
          { id: 'modal-a2', title: '포커스 트랩 없는 구현 금지', description: 'Tab 키가 모달 외부로 나가면 시각 장애 사용자가 길을 잃습니다.', level: 'avoid' },
        ],
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
}`,
      },
    },
    designSystems: {
      material: {
        id: 'material',
        name: 'Material Design (MUI)',
        color: '#1976d2',
        additionalChecks: [
          { id: 'modal-mui-1', title: 'MUI Dialog keepMounted 주의', description: 'keepMounted prop 사용 시 숨겨진 Dialog가 DOM에 남아 스크린리더에 노출될 수 있습니다.', level: 'must' },
          { id: 'modal-mui-2', title: 'disablePortal 사용 금지', description: 'disablePortal은 포커스 트랩과 inert 처리를 방해합니다.', level: 'avoid' },
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI Dialog',
          code: `import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'

<Dialog
  open={isOpen}
  onClose={onClose}
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
    <Button onClick={onClose}>취소</Button>
    <Button onClick={handleDelete} color="error" autoFocus>
      삭제
    </Button>
  </DialogActions>
</Dialog>`,
        },
        notes: [
          'MUI Dialog는 포커스 트랩을 자동으로 처리합니다.',
          'autoFocus prop으로 열림 시 포커스 위치를 제어하세요.',
          'TransitionProps.onExited로 닫힘 후 포커스 복원을 처리할 수 있습니다.',
        ],
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          { id: 'modal-radix-1', title: 'Dialog.Description 필수 제공', description: 'Dialog.Description이 없으면 Radix가 콘솔 경고를 발생시킵니다. visually-hidden으로라도 제공하세요.', level: 'must' },
          { id: 'modal-radix-2', title: 'Modal 외부 클릭 처리', description: 'onInteractOutside prop으로 외부 클릭 동작을 명시적으로 제어하세요.', level: 'should' },
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
      <button onClick={handleDelete}>삭제</button>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>`,
        },
        notes: [
          'Radix Dialog는 포커스 트랩, ESC 닫기, 포커스 복원을 자동 처리합니다.',
          'Portal을 사용해 z-index 이슈 없이 body에 렌더링합니다.',
          'Dialog.Trigger를 사용하면 트리거 참조가 자동으로 관리됩니다.',
        ],
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          { id: 'modal-antd-1', title: 'destroyOnClose 검토', description: '접근성 보조기기는 DOM 존재 여부에 민감합니다. destroyOnClose로 닫힌 모달을 DOM에서 제거하세요.', level: 'should' },
          { id: 'modal-antd-2', title: 'footer 버튼 순서', description: 'footer의 확인/취소 버튼 순서가 논리적 탭 순서와 일치하는지 확인하세요.', level: 'should' },
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design Modal',
          code: `import { Modal, Button } from 'antd'

<Modal
  open={isOpen}
  onCancel={onClose}
  title="파일 삭제"
  destroyOnClose
  footer={[
    <Button key="cancel" onClick={onClose}>
      취소
    </Button>,
    <Button key="delete" type="primary" danger onClick={handleDelete}>
      삭제
    </Button>,
  ]}
>
  <p>이 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
</Modal>`,
        },
        notes: [
          'Ant Design Modal은 포커스 트랩을 기본 지원합니다.',
          'focusTriggerAfterClose prop으로 닫힘 후 포커스 복원 동작을 제어합니다.',
          'Modal.confirm()은 자동으로 접근성 속성을 적용합니다.',
        ],
      },
    },
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
          { id: 'tog-m4', title: '상태 변화 안내', description: '상태 변경 시 스크린리더에 변경 사항이 전달되어야 합니다.', level: 'must' },
        ],
        should: [
          { id: 'tog-s1', title: 'on/off 텍스트 제공', description: '색상 외에 텍스트(켜짐/꺼짐)로 상태를 표시하세요.', level: 'should' },
          { id: 'tog-s2', title: '터치 타겟 44×44px', description: '모바일에서 충분한 터치 영역을 확보하세요.', level: 'should' },
        ],
        avoid: [
          { id: 'tog-a1', title: '색상만으로 상태 구분 금지', description: '녹색/회색만으로 on/off를 나타내지 마세요. 색맹 사용자가 인식할 수 없습니다.', level: 'avoid' },
          { id: 'tog-a2', title: 'checkbox로 스위치 구현 금지', description: 'checkbox는 시각적으로 토글처럼 보여도 의미론적으로 다릅니다. role="switch"를 사용하세요.', level: 'avoid' },
        ],
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
</button>`,
      },
    },
    designSystems: {
      material: {
        id: 'material',
        name: 'Material Design (MUI)',
        color: '#1976d2',
        additionalChecks: [
          { id: 'tog-mui-1', title: 'FormControlLabel 연결', description: 'MUI Switch는 FormControlLabel과 함께 사용해 레이블을 연결하세요.', level: 'must' },
          { id: 'tog-mui-2', title: 'inputProps aria-label 추가', description: 'FormControlLabel 없이 단독 사용 시 inputProps에 aria-label을 추가하세요.', level: 'must' },
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
/>`,
        },
        notes: [
          'MUI Switch는 내부적으로 <input type="checkbox">를 사용합니다.',
          'role="switch"는 자동으로 적용되지 않으므로 inputProps로 추가하세요.',
          'color prop 변경 시 대비율을 재검증하세요.',
        ],
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          { id: 'tog-radix-1', title: 'Switch.Thumb 시각적 표시', description: 'Switch.Thumb은 aria-hidden으로 처리되며 시각적 표시만 담당합니다. 충분한 색상 대비를 유지하세요.', level: 'should' },
          { id: 'tog-radix-2', title: 'onCheckedChange 상태 관리', description: 'controlled 모드에서 checked prop과 onCheckedChange를 함께 사용하세요.', level: 'must' },
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
</div>`,
        },
        notes: [
          'Radix Switch는 role="switch"와 aria-checked를 자동으로 관리합니다.',
          'Switch.Root에 연결된 label은 htmlFor/id로 연결하세요.',
          'Thumb은 자동으로 aria-hidden 처리됩니다.',
        ],
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          { id: 'tog-antd-1', title: 'checkedChildren 텍스트 제공', description: 'checkedChildren과 unCheckedChildren으로 on/off 상태를 텍스트로 표시하세요.', level: 'should' },
          { id: 'tog-antd-2', title: 'aria-label 추가', description: 'Ant Design Switch에 aria-label을 직접 추가해 목적을 명시하세요.', level: 'must' },
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
</div>`,
        },
        notes: [
          'Ant Design Switch는 내부적으로 role="switch"를 사용합니다.',
          'checkedChildren/unCheckedChildren으로 상태를 텍스트로 나타내면 색맹 사용자에게 유용합니다.',
          'loading prop 사용 시 aria-busy를 함께 설정하세요.',
        ],
      },
    },
  },
]

export function getPattern(slug: string): Pattern | undefined {
  return patterns.find((p) => p.slug === slug)
}
