import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'A11y Pattern Agent',
  description: 'WCAG 2.1 AA 접근성 패턴 레퍼런스 — Material, Radix, Ant Design'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const aiEnabled = process.env.NEXT_PUBLIC_AI_ENABLED === 'true'

  return (
    <html lang='ko'>
      <body className='flex flex-col h-screen bg-pearl text-navy overflow-hidden'>
        {/* 글로벌 상단 헤더 */}
        <Header aiEnabled={aiEnabled} />

        {/* 사이드바 + 콘텐츠 */}
        <div className='flex flex-1 min-h-0 overflow-hidden'>
          <Sidebar aiEnabled={aiEnabled} />
          <main className='flex-1 overflow-y-auto'>{children}</main>
        </div>
      </body>
    </html>
  )
}
