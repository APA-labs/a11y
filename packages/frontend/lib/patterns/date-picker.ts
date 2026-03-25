import type { Pattern } from '../types'

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
      code: `function DatePickerDemo() {
const [date, setDate] = useState('');
const [error, setError] = useState('');
const hintId = 'date-format-hint';
const errorId = 'date-error';

const validateDate = (value) => {
  if (!value) return '';
  const d = new Date(value);
  if (isNaN(d.getTime())) return 'Invalid date.';
  return '';
};

return (
  <div>
    <label htmlFor="date-input">Date</label>
    <input
      id="date-input"
      type="date"
      value={date}
      onChange={(e) => { setDate(e.target.value); setError(validateDate(e.target.value)); }}
      aria-describedby={\`\${hintId}\${error ? \` \${errorId}\` : ''}\`}
      aria-invalid={!!error}
    />
    <p id={hintId}>Format: YYYY-MM-DD</p>
    {error && <p id={errorId} role="alert">{error}</p>}
  </div>
);
}`
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
          title: '@mui/x-date-pickers 사용 권장',
          description: 'MUI Date Picker는 @mui/x-date-pickers 패키지에 있습니다. 기본 TextField보다 접근성이 잘 구현되어 있습니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Date Picker',
        code: `import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { enUS } from 'date-fns/locale'

function DatePickerDemo() {
  const [date, setDate] = useState(new Date())

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={enUS}>
      <DatePicker
        label='Select date'
        value={date}
        onChange={(newDate) => setDate(newDate)}
        slotProps={{
          textField: {
            helperText: 'Format: YYYY.MM.DD',
            inputProps: { 'aria-describedby': 'date-hint' }
          }
        }}
      />
    </LocalizationProvider>
  )
}`
      },
      notes: [
        'LocalizationProvider의 adapterLocale을 ko로 설정하면 캘린더 UI가 한국어로 표시됩니다.',
        '@mui/x-date-pickers는 키보드 내비게이션과 스크린리더를 위한 ARIA를 자동으로 처리합니다.',
        'slotProps.textField로 입력 필드의 접근성 속성을 커스텀할 수 있습니다.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'datepicker-antd-1',
          title: 'locale로 한국어 설정',
          description: 'Ant Design DatePicker는 기본 영어입니다. ConfigProvider에 koKR locale을 설정해 캘린더 UI를 한국어로 변경하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design DatePicker',
        code: `import { DatePicker, ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import dayjs from 'dayjs'
import 'dayjs/locale/en'

dayjs.locale('en')

function AntdDatePickerDemo() {
  const [date, setDate] = useState(null)

  return (
    <ConfigProvider locale={enUS}>
      <DatePicker
        value={date}
        onChange={(value) => setDate(value)}
        placeholder='Select date'
        format='YYYY-MM-DD'
        aria-label='Select date'
        getPopupContainer={(trigger) => trigger.parentElement}
      />
    </ConfigProvider>
  )
}`
      },
      notes: [
        'ConfigProvider locale={koKR}으로 캘린더 UI를 한국어로 변경하세요.',
        'Ant Design DatePicker는 키보드 내비게이션을 지원하지만 스크린리더 지원이 완전하지 않을 수 있습니다.',
        '중요한 날짜 입력에는 직접 텍스트 입력 옵션도 함께 제공하세요.'
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
        code: `import { DatePicker, Portal } from '@chakra-ui/react'
<DatePicker.Root>
  <DatePicker.Label>Select date</DatePicker.Label>
  <DatePicker.Control>
    <DatePicker.Input />
    <DatePicker.IndicatorGroup>
      <DatePicker.Trigger aria-label='Open calendar'>
        <span aria-hidden>📅</span>
      </DatePicker.Trigger>
    </DatePicker.IndicatorGroup>
  </DatePicker.Control>
  <Portal>
    <DatePicker.Positioner>
      <DatePicker.Content>
        <DatePicker.View view='day'>
          <DatePicker.Header />
          <DatePicker.DayTable />
        </DatePicker.View>
        <DatePicker.View view='month'>
          <DatePicker.Header />
          <DatePicker.MonthTable />
        </DatePicker.View>
        <DatePicker.View view='year'>
          <DatePicker.Header />
          <DatePicker.YearTable />
        </DatePicker.View>
      </DatePicker.Content>
    </DatePicker.Positioner>
  </Portal>
</DatePicker.Root>`
      },
      notes: [
        'DatePicker.Header는 이전/다음 달 버튼과 현재 월/연도 텍스트를 자동으로 렌더링합니다.',
        'day/month/year 세 가지 View를 모두 포함해야 월·연도 선택이 가능합니다.',
        '@internationalized/date 패키지로 날짜 타입을 관리합니다. Portal로 감싸면 z-index 문제를 방지할 수 있습니다.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'dp-spectrum-1',
          title: 'aria-label prop 필수',
          description: 'React Aria DatePicker에 label 또는 aria-label prop을 반드시 제공하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria DatePicker',
        code: `import { DatePicker, Label, Group, DateInput, DateSegment, Button, Popover, Dialog, Heading } from 'react-aria-components'
import { Calendar, CalendarGrid, CalendarCell } from 'react-aria-components'

const fieldStyle = { display: 'inline-flex', alignItems: 'center', gap: 2, border: '1px solid #d1d5db', borderRadius: 6, padding: '4px 8px', background: '#fff' }
const segStyle = { padding: '1px 2px', borderRadius: 2, outline: 'none' }
const btnStyle = { background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px', borderRadius: 4, fontSize: 16 }
const headerStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }
const cellStyle = { textAlign: 'center' as const, padding: 6, borderRadius: 4, cursor: 'pointer' }

<DatePicker>
  <Label style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}>Select date</Label>
  <Group style={fieldStyle}>
    <DateInput style={{ display: 'flex', gap: 1 }}>
      {(segment) => <DateSegment segment={segment} style={segStyle} />}
    </DateInput>
    <Button aria-label='Open calendar' style={btnStyle}>📅</Button>
  </Group>
  <Popover>
    <Dialog style={{ background: '#fff', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,.12)', padding: 16, outline: 'none' }}>
      <Calendar>
        <header style={headerStyle}>
          <Button slot='previous' aria-label='Previous month' style={btnStyle}>‹</Button>
          <Heading style={{ fontWeight: 600, fontSize: 14 }} />
          <Button slot='next' aria-label='Next month' style={btnStyle}>›</Button>
        </header>
        <CalendarGrid style={{ borderCollapse: 'collapse' }}>
          {(date) => <CalendarCell date={date} style={cellStyle} />}
        </CalendarGrid>
      </Calendar>
    </Dialog>
  </Popover>
</DatePicker>`
      },
      notes: [
        'Popover 안에 Dialog를 감싸야 접근성 트리가 올바르게 구성됩니다.',
        'Group으로 DateInput과 Button을 감싸면 시각적·의미적으로 하나의 입력 필드로 인식됩니다.',
        'Label 컴포넌트를 사용하면 모든 하위 요소의 aria 연결이 자동 처리됩니다.'
      ]
    }
  }
}
