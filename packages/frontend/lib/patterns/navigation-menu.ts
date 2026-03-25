import type { Pattern } from '../types'

export const navigationMenuPattern: Pattern = {
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
  const [openMenu, setOpenMenu] = useState(null)
  const currentPath = '/about'
  const items = [
    { id: 'home', label: '홈', href: '/' },
    {
      id: 'about',
      label: '소개',
      href: '/about',
      children: [
        { id: 'team', label: '팀', href: '/about/team' },
        { id: 'history', label: '연혁', href: '/about/history' }
      ]
    },
    { id: 'contact', label: '문의', href: '/contact' }
  ]

  return (
    <nav aria-label='메인 내비게이션'>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '8px', padding: 0, margin: 0 }}>
        {items.map((item) => (
          <li key={item.id}>
            {item.children ? (
              <>
                <button
                  aria-haspopup='menu'
                  aria-expanded={openMenu === item.id}
                  onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)}
                  onKeyDown={(e) => e.key === 'Escape' && setOpenMenu(null)}>
                  {item.label} ▾
                </button>
                {openMenu === item.id && (
                  <ul
                    role='menu'
                    style={{
                      listStyle: 'none',
                      padding: '4px',
                      margin: 0,
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      position: 'absolute',
                      background: 'white'
                    }}>
                    {item.children.map((child) => (
                      <li
                        key={child.id}
                        role='none'>
                        <a
                          href={child.href}
                          role='menuitem'
                          aria-current={currentPath === child.href ? 'page' : undefined}
                          style={{
                            display: 'block',
                            padding: '4px 8px',
                            textDecoration: 'none',
                            color: currentPath === child.href ? '#6d28d9' : 'inherit'
                          }}>
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
                style={{
                  textDecoration: 'none',
                  color: currentPath === item.href ? '#6d28d9' : 'inherit',
                  fontWeight: currentPath === item.href ? 'bold' : 'normal'
                }}>
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
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
          id: 'nav-mui-1',
          title: 'AppBar + Drawer 조합',
          description: 'MUI에서 내비게이션은 보통 AppBar + Drawer 조합으로 구현합니다. Drawer에 aria-label을 제공하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI AppBar Navigation',
        code: `import { AppBar, Toolbar, Button, Menu, MenuItem } from '@mui/material'

function NavigationMuiDemo() {
  const [anchorEl, setAnchorEl] = useState(null)
  const currentPath = '/'

  return (
    <AppBar
      position='static'
      component='header'>
      <Toolbar
        component='nav'
        aria-label='메인 내비게이션'>
        <Button
          color='inherit'
          href='/'
          aria-current={currentPath === '/' ? 'page' : undefined}>
          홈
        </Button>
        <Button
          color='inherit'
          aria-haspopup='menu'
          aria-expanded={Boolean(anchorEl)}
          onClick={(e) => setAnchorEl(e.currentTarget)}>
          제품
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}>
          <MenuItem
            component='a'
            href='/products/all'>
            전체 제품
          </MenuItem>
          <MenuItem
            component='a'
            href='/products/new'>
            신규
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
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
        code: `import * as NavigationMenu from '@radix-ui/react-navigation-menu'
<NavigationMenu.Root aria-label='메인 내비게이션'>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link
        href='/'
        aria-current='page'>
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
            <NavigationMenu.Link href='/products/all'>전체 제품</NavigationMenu.Link>
          </li>
          <li>
            <NavigationMenu.Link href='/products/new'>신규</NavigationMenu.Link>
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
        code: `import { Menu } from 'antd'

const items = [
  { key: 'home', label: <a href='/'>홈</a> },
  {
    key: 'products',
    label: '제품',
    children: [
      { key: 'all', label: <a href='/products/all'>전체 제품</a> },
      { key: 'new', label: <a href='/products/new'>신규</a> }
    ]
  }
]

<nav aria-label='메인 내비게이션'>
  <Menu
    mode='horizontal'
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
<nav aria-label='메인 내비게이션'>
  <Menu.Root>
    <Menu.Trigger asChild>
      <Button variant='ghost'>제품 ▾</Button>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value='web'>웹 제품</Menu.Item>
        <Menu.Item value='mobile'>모바일 제품</Menu.Item>
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
<nav aria-label='메인 내비게이션'>
  <MenuTrigger>
    <Button>제품</Button>
    <Menu onAction={() => {}}>
      <MenuItem id='web'>웹 제품</MenuItem>
      <MenuItem id='mobile'>모바일 제품</MenuItem>
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
}
