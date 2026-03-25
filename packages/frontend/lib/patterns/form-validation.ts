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
    if (!email) return '이메일을 입력해주세요.'
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) return '올바른 이메일 형식이 아닙니다.'
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
          이메일 <span aria-hidden>*</span>
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
      <button type='submit'>제출</button>
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
      setError('올바른 이메일 형식이 아닙니다.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate>
      <TextField
        label='이메일'
        type='email'
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          setError('')
        }}
        error={!!error}
        helperText={error || '예: user@example.com'}
        inputProps={{ 'aria-required': true }}
      />
      <Button
        type='submit'
        variant='contained'>
        제출
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
          title: 'Form.Message로 에러 연결',
          description: 'Radix Form.Message는 Form.Field 이름으로 입력과 에러를 자동으로 연결합니다. name prop을 반드시 일치시키세요.',
          level: 'must'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Radix Form',
        code: `import * as Form from '@radix-ui/react-form'
<Form.Root onSubmit={handleSubmit}>
  <Form.Field name='email'>
    <Form.Label>이메일</Form.Label>
    <Form.Control asChild>
      <input
        type='email'
        required
      />
    </Form.Control>
    <Form.Message match='valueMissing'>이메일을 입력해주세요.</Form.Message>
    <Form.Message match='typeMismatch'>올바른 이메일 형식이 아닙니다.</Form.Message>
  </Form.Field>
  <Form.Submit asChild>
    <button type='submit'>제출</button>
  </Form.Submit>
</Form.Root>`
      },
      notes: [
        'Radix Form은 "inline errors" 패턴을 따릅니다. 에러 메시지와 입력이 자동으로 aria-describedby로 연결됩니다.',
        '제출 실패 시 첫 번째 유효하지 않은 필드로 포커스가 자동 이동합니다.',
        'match prop으로 HTML5 내장 유효성 검사 타입을 사용할 수 있습니다.'
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
          description: 'Ant Design Form의 기본 validateTrigger는 onChange입니다. 입력 중 에러 표시를 방지하려면 onBlur 또는 onSubmit으로 변경하세요.',
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'Ant Design Form',
        code: `import { Form, Input, Button } from 'antd'
<Form
  layout='vertical'
  onFinishFailed={({ errorFields }) => {
    const first = errorFields[0]
    if (first) form.scrollToField(first.name)
  }}>
  <Form.Item
    label='이메일'
    name='email'
    rules={[
      { required: true, message: '이메일을 입력해주세요.' },
      { type: 'email', message: '올바른 이메일 형식이 아닙니다.' }
    ]}
    validateTrigger='onBlur'>
    <Input type='email' />
  </Form.Item>
  <Form.Item>
    <Button
      type='primary'
      htmlType='submit'>
      제출
    </Button>
  </Form.Item>
</Form>`
      },
      notes: [
        'Ant Design Form은 aria-invalid와 aria-describedby를 자동으로 설정합니다.',
        'onFinishFailed 콜백에서 첫 번째 에러 필드로 스크롤/포커스를 이동하세요.',
        'layout="vertical"을 사용하면 레이블이 입력 위에 표시되어 시각적으로 더 명확합니다.'
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
        code: `import { Field, Input, Button } from '@chakra-ui/react'
import { useState } from 'react'

export default function App() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) {
      setError('올바른 이메일 형식을 입력해주세요.')
      return
    }
    setError('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <Field.Root
        required
        invalid={!!error}>
        <Field.Label>
          이메일 <Field.RequiredIndicator />
        </Field.Label>
        <Input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <Field.ErrorText role='alert'>{error}</Field.ErrorText>}
      </Field.Root>
      <Button
        type='submit'
        mt={4}>
        제출
      </Button>
    </form>
  )
}`
      },
      notes: [
        'Chakra Field.Root의 invalid prop이 Input에 aria-invalid를 자동 설정합니다.',
        "Field.ErrorText에 role='alert'를 추가해 스크린리더에 즉시 알림이 전달되게 하세요.",
        'Field.RequiredIndicator는 시각적 필수 표시와 함께 aria-required를 설정합니다.'
      ]
    },
    spectrum: {
      id: 'spectrum',
      name: 'React Spectrum',
      color: '#e03',
      additionalChecks: [
        {
          id: 'fv-spectrum-1',
          title: 'Form의 validationBehavior 설정',
          description: "validationBehavior='aria'로 설정하면 HTML5 validation 대신 aria를 통해 오류를 전달합니다.",
          level: 'should'
        }
      ],
      codeSample: {
        language: 'tsx',
        label: 'React Aria Form',
        code: `import { Form, TextField, Button } from 'react-aria-components'

export default function App() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <TextField
        type='email'
        name='email'
        label='이메일'
        isRequired
        validate={(v) => (v.includes('@') ? null : '올바른 이메일 형식을 입력해주세요.')}
        errorMessage={(e) => e.validationErrors}
      />
      <Button type='submit'>제출</Button>
    </Form>
  )
}`
      },
      notes: [
        'React Aria Form은 HTML5 validation과 aria를 통합합니다.',
        'TextField의 validate 함수로 커스텀 검증을 추가하세요.',
        "validationBehavior='aria'로 스크린리더 오류 공지를 최적화하세요."
      ]
    }
  }
}
