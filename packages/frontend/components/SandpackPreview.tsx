'use client'

import { SandpackCodeEditor, SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react'

function buildAppCode(componentCode: string): string {
  const defaultExportMatch = componentCode.match(/export\s+default\s+function\s+(\w+)/)
  if (defaultExportMatch) return componentCode

  const namedExportMatch = componentCode.match(/export\s+function\s+(\w+)/)
  const name = namedExportMatch?.[1]
  if (!name) return componentCode

  const hasChildren = /children/.test(componentCode)
  const hasTitle = /\btitle\b/.test(componentCode)
  const hasLabel = /\blabel\b/.test(componentCode)
  const hasLegend = /\blegend\b/.test(componentCode)

  const props: string[] = []
  if (hasTitle) props.push('title="예시 제목"')
  if (hasLabel) props.push('label="레이블"')
  if (hasLegend) props.push('legend="그룹 제목"')

  const propsStr = props.join(' ')

  const inner = hasChildren ? `<p style={{ margin: 0 }}>예시 내용입니다.</p>` : ''

  const renderCall = inner ? `<${name} ${propsStr}>${inner}</${name}>` : `<${name} ${propsStr} />`

  return `${componentCode}

export default function App() {
  return (
    <div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif', fontSize: '14px' }}>
      ${renderCall}
    </div>
  )
}`
}

interface Props {
  code: string
  language: string
}

export default function SandpackPreviewBlock({ code, language }: Props) {
  const isHtml = language === 'html'

  if (isHtml) {
    return (
      <div
        className='rounded-b-xl overflow-hidden bg-white'
        style={{ height: 240 }}>
        <iframe
          srcDoc={code}
          title='HTML 미리보기'
          className='w-full h-full border-0'
          sandbox='allow-scripts'
        />
      </div>
    )
  }

  const appCode = buildAppCode(code)

  return (
    <SandpackProvider
      template='react-ts'
      files={{ '/App.tsx': appCode }}
      theme='dark'
      options={{ recompileMode: 'delayed', recompileDelay: 500 }}>
      <SandpackLayout style={{ borderRadius: '0 0 0.75rem 0.75rem', border: 'none' }}>
        <SandpackCodeEditor style={{ height: 260 }} />
        <SandpackPreview
          style={{ height: 260 }}
          showNavigator={false}
        />
      </SandpackLayout>
    </SandpackProvider>
  )
}
