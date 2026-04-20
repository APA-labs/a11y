import antdCode from './samples/antd.tsx?raw'
import baselineCode from './samples/baseline.tsx?raw'
import baseuiCode from './samples/baseui.tsx?raw'
import chakraCode from './samples/chakra.tsx?raw'
import materialCode from './samples/material.tsx?raw'
import radixCode from './samples/radix.tsx?raw'
import spectrumCode from './samples/spectrum.tsx?raw'

import type { Pattern } from '../../types'

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
      code: baselineCode
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
        code: materialCode
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
        code: radixCode
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
        code: antdCode
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
        code: chakraCode
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
        code: spectrumCode
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
        code: baseuiCode
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
