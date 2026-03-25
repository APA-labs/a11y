import process from 'node:process'

/** @type {import('next-sitemap').IConfig} */

const PATTERN_SLUGS = [
  'accordion',
  'alert',
  'breadcrumb',
  'button',
  'checkbox',
  'combobox',
  'date-picker',
  'disclosure',
  'drawer',
  'form-validation',
  'link',
  'modal-dialog',
  'navigation-menu',
  'pagination',
  'popover',
  'radio-group',
  'select',
  'tabs',
  'text-input',
  'toggle',
  'tooltip'
]

const LANGS = ['ko', 'en']
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

const defaultConfig = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  autoLastmod: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/404', '/'],
  additionalPaths: async () => {
    const paths = []
    for (const lang of LANGS) {
      paths.push({ loc: `/${lang}`, changefreq: 'daily', priority: 1 })
      paths.push({ loc: `/${lang}/wcag`, changefreq: 'weekly', priority: 0.9 })
      for (const slug of PATTERN_SLUGS) {
        paths.push({ loc: `/${lang}/patterns/${slug}`, changefreq: 'weekly', priority: 0.8 })
      }
    }
    return paths
  },
  transform: async (config, path) => ({
    loc: path,
    changefreq: config.changefreq,
    priority: config.priority,
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    alternateRefs: LANGS.map((lang) => ({
      href: `${siteUrl}/${lang}${path.replace(/^\/(ko|en)/, '')}`,
      hreflang: lang
    }))
  }),
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }]
  }
}

export default defaultConfig
