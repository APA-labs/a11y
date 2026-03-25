import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'A11y Pattern',
  description: 'WCAG 2.1 AA 접근성 패턴 레퍼런스 — Material, Radix, Ant Design',
  icons: {
    icon: [{ url: '/a11y-logo.png', type: 'image/png' }],
    apple: '/a11y-logo.png'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
