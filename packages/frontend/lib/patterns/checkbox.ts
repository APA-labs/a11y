import type { Pattern } from '../types'

export const checkboxPattern: Pattern = {
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

export function Checkbox({ id = 'cb-example', label = '레이블', indeterminate = false }: { id?: string; label?: string; indeterminate?: boolean }) {
  const [checked, setChecked] = useState(false)
  return (
    <label htmlFor={id}>
      <input
        id={id}
        type='checkbox'
        checked={checked}
        ref={(el) => {
          if (el) el.indeterminate = indeterminate
        }}
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
  <FormLabel component='legend'>알림 설정</FormLabel>
  <FormControlLabel
    control={
      <Checkbox
        checked={emailChecked}
        onChange={(e) => setEmailChecked(e.target.checked)}
      />
    }
    label='이메일 알림'
  />
  <FormControlLabel
    control={
      <Checkbox
        checked={smsChecked}
        onChange={(e) => setSmsChecked(e.target.checked)}
      />
    }
    label='SMS 알림'
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
      <Checkbox.Root
        id={id}
        className='checkbox-root'>
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
}
