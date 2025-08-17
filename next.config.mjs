/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    NPM_RC: process.env.NPM_RC,
    NPM_TOKEN: process.env.NPM_TOKEN,
  },
  
  env: {
    // Only include public variables here
  },
  
  webpack: (config, { isServer }) => {
    // Configuração para pacotes ESM
    config.externals = config.externals || []

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      }
    }

    return config
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  images: {
    unoptimized: true,
  },
}

export default nextConfig
