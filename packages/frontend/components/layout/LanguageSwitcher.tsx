'use client'

import { Languages } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import type { Lang } from '@/lib/i18n'

import { SUPPORTED_LANGS } from '@/lib/i18n'

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
        className='flex items-center gap-1 px-2 py-1 rounded-md text-faint hover:text-navy hover:bg-mist-100 dark:hover:bg-[#1E2E40] dark:hover:text-white transition-colors'>
        <Languages size={15} />
      </button>

      {open && (
        <div className='absolute right-0 top-full mt-1 w-28 bg-float border border-outline rounded-lg shadow-md z-50 py-1'>
          {SUPPORTED_LANGS.map((lang) => (
            <button
              key={lang}
              type='button'
              onClick={() => switchTo(lang)}
              className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${
                currentLang === lang
                  ? 'text-violet-600 font-medium bg-violet-50 dark:text-violet-400 dark:bg-violet-900/30'
                  : 'text-body hover:bg-mist-50 dark:hover:bg-[#1E2E40] dark:hover:text-white'
              }`}>
              {LANG_LABELS[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
