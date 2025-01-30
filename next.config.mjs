/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/:path*`, // Proxy to Backend
      },
      ];
    },
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '3000',
          pathname: '/uploads/**',
        },
      ],
    },
    experimental: {
      optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
      ppr: 'incremental',
    },
  };
  
  export default nextConfig;
  