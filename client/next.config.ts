import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/backend-api/:path*',
        destination: 'http://localhost:5000/:path*', // Proxy to Local Backend
      },
    ]
  },
};

export default nextConfig;
