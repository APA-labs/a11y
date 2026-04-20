import antdCode from './samples/antd.tsx?raw'
import baselineCode from './samples/baseline.tsx?raw'
import baseuiCode from './samples/baseui.tsx?raw'
import chakraCode from './samples/chakra.tsx?raw'
import materialCode from './samples/material.tsx?raw'
import radixCode from './samples/radix.tsx?raw'
import spectrumCode from './samples/spectrum.tsx?raw'

import type { Pattern } from '../../types'

export const togglePattern: Pattern = {
  slug: 'toggle',
  name: 'Toggle / Switch',
  description: '두 가지 상태(on/off) 사이를 전환하는 컴포넌트',
  wcagCriteria: ['1.3.1 Info and Relationships', '2.1.1 Keyboard', '4.1.2 Name, Role, Value'],
  tags: ['form', 'interactive', 'state'],
  baseline: {
    checklist: {
      must: [
        { id: 'tog-m1', title: 'role="switch" 사용', description: 'role="switch"와 aria-checked로 on/off 상태를 명시해야 합니다.', level: 'must' },
        { id: 'tog-m2', title: '레이블 연결', description: '토글의 목적을 설명하는 레이블이 연결되어야 합니다.', level: 'must' },
        { id: 'tog-m3', title: '키보드 작동', description: 'Space 키로 토글을 활성화할 수 있어야 합니다.', level: 'must' },
        { id: 'tog-m4', title: '상태 변화 안내', description: '상태 변경 시 스크린리더에 변경 사항이 전달되어야 합니다.', level: 'must' }
      ],
      should: [
        { id: 'tog-s1', title: 'on/off 텍스트 제공', description: '색상 외에 텍스트(켜짐/꺼짐)로 상태를 표시하세요.', level: 'should' },
        { id: 'tog-s2', title: '터치 타겟 44×44px', description: '모바일에서 충분한 터치 영역을 확보하세요.', level: 'should' }
      ],
      avoid: [
        {
          id: 'tog-a1',
          title: '색상만으로 상태 구분 금지',
          description: '녹색/회색만으로 on/off를 나타내지 마세요. 색맹 사용자가 인식할 수 없습니다.',
          level: 'avoid'
        },
        {
          id: 'tog-a2',
          title: 'checkbox로 스위치 구현 금지',
          description: 'checkbox는 시각적으로 토글처럼 보여도 의미론적으로 다릅니다. role="switch"를 사용하세요.',
          level: 'avoid'
        }
      ]
    },
    codeSample: {
      language: 'tsx',
      label: 'Baseline (HTML)',
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
          id: 'tog-mui-1',
          title: 'FormControlLabel로 레이블 연결',
          description:
            'MUI Switch는 FormControlLabel과 함께 사용해 label prop으로 레이블을 연결하세요. 단독 사용 시 slotProps.input에 aria-label을 추가해야 합니다.',
          level: 'must'
        },
        {
          id: 'tog-mui-2',
          title: 'ToggleButtonGroup은 aria-label 필수',
          description:
            'ToggleButton 그룹(aria-pressed 기반)은 ToggleButtonGroup에 aria-label로 그룹 목적을 명시하고 각 ToggleButton에 aria-label을 추가하세요.',
          level: 'must'
        },
        {
          id: 'tog-mui-3',
          title: 'Switch의 role="switch" 자동 적용 확인',
          description:
            'MUI Switch는 내부 input에 role="switch"를 자동으로 적용하지 않습니다. 의미론적 스위치가 필요하다면 slotProps.input에 role="switch"를 추가하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Switch & ToggleButtonGroup',
        code: materialCode
      },
      notes: [
        'MUI Switch는 내부적으로 <input type="checkbox">를 렌더링합니다. role="switch"는 자동 적용되지 않아 필요 시 slotProps.input으로 추가해야 합니다.',
        'FormControlLabel의 label prop이 input의 aria-label로 자동 연결됩니다.',
        'ToggleButtonGroup에 exclusive prop을 설정하면 한 번에 하나만 선택됩니다. 이때 aria-pressed가 자동 관리됩니다.',
        'color prop 변경 시 배경색 대비율(최소 3:1)을 재검증하세요.'
      ]
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'tog-radix-1',
          title: 'Switch.Root에 label 연결 필수',
          description:
            'Switch.Root를 <label>로 감싸거나 htmlFor/id로 연결해 접근 가능한 이름을 제공하세요. label이 없으면 스크린리더가 목적을 알 수 없습니다.',
          level: 'must'
        },
        {
          id: 'tog-radix-2',
          title: 'Switch.Thumb에 충분한 색상 대비 유지',
          description:
            'Switch.Thumb은 aria-hidden으로 처리되며 시각적 표시만 담당합니다. on/off 상태 모두에서 배경과의 대비율을 3:1 이상 유지하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Switch',
        code: radixCode
      },
      notes: [
        'Switch.Root는 role="switch"와 aria-checked를 자동으로 관리합니다. Space 키로 토글이 기본 지원됩니다.',
        'htmlFor/id로 label을 연결하거나 Switch.Root를 <label>로 감싸 접근 가능한 이름을 제공하세요.',
        'Switch.Thumb은 aria-hidden으로 자동 처리됩니다. 시각적 표시를 위한 스타일만 담당합니다.',
        'checked + onCheckedChange(제어 모드) 또는 defaultChecked(비제어 모드)로 상태를 관리하세요.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'tog-antd-1',
          title: 'aria-label로 스위치 목적 명시',
          description:
            'Ant Design Switch에 aria-label을 직접 추가하거나 htmlFor/id로 label과 연결하세요. 시각적 레이블이 없으면 스크린리더가 스위치 목적을 알 수 없습니다.',
          level: 'must'
        },
        {
          id: 'tog-antd-2',
          title: 'checkedChildren/unCheckedChildren으로 상태 텍스트 제공',
          description:
            'checkedChildren과 unCheckedChildren prop으로 on/off 상태를 텍스트로 표시하면 색맹 사용자와 스크린리더 사용자 모두에게 유용합니다.',
          level: 'should'
        },
        {
          id: 'tog-antd-3',
          title: 'loading 상태 시 aria-busy 추가',
          description: 'loading={true}로 비동기 처리 중임을 표시할 경우 aria-busy="true"를 함께 추가해 스크린리더에 처리 중임을 알리세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Switch',
        code: antdCode
      },
      notes: [
        'Ant Design Switch는 내부적으로 role="switch"와 aria-checked를 자동으로 관리합니다.',
        'htmlFor/id로 label과 Switch를 연결하면 스크린리더가 레이블을 올바르게 읽습니다.',
        'checkedChildren/unCheckedChildren으로 상태를 텍스트로 나타내면 색맹 사용자에게 유용합니다.',
        'loading prop 사용 시 aria-busy="true"를 함께 추가하세요.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'tog-chakra-1',
          title: 'Switch.Label 사용',
          description: 'Switch.Label을 사용하면 label과 input이 자동 연결됩니다. 별도 htmlFor 불필요합니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI Switch',
        code: chakraCode
      },
      notes: [
        "Chakra Switch.Root는 role='switch'와 aria-checked를 자동으로 설정합니다.",
        'Switch.Label을 사용하면 label과 input이 자동 연결됩니다. 별도 htmlFor 불필요합니다.',
        'Switch.HiddenInput은 폼 제출에 필요한 실제 input 요소입니다.',
        'onCheckedChange 이벤트의 e.checked 값으로 상태를 업데이트하세요.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'tog-spectrum-1',
          title: 'Switch와 ToggleButton 구분',
          description:
            "Switch는 설정 on/off에 role='switch'를 사용하고, ToggleButton은 버튼 토글 동작에 aria-pressed를 사용합니다. 맥락에 맞게 선택하세요.",
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria Switch & ToggleButton',
        code: spectrumCode
      },
      notes: [
        "Switch는 role='switch'와 aria-checked를 자동 관리합니다. isSelected/onChange로 상태를 제어하세요.",
        'ToggleButton은 aria-pressed를 자동 관리합니다. isSelected/onChange 패턴이 동일합니다.',
        'Switch children에 함수를 전달하면 isSelected 상태에 따른 렌더 프롭을 활용할 수 있습니다.',
        'isReadOnly prop으로 읽기 전용 스위치를 만들 수 있습니다.'
      ]
    },
    baseui: {
      id: 'baseui',
      name: 'Base UI',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'toggle-baseui-1',
          title: 'Switch.Root 레이블 연결 필수',
          description: 'Switch.Root를 <label>로 감싸거나 htmlFor/id로 연결하여 접근 가능한 이름을 제공하세요.',
          level: 'must'
        },
        {
          id: 'toggle-baseui-2',
          title: 'Toggle은 aria-pressed 기반, Switch는 role="switch" 기반',
          description:
            'Toggle(@base-ui/react/toggle)은 aria-pressed를 사용하는 토글 버튼이고, Switch(@base-ui/react/switch)는 role="switch"를 사용하는 설정 컨트롤입니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI Switch',
        code: baseuiCode
      },
      notes: [
        'Switch.Root는 기본적으로 <span>을 렌더링합니다. <label>로 감싸면 wrapping label 패턴으로 동작합니다.',
        'role="switch"와 aria-checked는 자동으로 관리됩니다.',
        'nativeButton prop(기본 false)을 true로 설정하고 render={<button />}을 사용하면 시맨틱 버튼으로 렌더링합니다.',
        'Toggle 컴포넌트(@base-ui/react/toggle)는 aria-pressed 기반의 토글 버튼에 사용하세요.',
        'data-checked / data-unchecked 속성으로 CSS 스타일링이 가능합니다.'
      ]
    }
  }
}
