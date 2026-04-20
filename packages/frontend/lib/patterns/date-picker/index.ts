import antdCode from './samples/antd.tsx?raw'
import baselineCode from './samples/baseline.tsx?raw'
import chakraCode from './samples/chakra.tsx?raw'
import materialCode from './samples/material.tsx?raw'
import spectrumCode from './samples/spectrum.tsx?raw'

import type { Pattern } from '../../types'

export const datePickerPattern: Pattern = {
  slug: 'date-picker',
  name: 'Date Picker',
  description: '캘린더 UI로 날짜를 선택하는 입력 컴포넌트',
  wcagCriteria: ['1.3.1 Info and Relationships', '2.1.1 Keyboard', '4.1.3 Status Messages'],
  tags: ['form', 'interactive', 'calendar'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'datepicker-m1',
          title: '입력 필드에 날짜 형식 안내 연결',
          description: '날짜 입력 필드에 aria-describedby로 날짜 형식(예: YYYY-MM-DD)을 연결해야 합니다.',
          level: 'must'
        },
        {
          id: 'datepicker-m2',
          title: '캘린더 다이얼로그에 role="dialog"',
          description: '캘린더 팝업은 role="dialog"와 aria-modal="true", aria-label을 설정해야 합니다.',
          level: 'must'
        },
        {
          id: 'datepicker-m3',
          title: '캘린더 그리드 ARIA',
          description: '캘린더는 role="grid"를 사용하고 각 날짜 셀에 aria-label로 전체 날짜를 제공해야 합니다.',
          level: 'must'
        },
        {
          id: 'datepicker-m4',
          title: '키보드로 날짜 탐색',
          description: 'Arrow 키로 날짜 이동, Enter/Space로 선택, Page Up/Down으로 월 이동, Escape로 닫기를 지원해야 합니다.',
          level: 'must'
        },
        {
          id: 'datepicker-m5',
          title: '현재 월/연도를 라이브 영역으로',
          description: '월 이동 버튼 클릭 시 현재 표시 월/연도가 aria-live로 스크린리더에 안내되어야 합니다.',
          level: 'must'
        }
      ],
      should: [
        {
          id: 'datepicker-s1',
          title: '직접 텍스트 입력 허용',
          description: '캘린더 UI 없이 날짜를 직접 텍스트로 입력할 수 있는 옵션을 제공하세요.',
          level: 'should'
        },
        {
          id: 'datepicker-s2',
          title: '선택 후 트리거에 날짜 반영',
          description: '날짜 선택 후 트리거 버튼의 accessible name에 선택된 날짜를 포함하세요.',
          level: 'should'
        },
        {
          id: 'datepicker-s3',
          title: '비활성 날짜 aria-disabled',
          description: '선택 불가능한 날짜에 aria-disabled="true"와 시각적 표시를 함께 제공하세요.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'datepicker-a1',
          title: '캘린더 UI만 제공',
          description: '캘린더 팝업으로만 날짜를 선택할 수 있다면 스크린리더 사용자에게 복잡한 그리드 탐색을 강요합니다.',
          level: 'avoid'
        },
        {
          id: 'datepicker-a2',
          title: '날짜 셀에 숫자만 제공',
          description: '"15"만 있는 날짜 셀은 맥락 없이 읽힙니다. aria-label="2024년 3월 15일"처럼 전체 날짜를 제공하세요.',
          level: 'avoid'
        }
      ]
    },
    codeSample: {
      language: 'tsx',
      label: 'Baseline (HTML5 date input)',
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
          id: 'datepicker-mui-1',
          title: '@mui/x-date-pickers 패키지 사용',
          description: 'MUI Date Picker는 @mui/x-date-pickers 패키지에 포함됩니다. LocalizationProvider와 date-fns 어댑터가 반드시 필요합니다.',
          level: 'must'
        },
        {
          id: 'datepicker-mui-2',
          title: 'slotProps.textField로 접근성 속성 전달',
          description: 'slotProps.textField를 통해 TextField의 helperText, required, error 등 접근성 관련 prop을 전달하세요.',
          level: 'should'
        },
        {
          id: 'datepicker-mui-3',
          title: '날짜 형식 안내 helperText 제공',
          description: '사용자가 날짜 형식을 예측할 수 있도록 slotProps.textField.helperText로 형식 안내를 제공하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Date Picker',
        code: materialCode
      },
      notes: [
        '@mui/x-date-pickers는 날짜 입력 필드를 세그먼트(month/day/year)로 분리하여 키보드 내비게이션과 스크린리더 ARIA를 자동으로 처리합니다.',
        'LocalizationProvider는 앱 루트에 한 번만 배치하세요.',
        'disablePast, disableFuture, minDate, maxDate prop으로 선택 가능 범위를 제한하면 비활성 날짜에 aria-disabled가 자동 적용됩니다.',
        'slotProps.textField.helperText로 날짜 형식 안내를 제공하세요. aria-describedby로 자동 연결됩니다.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'datepicker-antd-1',
          title: 'ConfigProvider로 로케일 설정',
          description: 'DatePicker 기본 로케일은 영어입니다. ConfigProvider에 locale prop을 설정해 캘린더 UI와 접근 가능한 레이블을 현지화하세요.',
          level: 'must'
        },
        {
          id: 'datepicker-antd-2',
          title: 'status prop으로 유효성 상태 전달',
          description:
            "유효성 검사 실패 시 status='error'를 사용하고 인접한 텍스트로 오류를 설명하세요. Form.Item과 함께 사용하면 aria-describedby가 자동 연결됩니다.",
          level: 'must'
        },
        {
          id: 'datepicker-antd-3',
          title: 'disabledDate로 선택 불가 날짜 제한',
          description: 'disabledDate prop으로 선택 불가 날짜를 지정하면 해당 날짜 셀에 aria-disabled가 자동으로 적용됩니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design DatePicker',
        code: antdCode
      },
      notes: [
        'DatePicker를 Form.Item 안에서 사용하면 유효성 오류가 자동으로 aria-describedby로 연결됩니다.',
        'Ant Design DatePicker는 키보드 내비게이션(Arrow 키 날짜 이동, Page Up/Down 월 이동, Escape 닫기)을 지원합니다.',
        'disabledDate로 선택 불가 날짜를 지정하면 해당 셀에 aria-disabled가 자동으로 적용됩니다.',
        'antd DatePicker는 dayjs 기반입니다. 앱 전체에 ConfigProvider locale을 설정해 캘린더 레이블을 현지화하세요.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'dp-chakra-1',
          title: '이전/다음 달 버튼 aria-label',
          description: '달력의 이전/다음 달 이동 버튼에 aria-label을 추가하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI DatePicker',
        code: chakraCode
      },
      notes: [
        'DatePicker.PrevTrigger와 DatePicker.NextTrigger에 aria-label을 추가하세요.',
        'DatePicker.TableCellTrigger는 각 날짜 셀로 aria-label에 전체 날짜를 자동 설정합니다.',
        '@internationalized/date 패키지로 날짜 타입을 관리합니다.',
        'Portal로 감싸면 z-index 문제를 방지할 수 있습니다.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'dp-spectrum-1',
          title: 'Label 컴포넌트 연결 필수',
          description:
            'DatePicker에 Label 컴포넌트 또는 aria-label prop을 반드시 제공하세요. Label을 사용하면 DateInput과 Calendar에도 자동 연결됩니다.',
          level: 'must'
        },
        {
          id: 'dp-spectrum-2',
          title: 'granularity prop으로 정밀도 설정',
          description: "granularity='day' | 'hour' | 'minute' | 'second'로 표시할 최소 단위를 설정하세요. 기본값은 날짜에 'day'입니다.",
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria DatePicker',
        code: spectrumCode
      },
      notes: [
        'DatePicker는 DateInput(키보드 입력)과 Calendar(팝오버)를 결합한 compound component입니다.',
        'DateInput 안의 DateSegment를 children 함수로 렌더링하면 각 날짜 세그먼트(월/일/년)가 개별 접근 가능합니다.',
        'Label 컴포넌트를 사용하면 DateInput과 Calendar 모두에 접근 가능한 이름이 자동 연결됩니다.',
        'granularity prop으로 day/hour/minute/second 중 최소 단위를 설정할 수 있습니다.'
      ]
    }
  }
}
