import antdCode from './samples/antd.tsx?raw'
import baselineCode from './samples/baseline.tsx?raw'
import baseuiCode from './samples/baseui.tsx?raw'
import chakraCode from './samples/chakra.tsx?raw'
import materialCode from './samples/material.tsx?raw'
import radixCode from './samples/radix.tsx?raw'
import spectrumCode from './samples/spectrum.tsx?raw'

import type { Pattern } from '../../types'

export const buttonPattern: Pattern = {
  slug: 'button',
  name: 'Button',
  description: '사용자가 액션을 트리거하는 기본 인터랙티브 컴포넌트',
  wcagCriteria: ['1.4.3 Contrast', '2.1.1 Keyboard', '2.4.7 Focus Visible', '4.1.2 Name, Role, Value'],
  tags: ['interactive', 'form', 'action'],
  baseline: {
    checklist: {
      must: [
        { id: 'btn-m1', title: '키보드 접근 가능', description: 'Tab으로 포커스 이동, Enter/Space로 활성화 가능해야 합니다.', level: 'must' },
        { id: 'btn-m2', title: '명확한 레이블', description: '버튼 목적을 설명하는 텍스트 또는 aria-label이 있어야 합니다.', level: 'must' },
        { id: 'btn-m3', title: '포커스 표시', description: '키보드 포커스 시 명확한 시각적 표시(focus ring)가 있어야 합니다.', level: 'must' },
        { id: 'btn-m4', title: '색상 대비 4.5:1', description: '텍스트와 배경 사이 최소 4.5:1 대비율을 충족해야 합니다.', level: 'must' },
        {
          id: 'btn-m5',
          title: 'disabled 상태 전달',
          description: 'aria-disabled 또는 disabled 속성으로 비활성 상태를 명시해야 합니다.',
          level: 'must'
        }
      ],
      should: [
        { id: 'btn-s1', title: '로딩 상태 안내', description: 'aria-busy="true"와 스크린리더용 로딩 메시지를 제공하세요.', level: 'should' },
        { id: 'btn-s2', title: '아이콘 버튼 레이블', description: '아이콘만 있는 버튼에는 반드시 aria-label을 추가하세요.', level: 'should' },
        { id: 'btn-s3', title: '터치 타겟 44×44px', description: '모바일 환경에서 최소 44×44px 터치 타겟을 확보하세요.', level: 'should' }
      ],
      avoid: [
        {
          id: 'btn-a1',
          title: 'div/span으로 버튼 구현 금지',
          description: '<div onClick>는 키보드 접근성이 없습니다. <button>을 사용하세요.',
          level: 'avoid'
        },
        { id: 'btn-a2', title: '색상만으로 상태 구분 금지', description: '활성/비활성 상태를 색상만으로 나타내지 마세요.', level: 'avoid' }
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
          id: 'btn-mui-1',
          title: 'loading 상태 aria-busy 처리',
          description:
            '로딩 중인 버튼에 aria-busy="true"를 추가하고 CircularProgress에 aria-hidden을 적용해 스크린리더에 스피너가 노출되지 않도록 하세요.',
          level: 'should'
        },
        {
          id: 'btn-mui-2',
          title: 'outlined variant 대비 검증',
          description: 'outlined variant의 border 색상은 배경과 최소 3:1 대비를 충족해야 합니다. 기본 테마에서 확인이 필요합니다.',
          level: 'must'
        },
        {
          id: 'btn-mui-3',
          title: 'component="a"로 변경 시 role 확인',
          description: 'component prop으로 <a>를 사용하면 버튼이 아닌 링크가 됩니다. 탐색 목적이 아닌 액션에는 <button>을 유지하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Button',
        code: materialCode
      },
      notes: [
        'MUI Button은 기본적으로 <button type="button">을 렌더링합니다.',
        'disabled prop은 aria-disabled와 포커스 제거를 동시에 처리합니다. 포커스 유지가 필요한 경우 aria-disabled만 사용하세요.',
        'component prop으로 <a>로 변경 시 버튼 의미가 사라지므로 탐색 목적에만 사용하세요.',
        'sx={{ minHeight: 44 }}로 WCAG 2.5.5 터치 타겟 크기를 확보하세요.'
      ]
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'btn-radix-1',
          title: 'asChild 패턴 주의',
          description: 'asChild로 <a>를 렌더링 시 role="button"이 제거됩니다. 의도를 명확히 하세요.',
          level: 'must'
        },
        {
          id: 'btn-radix-2',
          title: 'Slot 접근성 검증',
          description: 'asChild 사용 시 자식 컴포넌트가 필요한 aria 속성을 전달받는지 확인하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Slot',
        code: radixCode
      },
      notes: [
        'Radix는 headless 컴포넌트로 스타일을 직접 제어합니다.',
        'focus-visible:ring 클래스로 키보드 포커스만 표시하는 것을 권장합니다.',
        '@radix-ui/react-slot의 Slot은 props를 자식 요소로 전달합니다.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'btn-antd-1',
          title: 'danger 버튼 aria-label 보완',
          description: 'danger prop은 시각적으로 위험 상태를 나타내지만 스크린리더에 전달되지 않습니다. aria-label로 목적을 명시하세요.',
          level: 'must'
        },
        {
          id: 'btn-antd-2',
          title: 'loading 상태 aria-busy 추가',
          description:
            'loading prop만으로는 스크린리더에 로딩 중임을 알리지 않습니다. aria-busy={true}와 함께 버튼 텍스트를 "Saving..."으로 변경하세요.',
          level: 'should'
        },
        {
          id: 'btn-antd-3',
          title: 'htmlType으로 form 제출 버튼 명시',
          description: 'Form 내 버튼은 htmlType="submit"을 명시하세요. 기본값은 "button"이므로 Form.onFinish가 트리거되지 않습니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Button',
        code: antdCode
      },
      notes: [
        'Button은 내부적으로 <button> 요소를 렌더링합니다. htmlType prop으로 submit/reset/button을 지정하세요.',
        'loading prop 사용 시 aria-busy={true}와 설명적 텍스트를 함께 제공해 스크린리더에 상태를 전달하세요.',
        'disabled prop은 포커스를 제거합니다. 포커스를 유지하려면 aria-disabled만 사용하고 onClick 핸들러에서 직접 차단하세요.',
        'v5.21.0부터 color와 variant prop으로 더 세밀한 버튼 스타일을 지정할 수 있습니다.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'btn-chakra-1',
          title: 'loading 시 loadingText 제공',
          description: 'Chakra Button의 loading prop 사용 시 loadingText로 스크린리더에 의미 있는 로딩 메시지를 전달하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI Button',
        code: chakraCode
      },
      notes: [
        'Chakra Button은 내부적으로 <button> 요소를 렌더링합니다.',
        'loading prop이 true일 때 버튼이 자동으로 disabled 처리되며 스피너가 표시됩니다.',
        'loadingText를 설정하면 스크린리더에 로딩 상태가 텍스트로 전달됩니다.',
        'colorPalette로 Chakra 브랜드 색상을 적용하세요.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'btn-spectrum-1',
          title: 'isPending으로 대기 상태 처리',
          description:
            'isPending prop은 포커스를 유지하면서 press/hover 이벤트를 차단하고 스크린리더에 대기 상태를 알립니다. ProgressBar를 함께 렌더링하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria Button',
        code: spectrumCode
      },
      notes: [
        'onPress 이벤트 핸들러를 사용합니다. onClick도 동작하지만 onPress가 마우스/키보드/터치를 통합 처리합니다.',
        'isPending prop은 포커스를 유지한 채로 비활성화되며 스크린리더에 대기 상태를 자동 안내합니다.',
        'isDisabled prop은 aria-disabled와 포커스 제거를 자동 처리합니다.',
        'render props로 isHovered, isPressed, isFocusVisible 상태를 활용해 스타일을 지정할 수 있습니다.'
      ]
    },
    baseui: {
      id: 'baseui',
      name: 'Base UI',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'btn-baseui-1',
          title: '포커스 스타일 직접 지정 필요',
          description: 'Base UI는 headless라 focus-visible 스타일을 CSS로 직접 추가해야 합니다.',
          level: 'must'
        },
        {
          id: 'btn-baseui-2',
          title: 'focusableWhenDisabled로 포커스 유지',
          description: '로딩 상태로 disabled 전환 시 focusableWhenDisabled prop으로 포커스를 유지하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI Button',
        code: baseuiCode
      },
      notes: [
        'Base UI Button은 기본적으로 <button type="button"> 요소를 렌더링합니다.',
        'focusableWhenDisabled prop으로 disabled 상태에서도 포커스가 유지되어 로딩 상태 UX가 개선됩니다.',
        'render prop으로 다른 요소로 렌더링할 수 있습니다. <a>로 변경 시 nativeButton={false}를 명시하세요.',
        'data-disabled 속성으로 disabled 상태를 CSS에서 스타일링할 수 있습니다.'
      ]
    }
  }
}
