import { readdirSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next-sitemap').IConfig} */

const PATTERN_SLUGS = readdirSync(path.join(__dirname, 'lib/patterns'))
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts' && f !== 'translations.en.ts')
  .map((f) => f.replace(/\.ts$/, ''))
  .sort()

const WCAG_SUBPAGES = ['', '/aria', '/dom', '/why']
const LANGS = ['ko', 'en']
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

const defaultConfig = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  autoLastmod: true,
  changefreq: 'weekly',
  priority: 0.7,
  // Next.js [lang] 다이나믹 세그먼트가 자동 수집 시 벗겨져 bare path가 들어오므로 제외.
  // 실제 등록은 아래 additionalPaths에서 로컬라이즈된 경로만 수행.
  exclude: ['/', '/404', '/analyze', '/wcag', '/wcag/*', '/patterns/*'],
  additionalPaths: async () => {
    const paths = []
    for (const lang of LANGS) {
      paths.push({ loc: `/${lang}`, changefreq: 'daily', priority: 1 })
      paths.push({ loc: `/${lang}/analyze`, changefreq: 'weekly', priority: 0.8 })
      for (const sub of WCAG_SUBPAGES) {
        paths.push({
          loc: `/${lang}/wcag${sub}`,
          changefreq: 'weekly',
          priority: sub ? 0.7 : 0.9
        })
      }
      for (const slug of PATTERN_SLUGS) {
        paths.push({ loc: `/${lang}/patterns/${slug}`, changefreq: 'weekly', priority: 0.8 })
      }
    }
    return paths
  },
  transform: async (config, loc) => {
    const stripped = loc.replace(/^\/(ko|en)/, '') || ''
    return {
      loc,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: LANGS.map((lang) => ({
        href: `${siteUrl}/${lang}${stripped}`,
        hreflang: lang,
        // next-sitemap 기본 동작은 href 뒤에 현재 loc path를 append하므로
        // 이미 완전한 URL임을 표시해야 이중 경로 버그가 막힘.
        hrefIsAbsolute: true
      }))
    }
  },
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }]
  }
}

export default defaultConfig
