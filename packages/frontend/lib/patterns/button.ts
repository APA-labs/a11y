import type { Pattern } from '../types'

export const buttonPattern: Pattern = {
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
}
