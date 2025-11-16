import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Handle CORS for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    const origin = request.headers.get('origin')
    const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://the-chanakya-academy.vercel.app'
    
    // Allow requests from frontend URL or any origin in development
    const allowedOrigins = [
      frontendUrl,
      'http://localhost:3000',
      'http://localhost:3001',
      'https://the-chanakya-academy.vercel.app',
    ]

    const response = NextResponse.next()
    
    // Set CORS headers
    if (origin && (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development')) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      response.headers.set('Access-Control-Allow-Credentials', 'true')
    }

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: response.headers,
      })
    }

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}

