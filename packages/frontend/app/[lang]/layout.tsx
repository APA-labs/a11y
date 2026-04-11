import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import MotionProvider from '../../components/ui/MotionProvider'

import type { Lang } from '../../lib/i18n'

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: Lang }> }) {
  const { lang } = await params
  const aiEnabled = process.env.NEXT_PUBLIC_AI_ENABLED === 'true'

  return (
    <MotionProvider>
      <div className='flex flex-col h-screen bg-canvas text-body overflow-hidden'>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.lang='${lang}';(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')})()`
          }}
        />
        <Header
          lang={lang}
          aiEnabled={aiEnabled}
        />
        <div className='flex flex-1 min-h-0 overflow-hidden'>
          <Sidebar
            lang={lang}
            aiEnabled={aiEnabled}
          />
          <main className='flex-1 overflow-y-auto'>{children}</main>
        </div>
      </div>
    </MotionProvider>
  )
}
