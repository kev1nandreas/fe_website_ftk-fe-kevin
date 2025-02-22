import { NextRequest, NextResponse } from 'next/server';
import { ENV } from './configs/environment';

export function middleware(request: NextRequest) {
  // Skip middleware for RSC requests
  if (
    request.headers.get('RSC') === '1' ||
    request.headers.get('Next-Router-State-Tree') ||
    request.headers.get('Next-Router-Prefetch')
  ) {
    return NextResponse.next();
  }

  // Check for authentication token in cookies
  const token = request.cookies.get(ENV.TOKEN_KEY)?.value;

  // Determine the current path
  const pathname = request.nextUrl.pathname;

  // Define routes
  const loginPath = '/login';
  const protectedPaths = ['/admin/artikel', '/admin/kategori'];
  const baseAuthPath = '/admin';

  // Allow the request to proceed if authenticated or not a protected route
  if (protectedPaths.includes(pathname) && token) {
    return NextResponse.next();
  }

  // If logged in and trying to access login page, redirect to admin
  if (pathname === loginPath && token) {
    return NextResponse.redirect(new URL(protectedPaths[0], request.url));
  }

  // If not logged in and trying to access admin or protected routes
  if (protectedPaths.includes(pathname) && !token) {
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  // If logged in and trying to access admin routes, allow the request to proceed
  if (pathname.startsWith(baseAuthPath) && token) {
    return NextResponse.redirect(new URL(protectedPaths[0], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/admin/artikel/:path*',
    '/admin/kategori/:path*',
    // Exclude specific Next.js paths
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
