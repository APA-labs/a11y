/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    const rawRule = { resourceQuery: /raw/, type: 'asset/source' }
    // oneOf 블록(SWC/TS 로더 포함)보다 먼저 매칭되어야 Next의 기본 로더가 파일을 파싱하지 않는다.
    for (const rule of config.module.rules) {
      if (rule && typeof rule === 'object' && Array.isArray(rule.oneOf)) {
        rule.oneOf.unshift(rawRule)
      }
    }
    config.module.rules.unshift(rawRule)
    return config
  },
  async redirects() {
    return [
      { source: '/', destination: '/ko', permanent: true },
      { source: '/wcag', destination: '/ko/wcag', permanent: true },
      { source: '/wcag/:path*', destination: '/ko/wcag/:path*', permanent: true },
      { source: '/analyze', destination: '/ko/analyze', permanent: true },
      { source: '/patterns/:slug', destination: '/ko/patterns/:slug', permanent: true }
    ]
  }
}

export default nextConfig
