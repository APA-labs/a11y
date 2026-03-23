import Sidebar from '../components/Sidebar'
import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'A11y Pattern Agent',
  description: 'WCAG 2.1 AA 접근성 패턴 레퍼런스 — Material, Radix, Ant Design'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className='flex h-screen bg-slate-50 text-slate-900 overflow-hidden'>
        <Sidebar />
        <main className='flex-1 overflow-y-auto'>{children}</main>
      </body>
    </html>
  )
}
