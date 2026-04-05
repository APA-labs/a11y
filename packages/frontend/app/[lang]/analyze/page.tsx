import { Sparkles } from 'lucide-react'

import AnalyzeForm from '../../../components/AnalyzeForm'
import AnalyzeTabs from '../../../components/AnalyzeTabs'
import GenerateForm from '../../../components/GenerateForm'
import { getTranslations, SUPPORTED_LANGS } from '../../../lib/i18n'

import type { Lang } from '../../../lib/i18n'

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }))
}

export default async function AnalyzePage({ params }: { params: Promise<{ lang: Lang }> }) {
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
          <h1 className='text-2xl font-bold text-body'>{t.analyze.title}</h1>
        </div>
        <p className='text-soft text-sm leading-relaxed max-w-xl'>{t.analyze.subtitle}</p>
      </div>

      <AnalyzeTabs
        lang={lang}
        analyzeForm={<AnalyzeForm lang={lang} />}
        generateForm={<GenerateForm lang={lang} />}
      />
    </div>
  )
}
