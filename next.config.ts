import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    // Ensure standalone build includes all necessary files
    outputFileTracingRoot: undefined,
  },
  // Environment variables will be passed through Kubernetes ConfigMap
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

export default nextConfig