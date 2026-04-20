import { badgeCss } from './badge'
import { breadcrumbCss } from './breadcrumb'
import { buttonsCss } from './buttons'
import { dialogCss } from './dialog'
import { formCss } from './form'
import { layoutCss } from './layout'
import { menuCss } from './menu'
import { panelCss } from './panel'
import { patternCss } from './patterns'
import { tabsCss } from './tabs'
import { utilityCss } from './utility'

const baseCss = [layoutCss, buttonsCss, formCss, dialogCss, panelCss, menuCss, tabsCss, breadcrumbCss, badgeCss, utilityCss].join('\n\n')

export function buildIndexCss(slug?: string): string {
  const extra = slug ? (patternCss[slug] ?? '') : Object.values(patternCss).join('\n\n')
  return baseCss + '\n\n' + extra
}
