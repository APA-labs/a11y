import type { Pattern } from '../types'

export const badgePattern: Pattern = {
  slug: 'badge',
  name: 'Badge',
  description: '다른 요소에 부착되어 상태/카운트를 시각적으로 나타내는 비인터랙티브 인디케이터',
  wcagCriteria: ['1.1.1 Non-text Content', '1.4.1 Use of Color', '4.1.2 Name, Role, Value'],
  tags: ['status', 'indicator', 'notification'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'badge-m1',
          title: '배지를 포함하는 요소에 접근명 제공',
          description: '배지가 붙은 부모 요소(버튼/아이콘)에 aria-label로 전체 의미를 전달해야 합니다. 숫자만으로는 의미가 전달되지 않습니다.',
          level: 'must'
        },
        {
          id: 'badge-m2',
          title: '카운트에 단위 포함',
          description: '"3" 대신 "3 unread notifications"처럼 단위와 맥락을 포함한 접근명을 작성하세요.',
          level: 'must'
        },
        {
          id: 'badge-m3',
          title: '색상만으로 의미 전달 금지',
          description: 'success/error/warning 상태를 색상만으로 구분하지 말고 텍스트 라벨 또는 접근명을 함께 제공하세요. (WCAG 1.4.1)',
          level: 'must'
        }
      ],
      should: [
        {
          id: 'badge-s1',
          title: '장식용 배지는 aria-hidden',
          description: '시각적 표시만 담당하는 dot 배지에는 aria-hidden="true"를 추가하고, 의미는 부모 요소에서 전달하세요.',
          level: 'should'
        },
        {
          id: 'badge-s2',
          title: '동적 업데이트는 live region',
          description: '실시간으로 변하는 카운트는 role="status" 또는 aria-live="polite"로 변경을 알리세요.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'badge-a1',
          title: '중복 안내 금지',
          description: '부모 요소와 배지 텍스트가 모두 읽혀 "inbox 3 3"처럼 중복되지 않도록 배지 텍스트는 aria-hidden으로 숨기세요.',
          level: 'avoid'
        },
        {
          id: 'badge-a2',
          title: '색상만으로 상태 구분 금지',
          description: 'green dot과 red dot 만으로 success/error를 구분하는 UI는 색맹 사용자가 구분할 수 없습니다.',
          level: 'avoid'
        }
      ]
    },
    codeSample: {
      language: 'tsx',
      label: 'Baseline (HTML)',
      code: `import './index.css'

export default function App() {
  const unread = 3

  return (
    <div className='app row'>
      <button
        type='button'
        aria-label={\`Inbox, \${unread} unread messages\`}
        className='badge-wrap badge-icon'>
        <span aria-hidden>📥</span>
        {unread > 0 ? (
          <span
            aria-hidden
            className='badge-count'>
            {unread > 99 ? '99+' : unread}
          </span>
        ) : null}
      </button>

      <span className='badge-status'>
        <span
          aria-hidden
          className='badge-status-dot success'
        />
        <span>Online</span>
      </span>
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
          id: 'badge-mui-1',
          title: '부모 요소에 aria-label 추가',
          description:
            'MUI Badge는 badgeContent의 숫자가 스크린리더에 신뢰성 있게 전달되지 않습니다. 감싸는 IconButton이나 버튼에 aria-label로 전체 의미를 제공하세요.',
          level: 'must'
        },
        {
          id: 'badge-mui-2',
          title: 'variant="dot"은 색 외의 단서 필요',
          description: 'dot 배지는 시각적 표시만 담당하므로 부모 요소 aria-label에 상태를 포함시키세요.',
          level: 'must'
        },
        {
          id: 'badge-mui-3',
          title: 'showZero 여부 결정',
          description: 'badgeContent={0}은 기본적으로 숨겨집니다. 0도 표시해야 한다면 showZero를 명시하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Badge',
        code: `import './index.css'
import { Badge, IconButton, Stack } from '@mui/material'

export default function App() {
  const mailCount = 4
  const cartCount = 100

  const notificationsLabel = (n: number) => {
    if (n === 0) return 'No new notifications'
    if (n > 99) return 'more than 99 notifications'
    return \`\${n} notifications\`
  }

  return (
    <div className='app'>
      <Stack
        direction='row'
        spacing={3}>
        <IconButton aria-label={\`Inbox, \${notificationsLabel(mailCount)}\`}>
          <Badge
            badgeContent={mailCount}
            color='primary'>
            <span aria-hidden>📧</span>
          </Badge>
        </IconButton>

        <IconButton aria-label={\`Cart, \${notificationsLabel(cartCount)}\`}>
          <Badge
            badgeContent={cartCount}
            color='secondary'
            max={99}>
            <span aria-hidden>🛒</span>
          </Badge>
        </IconButton>

        <IconButton aria-label='Profile, status online'>
          <Badge
            variant='dot'
            color='success'>
            <span aria-hidden>👤</span>
          </Badge>
        </IconButton>
      </Stack>
    </div>
  )
}`
      },
      notes: [
        'MUI Badge의 badgeContent는 시각적 표시이며 스크린리더 안내로는 부족합니다. 부모 IconButton/버튼의 aria-label에 전체 문맥을 작성하세요.',
        'max prop은 overflow 표시(99+)를 자동 처리합니다.',
        "variant='dot'은 아이콘만 있는 배지로, color prop이 상태 의미를 전달합니다. 색상에만 의존하지 말고 aria-label로 의미를 제공하세요.",
        'badgeContent={0}은 기본적으로 숨겨집니다. 0도 표시하려면 showZero를 사용하세요.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'badge-antd-1',
          title: 'title prop으로 접근명 강화',
          description:
            'Ant Badge의 title prop은 네이티브 title 속성으로 전달되어 hover/screenreader에서 노출됩니다. 숫자 배지에 의미 있는 문구를 지정하세요.',
          level: 'must'
        },
        {
          id: 'badge-antd-2',
          title: 'status/color 배지에 텍스트 라벨',
          description:
            '<Badge status="success" text="Ready" /> 처럼 text prop으로 시각 라벨을 함께 제공하세요. 색만으로 상태 구분을 하면 색맹 사용자가 인식할 수 없습니다.',
          level: 'must'
        },
        {
          id: 'badge-antd-3',
          title: 'Badge.Ribbon에도 접근명',
          description: 'Ribbon 내부 text가 장식적이라면, 감싸는 카드나 버튼의 aria-label에 리본 내용을 포함시키세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Badge',
        code: `import './index.css'
import { Badge, Space, Button } from 'antd'

export default function App() {
  const unread = 5

  return (
    <div className='app'>
      <Space size='large'>
        <Button
          type='text'
          aria-label={\`Messages, \${unread} unread\`}
          title={\`\${unread} unread messages\`}>
          <Badge
            count={unread}
            title={\`\${unread} unread messages\`}>
            <span aria-hidden>💬</span>
          </Badge>
        </Button>

        <Badge
          status='success'
          text='Deployment ready'
        />
        <Badge
          status='error'
          text='Build failed'
        />
        <Badge
          status='warning'
          text='Action required'
        />
      </Space>
    </div>
  )
}`
      },
      notes: [
        'Ant Badge의 count prop에는 title을 함께 전달해 의미를 보강하세요.',
        'status + text 조합은 색맹 사용자에게 필수적입니다. text 없이 status만 사용하지 마세요.',
        'overflowCount(기본 99)는 자동으로 "99+"를 표시합니다.',
        'dot 배지는 boolean dot prop으로 활성화되며, 이 경우 반드시 부모 aria-label에 상태 설명이 있어야 합니다.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'badge-chakra-1',
          title: 'Chakra Badge는 텍스트 컴포넌트',
          description:
            'Chakra v3 Badge는 라벨/상태 텍스트를 직접 렌더링하는 컴포넌트입니다. 단독 사용 시 텍스트 자체가 접근명이 되므로 의미 있는 단어를 사용하세요.',
          level: 'must'
        },
        {
          id: 'badge-chakra-2',
          title: 'colorPalette만으로 상태 구분 금지',
          description: 'colorPalette="red" 같은 색상만으로 error를 구분하지 말고 "Error", "Draft" 같은 텍스트 라벨을 함께 사용하세요. (WCAG 1.4.1)',
          level: 'must'
        },
        {
          id: 'badge-chakra-3',
          title: '카운트 배지로 사용 시 부모에 접근명',
          description:
            'Chakra Badge를 IconButton 위에 절대 위치로 띄워 카운트 배지로 사용한다면, 감싸는 버튼에 aria-label로 전체 의미를 제공해야 합니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra Badge',
        code: `import './index.css'
import { Badge, HStack, Stack, Text } from '@chakra-ui/react'

export default function App() {
  return (
    <div className='app'>
      <Stack gap='16px'>
        <HStack gap='8px'>
          <Text>Deployment:</Text>
          <Badge colorPalette='green'>Ready</Badge>
        </HStack>
        <HStack gap='8px'>
          <Text>Build:</Text>
          <Badge colorPalette='red'>Failed</Badge>
        </HStack>
        <HStack gap='8px'>
          <Text>Plan:</Text>
          <Badge
            colorPalette='purple'
            variant='solid'>
            Pro
          </Badge>
          <Badge
            colorPalette='gray'
            variant='outline'>
            Beta
          </Badge>
        </HStack>
      </Stack>
    </div>
  )
}`
      },
      notes: [
        'Chakra v3 Badge는 단순 label 컴포넌트입니다. children 텍스트가 접근명이 되므로 "Ready", "Failed" 등 명확한 단어를 사용하세요.',
        'colorPalette는 시각적 차이만 제공합니다. 스크린리더가 색상을 인지하지 못하므로 텍스트에 상태 의미를 담으세요.',
        'variant는 solid/subtle/outline/surface/plain 중 선택할 수 있습니다.',
        '카운트 배지(숫자 + 아이콘) 패턴으로 사용할 때는 부모 버튼에 aria-label을 추가해 전체 문맥을 전달하세요.'
      ]
    }
  }
}
