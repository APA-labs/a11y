import { Sparkles } from 'lucide-react'
import { redirect } from 'next/navigation'

import AnalyzeForm from '../../../components/AnalyzeForm'
import { getTranslations, SUPPORTED_LANGS } from '../../../lib/i18n'

import type { Lang } from '../../../lib/i18n'

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }))
}

export default async function AnalyzePage({ params }: { params: Promise<{ lang: Lang }> }) {
  if (process.env.NEXT_PUBLIC_AI_ENABLED !== 'true') {
    const { lang } = await params
    redirect(`/${lang}`)
  }

  const { lang } = await params
  const t = getTranslations(lang)

  return (
    <div className='max-w-4xl mx-auto px-8 py-10'>
      <div className='mb-8'>
        <div className='flex items-center gap-2 mb-2'>
          <Sparkles
            size={18}
            className='text-indigo-500'
          />
          <h1 className='text-2xl font-bold text-slate-900 dark:text-pearl-100'>{t.analyze.title}</h1>
        </div>
        <p className='text-slate-500 text-sm leading-relaxed max-w-xl dark:text-mist-400'>{t.analyze.subtitle}</p>
      </div>

      <AnalyzeForm />
    </div>
  )
}
