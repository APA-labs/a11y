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
          title: 'helperText가 aria-describedby로 자동 연결',
          description:
            'MUI TextField의 helperText는 FormHelperText로 렌더링되며 aria-describedby로 input에 자동 연결됩니다. 수동으로 id를 설정하면 충돌이 발생할 수 있습니다.',
          level: 'should'
        },
        {
          id: 'inp-mui-2',
          title: 'slotProps.htmlInput으로 native input 속성 전달',
          description:
            'autoComplete, aria-required 등 HTML input 속성은 slotProps.htmlInput을 통해 네이티브 input 요소에 전달하세요. inputProps는 v7에서 deprecated입니다.',
          level: 'must'
        },
        {
          id: 'inp-mui-3',
          title: 'error + helperText로 오류 상태 안내',
          description: 'error prop이 true일 때 helperText의 색상이 오류 색으로 변경됩니다. 오류 메시지를 helperText에 제공하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI TextField',
        code: `import { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'

export default function App() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const emailError = submitted && !email.includes('@')
  const nameError = submitted && name.trim() === ''

  return (
    <Box
      component='form'
      noValidate
      className='p-24 max-w-400 stack gap-16'>
      <Typography variant='h6'>Create Account</Typography>

      <TextField
        id='full-name'
        label='Full Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        error={nameError}
        helperText={nameError ? 'Full name is required.' : 'As it appears on your ID'}
        slotProps={{ htmlInput: { autoComplete: 'name', 'aria-required': 'true' } }}
        fullWidth
      />

      <TextField
        id='email-address'
        label='Email Address'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        error={emailError}
        helperText={emailError ? 'Please enter a valid email address.' : 'e.g. user@example.com'}
        slotProps={{ htmlInput: { autoComplete: 'email', 'aria-required': 'true' } }}
        fullWidth
      />

      <Button
        type='submit'
        variant='contained'
        onClick={() => setSubmitted(true)}
        sx={{ alignSelf: 'flex-start', minHeight: 44 }}>
        Create Account
      </Button>
    </Box>
  )
}`
      },
      notes: [
        'MUI TextField는 label, input, helperText의 aria 연결(for/id, aria-describedby)을 자동으로 처리합니다.',
        'slotProps.htmlInput으로 네이티브 input 속성을 전달하세요 (v7+). inputProps는 deprecated입니다.',
        'error prop이 true일 때 helperText 색상이 오류 색으로 변경되며 aria-invalid가 자동 적용됩니다.',
        'required prop은 label에 asterisk를 표시하고 슬롯에 aria-required를 전달합니다.'
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
        className='input'
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
          title: 'Form.Item으로 레이블-입력 자동 연결',
          description:
            'Form.Item의 label과 name prop을 함께 사용하면 htmlFor-id 연결이 자동 처리됩니다. Input에 별도 id 지정 없이도 레이블과 연결됩니다.',
          level: 'must'
        },
        {
          id: 'inp-antd-2',
          title: 'prefix/suffix 아이콘 aria-hidden',
          description: 'Input의 prefix/suffix에 아이콘을 사용할 경우 aria-hidden="true"를 추가해 스크린리더가 장식용 아이콘을 읽지 않도록 하세요.',
          level: 'should'
        },
        {
          id: 'inp-antd-3',
          title: 'status prop으로 유효성 상태 전달',
          description:
            "Form.Item 밖에서 Input을 사용할 때 status='error' 또는 'warning'으로 시각적 상태를 표시하고 aria-describedby로 오류 메시지를 연결하세요.",
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Input',
        code: `import { useState } from 'react'
import { Form, Input, Button, Space } from 'antd'

export default function App() {
  const [form] = Form.useForm()
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className='p-24 max-w-480'>
      <Form
        form={form}
        layout='vertical'
        onFinish={(values) => setSubmitted(true)}
        validateTrigger='onBlur'>
        <Form.Item
          label='Full Name'
          name='name'
          rules={[{ required: true, message: 'Please enter your name.' }]}>
          <Input
            placeholder='John Doe'
            autoComplete='name'
          />
        </Form.Item>

        <Form.Item
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Please enter your email.' },
            { type: 'email', message: 'Please enter a valid email address.' }
          ]}>
          <Input
            type='email'
            placeholder='you@example.com'
            autoComplete='email'
            prefix={<span aria-hidden>@</span>}
          />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please enter a password.' }]}>
          <Input.Password
            placeholder='Enter password'
            autoComplete='new-password'
          />
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {submitted && (
        <p
          role='status'
          className='text-success mt-8'>
          Form submitted successfully!
        </p>
      )}
    </div>
  )
}`
      },
      notes: [
        'Form.Item의 label과 name prop으로 레이블-input 연결이 자동 처리됩니다. Input에 별도 id가 필요하지 않습니다.',
        'Form.Item의 rules 검증 실패 시 aria-invalid와 aria-describedby가 자동으로 설정됩니다.',
        'Input.Password는 비밀번호 표시/숨기기 버튼을 내장하며 접근성 레이블이 자동 적용됩니다.',
        'prefix/suffix에 아이콘 사용 시 aria-hidden을 추가해 장식용 아이콘이 스크린리더에 읽히지 않게 하세요.'
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
        code: `import { useState } from 'react'
import { Field, Input, Button, Stack } from '@chakra-ui/react'

export default function App() {
  const [email, setEmail] = useState('')
  const [hasError, setHasError] = useState(false)

  const handleBlur = () => {
    setHasError(email.length > 0 && !email.includes('@'))
  }

  return (
    <Stack
      gap={4}
      className='p-24 max-w-400'>
      <Field.Root
        required
        invalid={hasError}>
        <Field.Label>
          Email <Field.RequiredIndicator />
        </Field.Label>
        <Input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlur}
          autoComplete='email'
          placeholder='user@example.com'
        />
        {hasError && <Field.ErrorText role='alert'>Please enter a valid email address.</Field.ErrorText>}
        <Field.HelperText>e.g. user@example.com</Field.HelperText>
      </Field.Root>

      <Button
        colorPalette='teal'
        type='submit'>
        Submit
      </Button>
    </Stack>
  )
}`
      },
      notes: [
        'Field.Root의 invalid prop이 하위 Input에 aria-invalid를 자동으로 전파합니다.',
        'Field.ErrorText는 aria-describedby로 Input에 연결됩니다. role="alert"를 추가하면 즉시 전달됩니다.',
        'required prop은 Field.RequiredIndicator 표시와 aria-required를 모두 처리합니다.',
        'Field.HelperText는 aria-describedby로 Input에 자동 연결됩니다.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'inp-spectrum-1',
          title: 'FieldError로 오류 메시지 자동 연결',
          description:
            'FieldError 컴포넌트를 사용하면 유효성 검사 실패 시 aria-describedby가 자동 설정됩니다. 별도로 aria-errormessage를 지정할 필요가 없습니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria TextField',
        code: `import './index.css'
import { TextField, Label, Input, Text, FieldError } from 'react-aria-components'

export default function App() {
  return (
    <div className='p-24 max-w-360 stack gap-16'>
      <TextField isRequired>
        <Label className='label'>Full name</Label>
        <Input
          className='input'
          placeholder='Enter your full name'
        />
        <FieldError className='error' />
      </TextField>

      <TextField
        isRequired
        type='email'>
        <Label className='label'>Email</Label>
        <Input
          className='input'
          placeholder='you@example.com'
          autoComplete='email'
        />
        <Text
          slot='description'
          className='hint'>
          We will never share your email.
        </Text>
        <FieldError className='error' />
      </TextField>

      <TextField isReadOnly>
        <Label className='label'>Username</Label>
        <Input
          className='input'
          defaultValue='@devongovett'
        />
      </TextField>
    </div>
  )
}`
      },
      notes: [
        'TextField는 Label, Input, Text(description), FieldError를 compound component로 조합합니다.',
        'isRequired prop이 true면 aria-required가 자동 적용됩니다.',
        'FieldError는 유효성 검사 실패 시 aria-describedby로 자동 연결됩니다.',
        'isReadOnly prop은 aria-readonly를 자동 적용합니다. isDisabled와 달리 포커스가 유지됩니다.'
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
        },
        {
          id: 'input-baseui-2',
          title: 'Input 단독 사용 시 label 직접 연결',
          description: 'Input(@base-ui-components/react/input)을 Field 없이 단독 사용 시 <label htmlFor>로 직접 연결하거나 aria-label을 추가하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI Field + Input',
        code: `import './index.css'
import { Field } from '@base-ui-components/react/field'
import { Input } from '@base-ui-components/react/input'

export default function App() {
  return (
    <div className='p-24 max-w-360 stack gap-16'>
      <Field.Root name='name'>
        <Field.Label className='label'>
          Full name <span aria-hidden>*</span>
        </Field.Label>
        <Field.Control
          render={<Input className='input' />}
          required
          placeholder='Enter your full name'
        />
        <Field.Error
          match='valueMissing'
          className='error'>
          Please enter your full name.
        </Field.Error>
        <Field.Description className='hint'>Visible on your profile.</Field.Description>
      </Field.Root>

      <Field.Root name='email'>
        <Field.Label className='label'>
          Email <span aria-hidden>*</span>
        </Field.Label>
        <Field.Control
          render={
            <Input
              type='email'
              className='input'
            />
          }
          required
          placeholder='you@example.com'
        />
        <Field.Error
          match='valueMissing'
          className='error'>
          Please enter your email.
        </Field.Error>
        <Field.Error
          match='typeMismatch'
          className='error'>
          Please enter a valid email address.
        </Field.Error>
      </Field.Root>
    </div>
  )
}`
      },
      notes: [
        'Field.Root는 하위 컨트롤에 id와 aria-labelledby를 자동으로 연결합니다.',
        'Field.Error의 match prop은 HTML5 constraint validation API 키를 사용합니다 (valueMissing, typeMismatch 등).',
        'Field.Control은 Field 컨텍스트를 자동으로 받아 aria-invalid, aria-describedby를 관리합니다.',
        'Input(@base-ui-components/react/input)을 단독 사용할 때는 Field 없이도 동작하지만 label 연결이 필요합니다.'
      ]
    }
  }
}
