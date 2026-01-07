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

  // SEO and redirect configuration
  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.auroweather.fr',
          },
        ],
        destination: 'https://auroweather.fr/:path*',
        permanent: true,
      },
    ];
  },

  // Remove trailing slashes
  trailingSlash: false,
};

export default nextConfig;
