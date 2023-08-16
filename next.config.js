/** @type {import('next').NextConfig} */
const nextConfig = { 
  images: {
  minimumCacheTTL: 0,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/about',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=1, stale-while-revalidate=59',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
