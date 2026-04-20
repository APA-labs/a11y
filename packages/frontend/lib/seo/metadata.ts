import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://apa-a11y.com'

export function buildAlternates(lang: string, subpath: string = ''): Metadata['alternates'] {
  return {
    canonical: `${SITE_URL}/${lang}${subpath}`,
    languages: {
      ko: `${SITE_URL}/ko${subpath}`,
      en: `${SITE_URL}/en${subpath}`,
      'x-default': `${SITE_URL}/ko${subpath}`
    }
  }
}
