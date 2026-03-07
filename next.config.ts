import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,


  typescript: {
    ignoreBuildErrors: false,
  },

  // Allow remote images from picsum.photos if needed
  images: {
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

export default nextConfig;
