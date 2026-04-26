import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    const isProd = process.env.NODE_ENV === 'production';
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://wish-ass-server.vercel.app";
    return [
      {
        source: '/backend-api/:path*',
        destination: isProd ? `${apiUrl}/:path*` : 'http://localhost:5000/:path*',
      },
    ]
  },
};

export default nextConfig;
