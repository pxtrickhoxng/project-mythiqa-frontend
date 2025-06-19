import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'user-pic.webnovel.com',
      },
    ],
  },
  allowedDevOrigins: ['tidy-drake-harmless.ngrok-free.app'],
  reactStrictMode: false,
};

export default nextConfig;
