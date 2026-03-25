'use client'

import { Languages } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { SUPPORTED_LANGS } from '../lib/i18n'

import type { Lang } from '../lib/i18n'

const LANG_LABELS: Record<Lang, string> = {
  ko: '한국어',
  en: 'English'
}

export default function LanguageSwitcher({ currentLang }: { currentLang: Lang }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const switchTo = (lang: Lang) => {
    const segments = pathname.split('/')
    segments[1] = lang
    router.push(segments.join('/'))
    setOpen(false)
  }

  return (
    <div
      ref={ref}
      className='relative'>
      <button
        type='button'
        onClick={() => setOpen((v) => !v)}
        aria-label='Language'
        aria-expanded={open}
        className='flex items-center gap-1 px-2 py-1 rounded-md text-mist-500 hover:text-navy hover:bg-mist-100 transition-colors'>
        <Languages size={15} />
      </button>

      {open && (
        <div className='absolute right-0 top-full mt-1 w-28 bg-white border border-mist-200 rounded-lg shadow-md z-50 py-1'>
          {SUPPORTED_LANGS.map((lang) => (
            <button
              key={lang}
              type='button'
              onClick={() => switchTo(lang)}
              className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${
                currentLang === lang ? 'text-violet-600 font-medium bg-violet-50' : 'text-navy hover:bg-mist-50'
              }`}>
              {LANG_LABELS[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
