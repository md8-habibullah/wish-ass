import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/backend-api/:path*',
        destination: 'https://medi-server.habibullah.dev/:path*', // Proxy to Backend
      },
    ]
  },
};

export default nextConfig;
