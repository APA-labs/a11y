import './globals.css'

import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter, Instrument_Serif } from 'next/font/google'

import type { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap'
})

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
    <html
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className='font-sans'>
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  )
}
