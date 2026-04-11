import { DS_META } from './types'

import type { DesignSystemId } from './types'

export function getDsSwatchColor(id: DesignSystemId): string {
  if (id === 'baseui') return 'var(--ds-baseui-swatch)'
  return DS_META[id].color
}
