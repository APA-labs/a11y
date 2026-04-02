import type { Pattern } from '../types'

export const formValidationPattern: Pattern = {
  slug: 'form-validation',
  name: 'Form Validation',
  description: '인라인 에러 메시지와 접근 가능한 유효성 검사를 포함한 폼 컴포넌트',
  wcagCriteria: ['1.3.1 Info and Relationships', '3.3.1 Error Identification', '3.3.2 Labels or Instructions', '3.3.3 Error Suggestion'],
  tags: ['form', 'interactive', 'validation'],
  baseline: {
    checklist: {
      must: [
        {
          id: 'form-m1',
          title: '에러 메시지를 aria-describedby로 연결',
          description: '입력 필드와 에러 메시지를 aria-describedby로 연결해야 합니다. 스크린리더가 필드에 포커스할 때 에러 내용을 자동으로 읽습니다.',
          level: 'must'
        },
        {
          id: 'form-m2',
          title: 'aria-invalid 설정',
          description: '유효성 검사에 실패한 필드에 aria-invalid="true"를 설정해야 합니다.',
          level: 'must'
        },
        {
          id: 'form-m3',
          title: 'aria-required 또는 required 설정',
          description: '필수 입력 필드에 required 또는 aria-required="true"를 설정해야 합니다. 별표(*)만으로는 충분하지 않습니다.',
          level: 'must'
        },
        {
          id: 'form-m4',
          title: '에러 발생 시 포커스 이동',
          description: '폼 제출 실패 시 첫 번째 에러 필드나 에러 요약 메시지로 포커스를 이동해야 합니다.',
          level: 'must'
        },
        {
          id: 'form-m5',
          title: '모든 입력에 레이블 연결',
          description: '모든 입력 필드에 <label>의 htmlFor 또는 aria-label/aria-labelledby로 레이블을 연결해야 합니다.',
          level: 'must'
        }
      ],
      should: [
        {
          id: 'form-s1',
          title: '구체적인 에러 메시지',
          description: '"잘못된 입력"보다 "이메일 주소 형식이 올바르지 않습니다"처럼 구체적인 에러 메시지를 제공하세요.',
          level: 'should'
        },
        {
          id: 'form-s2',
          title: '에러 요약 제공',
          description: '여러 에러가 있을 때 페이지 상단에 모든 에러를 나열한 요약을 role="alert"로 제공하세요.',
          level: 'should'
        },
        {
          id: 'form-s3',
          title: '입력 형식 힌트 제공',
          description: '날짜, 전화번호 등 특정 형식이 필요한 경우 aria-describedby로 형식 힌트를 제공하세요.',
          level: 'should'
        }
      ],
      avoid: [
        {
          id: 'form-a1',
          title: '색상만으로 에러 표시',
          description: '빨간 테두리만으로 에러를 표시하면 색맹 사용자가 인식하기 어렵습니다. 아이콘과 텍스트 메시지를 함께 제공하세요.',
          level: 'avoid'
        },
        {
          id: 'form-a2',
          title: '입력 중 실시간 에러 표시',
          description: '사용자가 입력 중에 실시간으로 에러를 표시하면 혼란을 줍니다. blur 이벤트 또는 제출 시점에 검증하세요.',
          level: 'avoid'
        },
        {
          id: 'form-a3',
          title: 'placeholder를 레이블로 사용',
          description: 'placeholder는 포커스 시 사라지므로 레이블 대용으로 사용하지 마세요.',
          level: 'avoid'
        }
      ]
    },
    codeSample: {
      language: 'tsx',
      label: 'Baseline (React)',
      code: `function FormWithValidation() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const errorId = 'email-error'

  const validate = () => {
    if (!email) return 'Please enter your email.'
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) return 'Please enter a valid email address.'
    return ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validate()
    setError(err)
    if (err) document.getElementById('email-input')?.focus()
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate>
      <div>
        <label htmlFor='email-input'>
          Email <span aria-hidden>*</span>
        </label>
        <input
          id='email-input'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-required='true'
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
        {error && (
          <p
            id={errorId}
            role='alert'>
            {error}
          </p>
        )}
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
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
          id: 'form-mui-1',
          title: 'helperText와 error prop 함께 사용',
          description: 'MUI TextField의 error prop과 helperText prop을 함께 사용하면 aria-invalid와 aria-describedby가 자동으로 연결됩니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'MUI TextField with Validation',
        code: `import { TextField, Button } from '@mui/material'

function MuiForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate>
      <TextField
        label='Email'
        type='email'
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          setError('')
        }}
        error={!!error}
        helperText={error || 'e.g. user@example.com'}
        inputProps={{ 'aria-required': true }}
      />
      <Button
        type='submit'
        variant='contained'>
        Submit
      </Button>
    </form>
  )
}`
      },
      notes: [
        'MUI TextField의 error prop은 자동으로 aria-invalid를 설정합니다.',
        'helperText는 FormHelperText로 렌더링되며 aria-describedby로 자동 연결됩니다.',
        'required prop은 레이블에 별표를 자동으로 추가하고 aria-required를 설정합니다.'
      ]
    },
    radix: {
      id: 'radix',
      name: 'Radix UI',
      color: '#6e56cf',
      additionalChecks: [
        {
          id: 'form-radix-1',
          title: 'Form.Field name과 Form.Message match 일치',
          description:
            'Form.Message는 Form.Field의 name 기반으로 입력과 에러를 자동 연결합니다. name prop이 일치해야 aria-describedby가 올바르게 설정됩니다.',
          level: 'must'
        },
        {
          id: 'form-radix-2',
          title: 'Form.Message의 match prop으로 조건별 에러 분기',
          description:
            'match="valueMissing"(필수 미입력), match="typeMismatch"(타입 불일치) 등 HTML5 유효성 타입을 사용해 조건별 에러 메시지를 제공하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Form',
        code: `import './index.css'
import * as Form from '@radix-ui/react-form'

export default function App() {
  return (
    <Form.Root
      className='app max-w-400'
      onSubmit={(e) => {
        e.preventDefault()
      }}>
      <Form.Field
        name='username'
        className='field mb-16'>
        <Form.Label className='label'>Username</Form.Label>
        <Form.Control asChild>
          <input
            type='text'
            required
            minLength={3}
            className='input'
            placeholder='Enter username'
          />
        </Form.Control>
        <Form.Message
          match='valueMissing'
          className='error'>
          Please enter a username.
        </Form.Message>
        <Form.Message
          match='tooShort'
          className='error'>
          Username must be at least 3 characters.
        </Form.Message>
      </Form.Field>

      <Form.Field
        name='email'
        className='field mb-16'>
        <Form.Label className='label'>Email</Form.Label>
        <Form.Control asChild>
          <input
            type='email'
            required
            className='input'
            placeholder='you@example.com'
          />
        </Form.Control>
        <Form.Message
          match='valueMissing'
          className='error'>
          Please enter your email.
        </Form.Message>
        <Form.Message
          match='typeMismatch'
          className='error'>
          Please enter a valid email address.
        </Form.Message>
      </Form.Field>

      <Form.Submit className='btn btn-radix w-full'>Create account</Form.Submit>
    </Form.Root>
  )
}`
      },
      notes: [
        'Form.Message는 연결된 Form.Field의 입력 상태에 따라 자동으로 표시되며, 해당 input에 aria-describedby로 연결됩니다.',
        '제출 실패 시 첫 번째 유효하지 않은 필드로 포커스가 자동 이동합니다.',
        'match prop은 HTML5 Constraint Validation API의 ValidityState 속성(valueMissing, typeMismatch, tooShort 등)을 사용합니다. 커스텀 함수도 가능합니다.',
        'Form.Control asChild로 네이티브 input에 Radix Form의 유효성 검사를 위임합니다.'
      ]
    },
    antd: {
      id: 'antd',
      name: 'Ant Design',
      color: '#1677ff',
      additionalChecks: [
        {
          id: 'form-antd-1',
          title: 'validateTrigger를 onBlur로 설정',
          description:
            'Ant Design Form의 기본 validateTrigger는 onChange입니다. 입력 중 오류 표시를 방지하려면 Form.Item 또는 Form 수준에서 validateTrigger="onBlur"로 변경하세요.',
          level: 'should'
        },
        {
          id: 'form-antd-2',
          title: 'scrollToFirstError로 첫 오류 필드 포커스',
          description:
            'Form에 scrollToFirstError prop을 추가하면 제출 실패 시 첫 번째 오류 필드로 자동 스크롤하고 포커스를 이동합니다. WCAG 3.3.1 오류 식별 요구사항을 충족합니다.',
          level: 'must'
        },
        {
          id: 'form-antd-3',
          title: 'Form.Item label prop으로 레이블 연결',
          description:
            'Form.Item의 label prop과 name prop을 함께 사용하면 htmlFor-id 연결이 자동으로 처리됩니다. Input에 별도 id를 지정하지 않아도 됩니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Form',
        code: `import './index.css'
import { Form, Input, Button, Space } from 'antd'

export default function App() {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log('Submitted:', values)
  }

  return (
    <div className='p-24 max-w-480'>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        scrollToFirstError
        validateTrigger='onBlur'>
        <Form.Item
          label='Username'
          name='username'
          rules={[
            { required: true, message: 'Please enter your username.' },
            { min: 3, message: 'Username must be at least 3 characters.' }
          ]}>
          <Input
            placeholder='Enter username'
            autoComplete='username'
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
          />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            { required: true, message: 'Please enter a password.' },
            { min: 8, message: 'Password must be at least 8 characters.' }
          ]}>
          <Input.Password
            placeholder='Minimum 8 characters'
            autoComplete='new-password'
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type='primary'
              htmlType='submit'>
              Create Account
            </Button>
            <Button
              htmlType='reset'
              onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}`
      },
      notes: [
        'Form.Item은 rules 기반 검증 실패 시 Input에 aria-invalid와 aria-describedby를 자동으로 설정합니다.',
        'scrollToFirstError prop으로 제출 실패 시 첫 번째 오류 필드로 자동 이동합니다.',
        'validateTrigger="onBlur"로 설정해 입력 중 오류 표시를 방지하고 사용자 이탈 후 검증하세요.',
        'Form.Item의 label과 name을 함께 사용하면 레이블-입력 연결이 자동으로 처리됩니다.'
      ]
    },
    chakra: {
      id: 'chakra',
      name: 'Chakra UI',
      color: '#319795',
      additionalChecks: [
        {
          id: 'fv-chakra-1',
          title: 'Field.ErrorText에 role="alert" 추가',
          description: '동적으로 나타나는 오류 메시지에 role="alert"를 추가해 스크린리더에 즉시 전달하세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Chakra UI Field',
        code: `import './index.css'
import { useState } from 'react'
import { Field, Input, Button, Stack } from '@chakra-ui/react'

export default function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const ne = name.trim() === '' ? 'Name is required.' : ''
    const ee = !email.includes('@') ? 'Please enter a valid email address.' : ''
    setNameError(ne)
    setEmailError(ee)
    if (!ne && !ee) setSubmitted(true)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate>
      <Stack
        gap={4}
        className='p-24 max-w-400'>
        <Field.Root
          required
          invalid={!!nameError}>
          <Field.Label>
            Full name <Field.RequiredIndicator />
          </Field.Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your name'
          />
          {nameError && <Field.ErrorText role='alert'>{nameError}</Field.ErrorText>}
        </Field.Root>

        <Field.Root
          required
          invalid={!!emailError}>
          <Field.Label>
            Email <Field.RequiredIndicator />
          </Field.Label>
          <Input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='you@example.com'
          />
          {emailError && <Field.ErrorText role='alert'>{emailError}</Field.ErrorText>}
          <Field.HelperText>e.g. user@example.com</Field.HelperText>
        </Field.Root>

        <Button
          type='submit'
          colorPalette='teal'>
          Submit
        </Button>

        {submitted && (
          <p
            role='status'
            className='text-success mt-0 mb-0 text-sm'>
            Form submitted successfully!
          </p>
        )}
      </Stack>
    </form>
  )
}`
      },
      notes: [
        'Field.Root의 invalid prop이 하위 Input에 aria-invalid를 자동으로 전파합니다.',
        'Field.ErrorText에 role="alert"를 추가하면 스크린리더에 오류가 즉시 전달됩니다.',
        'Field.RequiredIndicator는 시각적 필수 표시(*)와 aria-required를 모두 처리합니다.',
        'Field.HelperText는 aria-describedby로 Input에 자동 연결됩니다.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'fv-spectrum-1',
          title: 'validationBehavior="aria" 사용 권장',
          description:
            "Form에 validationBehavior='aria'를 설정하면 HTML5 native validation 대신 aria를 통해 오류를 전달합니다. 폼 제출을 막지 않고 실시간으로 검증합니다.",
          level: 'should'
        },
        {
          id: 'fv-spectrum-2',
          title: 'validationErrors로 서버 오류 전달',
          description: 'Form의 validationErrors prop에 필드명:오류메시지 객체를 전달하면 서버 검증 결과를 각 FieldError에 자동 연결합니다.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria Form',
        code: `import './index.css'
import { Form, TextField, Label, Input, FieldError, Button, Text } from 'react-aria-components'

export default function App() {
  return (
    <Form
      className='app max-w-360 stack'
      onSubmit={(e) => {
        e.preventDefault()
        alert('Submitted!')
      }}>
      <TextField
        name='name'
        isRequired>
        <Label className='label'>Full name</Label>
        <Input
          className='input'
          placeholder='Enter your full name'
        />
        <FieldError className='error' />
      </TextField>

      <TextField
        name='username'
        isRequired
        validate={(v) => (v.length >= 3 ? null : 'Username must be at least 3 characters.')}>
        <Label className='label'>Username</Label>
        <Input
          className='input'
          placeholder='Choose a username'
        />
        <Text
          slot='description'
          className='hint'>
          Minimum 3 characters.
        </Text>
        <FieldError className='error' />
      </TextField>

      <div className='row'>
        <Button
          type='submit'
          className='btn btn-accent w-full'>
          Submit
        </Button>
        <Button
          type='reset'
          className='btn w-full'>
          Reset
        </Button>
      </div>
    </Form>
  )
}`
      },
      notes: [
        'Form은 HTML5 validation과 aria를 통합하며 각 필드의 FieldError에 오류를 자동 분배합니다.',
        'validate 함수로 커스텀 검증을 정의하세요. null 반환 시 유효, 문자열 반환 시 오류 메시지입니다.',
        "validationBehavior='aria'로 설정하면 폼 제출 차단 없이 실시간 검증 결과를 aria로 전달합니다.",
        'isRequired, minLength, maxLength, pattern, type 등의 prop으로 HTML5 내장 검증도 활용할 수 있습니다.'
      ]
    },
    baseui: {
      id: 'baseui',
      name: 'Base UI',
      color: '#18181b',
      additionalChecks: [
        {
          id: 'form-baseui-1',
          title: 'Field.Error의 match prop으로 유효성 검사 연결',
          description:
            'Field.Error의 match prop은 HTML5 constraint validation API 키를 사용합니다 (valueMissing, typeMismatch, tooShort 등). Field.Root 내에서만 동작합니다.',
          level: 'must'
        },
        {
          id: 'form-baseui-2',
          title: 'Field.Root로 label-input-error 자동 연결',
          description:
            'Field.Root로 감싸면 Field.Label, Field.Control, Field.Error, Field.Description이 자동으로 aria-labelledby, aria-describedby, aria-invalid으로 연결됩니다.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Base UI Field Validation',
        code: `import './index.css'
import { Field } from '@base-ui-components/react/field'

export default function App() {
  return (
    <form
      className='app max-w-360 stack'
      onSubmit={(e) => {
        e.preventDefault()
        alert('Submitted!')
      }}>
      <Field.Root name='name'>
        <Field.Label className='label'>
          Full name <span aria-hidden>*</span>
        </Field.Label>
        <Field.Control
          as='input'
          required
          minLength={2}
          placeholder='Enter your full name'
          className='input'
        />
        <Field.Error
          match='valueMissing'
          className='error'>
          Please enter your full name.
        </Field.Error>
        <Field.Error
          match='tooShort'
          className='error'>
          Name must be at least 2 characters.
        </Field.Error>
      </Field.Root>

      <Field.Root name='email'>
        <Field.Label className='label'>
          Email <span aria-hidden>*</span>
        </Field.Label>
        <Field.Control
          as='input'
          type='email'
          required
          placeholder='you@example.com'
          className='input'
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
        <Field.Description className='hint'>We will never share your email.</Field.Description>
      </Field.Root>

      <button
        type='submit'
        className='btn btn-primary w-full'>
        Submit
      </button>
    </form>
  )
}`
      },
      notes: [
        'Field.Root는 name prop으로 폼 제출 시 필드를 식별하고, Field.Label/Field.Error/Field.Description을 자동으로 연결합니다.',
        'Field.Error의 match prop은 HTML5 constraint validation API 키를 사용합니다 (valueMissing, typeMismatch, tooShort, tooLong, patternMismatch 등).',
        'Field.Control에 as="input"으로 네이티브 input을 렌더링하거나, render prop으로 커스텀 컴포넌트를 연결하세요.',
        'aria-invalid는 유효성 검사 실패 시 Field.Control에 자동으로 설정됩니다.',
        'Field.Validity로 커스텀 유효성 검사 로직을 추가할 수 있습니다.'
      ]
    }
  }
}
