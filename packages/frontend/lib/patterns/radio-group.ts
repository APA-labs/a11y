import type { Pattern } from '../types'

export const radioGroupPattern: Pattern = {
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
            type='radio'
            name='group'
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
  <FormLabel id='shipping-label'>Shipping Speed</FormLabel>
  <RadioGroup
    aria-labelledby='shipping-label'
    defaultValue='standard'>
    <FormControlLabel
      value='standard'
      control={<Radio />}
      label='Standard shipping (3–5 days)'
    />
    <FormControlLabel
      value='express'
      control={<Radio />}
      label='Express shipping (1–2 days)'
    />
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
    <RadioGroup.Root
      defaultValue='standard'
      aria-label='Shipping speed'>
      <div className='stack gap-8'>
        <label>
          <RadioGroup.Item value='standard'>
            <RadioGroup.Indicator />
          </RadioGroup.Item>
          Standard shipping
        </label>
        <label>
          <RadioGroup.Item value='express'>
            <RadioGroup.Indicator />
          </RadioGroup.Item>
          Express shipping
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
{ label: 'Standard shipping', value: 'standard' },
{ label: 'Express shipping', value: 'express' },
]

<div>
<p id="shipping-label">Shipping speed</p>
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
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'radio-chakra-1',
          title: 'RadioGroup으로 그룹화',
          description: 'Chakra Radio는 반드시 RadioGroup으로 감싸야 방향키 탐색이 올바르게 동작합니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI RadioGroup',
        code: `import { RadioGroup, HStack } from '@chakra-ui/react'

function RadioDemo() {
  const [value, setValue] = useState('option-1')
  return (
    <RadioGroup.Root
      value={value}
      onValueChange={(e) => setValue(e.value)}
      aria-label='Select option'>
      <HStack gap={4}>
        <RadioGroup.Item value='option-1'>
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>Option 1</RadioGroup.ItemText>
        </RadioGroup.Item>
        <RadioGroup.Item value='option-2'>
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>Option 2</RadioGroup.ItemText>
        </RadioGroup.Item>
        <RadioGroup.Item value='option-3'>
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>Option 3</RadioGroup.ItemText>
        </RadioGroup.Item>
      </HStack>
    </RadioGroup.Root>
  )
}`
      },
      notes: [
        'Chakra Radio는 내부적으로 <input type="radio">를 사용합니다.',
        'RadioGroup의 onChange로 선택값을 제어하세요.',
        'isDisabled prop으로 개별 또는 그룹 전체를 비활성화할 수 있습니다.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [],
      codeSample: {
        language: 'tsx',
        label: 'React Spectrum RadioGroup',
        code: `import { RadioGroup, Radio } from '@adobe/react-spectrum'

function RadioDemo() {
  const [value, setValue] = useState('option-1')
  return (
    <RadioGroup
      label='Select option'
      value={value}
      onChange={setValue}>
      <Radio value='option-1'>Option 1</Radio>
      <Radio value='option-2'>Option 2</Radio>
      <Radio value='option-3'>Option 3</Radio>
    </RadioGroup>
  )
}`
      },
      notes: [
        'React Spectrum RadioGroup은 label prop으로 그룹 레이블을 설정합니다.',
        '방향키 탐색과 포커스 관리가 자동으로 처리됩니다.',
        'isDisabled, isRequired prop을 지원합니다.'
      ]
    },
    baseui: {
      id: 'baseui',
      name: 'Base UI',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'radio-baseui-1',
          title: 'RadioGroup에 aria-labelledby 연결',
          description:
            '`RadioGroup`에 `aria-labelledby`로 그룹 레이블 요소의 id를 연결하세요. 레이블 없이는 스크린리더가 그룹의 목적을 전달하지 못합니다.',
          level: 'must'
        },
        {
          id: 'radio-baseui-2',
          title: 'Radio.Indicator는 CSS로 스타일링',
          description:
            'Base UI는 unstyled 라이브러리입니다. `Radio.Indicator`의 선택 상태는 `data-checked` 속성을 활용한 CSS로 직접 구현해야 합니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI RadioGroup',
        code: `import './index.css'
import { useState } from 'react'
import { RadioGroup } from '@base-ui-components/react/radio-group'
import { Radio } from '@base-ui-components/react/radio'

const options = [
  { value: 'email', label: '이메일' },
  { value: 'sms', label: 'SMS' },
  { value: 'push', label: '푸시 알림' }
]

export default function App() {
  const [value, setValue] = useState('email')

  return (
    <div className='app stack'>
      <p
        id='notification-label'
        className='label mb-8'>
        알림 수단
      </p>
      <RadioGroup
        value={value}
        onValueChange={setValue}
        aria-labelledby='notification-label'
        className='stack gap-8'>
        {options.map((opt) => (
          <Radio.Root
            key={opt.value}
            value={opt.value}
            className='row cursor-pointer'>
            <div className='radio-btn'>{value === opt.value && <span className='radio-indicator' />}</div>
            <Radio.Label className='cursor-pointer'>{opt.label}</Radio.Label>
          </Radio.Root>
        ))}
      </RadioGroup>
    </div>
  )
}`
      },
      notes: [
        '`RadioGroup`의 `value` + `onValueChange`로 선택 상태를 제어합니다.',
        '`aria-labelledby`로 그룹 레이블을 연결하면 스크린리더가 그룹 목적을 읽습니다.',
        '`Radio.Indicator`는 기본 스타일이 없습니다. `data-checked` 속성으로 선택 상태를 CSS에서 처리하세요.',
        '방향키로 라디오 간 이동, Space로 선택이 자동 처리됩니다.'
      ]
    }
  }
}
