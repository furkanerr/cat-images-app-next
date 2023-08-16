/** @type {import('next').NextConfig} */
const nextConfig = { images: {
  minimumCacheTTL: 0,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },}

module.exports = nextConfig
