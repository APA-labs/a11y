import type { Pattern } from '../types'

export const togglePattern: Pattern = {
  slug: 'toggle',
  name: 'Toggle / Switch',
  description: '두 가지 상태(on/off) 사이를 전환하는 컨트롤',
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
      code: `<label htmlFor="notifications">Notification settings</label>
<button
  id="notifications"
  role="switch"
  aria-checked={isEnabled}
  onClick={() => setIsEnabled(!isEnabled)}
  style={{
    position: 'relative', display: 'inline-flex', alignItems: 'center',
    height: 24, width: 44, borderRadius: 9999, border: 'none', padding: 2,
    backgroundColor: isEnabled ? '#2563eb' : '#d1d5db',
    transition: 'background-color 0.2s', cursor: 'pointer'
  }}>
  <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
    {isEnabled ? 'On' : 'Off'}
  </span>
  <span
    aria-hidden
    style={{
      display: 'inline-block', height: 20, width: 20, borderRadius: 9999,
      backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      transform: isEnabled ? 'translateX(20px)' : 'translateX(0)',
      transition: 'transform 0.2s'
    }}
  />
</button>`
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
          title: 'FormControlLabel 연결',
          description: 'MUI Switch는 FormControlLabel과 함께 사용해 레이블을 연결하세요.',
          level: 'must'
        },
        {
          id: 'tog-mui-2',
          title: 'inputProps aria-label 추가',
          description: 'FormControlLabel 없이 단독 사용 시 inputProps에 aria-label을 추가하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI Switch',
        code: `import { Switch, FormControlLabel } from '@mui/material'
<FormControlLabel
  control={
    <Switch
      checked={isEnabled}
      onChange={(e) => setIsEnabled(e.target.checked)}
      inputProps={{ 'aria-label': 'Notification settings' }}
    />
  }
  label='Notification settings'
/>`
      },
      notes: [
        'MUI Switch는 내부적으로 <input type="checkbox">를 사용합니다.',
        'role="switch"는 자동으로 적용되지 않으므로 inputProps로 추가하세요.',
        'color prop 변경 시 대비율을 재검증하세요.'
      ]
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'tog-radix-1',
          title: 'Switch.Thumb 시각적 표시',
          description: 'Switch.Thumb은 aria-hidden으로 처리되며 시각적 표시만 담당합니다. 충분한 색상 대비를 유지하세요.',
          level: 'should'
        },
        {
          id: 'tog-radix-2',
          title: 'onCheckedChange 상태 관리',
          description: 'controlled 모드에서 checked prop과 onCheckedChange를 함께 사용하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Switch',
        code: `import * as Switch from '@radix-ui/react-switch'
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <label
    htmlFor='notifications'
    style={{ fontSize: 14, fontWeight: 500 }}>
    Notification settings
  </label>
  <Switch.Root
    id='notifications'
    checked={isEnabled}
    onCheckedChange={setIsEnabled}
    style={{
      width: 44,
      height: 24,
      borderRadius: 9999,
      border: 'none',
      padding: 2,
      backgroundColor: isEnabled ? '#2563eb' : '#e5e7eb',
      transition: 'background-color 0.2s',
      cursor: 'pointer'
    }}>
    <Switch.Thumb
      style={{
        display: 'block',
        width: 20,
        height: 20,
        borderRadius: 9999,
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        transform: isEnabled ? 'translateX(20px)' : 'translateX(0)',
        transition: 'transform 0.2s'
      }}
    />
  </Switch.Root>
</div>`
      },
      notes: [
        'Radix Switch는 role="switch"와 aria-checked를 자동으로 관리합니다.',
        'Switch.Root에 연결된 label은 htmlFor/id로 연결하세요.',
        'Thumb은 자동으로 aria-hidden 처리됩니다.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'tog-antd-1',
          title: 'checkedChildren 텍스트 제공',
          description: 'checkedChildren과 unCheckedChildren으로 on/off 상태를 텍스트로 표시하세요.',
          level: 'should'
        },
        {
          id: 'tog-antd-2',
          title: 'aria-label 추가',
          description: 'Ant Design Switch에 aria-label을 직접 추가해 목적을 명시하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Switch',
        code: `import { Switch } from 'antd'
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <label htmlFor='notifications'>Notification settings</label>
  <Switch
    id='notifications'
    checked={isEnabled}
    onChange={setIsEnabled}
    checkedChildren='On'
    unCheckedChildren='Off'
    aria-label='Notification settings'
  />
</div>`
      },
      notes: [
        'Ant Design Switch는 내부적으로 role="switch"를 사용합니다.',
        'checkedChildren/unCheckedChildren으로 상태를 텍스트로 나타내면 색맹 사용자에게 유용합니다.',
        'loading prop 사용 시 aria-busy를 함께 설정하세요.'
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
        code: `import { Switch } from '@chakra-ui/react'
<Switch.Root
  checked={isEnabled}
  onCheckedChange={(e) => setIsEnabled(e.checked)}>
  <Switch.HiddenInput />
  <Switch.Control>
    <Switch.Thumb />
  </Switch.Control>
  <Switch.Label>Notification settings</Switch.Label>
</Switch.Root>`
      },
      notes: [
        "Chakra Switch.Root는 role='switch'와 aria-checked를 자동 설정합니다.",
        'Switch.HiddenInput은 폼 제출에 필요한 실제 input 요소입니다.',
        'onCheckedChange 이벤트의 checked 값으로 상태를 업데이트하세요.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [],
      codeSample: {
        language: 'tsx',
        label: 'React Aria Switch',
        code: `import { Switch } from 'react-aria-components'

const switchStyle = { display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, cursor: 'pointer' }
const trackStyle = (on: boolean) => ({ width: 40, height: 22, borderRadius: 11, background: on ? '#4f46e5' : '#d1d5db', padding: 2, transition: 'background .2s' })
const thumbStyle = (on: boolean) => ({ width: 18, height: 18, borderRadius: '50%', background: '#fff', transform: on ? 'translateX(18px)' : 'translateX(0)', transition: 'transform .2s' })

<Switch isSelected={isEnabled} onChange={setIsEnabled} style={switchStyle}>
  {({ isSelected }) => (<>
    <div style={trackStyle(isSelected)}><div style={thumbStyle(isSelected)} /></div>
    Notification settings
  </>)}
</Switch>`
      },
      notes: [
        "React Aria Switch는 role='switch', aria-checked, 키보드 지원을 모두 자동 처리합니다.",
        'children으로 레이블 텍스트를 직접 제공하세요.',
        'isSelected/onChange로 제어 컴포넌트로 사용 가능합니다.'
      ]
    },
    baseui: {
      id: 'baseui',
      name: 'Base UI',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'toggle-baseui-1',
          title: 'Switch.Thumb 시각적 위치 CSS 필수',
          description: 'Base UI Switch는 스타일이 없으므로 checked 상태에 따른 Thumb 위치를 CSS로 직접 구현해야 합니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI Switch',
        code: `import { Switch } from '@base-ui/react/switch'

function ToggleDemo() {
  return (
    <div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
        <Switch.Root
          defaultChecked
          nativeButton
          render={<button />}
          style={{
            width: 40,
            height: 22,
            borderRadius: 11,
            background: '#18181b',
            border: 'none',
            cursor: 'pointer',
            padding: 2,
            display: 'inline-flex'
          }}>
          <Switch.Thumb style={{ width: 18, height: 18, borderRadius: 9, background: '#fff', display: 'block', transition: 'transform 0.2s' }} />
        </Switch.Root>
        Enable notifications
      </label>
    </div>
  )
}`
      },
      notes: [
        'Switch.Root는 기본적으로 <span>을 렌더링합니다. nativeButton + render={<button />}으로 시맨틱 버튼을 사용하세요.',
        'checked/defaultChecked prop으로 제어/비제어 모드를 선택할 수 있습니다.',
        'Toggle 컴포넌트(@base-ui/react/toggle)는 aria-pressed 기반의 토글 버튼에 사용하세요.'
      ]
    }
  }
}
