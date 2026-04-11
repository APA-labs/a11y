import AccordionPreview from './AccordionPreview'
import AlertDialogPreview from './AlertDialogPreview'
import AlertPreview from './AlertPreview'
import BadgePreview from './BadgePreview'
import BreadcrumbPreview from './BreadcrumbPreview'
import ButtonPreview from './ButtonPreview'
import CheckboxPreview from './CheckboxPreview'
import ChipPreview from './ChipPreview'
import ComboboxPreview from './ComboboxPreview'
import DatePickerPreview from './DatePickerPreview'
import DisclosurePreview from './DisclosurePreview'
import DrawerPreview from './DrawerPreview'
import FormValidationPreview from './FormValidationPreview'
import LinkPreview from './LinkPreview'
import ModalDialogPreview from './ModalDialogPreview'
import NavigationMenuPreview from './NavigationMenuPreview'
import PaginationPreview from './PaginationPreview'
import PopoverPreview from './PopoverPreview'
import RadioGroupPreview from './RadioGroupPreview'
import SelectPreview from './SelectPreview'
import TablePreview from './TablePreview'
import TabsPreview from './TabsPreview'
import TextInputPreview from './TextInputPreview'
import ToastPreview from './ToastPreview'
import TogglePreview from './TogglePreview'
import TooltipPreview from './TooltipPreview'

import type { ComponentType } from 'react'

export const previewRegistry: Record<string, ComponentType> = {
  accordion: AccordionPreview,
  alert: AlertPreview,
  'alert-dialog': AlertDialogPreview,
  badge: BadgePreview,
  breadcrumb: BreadcrumbPreview,
  button: ButtonPreview,
  checkbox: CheckboxPreview,
  chip: ChipPreview,
  combobox: ComboboxPreview,
  'date-picker': DatePickerPreview,
  disclosure: DisclosurePreview,
  drawer: DrawerPreview,
  'form-validation': FormValidationPreview,
  link: LinkPreview,
  'modal-dialog': ModalDialogPreview,
  'navigation-menu': NavigationMenuPreview,
  pagination: PaginationPreview,
  popover: PopoverPreview,
  'radio-group': RadioGroupPreview,
  select: SelectPreview,
  table: TablePreview,
  tabs: TabsPreview,
  'text-input': TextInputPreview,
  toast: ToastPreview,
  toggle: TogglePreview,
  tooltip: TooltipPreview
}

export function getPreview(slug: string): ComponentType | null {
  return previewRegistry[slug] ?? null
}
