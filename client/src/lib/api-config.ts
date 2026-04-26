const isProd = process.env.NODE_ENV === 'production';
const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || (isProd ? "https://wish-ass-server.vercel.app" : "http://localhost:5000");

export const API_BASE_URL = typeof window !== "undefined" 
  ? (isProd ? rawApiUrl : "/backend-api") 
  : rawApiUrl;
