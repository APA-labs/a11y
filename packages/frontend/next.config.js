/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
