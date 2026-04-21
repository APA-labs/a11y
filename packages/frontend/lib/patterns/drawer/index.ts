import antdCode from './samples/antd.tsx?raw'
import baselineCode from './samples/baseline.tsx?raw'
import chakraCode from './samples/chakra.tsx?raw'
import materialCode from './samples/material.tsx?raw'

import type { Pattern } from '../../types'

export const drawerPattern: Pattern = {
  slug: 'drawer',
  name: 'Drawer',
  description: '화면 가장자리에서 슬라이드하여 나타나는 사이드 패널 컴포넌트',
  wcagCriteria: ['2.1.1 Keyboard', '2.1.2 No Keyboard Trap', '4.1.2 Name, Role, Value'],
  tags: ['overlay', 'interactive', 'navigation'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'drawer-m1',
          title: 'role="dialog"와 aria-modal="true"',
          description: '드로어 패널에 role="dialog"와 aria-modal="true"를 설정해야 합니다.',
          level: 'must'
        },
        {
          id: 'drawer-m2',
          title: '레이블 제공',
          description: '드로어에 aria-labelledby 또는 aria-label로 레이블을 제공해야 합니다.',
          level: 'must'
        },
        {
          id: 'drawer-m3',
          title: '포커스 트랩',
          description: '드로어가 열렸을 때 Tab/Shift+Tab이 드로어 내부에서만 순환해야 합니다.',
          level: 'must'
        },
        { id: 'drawer-m4', title: 'Escape로 닫기', description: 'Escape 키로 드로어를 닫을 수 있어야 합니다.', level: 'must' },
        {
          id: 'drawer-m5',
          title: '포커스 관리',
          description: '드로어 열릴 때 내부 첫 포커스 가능 요소로 포커스 이동, 닫힐 때 트리거로 포커스 복귀해야 합니다.',
          level: 'must'
        }
      ],
      should: [
        {
          id: 'drawer-s1',
          title: '배경 inert 처리',
          description: '드로어가 열려 있을 때 배경 콘텐츠에 inert 속성으로 스크린리더가 배경을 읽지 못하게 하세요.',
          level: 'should'
        },
        {
          id: 'drawer-s2',
          title: '배경 오버레이 클릭으로 닫기',
          description: '드로어 외부 오버레이를 클릭하면 닫히도록 구현하세요.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'drawer-a1',
          title: '포커스 트랩 없이 배경 포커스 허용',
          description: '드로어가 열린 상태에서 배경 요소에 Tab으로 이동할 수 있으면 스크린리더 사용자가 경계를 파악하기 어렵습니다.',
          level: 'avoid'
        },
        {
          id: 'drawer-a2',
          title: '시각적 닫기 버튼 미제공',
          description: '모바일 사용자는 Escape 키가 없으므로 항상 시각적 닫기 버튼을 제공하세요.',
          level: 'avoid'
        }
      ]
    },
    codeSample: {
      language: 'tsx',
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
          id: 'drawer-mui-1',
          title: 'Drawer에 aria-labelledby 연결',
          description: 'Drawer에 aria-labelledby prop으로 드로어 제목 요소의 id를 연결해야 스크린리더가 드로어를 올바르게 식별합니다.',
          level: 'must'
        },
        {
          id: 'drawer-mui-2',
          title: 'variant="temporary"는 Modal 기반',
          description: 'variant="temporary"(기본값)는 Modal 위에 렌더링되어 포커스 트랩, Escape 닫기, 배경 오버레이를 자동으로 처리합니다.',
          level: 'should'
        },
        {
          id: 'drawer-mui-3',
          title: '닫기 버튼에 aria-label 필수',
          description: '아이콘만 있는 닫기 버튼에는 반드시 aria-label="Close navigation"처럼 목적을 설명하는 레이블을 제공하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Drawer',
        code: materialCode
      },
      notes: [
        'MUI Drawer variant="temporary"는 Modal 기반으로 포커스 트랩, Escape 닫기, 포커스 복원을 자동 처리합니다.',
        'aria-labelledby를 드로어 제목 id와 연결하면 스크린리더가 "다이얼로그, Navigation"으로 읽습니다.',
        '내비게이션 목적의 드로어 내부에는 <nav aria-label>로 시맨틱 랜드마크를 제공하세요.',
        'keepMounted={false}(기본값)는 닫혔을 때 DOM에서 제거하여 스크린리더 혼란을 방지합니다.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'drawer-antd-1',
          title: 'title prop으로 드로어 레이블 제공',
          description:
            'title prop을 사용하면 드로어 헤더 제목이 aria-labelledby로 자동 연결됩니다. 시각적으로 숨겨야 하는 경우에도 title을 제공하세요.',
          level: 'must'
        },
        {
          id: 'drawer-antd-2',
          title: 'keyboard prop으로 Escape 닫기 보장',
          description: 'keyboard 기본값은 true로 Escape로 닫힙니다. keyboard={false}로 설정하면 WCAG 2.1.2 No Keyboard Trap에 위반될 수 있습니다.',
          level: 'must'
        },
        {
          id: 'drawer-antd-3',
          title: 'focusable prop으로 포커스 관리',
          description:
            'v6.2.0에서 추가된 focusable={{ trap: true, focusTriggerAfterClose: true }}로 포커스 트랩과 닫힌 후 트리거로 포커스 복귀를 설정하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Drawer',
        code: antdCode
      },
      notes: [
        'Ant Design Drawer는 내부적으로 role="dialog"와 포커스 트랩을 자동으로 처리합니다.',
        'title prop 설정 시 aria-labelledby가 자동으로 연결됩니다.',
        'keyboard={true}(기본값)로 Escape 키로 닫을 수 있습니다. 이 값을 false로 변경하지 마세요.',
        'footer prop을 활용해 주요 액션 버튼을 드로어 하단에 배치하세요.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'drw-chakra-1',
          title: 'CloseTrigger aria-label',
          description: '닫기 버튼에 아이콘만 사용할 경우 aria-label을 명시적으로 추가하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI Drawer',
        code: chakraCode
      },
      notes: [
        'Chakra Drawer.Root는 포커스 트랩, aria-modal, Escape 키 닫기를 자동 처리합니다.',
        'Drawer.Title은 aria-labelledby로 자동 연결됩니다. 반드시 포함하세요.',
        'placement prop으로 end(기본), start, top, bottom 방향을 지정하세요.',
        '닫기 버튼에 aria-label을 반드시 추가하세요.'
      ]
    }
  }
}
