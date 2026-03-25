import { accordionPattern } from './accordion'
import { alertPattern } from './alert'
import { breadcrumbPattern } from './breadcrumb'
import { buttonPattern } from './button'
import { checkboxPattern } from './checkbox'
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

import type { Pattern } from '../types'

export const patterns: Pattern[] = [
  accordionPattern,
  alertPattern,
  breadcrumbPattern,
  buttonPattern,
  checkboxPattern,
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

export function getPattern(slug: string): Pattern | undefined {
  return patterns.find((p) => p.slug === slug)
}
