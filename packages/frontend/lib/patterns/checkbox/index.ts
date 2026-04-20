import antdCode from './samples/antd.tsx?raw'
import baselineCode from './samples/baseline.tsx?raw'
import baseuiCode from './samples/baseui.tsx?raw'
import chakraCode from './samples/chakra.tsx?raw'
import materialCode from './samples/material.tsx?raw'
import radixCode from './samples/radix.tsx?raw'
import spectrumCode from './samples/spectrum.tsx?raw'

import type { Pattern } from '../../types'

export const checkboxPattern: Pattern = {
  slug: 'checkbox',
  name: 'Checkbox',
  description: '항목을 선택하거나 해제할 수 있는 체크박스 컴포넌트',
  wcagCriteria: ['2.1.1 Keyboard', '4.1.2 Name, Role, Value', '1.3.1 Info and Relationships'],
  tags: ['form', 'interactive', 'selection'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'checkbox-role',
          title: 'checkbox 역할',
          description: '네이티브 <input type="checkbox"> 또는 role="checkbox"를 사용해야 합니다.',
          level: 'must'
        },
        {
          id: 'checkbox-aria-checked',
          title: 'aria-checked로 상태 반영',
          description: '체크됨: aria-checked="true", 미체크: aria-checked="false", 중간 상태: aria-checked="mixed"여야 합니다.',
          level: 'must'
        },
        {
          id: 'checkbox-label',
          title: '접근 가능한 레이블',
          description: '<label>, aria-labelledby, 또는 aria-label로 레이블을 제공해야 합니다.',
          level: 'must'
        },
        {
          id: 'checkbox-space-toggles',
          title: 'Space 키로 토글',
          description: '포커스 시 Space 키로 체크 상태를 토글할 수 있어야 합니다.',
          level: 'must'
        }
      ],
      should: [
        {
          id: 'checkbox-group-role',
          title: '그룹에 group 역할',
          description: '관련 체크박스는 role="group"과 aria-labelledby로 그룹 레이블을 연결하세요.',
          level: 'should'
        },
        { id: 'checkbox-focus-indicator', title: '포커스 표시', description: '커스텀 체크박스에 명확한 포커스 링을 제공하세요.', level: 'should' },
        {
          id: 'checkbox-error-linked',
          title: '오류 메시지 연결',
          description: '유효성 오류 메시지를 aria-describedby로 체크박스와 연결하세요.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'checkbox-div-only',
          title: 'role 없는 div/span 금지',
          description: '비의미적 요소로 체크박스를 만들 때 role="checkbox"와 키보드 처리를 빠뜨리지 마세요.',
          level: 'avoid'
        },
        {
          id: 'checkbox-hidden-native',
          title: '대체 없이 네이티브 숨김 금지',
          description: 'display:none이나 visibility:hidden으로 네이티브 체크박스를 숨기면 접근성을 잃습니다.',
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
          id: 'checkbox-mui-1',
          title: 'FormControlLabel로 레이블 연결',
          description: 'MUI Checkbox는 FormControlLabel로 감싸 레이블을 연결하세요.',
          level: 'must'
        },
        {
          id: 'checkbox-mui-2',
          title: 'indeterminate 상태 처리',
          description: 'indeterminate prop으로 중간 선택 상태를 표현할 수 있으며 aria-checked="mixed"가 자동 설정됩니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Checkbox',
        code: materialCode
      },
      notes: ['MUI Checkbox는 네이티브 input을 사용하므로 기본 접근성이 보장됩니다.', 'color prop 변경 시 4.5:1 대비율을 확인하세요.']
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'checkbox-radix-1',
          title: 'Checkbox.Indicator는 체크 상태일 때만 렌더링',
          description: 'Checkbox.Indicator는 checked 상태일 때만 마운트됩니다. 내부에 아이콘이나 텍스트로 시각적 표시를 반드시 제공하세요.',
          level: 'must'
        },
        {
          id: 'checkbox-radix-2',
          title: 'onCheckedChange 값 타입 확인',
          description: 'onCheckedChange 콜백은 boolean | "indeterminate"를 받습니다. indeterminate 상태를 사용할 경우 타입 가드가 필요합니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Checkbox',
        code: radixCode
      },
      notes: [
        'Checkbox.Root는 role="checkbox"와 aria-checked를 자동으로 관리합니다. htmlFor/id로 label을 연결하세요.',
        'onCheckedChange 콜백의 값은 boolean | "indeterminate"입니다. indeterminate 상태는 checked prop에 "indeterminate"를 전달해 설정합니다.',
        'Checkbox.Indicator는 checked 또는 indeterminate 상태일 때만 렌더링됩니다. 내부에 시각적 표시가 없으면 체크 여부를 알 수 없습니다.',
        'data-state 속성("checked" | "unchecked" | "indeterminate")을 CSS 선택자로 사용하면 상태별 스타일링이 가능합니다.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'checkbox-antd-1',
          title: 'Checkbox.Group으로 그룹화',
          description: 'Checkbox.Group을 사용하면 관련 체크박스를 의미론적으로 그룹화할 수 있습니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Checkbox Group',
        code: antdCode
      },
      notes: ['Ant Design Checkbox는 네이티브 input을 사용해 접근성을 유지합니다.', 'indeterminate prop으로 중간 선택 상태를 표현할 수 있습니다.']
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'checkbox-chakra-1',
          title: 'isInvalid로 에러 상태 전달',
          description: 'Chakra Checkbox의 isInvalid prop을 사용하면 aria-invalid가 자동으로 설정됩니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI Checkbox',
        code: chakraCode
      },
      notes: [
        'Chakra Checkbox는 내부적으로 <input type="checkbox">를 사용합니다.',
        'isIndeterminate prop으로 부분 선택 상태를 표현할 수 있습니다.',
        'CheckboxGroup으로 여러 체크박스를 묶어 관리하세요.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [],
      codeSample: {
        language: 'tsx',
        label: 'React Spectrum Checkbox',
        code: spectrumCode
      },
      notes: [
        'React Spectrum Checkbox는 키보드, 마우스, 터치 접근성을 자동으로 처리합니다.',
        'isIndeterminate prop으로 부분 선택 상태를 지원합니다.',
        'validationState="invalid"로 에러 상태를 표현하세요.'
      ]
    },
    baseui: {
      id: 'baseui',
      name: 'Base UI',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'checkbox-baseui-1',
          title: 'Checkbox.Indicator 시각적 표시 필수',
          description: 'Base UI Checkbox는 스타일이 없으므로 Checkbox.Indicator 안에 체크 아이콘을 반드시 추가하세요.',
          level: 'must'
        },
        {
          id: 'checkbox-baseui-2',
          title: 'label 요소로 접근 가능한 이름 제공',
          description: 'Checkbox.Root를 <label>로 감싸거나 htmlFor/id로 연결해 접근 가능한 이름을 제공하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI Checkbox',
        code: baseuiCode
      },
      notes: [
        'Checkbox.Root는 기본적으로 <button role="checkbox">를 렌더링하며 aria-checked를 자동 관리합니다.',
        'Checkbox.Indicator는 checked 상태일 때만 렌더링됩니다.',
        'CheckboxGroup을 사용하면 여러 체크박스를 그룹으로 관리할 수 있습니다.'
      ]
    }
  }
}
