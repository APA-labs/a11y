import type { Pattern } from '../types'

export const chipPattern: Pattern = {
  slug: 'chip',
  name: 'Chip / Tag',
  description: '선택, 필터링, 삭제가 가능한 인터랙티브 태그 컴포넌트',
  wcagCriteria: ['2.1.1 Keyboard', '2.4.7 Focus Visible', '4.1.2 Name, Role, Value'],
  tags: ['form', 'interactive', 'selection'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'chip-m1',
          title: '인터랙티브 칩은 button',
          description: '클릭/삭제 가능한 chip은 <button> 또는 role="button"으로 구현하고 Tab 순서에 포함되어야 합니다.',
          level: 'must'
        },
        {
          id: 'chip-m2',
          title: '삭제 버튼에 접근명',
          description: '× 아이콘만 있는 삭제 버튼에는 aria-label="Remove <태그명>"처럼 대상 chip을 명시하는 접근명을 제공하세요.',
          level: 'must'
        },
        {
          id: 'chip-m3',
          title: '그룹에 role과 label',
          description: '여러 chip을 묶을 때는 role="group" 또는 role="listbox"와 aria-label로 그룹 목적을 명시하세요.',
          level: 'must'
        },
        {
          id: 'chip-m4',
          title: '키보드 작동',
          description: 'Enter/Space로 활성화하고, 삭제 가능한 chip은 포커스된 상태에서 Backspace/Delete로 삭제가 호출되어야 합니다.',
          level: 'must'
        }
      ],
      should: [
        {
          id: 'chip-s1',
          title: '삭제 후 포커스 이동',
          description: 'chip 삭제 시 포커스가 사라지지 않도록 인접 chip 또는 부모 컨테이너로 포커스를 옮기세요.',
          level: 'should'
        },
        {
          id: 'chip-s2',
          title: '선택 상태 전달',
          description: '선택 가능한 chip은 aria-pressed 또는 aria-selected로 현재 선택 상태를 스크린리더에 전달하세요.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'chip-a1',
          title: 'chip 본체와 삭제를 같은 트리거로 묶기 금지',
          description: 'chip 본체 클릭이 선택과 삭제를 동시에 수행하면 사용자가 실수로 삭제할 수 있습니다. 삭제는 별도 버튼에 위임하세요.',
          level: 'avoid'
        },
        {
          id: 'chip-a2',
          title: '아이콘만 있는 버튼에 접근명 없음',
          description: '× 아이콘만 렌더링하고 aria-label이 없으면 스크린리더 사용자가 기능을 알 수 없습니다.',
          level: 'avoid'
        }
      ]
    },
    codeSample: {
      language: 'tsx',
      label: 'Baseline (HTML)',
      code: `import './index.css'
import { useState } from 'react'

export default function App() {
  const [tags, setTags] = useState(['Design', 'Engineering', 'Research'])

  const remove = (t: string) => setTags((prev) => prev.filter((x) => x !== t))

  return (
    <div className='app'>
      <ul
        role='group'
        aria-label='Selected filters'
        className='chip-list'>
        {tags.map((t) => (
          <li
            key={t}
            className='chip'>
            <span>{t}</span>
            <button
              type='button'
              aria-label={\`Remove \${t}\`}
              className='chip-remove'
              onClick={() => remove(t)}>
              ×
            </button>
          </li>
        ))}
      </ul>
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
          id: 'chip-mui-1',
          title: 'onDelete/onClick 사용 시 button 동작 확인',
          description:
            'MUI Chip은 onClick 또는 onDelete prop이 있으면 Tab 순서에 포함되고 포커스된 상태에서 Backspace/Delete로 onDelete가 호출됩니다. 접근성 API가 자동 연결됩니다.',
          level: 'must'
        },
        {
          id: 'chip-mui-2',
          title: 'deleteIcon에 aria-label 확인',
          description:
            '커스텀 deleteIcon을 사용할 때는 MUI 기본 접근명이 유실될 수 있습니다. 필요하면 Chip 자체에 aria-label을 지정해 대상을 명시하세요.',
          level: 'should'
        },
        {
          id: 'chip-mui-3',
          title: '색상만으로 상태 구분 금지',
          description: 'color prop(primary/success/error)만으로 상태를 구분하지 말고 label 텍스트 또는 아이콘을 함께 사용하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Chip',
        code: `import './index.css'
import { useState } from 'react'
import { Chip, Stack } from '@mui/material'

export default function App() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Accessibility'])

  const handleDelete = (target: string) => {
    setTags((prev) => prev.filter((t) => t !== target))
  }

  return (
    <div className='app'>
      <Stack
        direction='row'
        spacing={1}
        role='group'
        aria-label='Selected skills'>
        {tags.map((t) => (
          <Chip
            key={t}
            label={t}
            onDelete={() => handleDelete(t)}
            aria-label={\`\${t}, press Backspace to remove\`}
          />
        ))}
      </Stack>
    </div>
  )
}`
      },
      notes: [
        "MUI Chip에 onClick 또는 onDelete를 전달하면 자동으로 tab 순서에 포함되고 role='button'처럼 동작합니다.",
        '포커스된 Chip에서 Backspace/Delete 키로 onDelete가 호출되며, Escape는 blur 처리됩니다 (MUI 내장 동작).',
        '삭제 아이콘의 기본 접근명은 브라우저 언어에 따라 달라집니다. 명확성을 위해 Chip에 aria-label을 지정하거나 label 자체에 의미를 담으세요.',
        'Stack에 role="group"과 aria-label을 부여해 chip 그룹의 목적을 전달하세요.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'chip-antd-1',
          title: 'closable Tag는 접근명 필요',
          description:
            'Ant Tag는 closable prop으로 닫기 아이콘을 노출합니다. 기본 close 버튼에 접근명이 없을 수 있으므로 closeIcon을 커스텀하고 aria-label을 부여하세요.',
          level: 'must'
        },
        {
          id: 'chip-antd-2',
          title: 'CheckableTag에 role/aria-pressed 확인',
          description:
            'Tag.CheckableTag는 클릭 시 checked 상태가 토글됩니다. 내부적으로 role="checkbox" + aria-checked를 자동 설정하지만, 그룹 컨테이너에 aria-label을 제공하세요.',
          level: 'must'
        },
        {
          id: 'chip-antd-3',
          title: 'color만으로 상태 구분 금지',
          description: '색만 바꾸지 말고 텍스트 라벨을 항상 포함해 상태(success/error 등)를 명시하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Tag',
        code: `import './index.css'
import { useState } from 'react'
import { Tag, Space } from 'antd'

export default function App() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Accessibility'])

  const handleClose = (removed: string) => {
    setTags((prev) => prev.filter((t) => t !== removed))
  }

  return (
    <div className='app'>
      <Space
        wrap
        role='group'
        aria-label='Selected skills'>
        {tags.map((t) => (
          <Tag
            key={t}
            closable
            closeIcon={<span aria-label={\`Remove \${t}\`}>×</span>}
            onClose={(e) => {
              e.preventDefault()
              handleClose(t)
            }}>
            {t}
          </Tag>
        ))}
      </Space>
    </div>
  )
}`
      },
      notes: [
        'Ant Tag의 closable prop은 기본 close 버튼을 렌더링합니다. 기본 버튼에 접근명이 없다면 closeIcon으로 커스텀하고 aria-label을 부여하세요.',
        'onClose에 전달되는 이벤트에 e.preventDefault()를 호출하면 기본 동작을 막고 직접 상태를 제어할 수 있습니다.',
        'Tag.CheckableTag는 선택 가능한 chip 패턴에 적합하며, checked/onChange로 상태를 제어합니다.',
        'Space(role="group") + aria-label로 tag 그룹의 목적을 명시하세요.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'chip-chakra-1',
          title: 'Tag.CloseTrigger에 접근명',
          description:
            'Chakra v3 Tag.CloseTrigger는 기본 button 요소입니다. 아이콘만 있으므로 aria-label을 명시해 대상 태그를 식별할 수 있게 하세요.',
          level: 'must'
        },
        {
          id: 'chip-chakra-2',
          title: 'Tag.Label에 실제 텍스트 제공',
          description: 'Tag.Label은 태그의 가시 텍스트입니다. 색상/아이콘만으로 의미를 전달하지 말고 Label 텍스트에 의미를 담으세요.',
          level: 'must'
        },
        {
          id: 'chip-chakra-3',
          title: '그룹 컨테이너에 role/aria-label',
          description: 'Tag 여러 개를 묶는 Wrap/HStack에 role="group"과 aria-label을 추가해 그룹의 목적을 스크린리더에 전달하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI Tag',
        code: `import './index.css'
import { useState } from 'react'
import { Tag, HStack } from '@chakra-ui/react'

export default function App() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Accessibility'])

  const remove = (t: string) => setTags((prev) => prev.filter((x) => x !== t))

  return (
    <div className='app'>
      <HStack
        gap='8px'
        role='group'
        aria-label='Selected skills'>
        {tags.map((t) => (
          <Tag.Root
            key={t}
            colorPalette='teal'
            variant='surface'>
            <Tag.Label>{t}</Tag.Label>
            <Tag.EndElement>
              <Tag.CloseTrigger
                aria-label={\`Remove \${t}\`}
                onClick={() => remove(t)}
              />
            </Tag.EndElement>
          </Tag.Root>
        ))}
      </HStack>
    </div>
  )
}`
      },
      notes: [
        'Chakra v3 Tag는 Tag.Root / Tag.Label / Tag.StartElement / Tag.EndElement / Tag.CloseTrigger 네임스페이스 구조입니다.',
        'Tag.CloseTrigger는 내부적으로 button을 렌더링합니다. 아이콘만 있으므로 aria-label이 필수입니다.',
        'colorPalette와 variant(subtle/solid/outline/surface)는 시각 표현만 변경합니다. 의미는 Tag.Label 텍스트로 전달하세요.',
        'HStack/Wrap에 role="group"과 aria-label을 부여해 chip 그룹의 목적을 명시하세요.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'chip-spectrum-1',
          title: 'TagGroup에 aria-label 필수',
          description:
            'React Aria TagGroup은 focusable 리스트입니다. <TagGroup aria-label="...">으로 그룹 목적을 반드시 명시해야 스크린리더가 그룹을 인식합니다.',
          level: 'must'
        },
        {
          id: 'chip-spectrum-2',
          title: 'onRemove로 키보드 삭제 활성화',
          description:
            'onRemove prop을 제공하면 포커스된 Tag에서 Backspace/Delete 키로 삭제가 자동 호출됩니다. prop 없이 버튼만 두면 키보드 삭제가 동작하지 않습니다.',
          level: 'must'
        },
        {
          id: 'chip-spectrum-3',
          title: 'selectionMode로 선택 의미 명시',
          description:
            "selectionMode='single' 또는 'multiple'을 지정하면 각 Tag에 aria-selected가 자동 연결됩니다. 단순 목록이라면 selectionMode='none'으로 두세요.",
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria TagGroup',
        code: `import './index.css'
import { useState } from 'react'
import { TagGroup, TagList, Tag, Button, Label } from 'react-aria-components'

interface SkillItem {
  id: string
  name: string
}

export default function App() {
  const [items, setItems] = useState<SkillItem[]>([
    { id: 'react', name: 'React' },
    { id: 'ts', name: 'TypeScript' },
    { id: 'a11y', name: 'Accessibility' }
  ])

  const handleRemove = (keys: Set<string | number>) => {
    setItems((prev) => prev.filter((i) => !keys.has(i.id)))
  }

  return (
    <div className='app'>
      <TagGroup
        selectionMode='none'
        onRemove={handleRemove}>
        <Label>Selected skills</Label>
        <TagList
          items={items}
          className='chip-list'>
          {(item) => (
            <Tag
              id={item.id}
              textValue={item.name}
              className='chip'>
              {item.name}
              <Button
                slot='remove'
                aria-label={\`Remove \${item.name}\`}
                className='chip-remove'>
                ×
              </Button>
            </Tag>
          )}
        </TagList>
      </TagGroup>
    </div>
  )
}`
      },
      notes: [
        'TagGroup은 focusable list로 화살표 키 내비게이션을 자동 제공합니다.',
        'onRemove prop이 있을 때만 포커스된 Tag에서 Backspace/Delete가 삭제를 호출합니다. prop 없이는 키보드 삭제가 동작하지 않습니다.',
        'slot="remove"가 있는 Button은 TagGroup이 자동으로 삭제 트리거로 인식합니다. aria-label은 여전히 수동으로 제공해야 대상이 명확해집니다.',
        'selectionMode=single/multiple을 지정하면 aria-selected가 자동 연결됩니다.',
        'Label 컴포넌트는 TagGroup의 aria-labelledby를 자동 연결합니다. Label 대신 aria-label prop을 직접 사용해도 됩니다.'
      ]
    }
  }
}
