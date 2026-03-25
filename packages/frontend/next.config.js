/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_AI_ENABLED: process.env.ANTHROPIC_API_KEY ? 'true' : 'false'
  }
}

export default nextConfig
