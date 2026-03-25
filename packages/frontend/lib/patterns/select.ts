import type { Pattern } from '../types'

export const selectPattern: Pattern = {
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
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!isOpen) setIsOpen(true)
      setActiveIndex((i) => Math.min(i + 1, options.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (isOpen) {
        setSelected(options[activeIndex])
        setIsOpen(false)
      } else setIsOpen(true)
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div>
      <label id='fruit-label'>Select fruit</label>
      <button
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-labelledby='fruit-label'
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen(!isOpen)}>
        {selected ?? 'Choose an option'}
      </button>
      {isOpen && (
        <ul
          role='listbox'
          aria-labelledby='fruit-label'
          tabIndex={-1}>
          {options.map((opt, i) => (
            <li
              key={opt}
              role='option'
              aria-selected={selected === opt}
              onClick={() => {
                setSelected(opt)
                setIsOpen(false)
              }}>
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
          id: 'select-mui-1',
          title: 'FormControl + InputLabel 조합 필수',
          description: 'MUI Select는 FormControl과 InputLabel을 함께 사용해야 올바른 레이블이 연결됩니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Select',
        code: `import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
<FormControl fullWidth>
  <InputLabel id='fruit-label'>Select fruit</InputLabel>
  <Select
    labelId='fruit-label'
    value={selected}
    label='Select fruit'
    onChange={(e) => setSelected(e.target.value)}>
    <MenuItem value='apple'>Apple</MenuItem>
    <MenuItem value='banana'>Banana</MenuItem>
    <MenuItem value='cherry'>Cherry</MenuItem>
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

<Label.Root htmlFor="fruit-trigger">Select fruit</Label.Root>
<Select.Root value={selected} onValueChange={setSelected}>
<Select.Trigger id="fruit-trigger" aria-label="Select fruit">
  <Select.Value placeholder="Choose an option" />
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
        code: `import { Select, Form } from 'antd'
<Form.Item
  label='Select fruit'
  name='fruit'>
  <Select
    placeholder='Choose an option'
    options={[
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' }
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
        code: `import { useState } from 'react'
import { Select, useListCollection } from '@chakra-ui/react'

const countries = [
  { label: 'South Korea', value: 'kr' },
  { label: 'United States', value: 'us' },
  { label: 'Japan', value: 'jp' }
]

export default function App() {
  const [value, setValue] = useState('')
  const { collection } = useListCollection({ initialItems: countries })
  return (
    <Select.Root
      collection={collection}
      value={[value]}
      onValueChange={(e) => setValue(e.value[0])}>
      <Select.Label>Country</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder='Select a country' />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {collection.items.map((item) => (
            <Select.Item
              key={item.value}
              item={item}>
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
        code: `import { Select, Label, Button, SelectValue, Popover, ListBox, ListBoxItem } from 'react-aria-components'

const triggerStyle = { display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, border: '1px solid #d1d5db', borderRadius: 6, padding: '6px 12px', background: '#fff', cursor: 'pointer', fontSize: 14, minWidth: 180 }
const popoverStyle = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,.1)', padding: 4, outline: 'none' }
const itemStyle = { padding: '6px 12px', borderRadius: 4, cursor: 'pointer', fontSize: 14, outline: 'none' }

function SpectrumSelectDemo() {
  const [value, setValue] = useState('')

  return (
    <Select selectedKey={value} onSelectionChange={setValue}>
      <Label style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}>Country</Label>
      <Button style={triggerStyle}>
        <SelectValue>{value || 'Select a country'}</SelectValue>
        <span aria-hidden>▼</span>
      </Button>
      <Popover style={popoverStyle}>
        <ListBox>
          <ListBoxItem id='kr' style={itemStyle}>South Korea</ListBoxItem>
          <ListBoxItem id='us' style={itemStyle}>United States</ListBoxItem>
          <ListBoxItem id='jp' style={itemStyle}>Japan</ListBoxItem>
        </ListBox>
      </Popover>
    </Select>
  )
}`
      },
      notes: [
        'react-aria-components Select는 compound component로 Label, Button, SelectValue, Popover, ListBox를 조합합니다.',
        'SelectValue는 현재 선택된 값을 자동으로 표시합니다.',
        'selectedKey/onSelectionChange로 제어 컴포넌트로 사용하세요.'
      ]
    }
  }
}
