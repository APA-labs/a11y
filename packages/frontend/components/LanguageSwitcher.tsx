'use client'

import { Languages } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { SUPPORTED_LANGS } from '../lib/i18n'

import type { Lang } from '../lib/i18n'

const LANG_LABELS: Record<Lang, string> = {
  ko: '한국어',
  en: 'English'
}

export default function LanguageSwitcher({ currentLang }: { currentLang: Lang }) {
  const pathname = usePathname()
  const router = useRouter()

  const switchTo = (lang: Lang) => {
    const segments = pathname.split('/')
    segments[1] = lang
    router.push(segments.join('/'))
  }

  return (
    <div className='relative flex items-center'>
      <Languages
        size={14}
        className='absolute left-2 text-mist-500 pointer-events-none'
      />
      <select
        value={currentLang}
        onChange={(e) => switchTo(e.target.value as Lang)}
        aria-label='Language'
        className='appearance-none pl-7 pr-6 py-1 text-xs font-medium text-navy bg-transparent border border-mist-200 rounded-md cursor-pointer hover:border-mist-400 focus:outline-none focus:border-violet-400 transition-colors'>
        {SUPPORTED_LANGS.map((lang) => (
          <option
            key={lang}
            value={lang}>
            {LANG_LABELS[lang]}
          </option>
        ))}
      </select>
      <span className='absolute right-2 text-mist-400 pointer-events-none text-[10px]'>▾</span>
    </div>
  )
}
