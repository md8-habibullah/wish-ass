import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  // Only apply this to backend-api requests to spoof the Origin header
  // This bypasses the backend's strict CORS and CSRF checks
  if (request.nextUrl.pathname.startsWith('/backend-api/')) {
    const requestHeaders = new Headers(request.headers);
    
    // Spoof the Origin and Referer to match what the backend expects
    requestHeaders.set('Origin', 'http://localhost:3000');
    requestHeaders.set('Referer', 'http://localhost:3000/');
    
    // We do NOT rewrite the URL here because next.config.ts will handle the actual proxy routing
    // We just modify the request headers that are passed along
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/backend-api/:path*',
};
