import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const config = {
  matcher: ['/dashboard/:path*', '/course/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'], // Ensure these paths are correct
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Extract token from Authorization header
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  // Redirect to sign-in if the user is trying to access /course or /dashboard without a token
  if (!token && (url.pathname.startsWith('/course') || url.pathname.startsWith('/dashboard'))) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // If token exists, validate it
  if (token) {
    try {
      const secret = process.env.JWT_SECRET || 'jwtsecret02'; // Ensure this matches your login API
      jwt.verify(token, secret); // Throws an error if the token is invalid
    } catch (error) {
      console.error('Token validation error:', error);
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // Redirect authenticated users trying to access public routes
  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify') ||
      url.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/course', request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}