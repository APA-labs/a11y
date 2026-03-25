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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

const defaultConfig = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  autoLastmod: true,
  changefreq: 'weekly',
  priority: 0.7,
  // output: 'export',
  // outDir: 'out',
  exclude: ['/404'],
  additionalPaths: async () => {
    const paths = PATTERN_SLUGS.map((slug) => ({
      loc: `/patterns/${slug}`,
      changefreq: 'weekly',
      priority: 0.8
    }))
    return paths
  },
  transform: async (config, path) => {
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined
      }
    }
    if (path === '/wcag') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined
      }
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? []
    }
  },
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }]
  }
}

export default defaultConfig
