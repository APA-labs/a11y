import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

import type { Lang } from '../../lib/i18n'

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: Lang }> }) {
  const { lang } = await params
  const aiEnabled = process.env.NEXT_PUBLIC_AI_ENABLED === 'true'

  return (
    <div className='flex flex-col h-screen bg-pearl text-navy overflow-hidden'>
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang='${lang}'` }} />
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
  )
}
