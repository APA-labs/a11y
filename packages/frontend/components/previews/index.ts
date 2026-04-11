import PaginationPreview from './PaginationPreview'
import TablePreview from './TablePreview'
import ToastPreview from './ToastPreview'

import type { ComponentType } from 'react'

export const previewRegistry: Record<string, ComponentType> = {
  pagination: PaginationPreview,
  table: TablePreview,
  toast: ToastPreview
}

export function getPreview(slug: string): ComponentType | null {
  return previewRegistry[slug] ?? null
}
