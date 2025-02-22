/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      // remotePatterns: [
      //   {
      //     protocol: 'http',
      //     hostname: '147.93.96.218',
      //     port: '3005',
      //     pathname: '/uploads/**',
      //   },
      // ],
    },
    experimental: {
      optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
      ppr: 'incremental',
    },
  };
  
  export default nextConfig;
  