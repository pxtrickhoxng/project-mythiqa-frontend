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
        hostname: 'project-mythiqa-aws-s3.s3.us-east-2.amazonaws.com',
      },
    ],
  },
  allowedDevOrigins: process.env.ALLOWED_ORIGINS?.split(',') ?? [],
  reactStrictMode: false,
};

export default nextConfig;
