import antdCode from './samples/antd.tsx?raw'
import baselineCode from './samples/baseline.tsx?raw'
import baseuiCode from './samples/baseui.tsx?raw'
import chakraCode from './samples/chakra.tsx?raw'
import materialCode from './samples/material.tsx?raw'
import radixCode from './samples/radix.tsx?raw'
import spectrumCode from './samples/spectrum.tsx?raw'

import type { Pattern } from '../../types'

export const selectPattern: Pattern = {
  slug: 'select',
  name: 'Select (Listbox)',
  description: '목록에서 하나의 옵션을 선택하는 커스텀 드롭다운 컴포넌트',
  wcagCriteria: ['2.1.1 Keyboard', '4.1.2 Name, Role, Value'],
  tags: ['form', 'interactive', 'dropdown'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'select-m1',
          title: 'role="listbox"와 role="option" 사용',
          description: '커스텀 select는 컨테이너에 role="listbox", 각 항목에 role="option"을 명시해야 합니다.',
          level: 'must'
        },
        {
          id: 'select-m2',
          title: '레이블 연결',
          description: '트리거 버튼에 aria-labelledby 또는 aria-label로 레이블을 연결해야 합니다.',
          level: 'must'
        },
        {
          id: 'select-m3',
          title: '키보드 내비게이션',
          description: 'ArrowUp/ArrowDown으로 옵션 이동, Enter/Space로 선택, Escape로 닫기를 지원해야 합니다.',
          level: 'must'
        },
        {
          id: 'select-m4',
          title: '선택 상태 표시',
          description: '선택된 옵션에 aria-selected="true"를 설정하고, 트리거에 aria-expanded로 열림/닫힘 상태를 표시해야 합니다.',
          level: 'must'
        },
        {
          id: 'select-m5',
          title: '포커스 관리',
          description: '팝업 열릴 때 선택된 옵션(없으면 첫 번째)으로 포커스 이동, 닫힐 때 트리거로 포커스 복귀해야 합니다.',
          level: 'must'
        }
      ],
      should: [
        {
          id: 'select-s1',
          title: '타입어헤드 지원',
          description: '키보드로 문자를 입력하면 해당 문자로 시작하는 옵션으로 포커스가 이동하도록 구현하세요.',
          level: 'should'
        },
        {
          id: 'select-s2',
          title: 'Home/End 키 지원',
          description: '5개 이상의 옵션이 있을 때 Home/End 키로 첫 번째/마지막 옵션으로 이동을 지원하세요.',
          level: 'should'
        },
        {
          id: 'select-s3',
          title: '그룹화에 role="group" 사용',
          description: '옵션이 그룹으로 나뉘는 경우 role="group"과 aria-label로 그룹을 구분하세요.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'select-a1',
          title: 'div/span으로만 구현',
          description: '시맨틱 없이 div/span만으로 드롭다운을 구현하면 스크린리더가 인식하지 못합니다. role 속성이 필수입니다.',
          level: 'avoid'
        },
        {
          id: 'select-a2',
          title: '탐색 중 자동 선택',
          description: 'ArrowKey 탐색 중에 자동으로 값이 변경되면 스크린리더 사용자가 원치 않는 선택이 발생합니다.',
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
          id: 'select-mui-1',
          title: 'FormControl + InputLabel + labelId 연결 필수',
          description:
            'MUI Select는 FormControl, InputLabel(id), Select(labelId)를 일치시켜야 스크린리더가 레이블을 올바르게 읽습니다. outlined variant에서는 Select의 label prop도 동일하게 설정하세요.',
          level: 'must'
        },
        {
          id: 'select-mui-2',
          title: 'error + helperText로 오류 안내',
          description: 'FormControl의 error prop과 FormHelperText를 함께 사용하면 오류 상태와 메시지가 aria-describedby로 자동 연결됩니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Select',
        code: materialCode
      },
      notes: [
        'InputLabel의 id와 Select의 labelId를 반드시 동일하게 설정하세요. 미설정 시 스크린리더가 레이블을 읽지 못합니다.',
        'outlined variant에서는 Select의 label prop도 InputLabel 텍스트와 동일하게 설정해야 floating label 애니메이션이 올바르게 동작합니다.',
        'disabled MenuItem은 aria-disabled가 자동 적용됩니다.',
        'native={true} prop으로 브라우저 기본 <select> 렌더링으로 전환할 수 있어 모바일 접근성이 향상됩니다.'
      ]
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'select-radix-1',
          title: 'Select.Trigger에 aria-label 또는 Label 연결 필수',
          description:
            'Select.Trigger에 aria-label을 직접 추가하거나 @radix-ui/react-label의 Label.Root(htmlFor)로 연결하세요. 레이블 없이는 스크린리더가 목적을 알 수 없습니다.',
          level: 'must'
        },
        {
          id: 'select-radix-2',
          title: 'Select.ItemText로 접근 가능한 옵션 텍스트 제공',
          description: 'Select.Item 내부에 Select.ItemText를 반드시 사용하세요. 이 텍스트가 스크린리더에 전달되는 옵션 레이블입니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Select',
        code: radixCode
      },
      notes: [
        'Select.Trigger는 role="combobox"와 aria-expanded를 자동으로 관리합니다. 스크린리더는 선택된 값을 Select.Value로 읽습니다.',
        'Select.Item에 disabled prop을 추가하면 aria-disabled="true"가 자동 적용되어 키보드 탐색에서 건너뜁니다.',
        'Select.ItemIndicator는 선택된 항목에만 표시됩니다. aria-hidden 처리를 권장합니다.',
        'position="popper"로 설정하면 Select.Content가 Trigger에 상대적으로 배치됩니다. Select.Portal 사용으로 z-index 문제를 방지하세요.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'select-antd-1',
          title: 'Form.Item으로 레이블 자동 연결',
          description:
            'Select를 Form.Item 안에서 label + name prop과 함께 사용하면 label이 htmlFor로 자동 연결됩니다. 독립 사용 시 aria-label을 직접 지정하세요.',
          level: 'must'
        },
        {
          id: 'select-antd-2',
          title: 'virtual={false}로 스크린리더 호환성 향상',
          description:
            '기본적으로 가상 스크롤이 활성화되어 있어 일부 스크린리더에서 옵션 목록을 올바르게 읽지 못할 수 있습니다. virtual={false}로 설정하면 모든 옵션을 DOM에 렌더링합니다.',
          level: 'should'
        },
        {
          id: 'select-antd-3',
          title: 'showSearch 시 combobox 패턴 확인',
          description:
            'showSearch 활성화 시 Select가 combobox 패턴으로 전환됩니다. filterOption 콜백으로 검색 로직을 커스텀하고 notFoundContent로 결과 없음 메시지를 제공하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Select',
        code: antdCode
      },
      notes: [
        'Form.Item의 label + name prop이 Select input에 htmlFor로 자동 연결됩니다. 별도 aria-label 불필요합니다.',
        'showSearch 활성화 시 Select가 combobox 패턴으로 전환되며 aria-autocomplete가 자동 적용됩니다.',
        'virtual={false}로 가상 스크롤을 비활성화하면 스크린리더가 모든 옵션을 순서대로 읽을 수 있습니다.',
        'disabled 옵션에는 aria-disabled가 자동 적용됩니다.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'sel-chakra-1',
          title: 'HiddenSelect 폼 접근성',
          description: 'Select.HiddenSelect는 폼 제출 시 네이티브 select로 동작합니다. name prop을 설정하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI Select',
        code: chakraCode
      },
      notes: [
        'Chakra Select.Root는 WAI-ARIA listbox 패턴으로 aria-expanded, aria-selected를 자동 처리합니다.',
        'useListCollection으로 아이템 컬렉션을 관리하세요.',
        'Select.HiddenSelect에 name prop을 설정하면 네이티브 폼 제출이 가능합니다.',
        'closeOnSelect 기본값은 true로 항목 선택 후 팝업이 자동으로 닫힙니다.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'select-spectrum-1',
          title: 'Select Label 연결 필수',
          description:
            'Select의 Label 컴포넌트가 버튼과 listbox에 자동으로 연결됩니다. aria-label로 대체 가능하지만 Label 컴포넌트 사용을 권장합니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria Select',
        code: spectrumCode
      },
      notes: [
        'Select는 Label, Button(트리거), SelectValue, Popover, ListBox를 compound component로 조합합니다.',
        'SelectValue는 현재 선택된 항목의 텍스트를 자동으로 표시합니다.',
        'selectedKey/onSelectionChange로 제어 컴포넌트, defaultSelectedKey로 비제어 컴포넌트로 사용하세요.',
        'ListBoxItem children에 함수를 전달하면 isSelected, isFocused 등의 상태를 활용할 수 있습니다.'
      ]
    },
    baseui: {
      id: 'baseui',
      name: 'Base UI',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'select-baseui-1',
          title: 'Select.Label 또는 aria-label로 접근 가능한 이름 제공',
          description: 'Select.Label을 사용하거나 Select.Trigger에 aria-label을 추가해 스크린리더에 선택 목적을 전달하세요.',
          level: 'must'
        },
        {
          id: 'select-baseui-2',
          title: 'Select.Portal과 Select.Positioner 사용',
          description:
            'Select.Portal은 body에 드롭다운을 렌더링하고 Select.Positioner는 위치 계산을 처리합니다. z-index 충돌 방지를 위해 Portal을 사용하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI Select',
        code: baseuiCode
      },
      notes: [
        'Select.Trigger는 aria-expanded와 aria-haspopup을 자동으로 관리합니다.',
        'Select.ItemIndicator는 선택된 항목에만 표시되는 체크 표시입니다.',
        'Select.Label을 사용하면 label과 트리거가 자동으로 연결됩니다.',
        'defaultValue(비제어) 또는 value/onValueChange(제어 모드)로 선택 상태를 관리하세요.',
        'Select.ScrollUpArrow, Select.ScrollDownArrow로 긴 목록의 스크롤 UI를 구현할 수 있습니다.'
      ]
    }
  }
}
