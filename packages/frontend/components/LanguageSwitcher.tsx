'use client'

import { usePathname, useRouter } from 'next/navigation'

import { SUPPORTED_LANGS } from '../lib/i18n'

import type { Lang } from '../lib/i18n'

export default function LanguageSwitcher({ currentLang }: { currentLang: Lang }) {
  const pathname = usePathname()
  const router = useRouter()

  const switchTo = (lang: Lang) => {
    const segments = pathname.split('/')
    segments[1] = lang
    router.push(segments.join('/'))
  }

  return (
    <div
      className='flex items-center gap-0.5 rounded-md border border-mist-200 p-0.5'
      role='group'
      aria-label='Language'>
      {SUPPORTED_LANGS.map((lang) => (
        <button
          key={lang}
          type='button'
          onClick={() => switchTo(lang)}
          aria-current={currentLang === lang ? 'true' : undefined}
          className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
            currentLang === lang ? 'bg-navy text-white' : 'text-mist-600 hover:text-navy'
          }`}>
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
