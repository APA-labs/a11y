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

const cn = (...c: string[]) => c.filter(Boolean).join(' ')

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  isLoading?: boolean
  children?: React.ReactNode
}

function Button({ asChild, isLoading, children, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
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

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif', fontSize: '14px' }}>
      <Button isLoading={isLoading} onClick={() => setIsLoading(!isLoading)}>
        {isLoading ? '저장 중...' : '저장'}
      </Button>
    </div>
  )
}`
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
      },
      shadcn: {
        id: 'shadcn',
        name: 'shadcn/ui',
        color: '#18181b',
        additionalChecks: [
          {
            id: 'btn-shadcn-1',
            title: 'asChild로 시맨틱 유지',
            description:
              'shadcn Button에 asChild prop을 사용하면 Link 컴포넌트와 조합할 수 있습니다. 이때 button이 아닌 a 요소로 렌더링되므로 역할이 올바른지 확인하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'shadcn/ui Button',
          code: `import { Button } from '@/components/ui/button'

// 기본 버튼
<Button onClick={() => {}}>저장</Button>

// 로딩 상태
<Button disabled={isLoading} aria-busy={isLoading}>
  {isLoading ? '저장 중...' : '저장'}
</Button>

// 아이콘 전용 버튼
<Button size="icon" aria-label="설정">
  <Settings className="h-4 w-4" aria-hidden />
</Button>`
        },
        notes: [
          'shadcn/ui Button은 Radix UI Slot을 기반으로 하며 내부적으로 <button>을 렌더링합니다.',
          'variant와 size prop으로 시각적 스타일을 지정하세요.',
          '아이콘 전용 버튼에는 반드시 aria-label을 추가하세요.'
        ]
      },
      chakra: {
        id: 'chakra',
        name: 'Chakra UI',
        color: '#319795',
        additionalChecks: [
          {
            id: 'btn-chakra-1',
            title: 'isLoading 시 loadingText 제공',
            description: 'Chakra Button의 isLoading prop 사용 시 loadingText로 스크린리더에 의미 있는 메시지를 전달하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Chakra UI Button',
          code: `import { Button } from '@chakra-ui/react'

function ButtonDemo() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button
      colorScheme="blue"
      isLoading={isLoading}
      loadingText="저장 중"
      onClick={() => setIsLoading(true)}
    >
      저장
    </Button>
  );
}`
        },
        notes: [
          'Chakra Button은 내부적으로 <button> 요소를 사용합니다.',
          'isLoading prop이 true일 때 버튼이 자동으로 disabled 처리됩니다.',
          'loadingText를 설정하면 스피너와 함께 텍스트가 표시됩니다.'
        ]
      },
      spectrum: {
        id: 'spectrum',
        name: 'React Spectrum',
        color: '#e03',
        additionalChecks: [],
        codeSample: {
          language: 'tsx',
          label: 'React Spectrum Button',
          code: `import { Button } from '@adobe/react-spectrum'

function ButtonDemo() {
  return (
    <Button variant="cta" onPress={() => {}}>
      저장
    </Button>
  );
}`
        },
        notes: [
          'React Spectrum Button은 onPress를 사용합니다 (onClick 대신).',
          'variant로 cta, primary, secondary, negative를 지정할 수 있습니다.',
          '키보드, 마우스, 터치 모두 자동으로 처리됩니다.'
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
      },
      shadcn: {
        id: 'shadcn',
        name: 'shadcn/ui',
        color: '#18181b',
        additionalChecks: [
          {
            id: 'inp-shadcn-1',
            title: 'Label 컴포넌트 연결',
            description: 'shadcn Label의 htmlFor와 Input의 id를 반드시 연결하세요. placeholder만으로는 접근성이 부족합니다.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'shadcn/ui Input',
          code: `import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<div className="grid gap-1.5">
  <Label htmlFor="email">이메일</Label>
  <Input
    id="email"
    type="email"
    required
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby={hasError ? 'email-error' : undefined}
    autoComplete="email"
    placeholder="user@example.com"
  />
  {hasError && (
    <p id="email-error" className="text-sm text-destructive" role="alert">
      올바른 이메일 형식을 입력해주세요.
    </p>
  )}
</div>`
        },
        notes: [
          'shadcn Input은 기본 HTML input 요소로 aria 속성을 직접 추가해야 합니다.',
          'Label 컴포넌트와 htmlFor/id로 연결하세요.',
          "오류 메시지는 role='alert'와 aria-describedby로 연결하세요."
        ]
      },
      chakra: {
        id: 'chakra',
        name: 'Chakra UI',
        color: '#319795',
        additionalChecks: [
          {
            id: 'inp-chakra-1',
            title: 'Field.Root의 invalid/required 전파',
            description: 'Field.Root에 invalid, required prop을 전달하면 하위 Input에 aria 속성이 자동 적용됩니다.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Chakra UI Field',
          code: `import { Field, Input } from '@chakra-ui/react'

<Field.Root required invalid={hasError}>
  <Field.Label>
    이메일 <Field.RequiredIndicator />
  </Field.Label>
  <Input
    type="email"
    autoComplete="email"
    placeholder="user@example.com"
  />
  {hasError && <Field.ErrorText>올바른 이메일 형식을 입력해주세요.</Field.ErrorText>}
  <Field.HelperText>예: user@example.com</Field.HelperText>
</Field.Root>`
        },
        notes: [
          'Chakra Field.Root의 invalid prop이 Input에 aria-invalid를 자동 설정합니다.',
          'Field.ErrorText는 aria-live로 오류를 스크린리더에 전달합니다.',
          'required prop은 Field.RequiredIndicator와 aria-required 모두 처리합니다.'
        ]
      },
      spectrum: {
        id: 'spectrum',
        name: 'React Spectrum',
        color: '#e03',
        additionalChecks: [
          {
            id: 'inp-spectrum-1',
            title: 'isRequired/isInvalid 사용',
            description: 'React Aria TextField는 isRequired, isInvalid, errorMessage로 자동으로 aria 속성을 관리합니다.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'React Aria TextField',
          code: `import { TextField } from 'react-aria-components'

<TextField
  type="email"
  label="이메일"
  isRequired
  isInvalid={hasError}
  autoComplete="email"
  errorMessage="올바른 이메일 형식을 입력해주세요."
  description="예: user@example.com"
/>`
        },
        notes: [
          'React Aria TextField는 label, error, description의 aria 연결을 모두 자동 처리합니다.',
          'isRequired prop이 true면 화면에 표시와 aria-required 모두 적용됩니다.',
          'errorMessage는 aria-describedby로 자동 연결됩니다.'
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
  const triggerRef = useRef<HTMLButtonElement>(null)

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
      },
      shadcn: {
        id: 'shadcn',
        name: 'shadcn/ui',
        color: '#18181b',
        additionalChecks: [
          {
            id: 'modal-shadcn-1',
            title: 'DialogDescription 필수 제공',
            description: 'DialogDescription은 aria-describedby로 자동 연결됩니다. 내용을 생략하면 스크린리더 사용자가 컨텍스트를 잃습니다.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'shadcn/ui Dialog',
          code: `import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">파일 삭제</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>파일 삭제</DialogTitle>
      <DialogDescription>
        이 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
      </DialogDescription>
    </DialogHeader>
    <div className="flex justify-end gap-2">
      <Button variant="outline">취소</Button>
      <Button variant="destructive">삭제</Button>
    </div>
  </DialogContent>
</Dialog>`
        },
        notes: [
          'shadcn Dialog는 Radix UI 기반으로 포커스 트랩, ESC 닫기, 포커스 복원을 자동 처리합니다.',
          'DialogTitle은 aria-labelledby로 자동 연결됩니다.',
          'showCloseButton={false} 사용 시 대체 닫기 수단을 반드시 제공하세요.'
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
    <Button variant="outline">파일 삭제</Button>
  </Dialog.Trigger>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>파일 삭제</Dialog.Title>
        <Dialog.CloseTrigger asChild>
          <Button variant="ghost" size="sm" aria-label="닫기">✕</Button>
        </Dialog.CloseTrigger>
      </Dialog.Header>
      <Dialog.Body>
        <Dialog.Description>
          이 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </Dialog.Description>
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.ActionTrigger asChild>
          <Button variant="outline">취소</Button>
        </Dialog.ActionTrigger>
        <Button colorPalette="red">삭제</Button>
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

<DialogTrigger>
  <Button>파일 삭제</Button>
  <Modal isDismissable>
    <Dialog>
      {({ close }) => (
        <>
          <Heading slot="title">파일 삭제</Heading>
          <p>이 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button onPress={close}>취소</Button>
            <Button onPress={close}>삭제</Button>
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
  className={'relative inline-flex h-6 w-11 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 ' + (isEnabled ? 'bg-blue-600' : 'bg-gray-300')}
>
  <span className="sr-only">{isEnabled ? '켜짐' : '꺼짐'}</span>
  <span
    aria-hidden
    className={'inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ' + (isEnabled ? 'translate-x-5' : 'translate-x-0')}
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
    className={'w-11 h-6 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 ' + (isEnabled ? 'bg-blue-600' : 'bg-gray-200')}
  >
    <Switch.Thumb
      className={'block w-5 h-5 bg-white rounded-full shadow transition-transform ' + (isEnabled ? 'translate-x-5' : 'translate-x-0')}
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
      },
      shadcn: {
        id: 'shadcn',
        name: 'shadcn/ui',
        color: '#18181b',
        additionalChecks: [
          {
            id: 'tog-shadcn-1',
            title: 'Label 연결 필수',
            description: 'shadcn Switch에 Label을 htmlFor/id로 연결하거나 aria-label을 직접 제공하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'shadcn/ui Switch',
          code: `import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

<div className="flex items-center gap-2">
  <Switch
    id="notifications"
    checked={isEnabled}
    onCheckedChange={setIsEnabled}
  />
  <Label htmlFor="notifications">알림 설정</Label>
</div>`
        },
        notes: [
          "shadcn Switch는 Radix UI 기반으로 role='switch'와 aria-checked를 자동 관리합니다.",
          'onCheckedChange 콜백으로 상태를 제어하세요.',
          'Label 컴포넌트와 함께 사용하면 클릭 영역이 확장됩니다.'
        ]
      },
      chakra: {
        id: 'chakra',
        name: 'Chakra UI',
        color: '#319795',
        additionalChecks: [
          {
            id: 'tog-chakra-1',
            title: 'Switch.Label 사용',
            description: 'Switch.Label을 사용하면 label과 input이 자동 연결됩니다. 별도 htmlFor 불필요합니다.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Chakra UI Switch',
          code: `import { Switch } from '@chakra-ui/react'

<Switch.Root
  checked={isEnabled}
  onCheckedChange={(e) => setIsEnabled(e.checked)}
>
  <Switch.HiddenInput />
  <Switch.Control>
    <Switch.Thumb />
  </Switch.Control>
  <Switch.Label>알림 설정</Switch.Label>
</Switch.Root>`
        },
        notes: [
          "Chakra Switch.Root는 role='switch'와 aria-checked를 자동 설정합니다.",
          'Switch.HiddenInput은 폼 제출에 필요한 실제 input 요소입니다.',
          'onCheckedChange 이벤트의 checked 값으로 상태를 업데이트하세요.'
        ]
      },
      spectrum: {
        id: 'spectrum',
        name: 'React Spectrum',
        color: '#e03',
        additionalChecks: [],
        codeSample: {
          language: 'tsx',
          label: 'React Aria Switch',
          code: `import { Switch } from 'react-aria-components'

<Switch
  isSelected={isEnabled}
  onChange={setIsEnabled}
>
  알림 설정
</Switch>`
        },
        notes: [
          "React Aria Switch는 role='switch', aria-checked, 키보드 지원을 모두 자동 처리합니다.",
          'children으로 레이블 텍스트를 직접 제공하세요.',
          'isSelected/onChange로 제어 컴포넌트로 사용 가능합니다.'
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
      },
      shadcn: {
        id: 'shadcn',
        name: 'shadcn/ui',
        color: '#18181b',
        additionalChecks: [
          {
            id: 'disc-shadcn-1',
            title: 'CollapsibleTrigger aria 관리',
            description: 'CollapsibleTrigger는 aria-expanded를 자동 관리합니다. asChild 패턴 사용 시에도 button 요소를 유지하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'shadcn/ui Collapsible',
          code: `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <CollapsibleTrigger asChild>
    <Button variant="ghost">
      시스템 요구사항 {isOpen ? '▲' : '▼'}
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p>운영체제: Windows 10 이상, macOS 10.15 이상</p>
  </CollapsibleContent>
</Collapsible>`
        },
        notes: [
          'shadcn Collapsible은 Radix UI 기반으로 aria-expanded를 자동 관리합니다.',
          'open/onOpenChange로 제어 컴포넌트로 사용 가능합니다.',
          'CollapsibleTrigger에 asChild를 사용해 시맨틱 button을 유지하세요.'
        ]
      },
      spectrum: {
        id: 'spectrum',
        name: 'React Spectrum',
        color: '#e03',
        additionalChecks: [],
        codeSample: {
          language: 'tsx',
          label: 'React Aria Disclosure',
          code: `import { Disclosure, DisclosureHeader, DisclosurePanel, Button } from 'react-aria-components'

<Disclosure>
  <DisclosureHeader>
    <Button slot="trigger">시스템 요구사항</Button>
  </DisclosureHeader>
  <DisclosurePanel>
    운영체제: Windows 10 이상, macOS 10.15 이상
  </DisclosurePanel>
</Disclosure>`
        },
        notes: [
          'React Aria Disclosure는 WAI-ARIA Disclosure 패턴을 완전히 구현합니다.',
          "DisclosureHeader의 Button에 slot='trigger'를 반드시 지정하세요.",
          'defaultExpanded prop으로 초기 열림 상태를 설정할 수 있습니다.'
        ]
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
      },
      shadcn: {
        id: 'shadcn',
        name: 'shadcn/ui',
        color: '#18181b',
        additionalChecks: [
          {
            id: 'tabs-shadcn-1',
            title: 'TabsList aria-label 제공',
            description: 'TabsList에 aria-label을 추가해 탭 그룹의 목적을 스크린리더에 전달하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'shadcn/ui Tabs',
          code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

<Tabs defaultValue="account">
  <TabsList aria-label="계정 설정">
    <TabsTrigger value="account">계정</TabsTrigger>
    <TabsTrigger value="password">비밀번호</TabsTrigger>
  </TabsList>
  <TabsContent value="account">계정 설정 내용</TabsContent>
  <TabsContent value="password">비밀번호 변경 내용</TabsContent>
</Tabs>`
        },
        notes: [
          'shadcn Tabs는 Radix UI 기반으로 WAI-ARIA Tabs 패턴을 자동 구현합니다.',
          '방향키로 탭 전환, Home/End로 첫/마지막 탭으로 이동이 자동 지원됩니다.',
          'TabsList에 aria-label을 추가해 탭 그룹의 목적을 명시하세요.'
        ]
      },
      chakra: {
        id: 'chakra',
        name: 'Chakra UI',
        color: '#319795',
        additionalChecks: [
          {
            id: 'tabs-chakra-1',
            title: 'Tabs.List aria-label 제공',
            description: 'Tabs.List에 aria-label을 추가해 탭 그룹의 목적을 스크린리더에 전달하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Chakra UI Tabs',
          code: `import { Tabs } from '@chakra-ui/react'

<Tabs.Root defaultValue="account">
  <Tabs.List aria-label="계정 설정">
    <Tabs.Trigger value="account">계정</Tabs.Trigger>
    <Tabs.Trigger value="password">비밀번호</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content value="account">계정 설정 내용</Tabs.Content>
  <Tabs.Content value="password">비밀번호 변경 내용</Tabs.Content>
</Tabs.Root>`
        },
        notes: [
          'Chakra Tabs.Root는 키보드 네비게이션과 aria 속성을 자동 처리합니다.',
          'lazyMount prop으로 비활성 탭 콘텐츠를 지연 렌더링할 수 있습니다.',
          'Tabs.Indicator는 시각적 활성 표시로 aria-hidden 처리됩니다.'
        ]
      },
      spectrum: {
        id: 'spectrum',
        name: 'React Spectrum',
        color: '#e03',
        additionalChecks: [],
        codeSample: {
          language: 'tsx',
          label: 'React Aria Tabs',
          code: `import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'react-aria-components'

<Tabs>
  <TabList aria-label="계정 설정">
    <Tab id="account">계정</Tab>
    <Tab id="password">비밀번호</Tab>
  </TabList>
  <TabPanels>
    <TabPanel id="account">계정 설정 내용</TabPanel>
    <TabPanel id="password">비밀번호 변경 내용</TabPanel>
  </TabPanels>
</Tabs>`
        },
        notes: [
          'React Aria Tabs는 방향키, Home, End 키보드 네비게이션을 자동 구현합니다.',
          '각 Tab의 id가 대응하는 TabPanel의 id와 자동으로 연결됩니다.',
          "keyboardActivation='manual'로 포커스와 활성화를 분리할 수 있습니다."
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
      },
      shadcn: {
        id: 'shadcn',
        name: 'shadcn/ui',
        color: '#18181b',
        additionalChecks: [
          {
            id: 'tip-shadcn-1',
            title: '트리거 요소 aria-label',
            description: '아이콘 전용 버튼에 tooltip을 연결할 때 트리거 요소에 aria-label을 반드시 제공하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'shadcn/ui Tooltip',
          code: `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline" size="icon" aria-label="설정">
        ⚙️
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>설정 열기</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`
        },
        notes: [
          'shadcn Tooltip은 Radix UI 기반으로 hover/focus 시 자동 표시됩니다.',
          'TooltipProvider를 앱 루트에 설치해 일관된 딜레이를 설정하세요.',
          '아이콘 전용 트리거에는 aria-label을 반드시 추가하세요.'
        ]
      },
      chakra: {
        id: 'chakra',
        name: 'Chakra UI',
        color: '#319795',
        additionalChecks: [
          {
            id: 'tip-chakra-1',
            title: '트리거 요소 aria-label',
            description: '아이콘 전용 버튼에 tooltip을 사용할 때 트리거에 aria-label을 추가하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Chakra UI Tooltip',
          code: `import { Tooltip, Button } from '@chakra-ui/react'

<Tooltip content="설정 열기">
  <Button variant="outline" size="sm" aria-label="설정">
    ⚙️
  </Button>
</Tooltip>`
        },
        notes: [
          'Chakra Tooltip은 hover/focus 이벤트를 자동으로 처리합니다.',
          'showDelay/closeDelay prop으로 표시 타이밍을 조절하세요.',
          'content prop에 설명 텍스트를 제공하세요.'
        ]
      },
      spectrum: {
        id: 'spectrum',
        name: 'React Spectrum',
        color: '#e03',
        additionalChecks: [],
        codeSample: {
          language: 'tsx',
          label: 'React Aria Tooltip',
          code: `import { TooltipTrigger, Tooltip, Button } from 'react-aria-components'

<TooltipTrigger delay={500}>
  <Button aria-label="설정">⚙️</Button>
  <Tooltip>설정 열기</Tooltip>
</TooltipTrigger>`
        },
        notes: [
          'React Aria TooltipTrigger는 hover, focus, keyboard를 모두 처리합니다.',
          'delay prop으로 표시 딜레이를 설정하세요 (기본 1200ms).',
          'Tooltip은 자동으로 aria-describedby로 트리거에 연결됩니다.'
        ]
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
      },
      shadcn: {
        id: 'shadcn',
        name: 'shadcn/ui',
        color: '#18181b',
        additionalChecks: [
          {
            id: 'acc-shadcn-1',
            title: 'type="multiple" 시 aria 검증',
            description: 'type="multiple"로 여러 항목을 동시 열 때 각 AccordionTrigger의 aria-expanded가 올바르게 관리되는지 확인하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'shadcn/ui Accordion',
          code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>배송 정보</AccordionTrigger>
    <AccordionContent>
      주문 후 2-3 영업일 내 배송됩니다.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>반품 정책</AccordionTrigger>
    <AccordionContent>
      수령 후 7일 이내 반품 가능합니다.
    </AccordionContent>
  </AccordionItem>
</Accordion>`
        },
        notes: [
          'shadcn Accordion은 Radix UI 기반으로 aria-expanded, aria-controls를 자동 관리합니다.',
          "type='single'|'multiple'로 단일/다중 열기를 제어하세요.",
          'AccordionTrigger는 방향키 네비게이션을 자동 지원합니다.'
        ]
      },
      chakra: {
        id: 'chakra',
        name: 'Chakra UI',
        color: '#319795',
        additionalChecks: [
          {
            id: 'acc-chakra-1',
            title: 'multiple 모드 지원',
            description: 'Accordion.Root에 multiple prop을 추가하면 여러 항목을 동시에 열 수 있습니다. 이때도 aria-expanded가 정확히 관리됩니다.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Chakra UI Accordion',
          code: `import { Accordion } from '@chakra-ui/react'

<Accordion.Root collapsible defaultValue={['item-1']}>
  <Accordion.Item value="item-1">
    <Accordion.ItemTrigger>
      배송 정보
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>
        주문 후 2-3 영업일 내 배송됩니다.
      </Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.ItemTrigger>
      반품 정책
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>
        수령 후 7일 이내 반품 가능합니다.
      </Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>`
        },
        notes: [
          'Chakra Accordion.Root는 키보드 네비게이션과 aria 속성을 자동 처리합니다.',
          'ItemIndicator는 시각적 화살표로 aria-hidden 처리됩니다.',
          'collapsible prop으로 모든 항목을 닫을 수 있는 옵션을 추가하세요.'
        ]
      },
      spectrum: {
        id: 'spectrum',
        name: 'React Spectrum',
        color: '#e03',
        additionalChecks: [],
        codeSample: {
          language: 'tsx',
          label: 'React Aria DisclosureGroup',
          code: `import {
  DisclosureGroup,
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
  Button
} from 'react-aria-components'

<DisclosureGroup defaultExpandedKeys={['delivery']}>
  <Disclosure id="delivery">
    <DisclosureHeader>
      <Button slot="trigger">배송 정보</Button>
    </DisclosureHeader>
    <DisclosurePanel>
      주문 후 2-3 영업일 내 배송됩니다.
    </DisclosurePanel>
  </Disclosure>
  <Disclosure id="returns">
    <DisclosureHeader>
      <Button slot="trigger">반품 정책</Button>
    </DisclosureHeader>
    <DisclosurePanel>
      수령 후 7일 이내 반품 가능합니다.
    </DisclosurePanel>
  </Disclosure>
</DisclosureGroup>`
        },
        notes: [
          'React Aria DisclosureGroup은 WAI-ARIA Accordion 패턴을 구현합니다.',
          'defaultExpandedKeys/expandedKeys로 초기/제어 열기 상태를 설정하세요.',
          'allowsMultipleExpanded prop으로 여러 항목 동시 열기를 허용하세요.'
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
      },
      chakra: {
        id: 'chakra',
        name: 'Chakra UI',
        color: '#319795',
        additionalChecks: [
          {
            id: 'cmb-chakra-1',
            title: 'ClearTrigger와 Trigger에 aria-label 제공',
            description: '아이콘만 있는 컨트롤 버튼에 aria-label을 추가하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Chakra UI Combobox',
          code: `import { Combobox, useListCollection } from '@chakra-ui/react'

const frameworks = ['React', 'Vue', 'Angular', 'Svelte'].map(f => ({ label: f, value: f.toLowerCase() }))

export default function App() {
  const { collection } = useListCollection({ initialItems: frameworks })
  return (
    <Combobox.Root collection={collection} placeholder="프레임워크 선택">
      <Combobox.Label>프레임워크</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger aria-label="선택 초기화" />
          <Combobox.Trigger aria-label="목록 열기" />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.Empty>결과 없음</Combobox.Empty>
          {collection.items.map((item) => (
            <Combobox.Item key={item.value} item={item}>
              {item.label}
              <Combobox.ItemIndicator />
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  )
}`
        },
        notes: [
          'Chakra Combobox.Root는 WAI-ARIA Combobox 패턴을 완전히 구현합니다.',
          'useListCollection으로 아이템 컬렉션을 관리하세요.',
          'Combobox.Empty는 검색 결과 없음 상태를 접근성 있게 처리합니다.'
        ]
      },
      spectrum: {
        id: 'spectrum',
        name: 'React Spectrum',
        color: '#e03',
        additionalChecks: [],
        codeSample: {
          language: 'tsx',
          label: 'React Aria ComboBox',
          code: `import { ComboBox, ComboBoxItem } from 'react-aria-components'

export default function App() {
  return (
    <ComboBox label="프레임워크 선택">
      <ComboBoxItem id="react">React</ComboBoxItem>
      <ComboBoxItem id="vue">Vue</ComboBoxItem>
      <ComboBoxItem id="angular">Angular</ComboBoxItem>
      <ComboBoxItem id="svelte">Svelte</ComboBoxItem>
    </ComboBox>
  )
}`
        },
        notes: [
          'React Aria ComboBox는 자동완성, 키보드 네비게이션, aria를 완전히 자동 처리합니다.',
          'label prop으로 레이블을 설정하면 자동으로 aria-label이 연결됩니다.',
          'allowsCustomValue prop으로 직접 입력 허용 여부를 제어할 수 있습니다.'
        ]
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
        code: `import { useState } from 'react'

export function Checkbox({
  id = 'cb-example',
  label = '레이블',
  indeterminate = false,
}: {
  id?: string
  label?: string
  indeterminate?: boolean
}) {
  const [checked, setChecked] = useState(false)
  return (
    <label htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        ref={(el) => { if (el) el.indeterminate = indeterminate }}
        onChange={(e) => setChecked(e.target.checked)}
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
  },
  {
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
  const [alerts, setAlerts] = useState([]);

  const addAlert = (message, type = 'info') => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeAlert(id), 5000);
  };

  const removeAlert = (id) => setAlerts(prev => prev.filter(a => a.id !== id));

  return (
    <div>
      <button onClick={() => addAlert('저장되었습니다.', 'success')}>저장</button>

      {/* 스크린리더 라이브 영역 (시각적으로 숨김) */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {alerts.map(a => a.message).join('. ')}
      </div>

      {/* 시각적 토스트 */}
      <div className="toast-container" aria-label="알림">
        {alerts.map(alert => (
          <div key={alert.id} role="alert" className={\`toast toast-\${alert.type}\`}>
            <span>{alert.message}</span>
            <button onClick={() => removeAlert(alert.id)} aria-label="알림 닫기">×</button>
          </div>
        ))}
      </div>
    </div>
  );
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
          code: `import { Snackbar, Alert } from '@mui/material';

<Snackbar
  open={isOpen}
  autoHideDuration={5000}
  onClose={() => setIsOpen(false)}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
>
  <Alert
    onClose={() => setIsOpen(false)}
    severity="success"
    variant="filled"
  >
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
          code: `import * as Toast from '@radix-ui/react-toast';

function ToastDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Toast.Provider swipeDirection="right">
      <button onClick={() => setOpen(true)}>저장</button>

      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        type="foreground"
        duration={5000}
      >
        <Toast.Title>저장 완료</Toast.Title>
        <Toast.Description>파일이 저장되었습니다.</Toast.Description>
        <Toast.Close aria-label="닫기">×</Toast.Close>
      </Toast.Root>

      <Toast.Viewport
        label="알림 목록. F8을 눌러 이동하세요."
        className="toast-viewport"
      />
    </Toast.Provider>
  );
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
          code: `import { Alert, Space } from 'antd';

{/* 인라인 Alert */}
<Alert
  message="저장 완료"
  description="파일이 성공적으로 저장되었습니다."
  type="success"
  showIcon
  closable
  onClose={() => {}}
/>

{/* 토스트형 - notification API */}
import { notification } from 'antd';

const openNotification = () => {
  notification.success({
    message: '저장 완료',
    description: '파일이 저장되었습니다.',
    duration: 5,
  });
};`
        },
        notes: [
          'Alert 컴포넌트의 showIcon prop은 severity 유형을 아이콘으로 자동 표시합니다.',
          'notification API는 duration을 0으로 설정하면 수동으로 닫기 전까지 유지됩니다.',
          'closable prop 사용 시 닫기 버튼이 자동으로 추가됩니다.'
        ]
      },
      shadcn: {
        id: 'shadcn',
        name: 'shadcn/ui',
        color: '#18181b',
        additionalChecks: [
          {
            id: 'alert-shadcn-1',
            title: 'role="alert" 명시적 추가',
            description: 'shadcn Alert는 role="alert"를 자동으로 추가하지 않습니다. 동적으로 표시되는 알림에는 role="alert"를 명시하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'shadcn/ui Alert',
          code: `import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

<Alert variant="destructive" role="alert">
  <AlertCircle className="h-4 w-4" aria-hidden />
  <AlertTitle>오류 발생</AlertTitle>
  <AlertDescription>
    서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.
  </AlertDescription>
</Alert>`
        },
        notes: [
          "shadcn Alert는 정적 알림 배너로 동적 알림에는 role='alert'를 추가하세요.",
          'variant prop으로 default, destructive 스타일을 선택하세요.',
          '아이콘은 aria-hidden 처리하세요.'
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

<Alert.Root status="error" role="alert">
  <Alert.Indicator aria-hidden />
  <Alert.Content>
    <Alert.Title>오류 발생</Alert.Title>
    <Alert.Description>
      서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.
    </Alert.Description>
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
  },
  {
    slug: 'select',
    name: 'Select (Listbox)',
    description: '목록에서 하나의 옵션을 선택하는 커스텀 드롭다운 컴포넌트',
    wcagCriteria: ['2.1.1 Keyboard', '4.1.2 Name, Role, Value'],
    tags: ['form', 'interactive', 'dropdown'],
    baseline: {
      checklist: {
        must: [
          {
            id: 'select-m1',
            title: 'role="listbox"와 role="option" 사용',
            description: '커스텀 select는 컨테이너에 role="listbox", 각 항목에 role="option"을 명시해야 합니다.',
            level: 'must'
          },
          {
            id: 'select-m2',
            title: '레이블 연결',
            description: '트리거 버튼에 aria-labelledby 또는 aria-label로 레이블을 연결해야 합니다.',
            level: 'must'
          },
          {
            id: 'select-m3',
            title: '키보드 내비게이션',
            description: 'ArrowUp/ArrowDown으로 옵션 이동, Enter/Space로 선택, Escape로 닫기를 지원해야 합니다.',
            level: 'must'
          },
          {
            id: 'select-m4',
            title: '선택 상태 표시',
            description: '선택된 옵션에 aria-selected="true"를 설정하고, 트리거에 aria-expanded로 열림/닫힘 상태를 표시해야 합니다.',
            level: 'must'
          },
          {
            id: 'select-m5',
            title: '포커스 관리',
            description: '팝업 열릴 때 선택된 옵션(없으면 첫 번째)으로 포커스 이동, 닫힐 때 트리거로 포커스 복귀해야 합니다.',
            level: 'must'
          }
        ],
        should: [
          {
            id: 'select-s1',
            title: '타입어헤드 지원',
            description: '키보드로 문자를 입력하면 해당 문자로 시작하는 옵션으로 포커스가 이동하도록 구현하세요.',
            level: 'should'
          },
          {
            id: 'select-s2',
            title: 'Home/End 키 지원',
            description: '5개 이상의 옵션이 있을 때 Home/End 키로 첫 번째/마지막 옵션으로 이동을 지원하세요.',
            level: 'should'
          },
          {
            id: 'select-s3',
            title: '그룹화에 role="group" 사용',
            description: '옵션이 그룹으로 나뉘는 경우 role="group"과 aria-label로 그룹을 구분하세요.',
            level: 'should'
          }
        ],
        avoid: [
          {
            id: 'select-a1',
            title: 'div/span으로만 구현',
            description: '시맨틱 없이 div/span만으로 드롭다운을 구현하면 스크린리더가 인식하지 못합니다. role 속성이 필수입니다.',
            level: 'avoid'
          },
          {
            id: 'select-a2',
            title: '탐색 중 자동 선택',
            description: 'ArrowKey 탐색 중에 자동으로 값이 변경되면 스크린리더 사용자가 원치 않는 선택이 발생합니다.',
            level: 'avoid'
          }
        ]
      },
      codeSample: {
        language: 'tsx',
        label: 'Baseline (React)',
        code: `function SelectDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) setIsOpen(true);
      setActiveIndex(i => Math.min(i + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isOpen) { setSelected(options[activeIndex]); setIsOpen(false); }
      else setIsOpen(true);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <label id="fruit-label">과일 선택</label>
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="fruit-label"
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected ?? '선택하세요'}
      </button>
      {isOpen && (
        <ul role="listbox" aria-labelledby="fruit-label" tabIndex={-1}>
          {options.map((opt, i) => (
            <li
              key={opt}
              role="option"
              aria-selected={selected === opt}
              onClick={() => { setSelected(opt); setIsOpen(false); }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
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
            id: 'select-mui-1',
            title: 'FormControl + InputLabel 조합 필수',
            description: 'MUI Select는 FormControl과 InputLabel을 함께 사용해야 올바른 레이블이 연결됩니다.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI Select',
          code: `import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

<FormControl fullWidth>
  <InputLabel id="fruit-label">과일 선택</InputLabel>
  <Select
    labelId="fruit-label"
    value={selected}
    label="과일 선택"
    onChange={(e) => setSelected(e.target.value)}
  >
    <MenuItem value="apple">Apple</MenuItem>
    <MenuItem value="banana">Banana</MenuItem>
    <MenuItem value="cherry">Cherry</MenuItem>
  </Select>
</FormControl>`
        },
        notes: [
          'labelId와 InputLabel의 id가 일치해야 스크린리더가 레이블을 읽습니다.',
          'native prop을 사용하면 브라우저 기본 <select>로 렌더링됩니다.',
          'disabled 옵션에는 aria-disabled가 자동으로 적용됩니다.'
        ]
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          {
            id: 'select-radix-1',
            title: 'Label 컴포넌트와 함께 사용',
            description: 'Radix Label 컴포넌트를 Select.Trigger와 연결해 스크린리더 레이블을 제공하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Radix Select',
          code: `import * as Select from '@radix-ui/react-select';
import * as Label from '@radix-ui/react-label';

<Label.Root htmlFor="fruit-trigger">과일 선택</Label.Root>
<Select.Root value={selected} onValueChange={setSelected}>
  <Select.Trigger id="fruit-trigger" aria-label="과일 선택">
    <Select.Value placeholder="선택하세요" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Content>
      <Select.Viewport>
        <Select.Item value="apple">
          <Select.ItemText>Apple</Select.ItemText>
        </Select.Item>
        <Select.Item value="banana">
          <Select.ItemText>Banana</Select.ItemText>
        </Select.Item>
      </Select.Viewport>
    </Select.Content>
  </Select.Portal>
</Select.Root>`
        },
        notes: [
          'Radix Select는 W3C ListBox 및 Select-Only Combobox 패턴을 준수합니다.',
          'Select.Item에 disabled prop을 추가하면 aria-disabled가 자동 적용됩니다.',
          'Select.Content의 position="popper"로 위치 조정이 가능합니다.'
        ]
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          {
            id: 'select-antd-1',
            title: '레이블 연결',
            description: 'Ant Design Select는 Form.Item 안에서 label prop으로 사용하거나 aria-label을 직접 지정하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design Select',
          code: `import { Select, Form } from 'antd';

<Form.Item label="과일 선택" name="fruit">
  <Select
    placeholder="선택하세요"
    options={[
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
    ]}
  />
</Form.Item>`
        },
        notes: [
          'Form.Item을 사용하면 label과 input이 htmlFor로 자동 연결됩니다.',
          'showSearch prop으로 검색 기능 추가 시 combobox 패턴으로 전환됩니다.',
          'virtual={false}로 가상 스크롤을 비활성화하면 스크린리더 호환성이 향상됩니다.'
        ]
      },
      shadcn: {
        id: 'shadcn',
        name: 'shadcn/ui',
        color: '#18181b',
        additionalChecks: [
          {
            id: 'sel-shadcn-1',
            title: 'SelectTrigger에 Label 연결',
            description: 'SelectTrigger의 id를 Label의 htmlFor와 연결하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'shadcn/ui Select',
          code: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

<div className="grid gap-1.5">
  <Label htmlFor="country">국가</Label>
  <Select value={value} onValueChange={setValue}>
    <SelectTrigger id="country" aria-label="국가 선택">
      <SelectValue placeholder="국가를 선택하세요" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="kr">대한민국</SelectItem>
      <SelectItem value="us">미국</SelectItem>
      <SelectItem value="jp">일본</SelectItem>
    </SelectContent>
  </Select>
</div>`
        },
        notes: [
          'shadcn Select는 Radix UI 기반으로 키보드 네비게이션과 aria를 자동 처리합니다.',
          'SelectTrigger와 Label을 id/htmlFor로 연결하세요.',
          'SelectValue의 placeholder는 시각적으로만 표시됩니다.'
        ]
      },
      chakra: {
        id: 'chakra',
        name: 'Chakra UI',
        color: '#319795',
        additionalChecks: [
          {
            id: 'sel-chakra-1',
            title: 'HiddenSelect 폼 접근성',
            description: 'Select.HiddenSelect는 폼 제출 시 네이티브 select로 동작합니다. name prop을 설정하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Chakra UI Select',
          code: `import { Select, useListCollection } from '@chakra-ui/react'

const countries = [
  { label: '대한민국', value: 'kr' },
  { label: '미국', value: 'us' },
  { label: '일본', value: 'jp' },
]

export default function App() {
  const { collection } = useListCollection({ initialItems: countries })
  return (
    <Select.Root collection={collection} value={[value]} onValueChange={(e) => setValue(e.value[0])}>
      <Select.Label>국가</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="국가를 선택하세요" />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {collection.items.map((item) => (
            <Select.Item key={item.value} item={item}>
              {item.label}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select.Root>
  )
}`
        },
        notes: [
          'Chakra Select.Root는 listbox 패턴으로 WAI-ARIA 요구사항을 충족합니다.',
          'Select.HiddenSelect는 폼 제출을 위한 네이티브 요소입니다.',
          'useListCollection으로 아이템 컬렉션을 관리하세요.'
        ]
      },
      spectrum: {
        id: 'spectrum',
        name: 'React Spectrum',
        color: '#e03',
        additionalChecks: [],
        codeSample: {
          language: 'tsx',
          label: 'React Aria Select',
          code: `import { Select, SelectItem } from 'react-aria-components'

<Select
  label="국가"
  placeholder="국가를 선택하세요"
  selectedKey={value}
  onSelectionChange={setValue}
>
  <SelectItem id="kr">대한민국</SelectItem>
  <SelectItem id="us">미국</SelectItem>
  <SelectItem id="jp">일본</SelectItem>
</Select>`
        },
        notes: [
          'React Aria Select는 listbox 패턴과 모든 키보드 상호작용을 자동 구현합니다.',
          'label prop으로 레이블을 설정하면 aria-labelledby가 자동 연결됩니다.',
          'selectedKey/onSelectionChange로 제어 컴포넌트로 사용하세요.'
        ]
      }
    }
  },
  {
    slug: 'breadcrumb',
    name: 'Breadcrumb',
    description: '현재 페이지의 계층적 위치를 나타내는 탐색 경로 컴포넌트',
    wcagCriteria: ['2.4.4 Link Purpose', '2.4.8 Location', '4.1.2 Name, Role, Value'],
    tags: ['navigation', 'landmark'],
    baseline: {
      checklist: {
        must: [
          {
            id: 'breadcrumb-m1',
            title: '<nav> 랜드마크 사용',
            description: '브레드크럼 전체를 <nav> 요소로 감싸고 aria-label="breadcrumb"로 레이블을 제공해야 합니다.',
            level: 'must'
          },
          {
            id: 'breadcrumb-m2',
            title: 'aria-current="page" 설정',
            description: '현재 페이지를 나타내는 항목에 aria-current="page"를 설정해야 합니다.',
            level: 'must'
          },
          {
            id: 'breadcrumb-m3',
            title: '<ol> 목록 사용',
            description: '브레드크럼 항목은 <ol>로 마크업해야 스크린리더가 항목 수와 순서를 인식합니다.',
            level: 'must'
          }
        ],
        should: [
          {
            id: 'breadcrumb-s1',
            title: '구분자를 aria-hidden으로 숨김',
            description: '/ 또는 > 구분자는 CSS content로 생성하거나 aria-hidden="true"로 스크린리더에서 숨기세요.',
            level: 'should'
          },
          {
            id: 'breadcrumb-s2',
            title: '마지막 항목은 링크 아닌 텍스트',
            description: '현재 페이지는 링크 대신 일반 텍스트로 표현하는 것이 더 명확합니다.',
            level: 'should'
          }
        ],
        avoid: [
          {
            id: 'breadcrumb-a1',
            title: 'div/span 나열로 구현',
            description: '목록 마크업 없이 div/span만 사용하면 스크린리더 사용자가 항목 수와 구조를 파악할 수 없습니다.',
            level: 'avoid'
          },
          {
            id: 'breadcrumb-a2',
            title: '구분자를 링크 텍스트에 포함',
            description: '"> Home > Products"처럼 구분자가 링크 텍스트에 포함되면 스크린리더가 구분자까지 읽습니다.',
            level: 'avoid'
          }
        ]
      },
      codeSample: {
        language: 'tsx',
        label: 'Baseline (HTML)',
        code: `<nav aria-label="breadcrumb">
  <ol className="flex items-center gap-2 text-sm">
    <li>
      <a href="/">홈</a>
    </li>
    <li aria-hidden="true">/</li>
    <li>
      <a href="/products">제품</a>
    </li>
    <li aria-hidden="true">/</li>
    <li>
      <a href="/products/shoes">신발</a>
    </li>
    <li aria-hidden="true">/</li>
    <li aria-current="page">운동화</li>
  </ol>
</nav>`
      }
    },
    designSystems: {
      material: {
        id: 'material',
        name: 'Material Design (MUI)',
        color: '#1976d2',
        additionalChecks: [
          {
            id: 'breadcrumb-mui-1',
            title: 'aria-label 직접 지정',
            description: 'MUI Breadcrumbs는 <nav> 역할을 하지만 aria-label을 자동으로 추가하지 않습니다. aria-label="breadcrumb"를 직접 추가하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI Breadcrumbs',
          code: `import { Breadcrumbs, Link, Typography } from '@mui/material';

<Breadcrumbs aria-label="breadcrumb">
  <Link href="/" underline="hover" color="inherit">
    홈
  </Link>
  <Link href="/products" underline="hover" color="inherit">
    제품
  </Link>
  <Link href="/products/shoes" underline="hover" color="inherit">
    신발
  </Link>
  <Typography color="text.primary" aria-current="page">
    운동화
  </Typography>
</Breadcrumbs>`
        },
        notes: [
          'MUI Breadcrumbs는 자동으로 구분자를 렌더링하며 aria-hidden이 적용됩니다.',
          'separator prop으로 구분자를 커스텀할 수 있습니다.',
          '마지막 항목은 Typography로 처리해 링크가 아닌 텍스트로 표현하세요.'
        ]
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          {
            id: 'breadcrumb-radix-1',
            title: '직접 구현 필요',
            description: 'Radix UI에는 전용 Breadcrumb 컴포넌트가 없습니다. <nav>, <ol>, aria-current를 직접 구현하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Radix (직접 구현)',
          code: `{/* Radix UI에 전용 컴포넌트 없음 — 시맨틱 HTML로 직접 구현 */}
<nav aria-label="breadcrumb">
  <ol className="flex items-center gap-1 text-sm">
    {items.map((item, i) => (
      <li key={item.href} className="flex items-center gap-1">
        {i < items.length - 1 ? (
          <>
            <a href={item.href}>{item.label}</a>
            <span aria-hidden="true">/</span>
          </>
        ) : (
          <span aria-current="page">{item.label}</span>
        )}
      </li>
    ))}
  </ol>
</nav>`
        },
        notes: [
          'Radix UI는 전용 Breadcrumb 컴포넌트를 제공하지 않습니다.',
          'shadcn/ui의 Breadcrumb 컴포넌트는 Radix 기반으로 접근성이 잘 구현되어 있습니다.',
          '구분자에 항상 aria-hidden을 추가하세요.'
        ]
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          {
            id: 'breadcrumb-antd-1',
            title: 'itemRender로 aria-current 추가',
            description: 'Ant Design Breadcrumb는 현재 페이지에 aria-current를 자동으로 추가하지 않습니다. itemRender prop으로 커스텀하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design Breadcrumb',
          code: `import { Breadcrumb } from 'antd';

<Breadcrumb
  aria-label="breadcrumb"
  items={[
    { title: <a href="/">홈</a> },
    { title: <a href="/products">제품</a> },
    { title: <a href="/products/shoes">신발</a> },
    { title: '운동화' },
  ]}
  itemRender={(item, params, items) => {
    const isLast = items.indexOf(item) === items.length - 1;
    return isLast
      ? <span aria-current="page">{item.title}</span>
      : item.title;
  }}
/>`
        },
        notes: [
          'Ant Design Breadcrumb에 aria-label 속성을 직접 추가해야 합니다.',
          'itemRender prop으로 마지막 항목에 aria-current="page"를 추가하세요.',
          'separator prop으로 구분자를 변경할 수 있으며, 기본 구분자는 aria-hidden이 적용됩니다.'
        ]
      }
    }
  },
  {
    slug: 'pagination',
    name: 'Pagination',
    description: '여러 페이지의 콘텐츠를 탐색하는 페이지 번호 컴포넌트',
    wcagCriteria: ['2.1.1 Keyboard', '2.4.4 Link Purpose', '4.1.2 Name, Role, Value'],
    tags: ['navigation', 'interactive'],
    baseline: {
      checklist: {
        must: [
          {
            id: 'pagination-m1',
            title: '<nav> 랜드마크와 aria-label',
            description: '페이지네이션을 <nav> 요소로 감싸고 aria-label="pagination" 또는 "페이지 탐색"으로 레이블을 제공해야 합니다.',
            level: 'must'
          },
          {
            id: 'pagination-m2',
            title: '각 버튼에 aria-label 제공',
            description: '"이전", "다음", "1페이지로 이동" 등 버튼의 목적을 설명하는 aria-label을 제공해야 합니다.',
            level: 'must'
          },
          {
            id: 'pagination-m3',
            title: 'aria-current="page" 설정',
            description: '현재 활성 페이지 버튼에 aria-current="page"를 설정해야 합니다.',
            level: 'must'
          },
          {
            id: 'pagination-m4',
            title: '비활성 버튼에 aria-disabled',
            description: '이전/다음 버튼이 비활성일 때 aria-disabled="true"로 표시하고 포커스는 유지하세요.',
            level: 'must'
          }
        ],
        should: [
          {
            id: 'pagination-s1',
            title: '총 페이지 수 안내',
            description: '스크린리더 사용자에게 "12페이지 중 3페이지"처럼 현재 위치 컨텍스트를 제공하세요.',
            level: 'should'
          },
          {
            id: 'pagination-s2',
            title: '페이지 변경 시 알림',
            description: '페이지 변경 후 새 콘텐츠가 로드되면 role="status"로 스크린리더에 변경 사항을 알리세요.',
            level: 'should'
          }
        ],
        avoid: [
          {
            id: 'pagination-a1',
            title: '숫자만 있는 버튼',
            description: '"3" 같은 숫자만 있는 버튼은 맥락 없이 읽힙니다. aria-label="3페이지로 이동"을 추가하세요.',
            level: 'avoid'
          },
          {
            id: 'pagination-a2',
            title: '비활성 버튼 포커스 완전 제거',
            description: 'disabled 버튼에서 포커스를 제거하면 키보드 사용자가 구조를 탐색할 수 없습니다.',
            level: 'avoid'
          }
        ]
      },
      codeSample: {
        language: 'tsx',
        label: 'Baseline (React)',
        code: `function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <nav aria-label="페이지 탐색">
      <ul className="flex gap-1">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="이전 페이지"
            aria-disabled={currentPage === 1}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              aria-label={\`\${page}페이지로 이동\`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="다음 페이지"
            aria-disabled={currentPage === totalPages}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </li>
      </ul>
      <div role="status" className="sr-only">
        {totalPages}페이지 중 {currentPage}페이지
      </div>
    </nav>
  );
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
            id: 'pagination-mui-1',
            title: 'getItemAriaLabel로 aria-label 커스텀',
            description: 'MUI Pagination의 기본 aria-label은 영어입니다. getItemAriaLabel prop으로 한국어 레이블을 제공하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI Pagination',
          code: `import { Pagination } from '@mui/material';

<Pagination
  count={10}
  page={currentPage}
  onChange={(_, page) => setCurrentPage(page)}
  getItemAriaLabel={(type, page, selected) => {
    if (type === 'page') return \`\${page}페이지로 이동\${selected ? ' (현재 페이지)' : ''}\`;
    if (type === 'first') return '첫 페이지로 이동';
    if (type === 'last') return '마지막 페이지로 이동';
    if (type === 'next') return '다음 페이지';
    if (type === 'previous') return '이전 페이지';
    return '';
  }}
/>`
        },
        notes: [
          'MUI Pagination은 자동으로 <nav role="navigation"> 랜드마크를 사용합니다.',
          '현재 페이지에 aria-current가 자동으로 적용됩니다.',
          'getItemAriaLabel로 모든 버튼의 aria-label을 한 번에 커스텀할 수 있습니다.'
        ]
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          {
            id: 'pagination-radix-1',
            title: '직접 구현 필요',
            description: 'Radix UI에는 Pagination 컴포넌트가 없습니다. 시맨틱 HTML과 ARIA를 직접 구현하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Radix (직접 구현)',
          code: `{/* Radix UI에 전용 컴포넌트 없음 — 시맨틱 HTML로 직접 구현 */}
<nav aria-label="페이지 탐색">
  <ul className="flex items-center gap-1">
    <li>
      <button
        onClick={() => onPageChange(page - 1)}
        aria-label="이전 페이지"
        disabled={page === 1}
        aria-disabled={page === 1}
      >
        ←
      </button>
    </li>
    {pages.map(p => (
      <li key={p}>
        <button
          onClick={() => onPageChange(p)}
          aria-label={\`\${p}페이지로 이동\`}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      </li>
    ))}
    <li>
      <button
        onClick={() => onPageChange(page + 1)}
        aria-label="다음 페이지"
        disabled={page === total}
        aria-disabled={page === total}
      >
        →
      </button>
    </li>
  </ul>
</nav>`
        },
        notes: [
          'Radix UI는 Pagination 컴포넌트를 제공하지 않습니다.',
          'shadcn/ui의 Pagination 컴포넌트는 접근성이 잘 구현된 좋은 참고 예시입니다.',
          '각 버튼에 aria-label을 반드시 추가하세요.'
        ]
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          {
            id: 'pagination-antd-1',
            title: 'locale로 한국어 aria-label 설정',
            description: 'Ant Design Pagination의 기본 aria-label은 영어입니다. locale prop이나 ConfigProvider로 한국어를 설정하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design Pagination',
          code: `import { Pagination, ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';

<ConfigProvider locale={koKR}>
  <Pagination
    current={currentPage}
    total={100}
    pageSize={10}
    onChange={(page) => setCurrentPage(page)}
    showSizeChanger={false}
  />
</ConfigProvider>`
        },
        notes: [
          'ConfigProvider의 locale을 koKR로 설정하면 aria-label이 한국어로 변경됩니다.',
          'Ant Design Pagination은 자동으로 <ul> 목록 구조를 사용합니다.',
          '현재 페이지에 aria-current가 자동으로 적용됩니다.'
        ]
      },
      shadcn: {
        id: 'shadcn',
        name: 'shadcn/ui',
        color: '#18181b',
        additionalChecks: [
          {
            id: 'pg-shadcn-1',
            title: 'aria-current="page" 추가',
            description: '현재 페이지 링크에 aria-current="page"를 추가하세요. isActive prop만으로는 부족합니다.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'shadcn/ui Pagination',
          code: `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" aria-label="이전 페이지" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" aria-label="1페이지">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive aria-current="page" aria-label="현재 페이지, 2페이지">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" aria-label="3페이지">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" aria-label="다음 페이지" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`
        },
        notes: [
          'shadcn Pagination은 nav 요소로 자동 렌더링됩니다.',
          "현재 페이지에 aria-current='page'를 명시적으로 추가하세요.",
          '이전/다음 버튼에 aria-label을 추가하세요.'
        ]
      },
      chakra: {
        id: 'chakra',
        name: 'Chakra UI',
        color: '#319795',
        additionalChecks: [
          {
            id: 'pg-chakra-1',
            title: '페이지 버튼 aria-label',
            description: '각 페이지 버튼에 aria-label을 추가해 스크린리더가 페이지 번호를 읽을 수 있게 하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Chakra UI Pagination',
          code: `import { Pagination } from '@chakra-ui/react'

<Pagination.Root count={50} pageSize={10} page={page} onPageChange={(e) => setPage(e.page)}>
  <Pagination.PrevTrigger aria-label="이전 페이지" />
  {[1, 2, 3, 4, 5].map((p) => (
    <Pagination.Item key={p} value={p}>
      <Pagination.Link aria-label={p + '페이지'} aria-current={p === page ? 'page' : undefined}>
        {p}
      </Pagination.Link>
    </Pagination.Item>
  ))}
  <Pagination.NextTrigger aria-label="다음 페이지" />
</Pagination.Root>`
        },
        notes: [
          'Chakra Pagination.Root는 페이지 상태를 자동 관리합니다.',
          'count와 pageSize로 총 페이지 수를 계산하세요.',
          '각 페이지 버튼에 aria-label을 추가해 접근성을 높이세요.'
        ]
      }
    }
  },
  {
    slug: 'navigation-menu',
    name: 'Navigation Menu',
    description: '드롭다운 하위 메뉴를 포함하는 사이트 내비게이션 컴포넌트',
    wcagCriteria: ['2.1.1 Keyboard', '2.4.1 Bypass Blocks', '4.1.2 Name, Role, Value'],
    tags: ['navigation', 'landmark', 'interactive'],
    baseline: {
      checklist: {
        must: [
          {
            id: 'nav-m1',
            title: '<nav> 랜드마크와 aria-label',
            description: '사이트 내비게이션은 <nav> 요소로 감싸고 aria-label로 레이블을 제공해야 합니다.',
            level: 'must'
          },
          {
            id: 'nav-m2',
            title: '하위 메뉴 트리거에 aria-expanded',
            description: '하위 메뉴를 여는 버튼에 aria-expanded로 열림/닫힘 상태를 표시해야 합니다.',
            level: 'must'
          },
          {
            id: 'nav-m3',
            title: '키보드 완전 지원',
            description: 'Tab으로 항목 이동, Enter/Space로 하위 메뉴 열기, Escape로 닫기, Arrow 키로 하위 항목 탐색을 지원해야 합니다.',
            level: 'must'
          },
          {
            id: 'nav-m4',
            title: 'aria-current="page" 설정',
            description: '현재 활성 페이지에 해당하는 링크에 aria-current="page"를 설정해야 합니다.',
            level: 'must'
          }
        ],
        should: [
          {
            id: 'nav-s1',
            title: 'aria-haspopup="menu" 추가',
            description: '하위 메뉴가 있는 트리거에 aria-haspopup="menu"를 추가하면 스크린리더가 서브메뉴 존재를 미리 알 수 있습니다.',
            level: 'should'
          },
          {
            id: 'nav-s2',
            title: 'Escape로 닫기',
            description: '열린 하위 메뉴를 Escape 키로 닫고 트리거로 포커스가 복귀해야 합니다.',
            level: 'should'
          },
          {
            id: 'nav-s3',
            title: '포커스 트랩 없이 자연스러운 흐름',
            description: '내비게이션 메뉴는 포커스 트랩 없이 Tab으로 메뉴 밖 이동 시 하위 메뉴가 닫혀야 합니다.',
            level: 'should'
          }
        ],
        avoid: [
          {
            id: 'nav-a1',
            title: 'hover로만 하위 메뉴 열기',
            description: 'hover 이벤트만으로 하위 메뉴를 열면 키보드 사용자가 접근할 수 없습니다.',
            level: 'avoid'
          },
          {
            id: 'nav-a2',
            title: '여러 <nav>에 동일한 레이블',
            description: '여러 <nav> 요소에 동일한 aria-label을 사용하면 스크린리더 사용자가 구분할 수 없습니다.',
            level: 'avoid'
          }
        ]
      },
      codeSample: {
        language: 'jsx',
        label: 'Baseline (React)',
        code: `function NavigationMenuDemo() {
  const [openMenu, setOpenMenu] = useState(null);
  const currentPath = '/about';
  const items = [
    { id: 'home', label: '홈', href: '/' },
    {
      id: 'about', label: '소개', href: '/about',
      children: [
        { id: 'team', label: '팀', href: '/about/team' },
        { id: 'history', label: '연혁', href: '/about/history' }
      ]
    },
    { id: 'contact', label: '문의', href: '/contact' }
  ];

  return (
    <nav aria-label="메인 내비게이션">
      <ul style={{ listStyle: 'none', display: 'flex', gap: '8px', padding: 0, margin: 0 }}>
        {items.map(item => (
          <li key={item.id}>
            {item.children ? (
              <>
                <button
                  aria-haspopup="menu"
                  aria-expanded={openMenu === item.id}
                  onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)}
                  onKeyDown={e => e.key === 'Escape' && setOpenMenu(null)}
                >
                  {item.label} ▾
                </button>
                {openMenu === item.id && (
                  <ul role="menu" style={{ listStyle: 'none', padding: '4px', margin: 0, border: '1px solid #ccc', borderRadius: '4px', position: 'absolute', background: 'white' }}>
                    {item.children.map(child => (
                      <li key={child.id} role="none">
                        <a
                          href={child.href}
                          role="menuitem"
                          aria-current={currentPath === child.href ? 'page' : undefined}
                          style={{ display: 'block', padding: '4px 8px', textDecoration: 'none', color: currentPath === child.href ? '#6d28d9' : 'inherit' }}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <a
                href={item.href}
                aria-current={currentPath === item.href ? 'page' : undefined}
                style={{ textDecoration: 'none', color: currentPath === item.href ? '#6d28d9' : 'inherit', fontWeight: currentPath === item.href ? 'bold' : 'normal' }}
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
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
            id: 'nav-mui-1',
            title: 'AppBar + Drawer 조합',
            description: 'MUI에서 내비게이션은 보통 AppBar + Drawer 조합으로 구현합니다. Drawer에 aria-label을 제공하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI AppBar Navigation',
          code: `import { AppBar, Toolbar, Button, Menu, MenuItem } from '@mui/material';

function NavigationMuiDemo() {
  const [anchorEl, setAnchorEl] = useState(null);
  const currentPath = '/';

  return (
    <AppBar position="static" component="header">
      <Toolbar component="nav" aria-label="메인 내비게이션">
        <Button
          color="inherit"
          href="/"
          aria-current={currentPath === '/' ? 'page' : undefined}
        >
          홈
        </Button>
        <Button
          color="inherit"
          aria-haspopup="menu"
          aria-expanded={Boolean(anchorEl)}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          제품
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem component="a" href="/products/all">전체 제품</MenuItem>
          <MenuItem component="a" href="/products/new">신규</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}`
        },
        notes: [
          'AppBar의 component="header"로 의미론적 마크업을 사용하세요.',
          'MUI Menu는 자동으로 포커스 관리와 키보드 내비게이션을 처리합니다.',
          '현재 페이지 링크에 aria-current를 직접 추가해야 합니다.'
        ]
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          {
            id: 'nav-radix-1',
            title: 'NavigationMenu.Indicator 사용',
            description: 'Radix NavigationMenu.Indicator로 현재 활성 항목을 시각적으로 강조할 수 있습니다.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Radix NavigationMenu',
          code: `import * as NavigationMenu from '@radix-ui/react-navigation-menu';

<NavigationMenu.Root aria-label="메인 내비게이션">
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/" aria-current="page">
        홈
      </NavigationMenu.Link>
    </NavigationMenu.Item>

    <NavigationMenu.Item>
      <NavigationMenu.Trigger>
        제품
        <span aria-hidden>▾</span>
      </NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <ul>
          <li>
            <NavigationMenu.Link href="/products/all">전체 제품</NavigationMenu.Link>
          </li>
          <li>
            <NavigationMenu.Link href="/products/new">신규</NavigationMenu.Link>
          </li>
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>

  <NavigationMenu.Viewport />
</NavigationMenu.Root>`
        },
        notes: [
          'Radix NavigationMenu는 WAI-ARIA disclosure navigation 패턴을 준수합니다.',
          'Space/Enter로 트리거 활성화, ArrowDown으로 콘텐츠 진입, Escape로 닫기가 기본 지원됩니다.',
          'NavigationMenu.Viewport는 애니메이션과 포커스 관리를 담당합니다.'
        ]
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          {
            id: 'nav-antd-1',
            title: 'aria-label 직접 추가',
            description: 'Ant Design Menu는 <ul> 역할을 하지만 aria-label을 자동으로 추가하지 않습니다. 감싸는 <nav>에 aria-label을 추가하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design Menu',
          code: `import { Menu } from 'antd';

const items = [
  { key: 'home', label: <a href="/">홈</a> },
  {
    key: 'products',
    label: '제품',
    children: [
      { key: 'all', label: <a href="/products/all">전체 제품</a> },
      { key: 'new', label: <a href="/products/new">신규</a> },
    ],
  },
];

<nav aria-label="메인 내비게이션">
  <Menu
    mode="horizontal"
    items={items}
    selectedKeys={[currentKey]}
  />
</nav>`
        },
        notes: [
          'Ant Design Menu를 <nav> 요소로 감싸고 aria-label을 추가하세요.',
          'mode="horizontal"은 수평 내비게이션, mode="inline"은 사이드바에 적합합니다.',
          'selectedKeys prop으로 현재 활성 항목을 표시하세요.'
        ]
      },
      shadcn: {
        id: 'shadcn',
        name: 'shadcn/ui',
        color: '#18181b',
        additionalChecks: [
          {
            id: 'nav-shadcn-1',
            title: 'NavigationMenu aria-label 제공',
            description: 'NavigationMenu에 aria-label을 추가해 내비게이션 랜드마크를 명시하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'shadcn/ui NavigationMenu',
          code: `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

<NavigationMenu aria-label="메인 내비게이션">
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>제품</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/products/web">웹 제품</NavigationMenuLink>
        <NavigationMenuLink href="/products/mobile">모바일 제품</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/about">회사 소개</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`
        },
        notes: [
          'shadcn NavigationMenu는 Radix UI 기반으로 ARIA 내비게이션 패턴을 자동 구현합니다.',
          'NavigationMenuTrigger는 aria-expanded와 aria-haspopup을 자동 관리합니다.',
          'aria-label로 내비게이션 랜드마크를 명시하세요.'
        ]
      },
      chakra: {
        id: 'chakra',
        name: 'Chakra UI',
        color: '#319795',
        additionalChecks: [
          {
            id: 'nav-chakra-1',
            title: 'nav 요소로 감싸기',
            description: 'Chakra Menu는 nav 역할이 없으므로 <nav aria-label>로 감싸 내비게이션 랜드마크를 제공하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Chakra UI Menu',
          code: `import { Menu, Button } from '@chakra-ui/react'

<nav aria-label="메인 내비게이션">
  <Menu.Root>
    <Menu.Trigger asChild>
      <Button variant="ghost">제품 ▾</Button>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="web">웹 제품</Menu.Item>
        <Menu.Item value="mobile">모바일 제품</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
</nav>`
        },
        notes: [
          'Chakra Menu는 드롭다운 메뉴 패턴을 구현합니다. 내비게이션으로 사용 시 <nav>로 감싸세요.',
          "Menu.Trigger는 aria-haspopup='menu'와 aria-expanded를 자동 관리합니다.",
          'Menu.Item에는 키보드 방향키 네비게이션이 자동 적용됩니다.'
        ]
      },
      spectrum: {
        id: 'spectrum',
        name: 'React Spectrum',
        color: '#e03',
        additionalChecks: [
          {
            id: 'nav-spectrum-1',
            title: 'nav 요소로 감싸기',
            description: 'MenuTrigger/Menu를 <nav aria-label>로 감싸 내비게이션 랜드마크를 제공하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'React Aria MenuTrigger',
          code: `import { MenuTrigger, Menu, MenuItem, Button } from 'react-aria-components'

<nav aria-label="메인 내비게이션">
  <MenuTrigger>
    <Button>제품</Button>
    <Menu onAction={() => {}}>
      <MenuItem id="web">웹 제품</MenuItem>
      <MenuItem id="mobile">모바일 제품</MenuItem>
    </Menu>
  </MenuTrigger>
</nav>`
        },
        notes: [
          'React Aria Menu/MenuTrigger는 WAI-ARIA Menu 패턴을 완전히 구현합니다.',
          '내비게이션으로 사용 시 <nav aria-label>로 감싸세요.',
          'onAction 콜백으로 메뉴 항목 선택 시 동작을 처리하세요.'
        ]
      }
    }
  },
  {
    slug: 'form-validation',
    name: 'Form Validation',
    description: '인라인 에러 메시지와 접근 가능한 유효성 검사를 포함한 폼 컴포넌트',
    wcagCriteria: ['1.3.1 Info and Relationships', '3.3.1 Error Identification', '3.3.2 Labels or Instructions', '3.3.3 Error Suggestion'],
    tags: ['form', 'interactive', 'validation'],
    baseline: {
      checklist: {
        must: [
          {
            id: 'form-m1',
            title: '에러 메시지를 aria-describedby로 연결',
            description:
              '입력 필드와 에러 메시지를 aria-describedby로 연결해야 합니다. 스크린리더가 필드에 포커스할 때 에러 내용을 자동으로 읽습니다.',
            level: 'must'
          },
          {
            id: 'form-m2',
            title: 'aria-invalid 설정',
            description: '유효성 검사에 실패한 필드에 aria-invalid="true"를 설정해야 합니다.',
            level: 'must'
          },
          {
            id: 'form-m3',
            title: 'aria-required 또는 required 설정',
            description: '필수 입력 필드에 required 또는 aria-required="true"를 설정해야 합니다. 별표(*)만으로는 충분하지 않습니다.',
            level: 'must'
          },
          {
            id: 'form-m4',
            title: '에러 발생 시 포커스 이동',
            description: '폼 제출 실패 시 첫 번째 에러 필드나 에러 요약 메시지로 포커스를 이동해야 합니다.',
            level: 'must'
          },
          {
            id: 'form-m5',
            title: '모든 입력에 레이블 연결',
            description: '모든 입력 필드에 <label>의 htmlFor 또는 aria-label/aria-labelledby로 레이블을 연결해야 합니다.',
            level: 'must'
          }
        ],
        should: [
          {
            id: 'form-s1',
            title: '구체적인 에러 메시지',
            description: '"잘못된 입력"보다 "이메일 주소 형식이 올바르지 않습니다"처럼 구체적인 에러 메시지를 제공하세요.',
            level: 'should'
          },
          {
            id: 'form-s2',
            title: '에러 요약 제공',
            description: '여러 에러가 있을 때 페이지 상단에 모든 에러를 나열한 요약을 role="alert"로 제공하세요.',
            level: 'should'
          },
          {
            id: 'form-s3',
            title: '입력 형식 힌트 제공',
            description: '날짜, 전화번호 등 특정 형식이 필요한 경우 aria-describedby로 형식 힌트를 제공하세요.',
            level: 'should'
          }
        ],
        avoid: [
          {
            id: 'form-a1',
            title: '색상만으로 에러 표시',
            description: '빨간 테두리만으로 에러를 표시하면 색맹 사용자가 인식하기 어렵습니다. 아이콘과 텍스트 메시지를 함께 제공하세요.',
            level: 'avoid'
          },
          {
            id: 'form-a2',
            title: '입력 중 실시간 에러 표시',
            description: '사용자가 입력 중에 실시간으로 에러를 표시하면 혼란을 줍니다. blur 이벤트 또는 제출 시점에 검증하세요.',
            level: 'avoid'
          },
          {
            id: 'form-a3',
            title: 'placeholder를 레이블로 사용',
            description: 'placeholder는 포커스 시 사라지므로 레이블 대용으로 사용하지 마세요.',
            level: 'avoid'
          }
        ]
      },
      codeSample: {
        language: 'tsx',
        label: 'Baseline (React)',
        code: `function FormWithValidation() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const errorId = 'email-error';

  const validate = () => {
    if (!email) return '이메일을 입력해주세요.';
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) return '올바른 이메일 형식이 아닙니다.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setError(err);
    if (err) document.getElementById('email-input')?.focus();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="email-input">
          이메일 <span aria-hidden>*</span>
        </label>
        <input
          id="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
        {error && (
          <p id={errorId} role="alert">{error}</p>
        )}
      </div>
      <button type="submit">제출</button>
    </form>
  );
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
            id: 'form-mui-1',
            title: 'helperText와 error prop 함께 사용',
            description: 'MUI TextField의 error prop과 helperText prop을 함께 사용하면 aria-invalid와 aria-describedby가 자동으로 연결됩니다.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI TextField with Validation',
          code: `import { TextField, Button } from '@mui/material';

function MuiForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('올바른 이메일 형식이 아닙니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <TextField
        label="이메일"
        type="email"
        required
        value={email}
        onChange={(e) => { setEmail(e.target.value); setError(''); }}
        error={!!error}
        helperText={error || '예: user@example.com'}
        inputProps={{ 'aria-required': true }}
      />
      <Button type="submit" variant="contained">제출</Button>
    </form>
  );
}`
        },
        notes: [
          'MUI TextField의 error prop은 자동으로 aria-invalid를 설정합니다.',
          'helperText는 FormHelperText로 렌더링되며 aria-describedby로 자동 연결됩니다.',
          'required prop은 레이블에 별표를 자동으로 추가하고 aria-required를 설정합니다.'
        ]
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          {
            id: 'form-radix-1',
            title: 'Form.Message로 에러 연결',
            description: 'Radix Form.Message는 Form.Field 이름으로 입력과 에러를 자동으로 연결합니다. name prop을 반드시 일치시키세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Radix Form',
          code: `import * as Form from '@radix-ui/react-form';

<Form.Root onSubmit={handleSubmit}>
  <Form.Field name="email">
    <Form.Label>이메일</Form.Label>
    <Form.Control asChild>
      <input type="email" required />
    </Form.Control>
    <Form.Message match="valueMissing">
      이메일을 입력해주세요.
    </Form.Message>
    <Form.Message match="typeMismatch">
      올바른 이메일 형식이 아닙니다.
    </Form.Message>
  </Form.Field>
  <Form.Submit asChild>
    <button type="submit">제출</button>
  </Form.Submit>
</Form.Root>`
        },
        notes: [
          'Radix Form은 "inline errors" 패턴을 따릅니다. 에러 메시지와 입력이 자동으로 aria-describedby로 연결됩니다.',
          '제출 실패 시 첫 번째 유효하지 않은 필드로 포커스가 자동 이동합니다.',
          'match prop으로 HTML5 내장 유효성 검사 타입을 사용할 수 있습니다.'
        ]
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          {
            id: 'form-antd-1',
            title: 'validateTrigger를 onBlur로 설정',
            description:
              'Ant Design Form의 기본 validateTrigger는 onChange입니다. 입력 중 에러 표시를 방지하려면 onBlur 또는 onSubmit으로 변경하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design Form',
          code: `import { Form, Input, Button } from 'antd';

<Form
  layout="vertical"
  onFinishFailed={({ errorFields }) => {
    const first = errorFields[0];
    if (first) form.scrollToField(first.name);
  }}
>
  <Form.Item
    label="이메일"
    name="email"
    rules={[
      { required: true, message: '이메일을 입력해주세요.' },
      { type: 'email', message: '올바른 이메일 형식이 아닙니다.' }
    ]}
    validateTrigger="onBlur"
  >
    <Input type="email" />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">제출</Button>
  </Form.Item>
</Form>`
        },
        notes: [
          'Ant Design Form은 aria-invalid와 aria-describedby를 자동으로 설정합니다.',
          'onFinishFailed 콜백에서 첫 번째 에러 필드로 스크롤/포커스를 이동하세요.',
          'layout="vertical"을 사용하면 레이블이 입력 위에 표시되어 시각적으로 더 명확합니다.'
        ]
      },
      shadcn: {
        id: 'shadcn',
        name: 'shadcn/ui',
        color: '#18181b',
        additionalChecks: [
          {
            id: 'fv-shadcn-1',
            title: 'FormMessage의 aria 연결 확인',
            description: 'shadcn Form의 FormMessage는 aria-describedby로 자동 연결됩니다. react-hook-form과 함께 사용하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'shadcn/ui Form',
          code: `import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const schema = z.object({ email: z.string().email('올바른 이메일 형식을 입력해주세요.') })

export default function App() {
  const form = useForm({ resolver: zodResolver(schema) })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">제출</Button>
      </form>
    </Form>
  )
}`
        },
        notes: [
          'shadcn Form은 react-hook-form과 통합되어 있습니다.',
          'FormMessage는 오류 메시지를 자동으로 aria-describedby로 연결합니다.',
          'FormField는 각 필드의 이름과 상태를 자동으로 관리합니다.'
        ]
      },
      chakra: {
        id: 'chakra',
        name: 'Chakra UI',
        color: '#319795',
        additionalChecks: [
          {
            id: 'fv-chakra-1',
            title: 'Field.ErrorText에 role="alert" 추가',
            description: '동적으로 나타나는 오류 메시지에 role="alert"를 추가해 스크린리더에 즉시 전달하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Chakra UI Field',
          code: `import { Field, Input, Button } from '@chakra-ui/react'
import { useState } from 'react'

export default function App() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) {
      setError('올바른 이메일 형식을 입력해주세요.')
      return
    }
    setError('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <Field.Root required invalid={!!error}>
        <Field.Label>이메일 <Field.RequiredIndicator /></Field.Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {error && <Field.ErrorText role="alert">{error}</Field.ErrorText>}
      </Field.Root>
      <Button type="submit" mt={4}>제출</Button>
    </form>
  )
}`
        },
        notes: [
          'Chakra Field.Root의 invalid prop이 Input에 aria-invalid를 자동 설정합니다.',
          "Field.ErrorText에 role='alert'를 추가해 스크린리더에 즉시 알림이 전달되게 하세요.",
          'Field.RequiredIndicator는 시각적 필수 표시와 함께 aria-required를 설정합니다.'
        ]
      },
      spectrum: {
        id: 'spectrum',
        name: 'React Spectrum',
        color: '#e03',
        additionalChecks: [
          {
            id: 'fv-spectrum-1',
            title: 'Form의 validationBehavior 설정',
            description: "validationBehavior='aria'로 설정하면 HTML5 validation 대신 aria를 통해 오류를 전달합니다.",
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'React Aria Form',
          code: `import { Form, TextField, Button } from 'react-aria-components'

export default function App() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <TextField
        type="email"
        name="email"
        label="이메일"
        isRequired
        validate={(v) => v.includes('@') ? null : '올바른 이메일 형식을 입력해주세요.'}
        errorMessage={(e) => e.validationErrors}
      />
      <Button type="submit">제출</Button>
    </Form>
  )
}`
        },
        notes: [
          'React Aria Form은 HTML5 validation과 aria를 통합합니다.',
          'TextField의 validate 함수로 커스텀 검증을 추가하세요.',
          "validationBehavior='aria'로 스크린리더 오류 공지를 최적화하세요."
        ]
      }
    }
  },
  {
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
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <button
        ref={triggerRef}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls="popover-content"
        onClick={() => setIsOpen(!isOpen)}
      >
        설정 열기
      </button>

      {isOpen && (
        <div
          id="popover-content"
          role="dialog"
          aria-label="설정"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false);
              triggerRef.current?.focus();
            }
          }}
        >
          <h3>설정</h3>
          <button>알림 켜기</button>
          <button onClick={() => { setIsOpen(false); triggerRef.current?.focus(); }}>
            닫기
          </button>
        </div>
      )}
    </div>
  );
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
            title: 'Popover anchorEl로 트리거 연결',
            description: 'MUI Popover는 anchorEl에 트리거 요소를 전달하면 위치가 자동 계산됩니다. aria-controls로도 연결하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI Popover',
          code: `import { Button, Popover, Typography } from '@mui/material';

function MuiPopoverDemo() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'popover' : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        aria-expanded={open}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        설정 열기
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Typography sx={{ p: 2 }}>설정 내용</Typography>
      </Popover>
    </>
  );
}`
        },
        notes: [
          'MUI Popover는 Escape 키와 배경 클릭으로 자동으로 닫힙니다.',
          'aria-describedby로 트리거와 팝오버를 연결하세요.',
          '팝오버 내 포커스 관리는 직접 구현해야 합니다.'
        ]
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          {
            id: 'popover-radix-1',
            title: '접근성 자동 처리',
            description: 'Radix Popover는 aria-expanded, 포커스 관리, Escape 닫기를 모두 자동으로 처리합니다. 별도 구현 불필요합니다.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Radix Popover',
          code: `import * as Popover from '@radix-ui/react-popover';

<Popover.Root>
  <Popover.Trigger asChild>
    <button>설정 열기</button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Content
      sideOffset={5}
      aria-label="설정"
    >
      <h3>설정</h3>
      <button>알림 켜기</button>
      <Popover.Close aria-label="닫기">×</Popover.Close>
      <Popover.Arrow />
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>`
        },
        notes: [
          'Radix Popover는 Space/Enter로 열기, Escape로 닫기, 트리거로 포커스 복귀를 자동 처리합니다.',
          'aria-expanded는 Popover.Trigger에 자동으로 적용됩니다.',
          'Popover.Portal로 감싸면 z-index 문제 없이 DOM 최상단에 렌더링됩니다.'
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
            description: 'Ant Design Popover는 트리거 버튼에 aria-expanded를 자동으로 추가하지 않습니다. open 상태를 직접 관리하여 추가하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design Popover',
          code: `import { Popover, Button } from 'antd';

function AntdPopoverDemo() {
  const [open, setOpen] = useState(false);

  const content = (
    <div>
      <p>설정 내용</p>
      <Button onClick={() => setOpen(false)}>닫기</Button>
    </div>
  );

  return (
    <Popover
      content={content}
      title="설정"
      open={open}
      onOpenChange={setOpen}
      trigger="click"
    >
      <Button aria-expanded={open} aria-haspopup="dialog">
        설정 열기
      </Button>
    </Popover>
  );
}`
        },
        notes: [
          'trigger="click"으로 설정하면 키보드 Enter/Space로도 열립니다.',
          '트리거 버튼에 aria-expanded와 aria-haspopup을 직접 추가해야 합니다.',
          'Ant Design Popover는 Escape 키로 닫히지 않으므로 닫기 버튼을 content 안에 포함하세요.'
        ]
      },
      shadcn: {
        id: 'shadcn',
        name: 'shadcn/ui',
        color: '#18181b',
        additionalChecks: [
          {
            id: 'pop-shadcn-1',
            title: '닫기 수단 제공',
            description: 'shadcn Popover는 ESC와 외부 클릭으로 닫힙니다. 키보드 사용자를 위해 내부에 닫기 버튼도 추가하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'shadcn/ui Popover',
          code: `import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">설정 열기</Button>
  </PopoverTrigger>
  <PopoverContent>
    <div>
      <h4 className="font-semibold mb-1">알림 설정</h4>
      <p className="text-sm text-muted-foreground">알림 수신 방법을 설정하세요.</p>
    </div>
  </PopoverContent>
</Popover>`
        },
        notes: [
          'shadcn Popover는 Radix UI 기반으로 포커스 관리와 aria 속성을 자동 처리합니다.',
          'ESC 키와 외부 클릭으로 닫힙니다.',
          'PopoverTrigger에 asChild를 사용해 시맨틱 트리거 요소를 유지하세요.'
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
          code: `import { Popover, Button } from '@chakra-ui/react'

<Popover.Root>
  <Popover.Trigger asChild>
    <Button variant="outline">설정 열기</Button>
  </Popover.Trigger>
  <Popover.Positioner>
    <Popover.Content>
      <Popover.Arrow>
        <Popover.ArrowTip />
      </Popover.Arrow>
      <Popover.Body>
        <Popover.Title>알림 설정</Popover.Title>
        <p>알림 수신 방법을 설정하세요.</p>
      </Popover.Body>
      <Popover.CloseTrigger asChild>
        <Button variant="ghost" size="sm" aria-label="닫기">✕</Button>
      </Popover.CloseTrigger>
    </Popover.Content>
  </Popover.Positioner>
</Popover.Root>`
        },
        notes: [
          'Chakra Popover.Root는 포커스 트랩과 aria 속성을 자동 처리합니다.',
          'Popover.CloseTrigger에 aria-label을 추가하세요.',
          'closeOnInteractOutside prop으로 외부 클릭 닫기를 제어하세요.'
        ]
      },
      spectrum: {
        id: 'spectrum',
        name: 'React Spectrum',
        color: '#e03',
        additionalChecks: [],
        codeSample: {
          language: 'tsx',
          label: 'React Aria Popover',
          code: `import { DialogTrigger, Button, Popover, Dialog, Heading } from 'react-aria-components'

<DialogTrigger>
  <Button>설정 열기</Button>
  <Popover>
    <Dialog>
      <Heading slot="title">알림 설정</Heading>
      <p>알림 수신 방법을 설정하세요.</p>
    </Dialog>
  </Popover>
</DialogTrigger>`
        },
        notes: [
          'React Aria Popover는 DialogTrigger와 함께 사용합니다.',
          "Dialog의 Heading에 slot='title'을 설정하면 aria-labelledby가 자동 연결됩니다.",
          'Popover는 자동으로 포커스 관리와 aria 속성을 처리합니다.'
        ]
      }
    }
  },
  {
    slug: 'drawer',
    name: 'Drawer',
    description: '화면 가장자리에서 슬라이드하여 나타나는 사이드 패널 컴포넌트',
    wcagCriteria: ['2.1.1 Keyboard', '2.1.2 No Keyboard Trap', '4.1.2 Name, Role, Value'],
    tags: ['overlay', 'interactive', 'navigation'],
    baseline: {
      checklist: {
        must: [
          {
            id: 'drawer-m1',
            title: 'role="dialog"와 aria-modal="true"',
            description: '드로어 패널에 role="dialog"와 aria-modal="true"를 설정해야 합니다.',
            level: 'must'
          },
          {
            id: 'drawer-m2',
            title: '레이블 제공',
            description: '드로어에 aria-labelledby 또는 aria-label로 레이블을 제공해야 합니다.',
            level: 'must'
          },
          {
            id: 'drawer-m3',
            title: '포커스 트랩',
            description: '드로어가 열렸을 때 Tab/Shift+Tab이 드로어 내부에서만 순환해야 합니다.',
            level: 'must'
          },
          { id: 'drawer-m4', title: 'Escape로 닫기', description: 'Escape 키로 드로어를 닫을 수 있어야 합니다.', level: 'must' },
          {
            id: 'drawer-m5',
            title: '포커스 관리',
            description: '드로어 열릴 때 내부 첫 포커스 가능 요소로 포커스 이동, 닫힐 때 트리거로 포커스 복귀해야 합니다.',
            level: 'must'
          }
        ],
        should: [
          {
            id: 'drawer-s1',
            title: '배경 inert 처리',
            description: '드로어가 열려 있을 때 배경 콘텐츠에 inert 속성으로 스크린리더가 배경을 읽지 못하게 하세요.',
            level: 'should'
          },
          {
            id: 'drawer-s2',
            title: '배경 오버레이 클릭으로 닫기',
            description: '드로어 외부 오버레이를 클릭하면 닫히도록 구현하세요.',
            level: 'should'
          }
        ],
        avoid: [
          {
            id: 'drawer-a1',
            title: '포커스 트랩 없이 배경 포커스 허용',
            description: '드로어가 열린 상태에서 배경 요소에 Tab으로 이동할 수 있으면 스크린리더 사용자가 경계를 파악하기 어렵습니다.',
            level: 'avoid'
          },
          {
            id: 'drawer-a2',
            title: '시각적 닫기 버튼 미제공',
            description: '모바일 사용자는 Escape 키가 없으므로 항상 시각적 닫기 버튼을 제공하세요.',
            level: 'avoid'
          }
        ]
      },
      codeSample: {
        language: 'tsx',
        label: 'Baseline (React)',
        code: `function DrawerDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = 'drawer-title';

  return (
    <>
      <button ref={triggerRef} onClick={() => setIsOpen(true)}>
        메뉴 열기
      </button>

      {isOpen && (
        <>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsOpen(false);
                triggerRef.current?.focus();
              }
            }}
          >
            <h2 id={titleId}>메뉴</h2>
            <nav>
              <a href="/">홈</a>
              <a href="/about">소개</a>
            </nav>
            <button onClick={() => { setIsOpen(false); triggerRef.current?.focus(); }}>
              닫기
            </button>
          </div>
          <div onClick={() => setIsOpen(false)} aria-hidden="true" />
        </>
      )}
    </>
  );
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
            id: 'drawer-mui-1',
            title: 'variant="temporary"로 모달 동작',
            description: 'MUI Drawer의 variant="temporary"는 포커스 트랩과 배경 오버레이를 자동으로 처리합니다.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI Drawer',
          code: `import { Drawer, Box, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function MuiDrawerDemo() {
  const [open, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>메뉴 열기</Button>
      <Drawer
        open={open}
        onClose={() => setIsOpen(false)}
        aria-labelledby="drawer-title"
      >
        <Box sx={{ width: 280, p: 2 }} role="presentation">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography id="drawer-title" variant="h6">메뉴</Typography>
            <IconButton onClick={() => setIsOpen(false)} aria-label="드로어 닫기">
              <CloseIcon />
            </IconButton>
          </Box>
          <nav>
            <a href="/">홈</a>
            <a href="/about">소개</a>
          </nav>
        </Box>
      </Drawer>
    </>
  );
}`
        },
        notes: [
          'MUI Drawer variant="temporary"는 Modal 기반으로 포커스 트랩과 Escape 닫기를 자동 처리합니다.',
          'aria-labelledby를 드로어 제목 ID와 연결하세요.',
          'keepMounted={false}로 설정하면 닫혔을 때 DOM에서 제거됩니다.'
        ]
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          {
            id: 'drawer-radix-1',
            title: 'Dialog 기반으로 구현',
            description:
              'Radix UI에는 전용 Drawer가 없습니다. Dialog 컴포넌트에 CSS로 슬라이드 애니메이션을 추가하거나 vaul 라이브러리를 사용하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Radix Dialog (Drawer 구현)',
          code: `import * as Dialog from '@radix-ui/react-dialog';

{/* Radix Dialog에 CSS transform으로 드로어 효과 */}
<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Trigger asChild>
    <button>메뉴 열기</button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="drawer-overlay" />
    <Dialog.Content
      className="drawer-content" /* translateX 애니메이션 */
      aria-describedby={undefined}
    >
      <Dialog.Title>메뉴</Dialog.Title>
      <nav>
        <a href="/">홈</a>
        <a href="/about">소개</a>
      </nav>
      <Dialog.Close aria-label="드로어 닫기">닫기</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>`
        },
        notes: [
          'Radix Dialog는 포커스 트랩, Escape 닫기, 트리거로 포커스 복귀를 자동 처리합니다.',
          'CSS transform translateX로 슬라이드 인 효과를 구현하세요.',
          'shadcn/ui의 Sheet 컴포넌트가 이 패턴의 완성된 구현입니다.'
        ]
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          {
            id: 'drawer-antd-1',
            title: '닫기 버튼 aria-label 확인',
            description:
              'Ant Design Drawer의 기본 닫기 버튼은 × 문자만 표시됩니다. 스크린리더를 위해 aria-label을 추가하거나 closable 영역을 커스텀하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design Drawer',
          code: `import { Drawer, Button } from 'antd';

<>
  <Button onClick={() => setIsOpen(true)}>메뉴 열기</Button>
  <Drawer
    title="메뉴"
    open={isOpen}
    onClose={() => setIsOpen(false)}
    placement="left"
    closeIcon={<span aria-label="드로어 닫기">×</span>}
  >
    <nav>
      <a href="/">홈</a>
      <a href="/about">소개</a>
    </nav>
  </Drawer>
</>`
        },
        notes: [
          'Ant Design Drawer는 Escape 키로 자동으로 닫힙니다.',
          'placement prop으로 left/right/top/bottom 위치를 설정합니다.',
          'closeIcon prop으로 닫기 버튼을 커스텀하여 aria-label을 추가하세요.'
        ]
      },
      shadcn: {
        id: 'shadcn',
        name: 'shadcn/ui',
        color: '#18181b',
        additionalChecks: [
          {
            id: 'drw-shadcn-1',
            title: 'DrawerTitle과 DrawerDescription 제공',
            description: 'DrawerTitle은 aria-labelledby로 자동 연결됩니다. 항상 제목을 제공하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'shadcn/ui Drawer',
          code: `import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">메뉴 열기</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>내비게이션 메뉴</DrawerTitle>
      <DrawerDescription>원하는 페이지로 이동하세요.</DrawerDescription>
    </DrawerHeader>
    <div className="p-4">
      <a href="/home" className="block py-2">홈</a>
      <a href="/about" className="block py-2">소개</a>
    </div>
    <DrawerClose asChild>
      <Button variant="outline">닫기</Button>
    </DrawerClose>
  </DrawerContent>
</Drawer>`
        },
        notes: [
          'shadcn Drawer는 Vaul 기반으로 모바일 친화적인 바텀 시트를 제공합니다.',
          'DrawerTitle은 aria-labelledby로 자동 연결됩니다.',
          '포커스 트랩과 ESC 닫기가 자동 처리됩니다.'
        ]
      },
      chakra: {
        id: 'chakra',
        name: 'Chakra UI',
        color: '#319795',
        additionalChecks: [
          {
            id: 'drw-chakra-1',
            title: 'CloseTrigger aria-label',
            description: '닫기 버튼에 아이콘만 사용할 경우 aria-label을 명시적으로 추가하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Chakra UI Drawer',
          code: `import { Drawer, Button } from '@chakra-ui/react'

<Drawer.Root>
  <Drawer.Trigger asChild>
    <Button variant="outline">메뉴 열기</Button>
  </Drawer.Trigger>
  <Drawer.Backdrop />
  <Drawer.Positioner>
    <Drawer.Content>
      <Drawer.CloseTrigger asChild>
        <Button variant="ghost" aria-label="닫기" position="absolute" top={2} right={2}>✕</Button>
      </Drawer.CloseTrigger>
      <Drawer.Header>
        <Drawer.Title>내비게이션 메뉴</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <a href="/home">홈</a>
        <a href="/about">소개</a>
      </Drawer.Body>
      <Drawer.Footer>
        <Drawer.ActionTrigger asChild>
          <Button variant="outline">닫기</Button>
        </Drawer.ActionTrigger>
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>`
        },
        notes: [
          'Chakra Drawer.Root는 포커스 트랩과 aria-modal을 자동 처리합니다.',
          'placement prop으로 bottom, left, right, top 방향을 지정하세요.',
          '닫기 버튼에 aria-label을 반드시 추가하세요.'
        ]
      }
    }
  },
  {
    slug: 'date-picker',
    name: 'Date Picker',
    description: '캘린더 UI로 날짜를 선택하는 입력 컴포넌트',
    wcagCriteria: ['1.3.1 Info and Relationships', '2.1.1 Keyboard', '4.1.3 Status Messages'],
    tags: ['form', 'interactive', 'calendar'],
    baseline: {
      checklist: {
        must: [
          {
            id: 'datepicker-m1',
            title: '입력 필드에 날짜 형식 안내 연결',
            description: '날짜 입력 필드에 aria-describedby로 날짜 형식(예: YYYY-MM-DD)을 연결해야 합니다.',
            level: 'must'
          },
          {
            id: 'datepicker-m2',
            title: '캘린더 다이얼로그에 role="dialog"',
            description: '캘린더 팝업은 role="dialog"와 aria-modal="true", aria-label을 설정해야 합니다.',
            level: 'must'
          },
          {
            id: 'datepicker-m3',
            title: '캘린더 그리드 ARIA',
            description: '캘린더는 role="grid"를 사용하고 각 날짜 셀에 aria-label로 전체 날짜를 제공해야 합니다.',
            level: 'must'
          },
          {
            id: 'datepicker-m4',
            title: '키보드로 날짜 탐색',
            description: 'Arrow 키로 날짜 이동, Enter/Space로 선택, Page Up/Down으로 월 이동, Escape로 닫기를 지원해야 합니다.',
            level: 'must'
          },
          {
            id: 'datepicker-m5',
            title: '현재 월/연도를 라이브 영역으로',
            description: '월 이동 버튼 클릭 시 현재 표시 월/연도가 aria-live로 스크린리더에 안내되어야 합니다.',
            level: 'must'
          }
        ],
        should: [
          {
            id: 'datepicker-s1',
            title: '직접 텍스트 입력 허용',
            description: '캘린더 UI 없이 날짜를 직접 텍스트로 입력할 수 있는 옵션을 제공하세요.',
            level: 'should'
          },
          {
            id: 'datepicker-s2',
            title: '선택 후 트리거에 날짜 반영',
            description: '날짜 선택 후 트리거 버튼의 accessible name에 선택된 날짜를 포함하세요.',
            level: 'should'
          },
          {
            id: 'datepicker-s3',
            title: '비활성 날짜 aria-disabled',
            description: '선택 불가능한 날짜에 aria-disabled="true"와 시각적 표시를 함께 제공하세요.',
            level: 'should'
          }
        ],
        avoid: [
          {
            id: 'datepicker-a1',
            title: '캘린더 UI만 제공',
            description: '캘린더 팝업으로만 날짜를 선택할 수 있다면 스크린리더 사용자에게 복잡한 그리드 탐색을 강요합니다.',
            level: 'avoid'
          },
          {
            id: 'datepicker-a2',
            title: '날짜 셀에 숫자만 제공',
            description: '"15"만 있는 날짜 셀은 맥락 없이 읽힙니다. aria-label="2024년 3월 15일"처럼 전체 날짜를 제공하세요.',
            level: 'avoid'
          }
        ]
      },
      codeSample: {
        language: 'tsx',
        label: 'Baseline (HTML5 date input)',
        code: `function DatePickerDemo() {
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const hintId = 'date-format-hint';
  const errorId = 'date-error';

  const validateDate = (value) => {
    if (!value) return '';
    const d = new Date(value);
    if (isNaN(d.getTime())) return '유효하지 않은 날짜입니다.';
    return '';
  };

  return (
    <div>
      <label htmlFor="date-input">날짜</label>
      <input
        id="date-input"
        type="date"
        value={date}
        onChange={(e) => { setDate(e.target.value); setError(validateDate(e.target.value)); }}
        aria-describedby={\`\${hintId}\${error ? \` \${errorId}\` : ''}\`}
        aria-invalid={!!error}
      />
      <p id={hintId}>형식: YYYY-MM-DD</p>
      {error && <p id={errorId} role="alert">{error}</p>}
    </div>
  );
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
            id: 'datepicker-mui-1',
            title: '@mui/x-date-pickers 사용 권장',
            description: 'MUI Date Picker는 @mui/x-date-pickers 패키지에 있습니다. 기본 TextField보다 접근성이 잘 구현되어 있습니다.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'MUI Date Picker',
          code: `import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from 'date-fns/locale';

<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
  <DatePicker
    label="날짜 선택"
    value={date}
    onChange={(newDate) => setDate(newDate)}
    slotProps={{
      textField: {
        helperText: '형식: YYYY.MM.DD',
        inputProps: { 'aria-describedby': 'date-hint' }
      }
    }}
  />
</LocalizationProvider>`
        },
        notes: [
          'LocalizationProvider의 adapterLocale을 ko로 설정하면 캘린더 UI가 한국어로 표시됩니다.',
          '@mui/x-date-pickers는 키보드 내비게이션과 스크린리더를 위한 ARIA를 자동으로 처리합니다.',
          'slotProps.textField로 입력 필드의 접근성 속성을 커스텀할 수 있습니다.'
        ]
      },
      radix: {
        id: 'radix',
        name: 'Radix UI',
        color: '#6e56cf',
        additionalChecks: [
          {
            id: 'datepicker-radix-1',
            title: 'shadcn/ui Calendar 컴포넌트 사용',
            description:
              'Radix UI에는 전용 Date Picker가 없습니다. shadcn/ui의 Calendar(react-day-picker 기반)를 Popover와 조합하거나 HTML5 date input을 사용하세요.',
            level: 'should'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'shadcn Calendar + Popover',
          code: `{/* shadcn/ui Calendar + Radix Popover 조합 */}
import * as Popover from '@radix-ui/react-popover';

function DatePickerWithCalendar() {
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button aria-expanded={open} aria-haspopup="dialog">
          {date ? date.toLocaleDateString('ko-KR') : '날짜 선택'}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content role="dialog" aria-label="날짜 선택 캘린더">
          {/* react-day-picker 또는 custom calendar 컴포넌트 */}
          <p>캘린더 구현 위치</p>
          <Popover.Close>닫기</Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}`
        },
        notes: [
          'Radix UI는 전용 Date Picker를 제공하지 않습니다.',
          'react-day-picker 라이브러리는 WCAG를 준수하는 접근성 있는 캘린더를 제공합니다.',
          '복잡한 날짜 선택이 필요 없다면 HTML5 type="date" 입력을 사용하는 것이 가장 접근성이 높습니다.'
        ]
      },
      antd: {
        id: 'antd',
        name: 'Ant Design',
        color: '#1677ff',
        additionalChecks: [
          {
            id: 'datepicker-antd-1',
            title: 'locale로 한국어 설정',
            description: 'Ant Design DatePicker는 기본 영어입니다. ConfigProvider에 koKR locale을 설정해 캘린더 UI를 한국어로 변경하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Ant Design DatePicker',
          code: `import { DatePicker, ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

<ConfigProvider locale={koKR}>
  <DatePicker
    value={date}
    onChange={(value) => setDate(value)}
    placeholder="날짜 선택"
    format="YYYY년 MM월 DD일"
    aria-label="날짜 선택"
    getPopupContainer={(trigger) => trigger.parentElement}
  />
</ConfigProvider>`
        },
        notes: [
          'ConfigProvider locale={koKR}으로 캘린더 UI를 한국어로 변경하세요.',
          'Ant Design DatePicker는 키보드 내비게이션을 지원하지만 스크린리더 지원이 완전하지 않을 수 있습니다.',
          '중요한 날짜 입력에는 직접 텍스트 입력 옵션도 함께 제공하세요.'
        ]
      },
      shadcn: {
        id: 'shadcn',
        name: 'shadcn/ui',
        color: '#18181b',
        additionalChecks: [
          {
            id: 'dp-shadcn-1',
            title: '트리거 버튼 aria-label 동적 업데이트',
            description: '날짜가 선택되면 트리거 버튼의 aria-label을 선택된 날짜로 업데이트하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'shadcn/ui Calendar',
          code: `import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'

export default function App() {
  const [date, setDate] = useState(undefined)
  return (
    <div className="grid gap-1.5">
      <Label htmlFor="date-trigger">날짜 선택</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date-trigger"
            variant="outline"
            aria-label={date ? date.toLocaleDateString('ko') : '날짜를 선택하세요'}
          >
            📅 {date ? date.toLocaleDateString('ko') : '날짜를 선택하세요'}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}`
        },
        notes: [
          'shadcn에 전용 DatePicker가 없으므로 Calendar + Popover를 조합해 구현합니다.',
          '트리거 버튼에 선택된 날짜를 aria-label로 업데이트하세요.',
          'Calendar의 initialFocus prop으로 열릴 때 자동 포커스를 설정하세요.'
        ]
      },
      chakra: {
        id: 'chakra',
        name: 'Chakra UI',
        color: '#319795',
        additionalChecks: [
          {
            id: 'dp-chakra-1',
            title: '이전/다음 달 버튼 aria-label',
            description: '달력의 이전/다음 달 이동 버튼에 aria-label을 추가하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'Chakra UI DatePicker',
          code: `import { DatePicker } from '@chakra-ui/react'
import { LuCalendar } from 'react-icons/lu'

<DatePicker.Root>
  <DatePicker.Label>날짜 선택</DatePicker.Label>
  <DatePicker.Control>
    <DatePicker.Input />
    <DatePicker.IndicatorGroup>
      <DatePicker.Trigger aria-label="달력 열기">
        <LuCalendar aria-hidden />
      </DatePicker.Trigger>
    </DatePicker.IndicatorGroup>
  </DatePicker.Control>
  <DatePicker.Positioner>
    <DatePicker.Content>
      <DatePicker.View view="day">
        <DatePicker.ViewControl>
          <DatePicker.PrevTrigger aria-label="이전 달" />
          <DatePicker.ViewTrigger>
            <DatePicker.RangeText />
          </DatePicker.ViewTrigger>
          <DatePicker.NextTrigger aria-label="다음 달" />
        </DatePicker.ViewControl>
      </DatePicker.View>
    </DatePicker.Content>
  </DatePicker.Positioner>
</DatePicker.Root>`
        },
        notes: [
          'Chakra DatePicker는 달력과 텍스트 입력 두 가지 방법으로 날짜를 입력할 수 있습니다.',
          '달력 버튼과 이전/다음 달 버튼에 aria-label을 추가하세요.',
          '@internationalized/date 패키지로 날짜 타입을 관리합니다.'
        ]
      },
      spectrum: {
        id: 'spectrum',
        name: 'React Spectrum',
        color: '#e03',
        additionalChecks: [
          {
            id: 'dp-spectrum-1',
            title: 'aria-label prop 필수',
            description: 'React Aria DatePicker에 label 또는 aria-label prop을 반드시 제공하세요.',
            level: 'must'
          }
        ],
        codeSample: {
          language: 'tsx',
          label: 'React Aria DatePicker',
          code: `import { DatePicker, DateInput, DateSegment, Button, Heading } from 'react-aria-components'
import { Calendar, CalendarGrid, CalendarCell, CalendarGridBody } from 'react-aria-components'
import { Popover } from 'react-aria-components'

<DatePicker aria-label="날짜 선택">
  <DateInput>
    {(segment) => <DateSegment segment={segment} />}
  </DateInput>
  <Button aria-label="달력 열기">📅</Button>
  <Popover>
    <Calendar>
      <Heading />
      <Button slot="previous" aria-label="이전 달">‹</Button>
      <Button slot="next" aria-label="다음 달">›</Button>
      <CalendarGrid>
        <CalendarGridBody>
          {(date) => <CalendarCell date={date} />}
        </CalendarGridBody>
      </CalendarGrid>
    </Calendar>
  </Popover>
</DatePicker>`
        },
        notes: [
          'React Aria DatePicker는 날짜 입력 필드와 달력 버튼을 자동으로 렌더링합니다.',
          'label prop을 제공하면 모든 하위 요소의 aria 연결이 자동 처리됩니다.',
          '각 날짜 세그먼트(연/월/일)를 개별적으로 키보드로 편집할 수 있습니다.'
        ]
      }
    }
  }
]

export function getPattern(slug: string): Pattern | undefined {
  return patterns.find((p) => p.slug === slug)
}
