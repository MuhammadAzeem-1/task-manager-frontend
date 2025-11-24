import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Note: Since we're using localStorage for token storage (client-side),
// middleware cannot access it. Route protection is handled client-side
// in the dashboard layout component.

export function middleware(request: NextRequest) {
  // Simply pass through all requests
  // Client-side protection is handled in:
  // - app/dashboard/layout.tsx (checks auth and redirects)
  // - app/page.tsx (redirects authenticated users)
  // - hooks/use-auth.ts (handles login/signup redirects)
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

