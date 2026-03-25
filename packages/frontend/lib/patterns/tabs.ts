import type { Pattern } from '../types'

export const tabsPattern: Pattern = {
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
  { id: 'tab-2', label: 'Tab 2', content: 'Panel 2 content' }
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
      <div role='tablist'>
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            id={tab.id}
            role='tab'
            aria-selected={active === tab.id}
            aria-controls={\`panel-\${tab.id}\`}
            tabIndex={active === tab.id ? 0 : -1}
            onClick={() => setActive(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, i)}>
            {tab.label}
          </button>
        ))}
      </div>
      {TABS.map((tab) => (
        <div
          key={tab.id}
          id={\`panel-\${tab.id}\`}
          role='tabpanel'
          aria-labelledby={tab.id}
          hidden={active !== tab.id}>
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
      <Tabs
        value={value}
        onChange={(_, v) => setValue(v)}
        aria-label='content tabs'>
        <Tab
          label='Tab 1'
          id='tab-0'
          aria-controls='panel-0'
        />
        <Tab
          label='Tab 2'
          id='tab-1'
          aria-controls='panel-1'
        />
      </Tabs>
      <div
        role='tabpanel'
        id='panel-0'
        aria-labelledby='tab-0'
        hidden={value !== 0}>
        Panel 1
      </div>
      <div
        role='tabpanel'
        id='panel-1'
        aria-labelledby='tab-1'
        hidden={value !== 1}>
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
    <Tabs.Root
      defaultValue='tab1'
      activationMode='manual'>
      <Tabs.List aria-label='Content tabs'>
        <Tabs.Trigger value='tab1'>Tab 1</Tabs.Trigger>
        <Tabs.Trigger value='tab2'>Tab 2</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value='tab1'>Panel 1 content</Tabs.Content>
      <Tabs.Content value='tab2'>Panel 2 content</Tabs.Content>
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
  { key: '2', label: 'Tab 2', children: 'Panel 2 content' }
]

export function AntTabs() {
  return (
    <Tabs
      defaultActiveKey='1'
      items={items}
    />
  )
}`
      },
      notes: ['Ant Design Tabs는 기본적으로 접근성 속성을 처리합니다.', 'tabBarExtraContent 사용 시 해당 콘텐츠도 키보드로 접근 가능한지 확인하세요.']
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
<Tabs.Root defaultValue='account'>
  <Tabs.List aria-label='계정 설정'>
    <Tabs.Trigger value='account'>계정</Tabs.Trigger>
    <Tabs.Trigger value='password'>비밀번호</Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content value='account'>계정 설정 내용</Tabs.Content>
  <Tabs.Content value='password'>비밀번호 변경 내용</Tabs.Content>
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
  <TabList aria-label='계정 설정'>
    <Tab id='account'>계정</Tab>
    <Tab id='password'>비밀번호</Tab>
  </TabList>
  <TabPanels>
    <TabPanel id='account'>계정 설정 내용</TabPanel>
    <TabPanel id='password'>비밀번호 변경 내용</TabPanel>
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
}
