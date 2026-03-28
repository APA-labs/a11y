import type { Pattern } from '../types'

export const textInputPattern: Pattern = {
  slug: 'text-input',
  name: 'Text Input',
  description: '사용자가 텍스트를 입력하는 폼 컨트롤',
  wcagCriteria: ['1.3.1 Info and Relationships', '1.4.3 Contrast', '2.1.1 Keyboard', '3.3.1 Error Identification', '3.3.2 Labels or Instructions'],
  tags: ['form', 'input', 'interactive'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'inp-m1',
          title: '레이블 연결 필수',
          description: '<label for>로 input과 연결하거나 aria-label/aria-labelledby를 사용해야 합니다.',
          level: 'must'
        },
        {
          id: 'inp-m2',
          title: '오류 메시지 연결',
          description: 'aria-describedby로 오류 메시지를 input에 연결하고 aria-invalid="true"를 설정해야 합니다.',
          level: 'must'
        },
        { id: 'inp-m3', title: '필수 입력 표시', description: 'required 또는 aria-required="true"로 필수 여부를 명시해야 합니다.', level: 'must' },
        { id: 'inp-m4', title: '색상 대비 4.5:1', description: '입력 텍스트와 배경 사이 최소 4.5:1 대비율이 필요합니다.', level: 'must' }
      ],
      should: [
        {
          id: 'inp-s1',
          title: 'placeholder 단독 사용 금지',
          description: 'placeholder는 레이블을 대체할 수 없습니다. 항상 visible label과 함께 사용하세요.',
          level: 'should'
        },
        {
          id: 'inp-s2',
          title: 'autocomplete 속성 추가',
          description: '이름, 이메일 등 개인정보 필드에 autocomplete 속성을 설정하세요.',
          level: 'should'
        },
        { id: 'inp-s3', title: '도움말 텍스트 연결', description: 'aria-describedby로 힌트/도움말 텍스트를 연결하세요.', level: 'should' }
      ],
      avoid: [
        {
          id: 'inp-a1',
          title: 'placeholder를 레이블로 사용 금지',
          description: '포커스 시 placeholder가 사라져 사용자가 맥락을 잃습니다.',
          level: 'avoid'
        },
        {
          id: 'inp-a2',
          title: '색상만으로 오류 표시 금지',
          description: '빨간 테두리만으로 오류를 나타내지 마세요. 텍스트 메시지를 함께 제공하세요.',
          level: 'avoid'
        }
      ]
    },
    codeSample: {
      language: 'tsx',
      label: 'Baseline (HTML)',
      code: `<div>
  <label htmlFor='email'>
    Email <span aria-hidden>*</span>
  </label>
  <input
    id='email'
    type='email'
    required
    aria-required='true'
    aria-invalid={hasError}
    aria-describedby={hasError ? 'email-error' : 'email-hint'}
    autoComplete='email'
  />
  {hasError && (
    <p
      id='email-error'
      role='alert'>
      Please enter a valid email address.
    </p>
  )}
  <p id='email-hint'>e.g., user@example.com</p>
</div>`
    }
  },
  designSystems: {
    material: {
      id: 'material',
      name: 'Material Design (MUI)',
      color: '#1976d2',
      additionalChecks: [
        {
          id: 'inp-mui-1',
          title: 'TextField helperText와 aria 연결',
          description: 'MUI TextField의 helperText는 자동으로 aria-describedby로 연결됩니다. FormHelperText id를 수동 설정하지 마세요.',
          level: 'should'
        },
        {
          id: 'inp-mui-2',
          title: 'InputLabel shrink 동작 확인',
          description: 'floating label이 축소될 때 스크린리더에 레이블이 유지되는지 확인하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI TextField',
        code: `import { TextField } from '@mui/material'
<TextField
  id='email'
  label='Email'
  type='email'
  required
  error={hasError}
  helperText={hasError ? 'Please enter a valid email address.' : 'e.g. user@example.com'}
  inputProps={{
    'aria-required': true,
    autoComplete: 'email'
  }}
  fullWidth
/>`
      },
      notes: [
        'MUI TextField는 label, input, helperText의 aria 연결을 자동 처리합니다.',
        'error prop이 true면 helperText에 role="alert"가 자동 추가됩니다.',
        'variant="outlined"의 border 색상은 대비 3:1을 확인하세요.'
      ]
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'inp-radix-1',
          title: 'Form.Message 활용',
          description: '@radix-ui/react-form의 Form.Message는 aria-live를 자동 관리합니다.',
          level: 'should'
        },
        {
          id: 'inp-radix-2',
          title: 'Form.Label 연결 검증',
          description: 'Form.Label과 Form.Control의 htmlFor/id 연결을 명시적으로 확인하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Form',
        code: `import * as Form from '@radix-ui/react-form'
<Form.Root>
  <Form.Field name='email'>
    <Form.Label>
      Email <span aria-hidden>*</span>
    </Form.Label>
    <Form.Control asChild>
      <input
        type='email'
        required
        autoComplete='email'
        style={{ padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: 4 }}
      />
    </Form.Control>
    <Form.Message match='valueMissing'>Please enter your email.</Form.Message>
    <Form.Message match='typeMismatch'>Please enter a valid email address.</Form.Message>
  </Form.Field>
</Form.Root>`
      },
      notes: [
        '@radix-ui/react-form은 HTML5 validation과 aria를 자동으로 연결합니다.',
        'Form.Message는 validation 조건에 따라 자동으로 aria-live로 동작합니다.',
        '커스텀 validation은 serverInvalid prop으로 처리하세요.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'inp-antd-1',
          title: 'Form.Item rules와 aria 동기화',
          description: 'Ant Design Form의 rules 검증 메시지는 aria-describedby로 연결되지 않을 수 있습니다. 수동 확인이 필요합니다.',
          level: 'must'
        },
        {
          id: 'inp-antd-2',
          title: 'prefix/suffix 아이콘 aria-hidden',
          description: 'Input의 prefix/suffix 아이콘에 aria-hidden을 추가하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Form.Item',
        code: `import { Form, Input } from 'antd'
<Form.Item
  name='email'
  label='Email'
  required
  rules={[
    { required: true, message: 'Please enter your email.' },
    { type: 'email', message: 'Please enter a valid email address.' }
  ]}>
  <Input
    type='email'
    autoComplete='email'
    aria-required='true'
  />
</Form.Item>`
      },
      notes: [
        'Ant Design Form.Item은 레이블과 input을 자동으로 연결합니다.',
        'validateTrigger로 실시간 검증 시점을 조절할 수 있습니다.',
        'Form.Item의 tooltip prop으로 추가 설명을 제공할 수 있습니다.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'inp-chakra-1',
          title: 'Field.Root의 invalid/required 전파',
          description: 'Field.Root에 invalid, required prop을 전달하면 하위 Input에 aria 속성이 자동 적용됩니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI Field',
        code: `import { Field, Input } from '@chakra-ui/react'
<Field.Root
  required
  invalid={hasError}>
  <Field.Label>
    Email <Field.RequiredIndicator />
  </Field.Label>
  <Input
    type='email'
    autoComplete='email'
    placeholder='user@example.com'
  />
  {hasError && <Field.ErrorText>Please enter a valid email address.</Field.ErrorText>}
  <Field.HelperText>e.g. user@example.com</Field.HelperText>
</Field.Root>`
      },
      notes: [
        'Chakra Field.Root의 invalid prop이 Input에 aria-invalid를 자동 설정합니다.',
        'Field.ErrorText는 aria-live로 오류를 스크린리더에 전달합니다.',
        'required prop은 Field.RequiredIndicator와 aria-required 모두 처리합니다.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'inp-spectrum-1',
          title: 'isRequired/isInvalid 사용',
          description: 'React Aria TextField는 isRequired, isInvalid, errorMessage로 자동으로 aria 속성을 관리합니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria TextField',
        code: `import { TextField, Label, Input, Text, FieldError } from 'react-aria-components'

const inputStyle = { display: 'block', width: '100%', border: '1px solid #d1d5db', borderRadius: 6, padding: '6px 10px', fontSize: 14, outline: 'none' }

<TextField isRequired>
  <Label style={{ display: 'block', fontWeight: 600, marginBottom: 4 }}>Email</Label>
  <Input type='email' autoComplete='email' style={inputStyle} />
  <Text slot='description' style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>e.g. user@example.com</Text>
  <FieldError style={{ fontSize: 12, color: '#dc2626', marginTop: 4 }} />
</TextField>`
      },
      notes: [
        'react-aria-components TextField는 compound component로 Label, Input, Text, FieldError를 조합합니다.',
        'isRequired prop이 true면 aria-required가 자동 적용됩니다.',
        'FieldError는 validation 실패 시 자동으로 aria-describedby로 연결됩니다.'
      ]
    },
    baseui: {
      id: 'baseui',
      name: 'Base UI',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'input-baseui-1',
          title: 'Field 컴포넌트로 label-input 자동 연결',
          description: 'Field.Root로 감싸면 Field.Label과 Field.Control이 자동으로 연결되고 Field.Error가 aria-describedby로 연결됩니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI Field + Input',
        code: `import { Field } from '@base-ui/react/field'

export default function App() {
  return (
    <Field.Root>
      <Field.Label>
        Name <span aria-hidden>*</span>
      </Field.Label>
      <Field.Control required placeholder='Enter your name' />
      <Field.Error match='valueMissing'>Please enter your name.</Field.Error>
      <Field.Description>Visible on your profile</Field.Description>
    </Field.Root>
  )
}`
      },
      notes: [
        'Field.Root는 하위 컨트롤에 id와 aria-labelledby를 자동으로 연결합니다.',
        'Field.Error의 match prop은 HTML5 constraint validation API의 유효성 키를 사용합니다.',
        'Field.Control은 Input과 동일하게 동작하며 Field 컨텍스트를 자동으로 받습니다.'
      ]
    }
  }
}
