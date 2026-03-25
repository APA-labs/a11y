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
    이메일 <span aria-hidden>*</span>
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
      올바른 이메일 형식을 입력해주세요.
    </p>
  )}
  <p id='email-hint'>예: user@example.com</p>
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
  label='이메일'
  type='email'
  required
  error={hasError}
  helperText={hasError ? '올바른 이메일 형식을 입력해주세요.' : '예: user@example.com'}
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
      이메일 <span aria-hidden>*</span>
    </Form.Label>
    <Form.Control asChild>
      <input
        type='email'
        required
        autoComplete='email'
        className='focus-visible:ring-2'
      />
    </Form.Control>
    <Form.Message match='valueMissing'>이메일을 입력해주세요.</Form.Message>
    <Form.Message match='typeMismatch'>올바른 이메일 형식을 입력해주세요.</Form.Message>
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
  label='이메일'
  required
  rules={[
    { required: true, message: '이메일을 입력해주세요.' },
    { type: 'email', message: '올바른 이메일 형식을 입력해주세요.' }
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
    shadcn: {
      id: 'shadcn',
      name: 'shadcn/ui',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'inp-shadcn-1',
          title: 'Label 컴포넌트 연결',
          description: 'shadcn Label의 htmlFor와 Input의 id를 반드시 연결하세요. placeholder만으로는 접근성이 부족합니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'shadcn/ui Input',
        code: `import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
<div className='grid gap-1.5'>
  <Label htmlFor='email'>이메일</Label>
  <Input
    id='email'
    type='email'
    required
    aria-required='true'
    aria-invalid={hasError}
    aria-describedby={hasError ? 'email-error' : undefined}
    autoComplete='email'
    placeholder='user@example.com'
  />
  {hasError && (
    <p
      id='email-error'
      className='text-sm text-destructive'
      role='alert'>
      올바른 이메일 형식을 입력해주세요.
    </p>
  )}
</div>`
      },
      notes: [
        'shadcn Input은 기본 HTML input 요소로 aria 속성을 직접 추가해야 합니다.',
        'Label 컴포넌트와 htmlFor/id로 연결하세요.',
        "오류 메시지는 role='alert'와 aria-describedby로 연결하세요."
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
    이메일 <Field.RequiredIndicator />
  </Field.Label>
  <Input
    type='email'
    autoComplete='email'
    placeholder='user@example.com'
  />
  {hasError && <Field.ErrorText>올바른 이메일 형식을 입력해주세요.</Field.ErrorText>}
  <Field.HelperText>예: user@example.com</Field.HelperText>
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
        code: `import { TextField } from 'react-aria-components'
<TextField
  type='email'
  label='이메일'
  isRequired
  isInvalid={hasError}
  autoComplete='email'
  errorMessage='올바른 이메일 형식을 입력해주세요.'
  description='예: user@example.com'
/>`
      },
      notes: [
        'React Aria TextField는 label, error, description의 aria 연결을 모두 자동 처리합니다.',
        'isRequired prop이 true면 화면에 표시와 aria-required 모두 적용됩니다.',
        'errorMessage는 aria-describedby로 자동 연결됩니다.'
      ]
    }
  }
}
