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
    { id: 'home', label: 'Home', href: '/' },
    {
      id: 'about',
      label: 'About',
      href: '/about',
      children: [
        { id: 'team', label: 'Team', href: '/about/team' },
        { id: 'history', label: 'History', href: '/about/history' }
      ]
    },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ]

  return (
    <nav aria-label='Main navigation'>
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
          title: 'Toolbar에 component="nav"와 aria-label 설정',
          description:
            'AppBar의 Toolbar를 component="nav"로 사용하고 aria-label="Main navigation"을 제공하세요. 이렇게 하면 <nav aria-label>로 렌더링되어 스크린리더 랜드마크 탐색이 가능합니다.',
          level: 'must'
        },
        {
          id: 'nav-mui-2',
          title: 'Menu 트리거에 aria-haspopup과 aria-expanded',
          description:
            '하위 메뉴 트리거 버튼에 aria-haspopup="menu"와 aria-expanded를 설정해야 스크린리더가 서브메뉴의 존재와 상태를 파악할 수 있습니다.',
          level: 'must'
        },
        {
          id: 'nav-mui-3',
          title: '현재 페이지 링크에 aria-current="page"',
          description: 'MUI는 aria-current를 자동으로 설정하지 않습니다. 현재 경로에 해당하는 링크에 직접 aria-current="page"를 추가하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI AppBar Navigation',
        code: `import { useState } from 'react'
import { AppBar, Toolbar, Button, Menu, MenuItem, Box, Typography } from '@mui/material'

const currentPath = '/'

export default function App() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const menuOpen = Boolean(anchorEl)
  const menuId = menuOpen ? 'products-menu' : undefined

  return (
    <Box>
      <AppBar
        position='static'
        component='header'>
        <Toolbar
          component='nav'
          aria-label='Main navigation'
          sx={{ gap: 1 }}>
          <Typography
            variant='h6'
            sx={{ flexGrow: 0, mr: 2 }}>
            My App
          </Typography>

          <Button
            color='inherit'
            href='/'
            component='a'
            aria-current={currentPath === '/' ? 'page' : undefined}>
            Home
          </Button>

          <Button
            color='inherit'
            href='/about'
            component='a'
            aria-current={currentPath === '/about' ? 'page' : undefined}>
            About
          </Button>

          <Button
            color='inherit'
            aria-haspopup='menu'
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={(e) => setAnchorEl(e.currentTarget)}>
            Products ▾
          </Button>

          <Menu
            id={menuId}
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{ 'aria-label': 'Products submenu' }}>
            <MenuItem
              component='a'
              href='/products/all'
              onClick={() => setAnchorEl(null)}>
              All Products
            </MenuItem>
            <MenuItem
              component='a'
              href='/products/new'
              onClick={() => setAnchorEl(null)}>
              New Arrivals
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  )
}`
      },
      notes: [
        'Toolbar component="nav"로 <nav> 시맨틱을 부여하고 aria-label로 목적을 명시하세요.',
        'MUI Menu는 방향키 탐색, Escape 닫기, 포커스 복원을 자동으로 처리합니다.',
        '현재 페이지 링크에 aria-current="page"를 직접 추가해야 합니다. MUI는 자동 처리하지 않습니다.',
        'MenuListProps={{ "aria-label": "..." }}로 메뉴 목록에 레이블을 추가할 수 있습니다.'
      ]
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'nav-radix-1',
          title: 'NavigationMenu.Viewport 필수 배치',
          description:
            'NavigationMenu.Viewport는 Trigger로 열리는 Content를 실제로 표시하는 컨테이너입니다. NavigationMenu.List 외부, Root 내부에 배치해야 합니다.',
          level: 'must'
        },
        {
          id: 'nav-radix-2',
          title: 'aria-current="page"로 현재 페이지 표시',
          description: 'NavigationMenu.Link의 active prop 또는 aria-current="page"로 현재 활성 페이지를 명시하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix NavigationMenu',
        code: `import * as NavigationMenu from '@radix-ui/react-navigation-menu'

const linkStyle = {
  display: 'block',
  padding: '6px 12px',
  borderRadius: 4,
  textDecoration: 'none',
  color: '#374151',
  fontSize: 14,
  fontWeight: 500
}
const triggerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: '6px 12px',
  borderRadius: 4,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 500,
  color: '#374151'
}
const contentStyle = {
  display: 'grid',
  gap: 4,
  padding: 8,
  minWidth: 180,
  background: 'white',
  border: '1px solid #e5e7eb',
  borderRadius: 8,
  boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
}

export default function App() {
  return (
    <NavigationMenu.Root style={{ position: 'relative', padding: '12px 16px' }}>
      <NavigationMenu.List style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: 4 }}>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href='/'
            style={linkStyle}
            aria-current='page'>
            Home
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger style={triggerStyle}>
            Products <span aria-hidden>▾</span>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content style={contentStyle}>
            <NavigationMenu.Link
              href='/products/all'
              style={linkStyle}>
              All Products
            </NavigationMenu.Link>
            <NavigationMenu.Link
              href='/products/new'
              style={linkStyle}>
              New Arrivals
            </NavigationMenu.Link>
            <NavigationMenu.Link
              href='/products/sale'
              style={linkStyle}>
              Sale
            </NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger style={triggerStyle}>
            Company <span aria-hidden>▾</span>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content style={contentStyle}>
            <NavigationMenu.Link
              href='/about'
              style={linkStyle}>
              About us
            </NavigationMenu.Link>
            <NavigationMenu.Link
              href='/careers'
              style={linkStyle}>
              Careers
            </NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link
            href='/contact'
            style={linkStyle}>
            Contact
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Viewport style={{ position: 'absolute', top: '100%', left: 0 }} />
    </NavigationMenu.Root>
  )
}`
      },
      notes: [
        'NavigationMenu.Trigger는 aria-expanded와 aria-controls를 자동으로 관리합니다. Space/Enter로 열기, Escape로 닫기, ArrowDown으로 Content 진입이 지원됩니다.',
        'NavigationMenu.Viewport는 Content가 렌더링되는 위치로, Root 내부에서 List 외부에 배치해야 합니다. 생략하면 Content가 표시되지 않습니다.',
        'NavigationMenu.Link의 active prop 또는 aria-current="page"로 현재 페이지를 스크린리더에 전달하세요.',
        'NavigationMenu.Root는 role="navigation"을 렌더링합니다. aria-label을 추가해 목적을 명시하세요.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'nav-antd-1',
          title: '<nav> 랜드마크와 aria-label 추가',
          description: 'Ant Design Menu는 <ul>로 렌더링됩니다. <nav aria-label="Main navigation">으로 감싸 내비게이션 랜드마크를 제공하세요.',
          level: 'must'
        },
        {
          id: 'nav-antd-2',
          title: 'selectedKeys로 현재 활성 항목 표시',
          description: 'selectedKeys prop으로 현재 활성 메뉴 항목을 명시하면 해당 항목에 aria-selected가 자동으로 설정됩니다.',
          level: 'must'
        },
        {
          id: 'nav-antd-3',
          title: 'items API 사용 (v4.20.0+)',
          description:
            '구형 <Menu.Item> 방식 대신 items prop으로 메뉴 구조를 정의하세요. type: "group"으로 그룹을 만들고 children으로 하위 메뉴를 구성합니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Menu',
        code: `import { useState } from 'react'
import { Menu } from 'antd'

const items = [
  {
    key: 'home',
    label: <a href='/'>Home</a>
  },
  {
    key: 'products',
    label: 'Products',
    children: [
      { key: 'all', label: <a href='/products'>All Products</a> },
      { key: 'new', label: <a href='/products/new'>New Arrivals</a> },
      { key: 'sale', label: <a href='/products/sale'>On Sale</a> }
    ]
  },
  {
    key: 'about',
    label: <a href='/about'>About</a>
  },
  {
    key: 'contact',
    label: <a href='/contact'>Contact</a>
  }
]

export default function App() {
  const [current, setCurrent] = useState('home')

  return (
    <nav aria-label='Main navigation'>
      <Menu
        mode='horizontal'
        items={items}
        selectedKeys={[current]}
        onClick={({ key }) => setCurrent(key)}
        style={{ borderBottom: 'none' }}
      />
    </nav>
  )
}`
      },
      notes: [
        'Ant Design Menu는 <ul>로 렌더링되므로 <nav aria-label>로 감싸 내비게이션 랜드마크를 제공하세요.',
        'selectedKeys prop으로 현재 활성 항목을 관리하면 해당 항목에 aria-selected가 자동 설정됩니다.',
        '하위 메뉴(SubMenu)는 aria-expanded, aria-haspopup을 자동으로 관리합니다.',
        'items prop에서 label을 <a href>로 설정하면 실제 링크로 동작해 키보드 탐색과 북마크를 지원합니다.'
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
<nav aria-label='Main navigation'>
  <Menu.Root>
    <Menu.Trigger asChild>
      <Button variant='ghost'>Products ▾</Button>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value='web'>Web Products</Menu.Item>
        <Menu.Item value='mobile'>Mobile Products</Menu.Item>
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
          title: 'nav 요소로 랜드마크 제공',
          description:
            'MenuTrigger/Menu를 <nav aria-label>로 감싸 내비게이션 랜드마크를 제공하세요. 스크린리더 사용자가 랜드마크로 빠르게 이동할 수 있습니다.',
          level: 'must'
        },
        {
          id: 'nav-spectrum-2',
          title: 'onAction으로 메뉴 항목 동작 처리',
          description: 'MenuItem에 onAction 또는 Menu에 onAction을 설정하세요. href prop으로 링크 메뉴 항목을 만들 수 있습니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria Menu',
        code: `import { MenuTrigger, Menu, MenuItem, MenuSection, Separator, Button, Popover, Text, Header } from 'react-aria-components'

export default function App() {
  return (
    <nav
      aria-label='Main navigation'
      style={{ padding: '1.5rem' }}>
      <MenuTrigger>
        <Button
          style={{
            padding: '8px 16px',
            borderRadius: 6,
            border: '1px solid #d1d5db',
            background: '#fff',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500
          }}>
          File ▾
        </Button>
        <Popover
          style={{
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            boxShadow: '0 4px 16px rgba(0,0,0,.1)',
            padding: 4,
            outline: 'none',
            minWidth: 180
          }}>
          <Menu
            onAction={(key) => alert(\`Action: \${key}\`)}
            style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <MenuSection>
              <Header style={{ padding: '4px 12px', fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Actions</Header>
              <MenuItem
                id='new'
                style={({ isFocused }) => ({
                  padding: '8px 14px',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 14,
                  outline: 'none',
                  background: isFocused ? '#fef2f2' : 'transparent'
                })}>
                <Text slot='label'>New file</Text>
                <Text slot='description'>Create a new document</Text>
              </MenuItem>
              <MenuItem
                id='open'
                style={({ isFocused }) => ({
                  padding: '8px 14px',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 14,
                  outline: 'none',
                  background: isFocused ? '#fef2f2' : 'transparent'
                })}>
                <Text slot='label'>Open...</Text>
              </MenuItem>
            </MenuSection>
            <Separator style={{ height: 1, background: '#e5e7eb', margin: '4px 0' }} />
            <MenuItem
              id='quit'
              style={({ isFocused }) => ({
                padding: '8px 14px',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 14,
                outline: 'none',
                background: isFocused ? '#fef2f2' : 'transparent',
                color: '#dc2626'
              })}>
              Quit
            </MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
    </nav>
  )
}`
      },
      notes: [
        'Menu/MenuTrigger는 WAI-ARIA Menu 패턴(role="menu", role="menuitem", 방향키 네비게이션)을 완전히 구현합니다.',
        'MenuSection으로 항목을 그룹화하고 Header로 섹션 제목을 제공하세요. 제목 없는 섹션은 aria-label이 필요합니다.',
        'MenuItem의 Text slot="label"과 slot="description"으로 주요/보조 텍스트를 분리하면 스크린리더 안내가 개선됩니다.',
        'onAction은 Menu 레벨에서 Key를 받거나 각 MenuItem에 개별 지정할 수 있습니다.'
      ]
    },
    baseui: {
      id: 'baseui',
      name: 'Base UI',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'nav-baseui-1',
          title: 'NavigationMenu.Root에 <nav> 랜드마크 포함',
          description: 'NavigationMenu.Root는 기본적으로 <nav> 요소를 렌더링하여 랜드마크를 자동 제공합니다. aria-label로 목적을 추가하세요.',
          level: 'must'
        },
        {
          id: 'nav-baseui-2',
          title: 'Portal + Positioner + Viewport 구조 준수',
          description:
            'NavigationMenu.Portal, Positioner, Popup, Viewport의 중첩 구조를 정확히 사용해야 서브메뉴 전환 애니메이션과 포커스 관리가 올바르게 동작합니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI Navigation Menu',
        code: `import { NavigationMenu } from '@base-ui-components/react/navigation-menu'

const ITEMS = [
  { id: 'overview', label: 'Overview', links: ['Quick Start', 'Accessibility', 'Releases'] },
  { id: 'handbook', label: 'Handbook', links: ['Styling', 'Animation', 'TypeScript'] }
]

export default function App() {
  return (
    <NavigationMenu.Root
      aria-label='Main navigation'
      style={{ position: 'relative', padding: '1rem' }}>
      <NavigationMenu.List style={{ display: 'flex', gap: 4, listStyle: 'none', margin: 0, padding: 0 }}>
        {ITEMS.map((item) => (
          <NavigationMenu.Item key={item.id}>
            <NavigationMenu.Trigger
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '8px 12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
                borderRadius: 6
              }}>
              {item.label}
              <NavigationMenu.Icon>
                <span aria-hidden>▾</span>
              </NavigationMenu.Icon>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {item.links.map((link) => (
                  <li key={link}>
                    <NavigationMenu.Link
                      render={<a href='#' />}
                      style={{
                        display: 'block',
                        padding: '6px 8px',
                        borderRadius: 4,
                        fontSize: 13,
                        color: '#374151',
                        textDecoration: 'none'
                      }}>
                      {link}
                    </NavigationMenu.Link>
                  </li>
                ))}
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          sideOffset={10}
          style={{ position: 'absolute', top: '100%', left: 0 }}>
          <NavigationMenu.Popup
            style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: 8,
              minWidth: 180,
              boxShadow: '0 4px 16px rgba(0,0,0,.1)'
            }}>
            <NavigationMenu.Viewport />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  )
}`
      },
      notes: [
        'NavigationMenu.Root는 기본적으로 <nav> 요소를 렌더링합니다. aria-label을 추가해 목적을 명시하세요.',
        'NavigationMenu.Trigger는 aria-expanded와 aria-controls를 자동으로 관리합니다.',
        'NavigationMenu.Link의 render prop으로 프레임워크의 Link 컴포넌트를 사용하여 클라이언트 사이드 라우팅을 구현하세요.',
        'NavigationMenu.Viewport는 Content를 렌더링하는 단일 공간으로, Popup 내부에 위치해야 합니다.',
        'Escape 키와 Tab 키로 메뉴를 닫고 포커스를 관리하는 기능이 자동으로 처리됩니다.'
      ]
    }
  }
}
