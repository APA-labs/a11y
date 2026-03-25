import { en } from './en'
import { ko } from './ko'

export type Lang = 'ko' | 'en'
export const SUPPORTED_LANGS: Lang[] = ['ko', 'en']

export function getTranslations(lang: Lang) {
  return lang === 'en' ? en : ko
}

export type { Translations } from './ko'
