/** @type {import('next').NextConfig} */
const nextConfig = {
  api: {
    externalResolver: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  images: {
    domains: ["dealguru.se"],
    unoptimized: true,
  },
  // productionBrowserSourceMaps: true,
};

export default nextConfig;
