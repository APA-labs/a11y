import antdCode from './samples/antd.tsx?raw'
import baselineCode from './samples/baseline.tsx?raw'
import baseuiCode from './samples/baseui.tsx?raw'
import chakraCode from './samples/chakra.tsx?raw'
import materialCode from './samples/material.tsx?raw'
import radixCode from './samples/radix.tsx?raw'
import spectrumCode from './samples/spectrum.tsx?raw'

import type { Pattern } from '../../types'

export const popoverPattern: Pattern = {
  slug: 'popover',
  name: 'Popover',
  description: '버튼으로 트리거하는 대화형 플로팅 패널 컴포넌트',
  wcagCriteria: ['2.1.1 Keyboard', '2.1.2 No Keyboard Trap', '4.1.2 Name, Role, Value'],
  tags: ['interactive', 'overlay', 'floating'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'popover-m1',
          title: '트리거에 aria-expanded 설정',
          description: '팝오버를 여는 트리거 버튼에 aria-expanded로 열림/닫힘 상태를 표시해야 합니다.',
          level: 'must'
        },
        {
          id: 'popover-m2',
          title: 'aria-haspopup 또는 aria-controls',
          description: '트리거에 aria-haspopup="dialog"를 추가하거나 aria-controls로 팝오버 패널 ID를 참조해야 합니다.',
          level: 'must'
        },
        {
          id: 'popover-m3',
          title: '포커스 관리',
          description: '팝오버 열릴 때 첫 번째 포커스 가능한 요소로 포커스 이동, 닫힐 때 트리거로 포커스 복귀해야 합니다.',
          level: 'must'
        },
        { id: 'popover-m4', title: 'Escape로 닫기', description: '팝오버가 열려 있을 때 Escape 키로 닫을 수 있어야 합니다.', level: 'must' }
      ],
      should: [
        {
          id: 'popover-s1',
          title: 'role="dialog"와 aria-label',
          description: '대화형 콘텐츠를 포함하는 팝오버에는 role="dialog"와 aria-label 또는 aria-labelledby를 제공하세요.',
          level: 'should'
        },
        { id: 'popover-s2', title: '배경 클릭으로 닫기', description: '팝오버 외부 영역을 클릭하면 닫히도록 구현하세요.', level: 'should' },
        {
          id: 'popover-s3',
          title: '포커스 트랩',
          description: '대화형 콘텐츠가 있는 팝오버는 Tab/Shift+Tab이 팝오버 내부에서만 순환하도록 구현하세요.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'popover-a1',
          title: 'hover로만 열기',
          description: 'hover로만 팝오버를 열면 키보드 사용자와 터치 사용자가 접근할 수 없습니다.',
          level: 'avoid'
        },
        {
          id: 'popover-a2',
          title: '팝오버에만 중요한 정보 배치',
          description: '팝오버는 보조 정보용입니다. 필수 액션은 팝오버 없이도 접근할 수 있어야 합니다.',
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
          id: 'popover-mui-1',
          title: 'aria-describedby로 트리거와 팝오버 연결',
          description:
            '팝오버가 열릴 때 트리거 버튼에 aria-describedby={id}를 설정하고 Popover에 동일한 id를 부여해 스크린리더가 연결 관계를 파악하도록 하세요.',
          level: 'must'
        },
        {
          id: 'popover-mui-2',
          title: '팝오버 내 포커스 관리는 직접 구현',
          description:
            'MUI Popover는 Modal과 달리 포커스 트랩을 제공하지 않습니다. 대화형 콘텐츠가 있다면 열릴 때 포커스를 팝오버 내부로 이동하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Popover',
        code: materialCode
      },
      notes: [
        'MUI Popover는 Escape 키와 배경 클릭으로 자동으로 닫히며 트리거로 포커스가 복원됩니다.',
        'aria-describedby는 팝오버가 열릴 때만 설정(open ? id : undefined)하여 닫혔을 때 불필요한 참조를 방지하세요.',
        '대화형 콘텐츠를 포함한 팝오버는 role="dialog"와 aria-label을 Popover 내부 컨테이너에 추가하세요.',
        'MUI Popover는 포커스 트랩을 제공하지 않으므로 필요한 경우 직접 구현하거나 Dialog 컴포넌트를 사용하세요.'
      ]
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'popover-radix-1',
          title: 'Popover.Close에 aria-label 제공',
          description: '닫기 버튼에 아이콘이나 텍스트 심볼만 사용할 경우 aria-label을 추가해 스크린리더 사용자에게 동작을 알리세요.',
          level: 'must'
        },
        {
          id: 'popover-radix-2',
          title: 'sideOffset으로 팝오버 간격 조정',
          description: 'Popover.Content의 sideOffset prop으로 트리거와 팝오버 간의 간격을 설정하세요. 너무 가까우면 시각적으로 혼동될 수 있습니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Popover',
        code: radixCode
      },
      notes: [
        'Popover.Trigger에 aria-expanded가 자동으로 관리됩니다. Space/Enter로 열기, Escape로 닫기, 외부 클릭으로 닫기가 기본 지원됩니다.',
        'Popover.Portal로 감싸면 body 최상단에 렌더링되어 overflow:hidden이나 z-index 문제를 방지합니다.',
        'Popover.Content는 열릴 때 내부의 첫 번째 포커스 가능한 요소로 포커스가 이동합니다. 닫힐 때 Trigger로 포커스가 복원됩니다.',
        'side("top"|"right"|"bottom"|"left"), align("start"|"center"|"end"), sideOffset으로 팝오버 위치를 제어하세요.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'popover-antd-1',
          title: '트리거에 aria-expanded 직접 추가',
          description:
            'Ant Design Popover는 트리거 버튼에 aria-expanded를 자동으로 추가하지 않습니다. open 상태를 직접 관리하여 aria-expanded={open}을 추가하세요.',
          level: 'must'
        },
        {
          id: 'popover-antd-2',
          title: 'content 안에 닫기 버튼 포함',
          description:
            'Ant Design Popover는 기본적으로 Escape 키로 닫히지 않습니다. 키보드 사용자를 위해 팝오버 내부에 명시적 닫기 버튼을 항상 제공하세요.',
          level: 'must'
        },
        {
          id: 'popover-antd-3',
          title: 'trigger="click"으로 키보드 접근성 확보',
          description:
            'trigger="hover"만 설정하면 키보드 사용자가 팝오버를 열 수 없습니다. trigger="click"이나 trigger={["hover", "focus"]}로 설정하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Popover',
        code: antdCode
      },
      notes: [
        'trigger="click"으로 설정하면 키보드 Enter/Space로도 팝오버를 열 수 있습니다.',
        'open 상태를 직접 관리하고 트리거에 aria-expanded={open}과 aria-haspopup="dialog"를 추가해야 합니다.',
        'Ant Design Popover는 Escape 키 닫기를 자동 처리하지 않으므로 content 안에 닫기 버튼을 반드시 포함하세요.',
        'onOpenChange 콜백으로 외부 클릭 시 닫기 동작을 제어할 수 있습니다.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'pop-chakra-1',
          title: 'CloseTrigger aria-label',
          description: '닫기 버튼에 아이콘만 사용할 경우 aria-label을 명시적으로 추가하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI Popover',
        code: chakraCode
      },
      notes: [
        'Chakra Popover.Root는 포커스 트랩, aria-expanded, Escape 키 닫기를 자동 처리합니다.',
        'Popover.CloseTrigger에 aria-label을 반드시 추가하세요.',
        'closeOnInteractOutside prop으로 외부 클릭 닫기 동작을 제어하세요.',
        'autoFocus 기본값은 true로 팝오버 열릴 때 첫 번째 포커스 가능 요소로 포커스가 이동합니다.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'popover-spectrum-1',
          title: 'placement prop으로 위치 제어',
          description:
            "placement='top' | 'bottom' | 'left' | 'right' 등으로 팝오버 위치를 지정하세요. shouldFlip={true}(기본)로 뷰포트 경계에서 자동 반전됩니다.",
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria Popover',
        code: spectrumCode
      },
      notes: [
        "Popover는 DialogTrigger와 함께 사용합니다. Dialog 내부의 Heading에 slot='title'을 지정하면 aria-labelledby가 자동 연결됩니다.",
        'placement prop으로 위치를 지정하고 shouldFlip(기본 true)으로 뷰포트 경계에서 자동 반전됩니다.',
        'ESC 키로 팝오버를 닫고 트리거로 포커스가 자동 복원됩니다.',
        'isNonModal prop을 설정하면 팝오버 외부 요소와 상호작용할 수 있습니다.'
      ]
    },
    baseui: {
      id: 'baseui',
      name: 'Base UI',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'popover-baseui-1',
          title: 'Popover.Title과 Popover.Description 제공',
          description:
            'Popover.Title은 aria-labelledby로, Popover.Description은 aria-describedby로 자동 연결됩니다. 의미 있는 팝오버에는 반드시 포함하세요.',
          level: 'should'
        },
        {
          id: 'popover-baseui-2',
          title: 'Portal과 Positioner 사용',
          description: 'Popover.Portal은 body에 렌더링하고 Popover.Positioner는 앵커 기반 위치 계산을 처리합니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI Popover',
        code: baseuiCode
      },
      notes: [
        'Popover.Trigger는 aria-expanded와 aria-haspopup을 자동으로 관리합니다.',
        'Popover.Title은 aria-labelledby로, Popover.Description은 aria-describedby로 자동 연결됩니다.',
        'Popover.Positioner의 sideOffset prop으로 트리거와의 간격을 설정하세요.',
        'Escape 키로 팝오버를 닫고 트리거로 포커스가 자동 복원됩니다.',
        'open/onOpenChange prop으로 제어 모드, defaultOpen으로 비제어 모드로 사용하세요.'
      ]
    }
  }
}
