let userConfig = undefined
try {
  // try to import ESM first
  userConfig = await import('./v0-user-next.config.mjs')
} catch (e) {
  try {
    // fallback to CJS import
    userConfig = await import("./v0-user-next.config");
  } catch (innerError) {
    // ignore error
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable export for local development
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Remove asset prefix and basePath for local development
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/Apt_Fincare' : '',
  // basePath: process.env.NODE_ENV === 'production' ? '/Apt_Fincare' : '',
  // Ensure CSS modules work correctly
  webpack: (config) => {
    return config;
  },
  // Skip trailing slash redirect
  skipTrailingSlashRedirect: true,
  trailingSlash: true,
  // Disable server components for static export
  experimental: {
    webpackBuildWorker: true,
  },
  // Use a custom build directory
  distDir: '.next',
}

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig
