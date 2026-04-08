import { accordionPattern } from './accordion'
import { alertPattern } from './alert'
import { badgePattern } from './badge'
import { breadcrumbPattern } from './breadcrumb'
import { buttonPattern } from './button'
import { checkboxPattern } from './checkbox'
import { chipPattern } from './chip'
import { comboboxPattern } from './combobox'
import { datePickerPattern } from './date-picker'
import { disclosurePattern } from './disclosure'
import { drawerPattern } from './drawer'
import { formValidationPattern } from './form-validation'
import { linkPattern } from './link'
import { modalDialogPattern } from './modal-dialog'
import { navigationMenuPattern } from './navigation-menu'
import { paginationPattern } from './pagination'
import { popoverPattern } from './popover'
import { radioGroupPattern } from './radio-group'
import { selectPattern } from './select'
import { tabsPattern } from './tabs'
import { textInputPattern } from './text-input'
import { togglePattern } from './toggle'
import { tooltipPattern } from './tooltip'
import { patternTranslationsEn } from './translations.en'

import type { Lang } from '../i18n'
import type { Pattern } from '../types'

export const patterns: Pattern[] = [
  accordionPattern,
  alertPattern,
  badgePattern,
  breadcrumbPattern,
  buttonPattern,
  checkboxPattern,
  chipPattern,
  comboboxPattern,
  datePickerPattern,
  disclosurePattern,
  drawerPattern,
  formValidationPattern,
  linkPattern,
  modalDialogPattern,
  navigationMenuPattern,
  paginationPattern,
  popoverPattern,
  radioGroupPattern,
  selectPattern,
  tabsPattern,
  textInputPattern,
  togglePattern,
  tooltipPattern
]

function applyTranslation(base: Pattern, t: (typeof patternTranslationsEn)[string]): Pattern {
  const checklistWithFallback = <T extends { title: string; description: string }>(
    items: T[],
    translated?: Array<{ title: string; description: string }>
  ) => items.map((item, i) => ({ ...item, ...translated?.[i] }))

  const translatedDsSystems = Object.fromEntries(
    Object.entries(base.designSystems).map(([dsId, ds]) => {
      if (!ds) return [dsId, ds]
      const dsT = t.designSystems?.[dsId]
      return [
        dsId,
        {
          ...ds,
          additionalChecks: checklistWithFallback(ds.additionalChecks, dsT?.additionalChecks),
          notes: dsT?.notes ?? ds.notes
        }
      ]
    })
  ) as Pattern['designSystems']

  return {
    ...base,
    description: t.description,
    baseline: {
      ...base.baseline,
      checklist: {
        must: checklistWithFallback(base.baseline.checklist.must, t.baseline.checklist.must),
        should: checklistWithFallback(base.baseline.checklist.should, t.baseline.checklist.should),
        avoid: checklistWithFallback(base.baseline.checklist.avoid, t.baseline.checklist.avoid)
      }
    },
    designSystems: translatedDsSystems
  }
}

export function getPatterns(lang: Lang): Pattern[] {
  if (lang === 'ko') return patterns
  return patterns.map((p) => {
    const t = patternTranslationsEn[p.slug]
    return t ? applyTranslation(p, t) : p
  })
}

export function getPattern(slug: string, lang: Lang = 'ko'): Pattern | undefined {
  const base = patterns.find((p) => p.slug === slug)
  if (!base) return undefined
  if (lang === 'ko') return base
  const t = patternTranslationsEn[slug]
  return t ? applyTranslation(base, t) : base
}
