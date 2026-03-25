'use client'

import { usePathname } from 'next/navigation'

import { getTranslations } from './index'

import type { Lang } from './index'

export function useLang(): Lang {
  const pathname = usePathname()
  const segment = pathname.split('/')[1]
  return segment === 'en' ? 'en' : 'ko'
}

export function useTranslations() {
  const lang = useLang()
  return getTranslations(lang)
}
