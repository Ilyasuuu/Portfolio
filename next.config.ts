import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // GitHub Pages configurations
  ...(isProd ? {
    output: 'export',
    basePath: '/Ilyasuuu-Portfolio',
    assetPrefix: '/Ilyasuuu-Portfolio',
  } : {}),

  typescript: {
    ignoreBuildErrors: false,
  },

  // Allow remote images from picsum.photos if needed
  images: {
    unoptimized: true, // Required for static export on GitHub pages
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

// headers() are not supported when output is configured to 'export'
if (!isProd) {
  nextConfig.headers = async () => {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://picsum.photos; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';",
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
        ],
      },
    ];
  };
}

export default nextConfig;
