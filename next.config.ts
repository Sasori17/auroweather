import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        port: '',
        pathname: '/img/wn/**',
      },
    ],
  },

  // Remove trailing slashes for clean URLs
  trailingSlash: false,

  // Redirect www to non-www (permanent 301)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.auroweather.fr' }],
        destination: 'https://auroweather.fr/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
