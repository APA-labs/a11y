import antdCode from './samples/antd.tsx?raw'
import baselineCode from './samples/baseline.tsx?raw'
import chakraCode from './samples/chakra.tsx?raw'
import materialCode from './samples/material.tsx?raw'
import spectrumCode from './samples/spectrum.tsx?raw'

import type { Pattern } from '../../types'

export const comboboxPattern: Pattern = {
  slug: 'combobox',
  name: 'Combobox',
  description: '텍스트 입력과 선택 목록이 결합된 자동완성 컴포넌트',
  wcagCriteria: ['2.1.1 Keyboard', '4.1.2 Name, Role, Value', '1.3.1 Info and Relationships'],
  tags: ['form', 'interactive', 'input', 'autocomplete'],
  baseline: {
    checklist: {
      must: [
        { id: 'combobox-role', title: 'input에 combobox 역할', description: '텍스트 입력 요소에 role="combobox"가 있어야 합니다.', level: 'must' },
        {
          id: 'combobox-aria-expanded',
          title: 'aria-expanded로 팝업 상태 반영',
          description: '팝업이 열릴 때 aria-expanded="true", 닫힐 때 aria-expanded="false"여야 합니다.',
          level: 'must'
        },
        {
          id: 'combobox-aria-controls',
          title: '팝업 참조',
          description: 'aria-controls로 listbox 또는 팝업 요소의 id를 가리켜야 합니다.',
          level: 'must'
        },
        {
          id: 'combobox-aria-autocomplete',
          title: '자동완성 동작 선언',
          description: 'aria-autocomplete를 none/list/inline/both 중 하나로 설정해야 합니다.',
          level: 'must'
        },
        {
          id: 'combobox-keyboard-arrow',
          title: '화살표 키로 팝업 탐색',
          description: '아래 화살표로 팝업을 열고 첫 옵션으로 이동, 위/아래 화살표로 옵션 간 이동이 가능해야 합니다.',
          level: 'must'
        },
        {
          id: 'combobox-escape-closes',
          title: 'Escape로 팝업 닫기',
          description: 'Escape 키로 팝업을 닫되 입력값은 변경하지 않아야 합니다.',
          level: 'must'
        }
      ],
      should: [
        {
          id: 'combobox-aria-activedescendant',
          title: 'aria-activedescendant 사용',
          description: '포커스가 입력창에 있을 때 aria-activedescendant로 현재 강조된 옵션의 id를 설정하세요.',
          level: 'should'
        },
        {
          id: 'combobox-enter-selects',
          title: 'Enter로 옵션 선택',
          description: 'Enter 키로 강조된 옵션을 선택하고 팝업을 닫아야 합니다.',
          level: 'should'
        },
        { id: 'combobox-label', title: '가시적 레이블', description: '<label> 요소 또는 aria-label로 목적을 명시하세요.', level: 'should' }
      ],
      avoid: [
        {
          id: 'combobox-no-keyboard-support',
          title: '마우스 전용 팝업 금지',
          description: '팝업 열기와 옵션 선택을 마우스 클릭만으로 가능하게 만들지 마세요.',
          level: 'avoid'
        },
        {
          id: 'combobox-focus-trap',
          title: '팝업 내 포커스 트랩 금지',
          description: 'Tab 키가 팝업을 닫고 다음 요소로 이동해야 합니다. 포커스를 listbox에 가두지 마세요.',
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
          id: 'combobox-mui-1',
          title: 'Autocomplete 레이블 연결',
          description: 'MUI Autocomplete에 id와 getOptionLabel을 설정하고 renderInput의 label을 지정하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Autocomplete',
        code: materialCode
      },
      notes: [
        'MUI Autocomplete는 combobox 역할과 aria-expanded를 자동으로 처리합니다.',
        'freeSolo prop 사용 시 사용자 입력값 처리 방식을 스크린리더에 안내하세요.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'combobox-antd-1',
          title: 'showSearch와 filterOption 설정',
          description: 'showSearch를 활성화하고 filterOption으로 검색 동작을 정의하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design AutoComplete',
        code: antdCode
      },
      notes: ['Ant Design AutoComplete는 접근성 속성을 자동으로 처리합니다.', '빈 결과 상태를 사용자에게 알리는 notFoundContent를 설정하세요.']
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'cmb-chakra-1',
          title: 'ClearTrigger와 Trigger에 aria-label 제공',
          description: '아이콘만 있는 컨트롤 버튼에 aria-label을 추가하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI Combobox',
        code: chakraCode
      },
      notes: [
        'Chakra Combobox.Root는 WAI-ARIA Combobox 패턴을 완전히 구현합니다.',
        'useListCollection으로 아이템 컬렉션을 관리하세요.',
        'Combobox.Empty는 검색 결과 없음 상태를 접근성 있게 처리합니다.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'combobox-spectrum-1',
          title: 'allowsCustomValue로 자유 입력 허용 제어',
          description: 'allowsCustomValue={true}면 목록에 없는 값도 입력할 수 있습니다. 기본값은 false로 목록 항목만 선택 가능합니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria ComboBox',
        code: spectrumCode
      },
      notes: [
        'ComboBox는 role="combobox", aria-expanded, aria-autocomplete, aria-controls를 자동으로 관리합니다.',
        'Label, Group(입력 래퍼), Input, Button(토글), Popover, ListBox를 compound component로 조합합니다.',
        'allowsCustomValue={true}로 목록에 없는 값도 입력 가능하게 할 수 있습니다.',
        'defaultFilter prop으로 필터링 함수를 지정하거나, items prop을 직접 조작해 서버 필터링을 구현하세요.'
      ]
    }
  }
}
