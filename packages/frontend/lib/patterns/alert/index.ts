import antdCode from './samples/antd.tsx?raw'
import baselineCode from './samples/baseline.tsx?raw'
import chakraCode from './samples/chakra.tsx?raw'
import materialCode from './samples/material.tsx?raw'

import type { Pattern } from '../../types'

export const alertPattern: Pattern = {
  slug: 'alert',
  name: 'Alert',
  description: 'live region으로 상태 메시지를 스크린리더에 전달하는 컴포넌트',
  wcagCriteria: ['1.3.1 Info and Relationships', '1.4.1 Use of Color', '4.1.3 Status Messages'],
  tags: ['feedback', 'live-region', 'a11y'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'alert-m1',
          title: 'role과 aria-live 설정',
          description: '긴급 알림은 role="alert"(aria-live="assertive"), 비긴급 상태 메시지는 role="status"(aria-live="polite")를 사용해야 합니다.',
          level: 'must'
        },
        {
          id: 'alert-m2',
          title: '동적으로 내용 삽입',
          description:
            'live region은 컨테이너가 DOM에 이미 존재하는 상태에서 내용이 변경되어야 스크린리더가 감지합니다. 빈 컨테이너를 미리 렌더링하고 메시지를 삽입하세요.',
          level: 'must'
        },
        {
          id: 'alert-m3',
          title: '키보드 포커스 이동 금지',
          description: 'Alert live region은 사용자 작업을 방해하지 않아야 합니다. 알림을 표시할 때 자동으로 포커스를 이동시키지 마세요.',
          level: 'must'
        },
        {
          id: 'alert-m4',
          title: '색상 외 수단으로 유형 전달',
          description: 'success/error/warning/info를 색상만이 아닌 텍스트나 아이콘으로도 구분해야 합니다.',
          level: 'must'
        }
      ],
      should: [
        {
          id: 'alert-s1',
          title: 'aria-atomic 활용',
          description: '메시지 일부만 변경되는 경우 aria-atomic="true"로 전체 내용을 다시 읽도록 하여 문맥이 끊기지 않게 하세요.',
          level: 'should'
        },
        {
          id: 'alert-s2',
          title: 'assertive 남용 금지',
          description: 'role="alert"/aria-live="assertive"는 사용자의 현재 읽기를 중단시킵니다. 실제 긴급한 상황에만 사용하세요.',
          level: 'should'
        },
        {
          id: 'alert-s3',
          title: 'sr-only 시각 숨김 처리',
          description:
            '시각적으로 다른 위치에 UI가 있는 경우, live region 자체는 sr-only 클래스로 숨기고 메시지만 복제하여 스크린리더가 읽도록 하세요.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'alert-a1',
          title: '페이지 로드 시 이미 존재하는 alert',
          description: '페이지 로드 시 이미 DOM에 있는 role="alert" 요소는 스크린리더가 자동으로 읽지 않습니다. 반드시 동적으로 삽입하세요.',
          level: 'avoid'
        },
        {
          id: 'alert-a2',
          title: 'live region에 상호작용 요소 배치',
          description:
            'live region 내부에 버튼/링크 등 포커스 가능 요소를 두면 스크린리더 동작이 예측 불가해집니다. 버튼이 필요하면 toast 패턴을 사용하세요.',
          level: 'avoid'
        },
        {
          id: 'alert-a3',
          title: '자동 닫힘 alert',
          description: '자동으로 사라지는 알림은 toast 패턴입니다. 이 패턴은 영속적인 상태 메시지만 다룹니다.',
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
          id: 'alert-mui-1',
          title: 'severity로 유형 전달',
          description:
            'MUI Alert의 severity prop(success, error, warning, info)에 따라 아이콘과 색상이 자동 적용되어 색상 외 수단으로 유형을 전달합니다.',
          level: 'must'
        },
        {
          id: 'alert-mui-2',
          title: 'role="alert" 자동 설정 확인',
          description: 'MUI Alert는 기본적으로 role="alert"를 사용합니다. 비긴급 메시지에는 role="status"로 변경하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Alert',
        code: materialCode
      },
      notes: [
        'MUI Alert는 기본적으로 role="alert"를 사용하여 스크린리더에 즉시 전달됩니다.',
        'severity prop에 따라 적절한 아이콘이 자동 표시되어 색상 외 수단으로 유형을 구분합니다.',
        'AlertTitle로 제목을 추가하면 메시지 구조가 더 명확해집니다.',
        'variant prop으로 filled, outlined, standard 스타일을 선택할 수 있습니다.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'alert-chakra-1',
          title: 'status prop으로 유형 전달',
          description: 'Chakra Alert의 status prop(success, error, warning, info)에 따라 아이콘과 색상이 자동 적용됩니다.',
          level: 'must'
        },
        {
          id: 'alert-chakra-2',
          title: 'role 속성 확인',
          description: 'Chakra Alert는 기본 role="alert"를 사용합니다. 비긴급 메시지에는 role="status"로 변경하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI Alert',
        code: chakraCode
      },
      notes: [
        'Chakra Alert.Root는 기본적으로 role="alert"를 사용합니다.',
        'status prop(success, error, warning, info)에 따라 Alert.Indicator에 적절한 아이콘이 표시됩니다.',
        'Alert.Title과 Alert.Description으로 구조화된 메시지를 제공하세요.',
        'variant prop으로 subtle, solid, outline 스타일을 선택할 수 있습니다.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'alert-antd-1',
          title: 'type prop으로 유형 전달',
          description: 'Ant Design Alert의 type prop(success, error, warning, info)에 따라 아이콘과 색상이 자동 적용됩니다.',
          level: 'must'
        },
        {
          id: 'alert-antd-2',
          title: 'role="alert" 추가',
          description: 'Ant Design Alert는 role을 자동으로 설정하지 않습니다. role="alert" 또는 role="status"를 직접 추가하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Alert',
        code: antdCode
      },
      notes: [
        'Ant Design Alert는 role을 자동으로 설정하지 않으므로 role="alert" 또는 role="status"를 직접 추가해야 합니다.',
        'showIcon prop으로 type에 맞는 아이콘을 표시하여 색상 외 수단으로 유형을 전달합니다.',
        'closable prop으로 닫기 버튼을 추가하고 onClose로 닫기 동작을 처리합니다.',
        'banner prop을 사용하면 페이지 상단 전체 너비 알림으로 표시됩니다.'
      ]
    }
  }
}
