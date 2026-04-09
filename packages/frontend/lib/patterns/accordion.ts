import type { Pattern } from '../types'

export const accordionPattern: Pattern = {
  slug: 'accordion',
  name: 'Accordion',
  description: '섹션별로 콘텐츠를 접고 펼칠 수 있는 컴포넌트',
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
  { id: 'item-2', heading: 'Section 2', content: 'Content for section 2' }
]

export function Accordion() {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div>
      {ITEMS.map((item) => (
        <div key={item.id}>
          <h3>
            <button
              type='button'
              aria-expanded={open === item.id}
              aria-controls={\`panel-\${item.id}\`}
              onClick={() => setOpen(open === item.id ? null : item.id)}>
              {item.heading}
            </button>
          </h3>
          <div
            id={\`panel-\${item.id}\`}
            role='region'
            aria-labelledby={item.id}
            hidden={open !== item.id}>
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
          title: 'AccordionSummary에 id와 aria-controls 명시',
          description:
            'WAI-ARIA 가이드라인에 따라 AccordionSummary에 id를, aria-controls에 패널 id를 지정해야 합니다. MUI는 이를 기반으로 aria-labelledby를 자동 파생합니다.',
          level: 'must'
        },
        {
          id: 'accordion-mui-2',
          title: 'slotProps.heading으로 헤딩 레벨 조정',
          description: 'Accordion은 기본적으로 h3를 사용합니다. 페이지 헤딩 계층에 맞게 slotProps={{ heading: { component: "h2" } }}로 변경하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Accordion',
        code: `import './index.css'
import { useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'

const ITEMS = [
  { id: 'panel1', heading: 'What is Material UI?', content: "Material UI is a React component library implementing Google's Material Design." },
  { id: 'panel2', heading: 'Is it accessible?', content: 'Yes. MUI Accordion follows the WAI-ARIA Accordion pattern with full keyboard support.' },
  { id: 'panel3', heading: 'Can I customize it?', content: 'Yes. Use the sx prop, theme overrides, or slotProps for deep customization.' }
]

export default function App() {
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div className='app accordion-root'>
      {ITEMS.map((item) => (
        <Accordion
          key={item.id}
          expanded={expanded === item.id}
          onChange={handleChange(item.id)}
          slotProps={{ heading: { component: 'h3' } }}>
          <AccordionSummary
            expandIcon={<span aria-hidden>▼</span>}
            aria-controls={\`\${item.id}-content\`}
            id={\`\${item.id}-header\`}>
            {item.heading}
          </AccordionSummary>
          <AccordionDetails id={\`\${item.id}-content\`}>
            <Typography>{item.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}`
      },
      notes: [
        'AccordionSummary의 id와 aria-controls를 설정하면 MUI가 패널에 aria-labelledby를 자동으로 파생합니다.',
        'aria-expanded는 expanded prop 상태에 따라 자동으로 관리됩니다.',
        'slotProps={{ heading: { component: "h3" } }}로 헤딩 레벨을 페이지 구조에 맞게 조정하세요.',
        'slotProps={{ transition: { unmountOnExit: true } }}로 비활성 패널을 DOM에서 제거해 성능을 개선할 수 있습니다.'
      ]
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'accordion-radix-1',
          title: 'type prop으로 단일/다중 열기 제어',
          description:
            'type="single"이면 하나의 패널만 열립니다. type="multiple"이면 여러 패널을 동시에 열 수 있습니다. 이 동작을 UI로 명확히 전달하세요.',
          level: 'should'
        },
        {
          id: 'accordion-radix-2',
          title: 'collapsible prop으로 모두 닫기 허용',
          description: 'type="single"일 때 collapsible prop을 추가하면 열린 패널을 다시 클릭해 닫을 수 있습니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Accordion',
        code: `import './index.css'
import * as Accordion from '@radix-ui/react-accordion'

const ITEMS = [
  {
    value: 'item-1',
    heading: 'What is Radix UI?',
    content: 'Radix UI is a low-level UI component library focused on accessibility, customization, and developer experience.'
  },
  {
    value: 'item-2',
    heading: 'Is it accessible?',
    content: 'Yes. Radix components follow WAI-ARIA patterns and handle keyboard navigation automatically.'
  },
  {
    value: 'item-3',
    heading: 'Can I style it?',
    content: 'Radix is unstyled by default. Apply any CSS solution — inline styles, CSS modules, Tailwind, or CSS-in-JS.'
  }
]

export default function App() {
  return (
    <Accordion.Root
      type='single'
      collapsible
      className='app accordion-root'>
      {ITEMS.map((item) => (
        <Accordion.Item
          key={item.value}
          value={item.value}
          className='accordion-item-sep'>
          <Accordion.Header>
            <Accordion.Trigger className='accordion-trigger-btn'>
              {item.heading}
              <span aria-hidden>›</span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className='accordion-content-text'>{item.content}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}`
      },
      notes: [
        'Accordion.Root의 type prop: "single"(한 번에 하나 열기), "multiple"(여러 개 동시 열기). collapsible은 type="single"일 때만 유효합니다.',
        'Accordion.Header는 기본적으로 <h3>를 렌더링합니다. asChild prop으로 헤딩 레벨을 변경할 수 있습니다.',
        'aria-expanded와 data-state("open" | "closed") 속성이 Accordion.Trigger에 자동으로 관리됩니다.',
        'defaultValue(비제어) 또는 value + onValueChange(제어)로 열림 상태를 관리할 수 있습니다.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'accordion-antd-1',
          title: 'accordion prop으로 단일 열기 모드 사용',
          description:
            'accordion={true}로 설정하면 한 번에 하나의 패널만 열립니다. WAI-ARIA Accordion 패턴에 부합하며 이 동작을 UI로 명확히 전달하세요.',
          level: 'should'
        },
        {
          id: 'accordion-antd-2',
          title: 'items API 사용 (v5.6.0+)',
          description:
            '구형 Collapse.Panel 대신 items prop을 사용하세요. label(제목)과 children(내용)으로 구성하며 내부적으로 aria-expanded가 자동 관리됩니다.',
          level: 'must'
        },
        {
          id: 'accordion-antd-3',
          title: 'collapsible 속성으로 트리거 영역 제어',
          description: "collapsible='disabled'로 특정 패널을 비활성화할 수 있습니다. 이때 헤더에 aria-disabled가 자동으로 적용되는지 확인하세요.",
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Collapse',
        code: `import './index.css'
import { Collapse } from 'antd'

const items = [
  {
    key: '1',
    label: 'What is Ant Design?',
    children: <p className='mb-0'>Ant Design is an enterprise-class UI design language and React component library.</p>
  },
  {
    key: '2',
    label: 'Is it accessible?',
    children: <p className='mb-0'>Ant Design Collapse manages aria-expanded automatically and supports keyboard navigation.</p>
  },
  {
    key: '3',
    label: 'Disabled panel',
    children: <p className='mb-0'>This panel cannot be collapsed.</p>,
    collapsible: 'disabled'
  }
]

export default function App() {
  return (
    <div className='app max-w-560'>
      <Collapse
        accordion
        items={items}
        defaultActiveKey={['1']}
      />
    </div>
  )
}`
      },
      notes: [
        'Collapse는 각 패널 헤더에 버튼 역할과 aria-expanded를 자동으로 관리합니다.',
        'items prop을 사용하세요. Collapse.Panel은 v5.6.0에서 deprecated되었습니다.',
        'accordion={true} 설정 시 단일 패널 열기 모드로 동작합니다.',
        'expandIconPlacement prop으로 확장 아이콘 위치를 start 또는 end로 설정할 수 있습니다.'
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
        code: `import './index.css'
import { Accordion } from '@chakra-ui/react'

const ITEMS = [
  { value: 'shipping', label: 'Shipping Info', body: 'Ships within 2–3 business days after order confirmation.' },
  { value: 'returns', label: 'Return Policy', body: 'Returns accepted within 7 days of receipt in original condition.' },
  { value: 'warranty', label: 'Warranty', body: '1-year limited warranty covering manufacturing defects.' }
]

export default function App() {
  return (
    <Accordion.Root
      collapsible
      defaultValue={['shipping']}
      className='app max-w-480'>
      {ITEMS.map((item) => (
        <Accordion.Item
          key={item.value}
          value={item.value}
          className='accordion-item-sep'>
          <Accordion.ItemTrigger className='accordion-trigger-btn'>
            {item.label}
            <Accordion.ItemIndicator aria-hidden />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody className='accordion-content-text'>{item.body}</Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}`
      },
      notes: [
        'Chakra Accordion.Root는 키보드 네비게이션과 aria-expanded를 자동 처리합니다.',
        'multiple prop을 추가하면 여러 항목을 동시에 열 수 있습니다.',
        'ItemIndicator는 aria-hidden 처리되는 시각적 화살표입니다.',
        'collapsible prop으로 열린 항목을 다시 클릭해 닫을 수 있습니다.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'accordion-spectrum-1',
          title: 'allowsMultipleExpanded로 다중 열기 제어',
          description: 'DisclosureGroup에 allowsMultipleExpanded prop을 추가하면 여러 항목을 동시에 열 수 있습니다. 기본값은 단일 열기입니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria DisclosureGroup',
        code: `import './index.css'
import { Disclosure, DisclosureGroup, Heading, DisclosurePanel, Button } from 'react-aria-components'

const ITEMS = [
  { id: 'shipping', title: 'Shipping Info', content: 'Ships within 2–3 business days after order confirmation.' },
  { id: 'returns', title: 'Return Policy', content: 'Returns accepted within 7 days of receipt in original condition.' },
  { id: 'warranty', title: 'Warranty', content: '1-year limited warranty covering manufacturing defects.' }
]

export default function App() {
  return (
    <DisclosureGroup
      defaultExpandedKeys={['shipping']}
      className='app max-w-480'>
      {ITEMS.map((item) => (
        <Disclosure
          key={item.id}
          id={item.id}
          className='accordion-item-sep'>
          <Heading>
            <Button
              slot='trigger'
              className='accordion-trigger-btn'>
              {item.title}
              <span aria-hidden>›</span>
            </Button>
          </Heading>
          <DisclosurePanel className='accordion-content-text'>{item.content}</DisclosurePanel>
        </Disclosure>
      ))}
    </DisclosureGroup>
  )
}`
      },
      notes: [
        'DisclosureGroup은 여러 Disclosure 항목을 그룹화하는 아코디언 컴포넌트입니다.',
        'defaultExpandedKeys/expandedKeys에 각 Disclosure의 id를 배열로 전달해 열림 상태를 제어하세요.',
        'allowsMultipleExpanded prop을 추가하면 여러 항목을 동시에 열 수 있습니다. 기본값은 false입니다.',
        "Heading 내부의 Button에 slot='trigger'를 지정해야 aria-expanded가 자동 관리됩니다."
      ]
    },
    baseui: {
      id: 'baseui',
      name: 'Base UI',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'accordion-baseui-1',
          title: 'Accordion.Header 사용 필수',
          description: 'Accordion.Header는 기본적으로 <h3>를 렌더링하여 페이지 문서 구조를 스크린리더에 전달합니다. 생략하지 마세요.',
          level: 'must'
        },
        {
          id: 'accordion-baseui-2',
          title: 'multiple prop으로 다중 열기 제어',
          description: 'Accordion.Root에 multiple prop을 추가하면 여러 패널을 동시에 열 수 있습니다. 기본은 단일 열기(false)입니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI Accordion',
        code: `import './index.css'
import { Accordion } from '@base-ui-components/react/accordion'

const ITEMS = [
  { value: 'q1', heading: 'What is Base UI?', content: 'Base UI is a library of unstyled React components for design systems and web apps.' },
  {
    value: 'q2',
    heading: 'Is it accessible?',
    content: 'Yes. All components follow WAI-ARIA patterns and handle keyboard navigation automatically.'
  },
  { value: 'q3', heading: 'Can I style it?', content: 'Yes. Apply any CSS solution — inline styles, CSS modules, Tailwind, or CSS-in-JS.' }
]

export default function App() {
  return (
    <Accordion.Root className='app accordion-root'>
      {ITEMS.map((item) => (
        <Accordion.Item
          key={item.value}
          value={item.value}
          className='accordion-item-sep'>
          <Accordion.Header>
            <Accordion.Trigger className='accordion-trigger-btn'>
              {item.heading}
              <span aria-hidden>+</span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className='accordion-content-text'>{item.content}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}`
      },
      notes: [
        'Accordion.Header는 기본적으로 <h3>를 렌더링합니다. render prop으로 헤딩 레벨을 변경할 수 있습니다.',
        'Accordion.Trigger는 aria-expanded를 자동으로 관리합니다. data-panel-open 속성으로 CSS 스타일링이 가능합니다.',
        'multiple prop(기본 false)을 추가하면 여러 패널을 동시에 열 수 있습니다.',
        'loopFocus prop(기본 true)으로 화살표 키 탐색 시 처음/끝에서 순환 여부를 제어합니다.',
        'hiddenUntilFound prop을 사용하면 브라우저 내 검색(Ctrl+F)에서 닫힌 패널 내용도 찾을 수 있습니다.'
      ]
    }
  }
}
