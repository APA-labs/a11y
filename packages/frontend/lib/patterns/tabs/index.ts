import antdCode from './samples/antd.tsx?raw'
import baselineCode from './samples/baseline.tsx?raw'
import baseuiCode from './samples/baseui.tsx?raw'
import chakraCode from './samples/chakra.tsx?raw'
import materialCode from './samples/material.tsx?raw'
import radixCode from './samples/radix.tsx?raw'
import spectrumCode from './samples/spectrum.tsx?raw'

import type { Pattern } from '../../types'

export const tabsPattern: Pattern = {
  slug: 'tabs',
  name: 'Tabs',
  description: '콘텐츠 영역을 탭으로 구분하여 전환하는 컴포넌트',
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
          id: 'tabs-mui-1',
          title: 'Tab의 id와 tabpanel의 aria-labelledby 연결',
          description:
            'Tab에 id="tab-{n}", tabpanel에 aria-labelledby="tab-{n}"을 명시적으로 설정하세요. MUI 공식 a11yProps 헬퍼를 활용하면 편리합니다.',
          level: 'must'
        },
        {
          id: 'tabs-mui-2',
          title: 'Tabs에 aria-label 제공',
          description: 'Tabs 컴포넌트에 aria-label로 탭 그룹의 목적을 설명해야 스크린리더가 탭목록의 맥락을 파악할 수 있습니다.',
          level: 'must'
        },
        {
          id: 'tabs-mui-3',
          title: '비활성 Tab에 disabled prop',
          description: 'disabled prop을 사용하면 aria-disabled가 자동 적용되며 탭이 포커스 순서에서 제외됩니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Tabs',
        code: materialCode
      },
      notes: [
        'MUI Tabs는 화살표 키 탐색, roving tabindex, aria-selected를 자동으로 처리합니다.',
        'a11yProps 헬퍼로 Tab의 id와 aria-controls를 일관되게 설정하세요.',
        'tabpanel에 aria-labelledby를 설정해 탭과 패널을 의미론적으로 연결하세요.',
        'scrollButtons prop 사용 시 ScrollButton에 aria-label이 자동 적용됩니다.'
      ]
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'tabs-radix-1',
          title: 'Tabs.List에 aria-label 필수',
          description: 'Tabs.List에 aria-label을 추가해 탭 그룹의 목적을 스크린리더에 전달하세요.',
          level: 'must'
        },
        {
          id: 'tabs-radix-2',
          title: 'activationMode="manual"로 포커스/활성화 분리',
          description:
            'activationMode="manual"로 설정하면 화살표 키로 포커스만 이동하고 Enter/Space로 탭을 활성화합니다. 콘텐츠 로딩이 느린 경우 더 접근성이 높습니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Tabs',
        code: radixCode
      },
      notes: [
        'Tabs.Root는 role="tablist", aria-selected, aria-controls, aria-labelledby를 모두 자동으로 처리합니다.',
        'Tabs.List에 aria-label을 추가해 탭 그룹의 목적을 명시하세요.',
        'activationMode: "automatic"(기본, 화살표 이동 시 즉시 활성화) | "manual"(포커스와 활성화 분리). 콘텐츠 로딩이 느리면 "manual" 권장.',
        'defaultValue(비제어) 또는 value + onValueChange(제어)로 활성 탭을 관리하세요.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'tabs-antd-1',
          title: 'items API 사용 (v4.20.0+)',
          description: 'TabPane을 직접 사용하는 방식은 deprecated입니다. items prop에 key, label, children 객체 배열을 전달하는 방식을 사용하세요.',
          level: 'must'
        },
        {
          id: 'tabs-antd-2',
          title: 'onChange로 활성 탭 상태 관리',
          description:
            'onChange 콜백으로 활성 탭 키를 관리하세요. 탭 변경 시 스크린리더가 새 콘텐츠를 인식할 수 있도록 tabpanel 영역을 적절히 구성하세요.',
          level: 'should'
        },
        {
          id: 'tabs-antd-3',
          title: 'destroyInactiveTabPane으로 비활성 패널 관리',
          description:
            'destroyInactiveTabPane={true}로 설정하면 비활성 탭의 DOM이 제거되어 스크린리더가 숨겨진 콘텐츠를 읽지 않습니다. 반대로 false(기본)이면 비활성 탭이 DOM에 유지되어 aria-hidden 처리됩니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Tabs',
        code: antdCode
      },
      notes: [
        'Ant Design Tabs는 role="tablist", role="tab", role="tabpanel"과 aria-selected, aria-controls를 자동으로 처리합니다.',
        'items prop(v4.20.0+)으로 탭을 선언하세요. TabPane 직접 사용 방식은 deprecated입니다.',
        '화살표 키로 탭 간 이동, Enter/Space로 탭 활성화가 기본 지원됩니다.',
        'tabBarExtraContent 사용 시 해당 콘텐츠도 키보드로 접근 가능한지 확인하세요.'
      ]
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
        code: chakraCode
      },
      notes: [
        'Chakra Tabs.Root는 WAI-ARIA Tabs 패턴의 키보드 네비게이션과 aria 속성을 자동 처리합니다.',
        'Tabs.List에 aria-label을 추가해 탭 그룹의 목적을 스크린리더에 전달하세요.',
        'Tabs.Indicator는 aria-hidden 처리되는 시각적 활성 표시입니다.',
        'lazyMount prop으로 비활성 탭 콘텐츠를 지연 렌더링해 성능을 최적화할 수 있습니다.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'tabs-spectrum-1',
          title: 'TabList aria-label 필수',
          description: 'TabList에 aria-label을 지정하면 스크린리더가 탭 목록의 목적을 파악합니다. 페이지에 여러 TabList가 있을 때 특히 중요합니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria Tabs',
        code: spectrumCode
      },
      notes: [
        '방향키(좌/우), Home, End 키보드 네비게이션이 자동 구현됩니다.',
        '각 Tab의 id와 TabPanel의 id가 일치하면 aria-controls/aria-labelledby가 자동 연결됩니다.',
        "keyboardActivation='manual'로 포커스와 활성화를 분리하여 수동 활성화 패턴을 구현할 수 있습니다.",
        'Tab children에 함수를 전달하면 isSelected, isFocused 등의 상태를 렌더 프롭으로 활용할 수 있습니다.'
      ]
    },
    baseui: {
      id: 'baseui',
      name: 'Base UI',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'tabs-baseui-1',
          title: 'Tabs.List에 aria-label 필수',
          description: 'Tabs.List에 aria-label을 추가하여 탭 그룹의 목적을 스크린리더에 전달하세요.',
          level: 'must'
        },
        {
          id: 'tabs-baseui-2',
          title: 'Tabs.Indicator는 Tabs.List 안에 배치',
          description: 'Base UI의 Tabs.Indicator는 Tabs.List 내부에 위치해야 CSS 변수로 위치를 추적할 수 있습니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI Tabs',
        code: baseuiCode
      },
      notes: [
        'Tabs.Root는 화살표 키, Home, End 키보드 탐색과 aria-selected를 자동으로 처리합니다.',
        'Tabs.Indicator는 --active-tab-left, --active-tab-width CSS 변수로 활성 탭 위치를 추적합니다.',
        'activateOnFocus prop을 추가하면 화살표 키 이동 시 즉시 탭이 활성화됩니다.',
        'defaultValue(비제어) 또는 value/onValueChange(제어 모드)로 탭 상태를 관리하세요.'
      ]
    }
  }
}
