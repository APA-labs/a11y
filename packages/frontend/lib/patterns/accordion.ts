import type { Pattern } from '../types'

export const accordionPattern: Pattern = {
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
        code: `import { useState } from 'react'
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
    <div style={{ maxWidth: 600, margin: '24px auto', padding: '0 16px' }}>
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
    <Accordion.Root
      type='single'
      collapsible>
      <Accordion.Item value='item-1'>
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
  { key: '2', label: 'Section 2', children: <p>Content 2</p> }
]

export function AntAccordion() {
  return (
    <Collapse
      accordion
      items={items}
    />
  )
}`
      },
      notes: ['Ant Design Collapse는 기본적으로 접근성 속성을 처리합니다.', 'showArrow={false}로 화살표를 숨기더라도 시각적 상태 변화는 유지하세요.']
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
<Accordion.Root
  collapsible
  defaultValue={['item-1']}>
  <Accordion.Item value='item-1'>
    <Accordion.ItemTrigger>
      Shipping Info
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>Ships within 2–3 business days after order.</Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>
  <Accordion.Item value='item-2'>
    <Accordion.ItemTrigger>
      Return Policy
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>Returns accepted within 7 days of receipt.</Accordion.ItemBody>
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
          description: 'Accordion.Root에 multiple prop을 추가하면 여러 패널을 동시에 열 수 있습니다. 기본은 단일 열기입니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI Accordion',
        code: `import { Accordion } from '@base-ui/react/accordion'

export default function App() {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.Trigger>
            What is Base UI?
            <span aria-hidden>+</span>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>Base UI is a library of high-quality unstyled React components for design systems and web apps.</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.Trigger>
            Is it accessible?
            <span aria-hidden>+</span>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel>Yes, all components follow WAI-ARIA patterns out of the box.</Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  )
}`
      },
      notes: [
        'Accordion.Header는 기본적으로 <h3>를 렌더링합니다. render prop으로 레벨을 변경할 수 있습니다.',
        'Accordion.Trigger는 aria-expanded를 자동으로 관리합니다.',
        'multiple prop을 추가하면 여러 패널을 동시에 열 수 있습니다. 기본값은 false(단일 열기)입니다.'
      ]
    }
  }
}
