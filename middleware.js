import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from './lib/jwt'; // Ensure this is correctly imported

export async function middleware(request) {
  const { pathname } = request.nextUrl;  // Get the pathname of the current URL
  const publicRoutes = ['/login', '/signup'];

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';  // Retrieve the token from cookies
  // Case 1: If there's no token and the user is trying to access a protected route, redirect to /login
 
  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // Case 2: If the user is already logged in (has token) and tries to access the /login or /signup page, redirect to /dashboard
  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/products', request.url));
  }

  // Case 3: If token exists, try to verify it
  if (token) {
    try {
      console.log('Token found:', token);  // Debug log to verify token

      // Attempt to verify the token
      const user = await verifyToken(token);  // Assuming verifyToken returns the user payload

      if (!user) {
        // If token is invalid or user cannot be decoded, redirect to login page
        return NextResponse.redirect(new URL('/login', request.url));
      }

      // If token is valid, allow access to the protected route (return NextResponse.next())
      return NextResponse.next();
    } 
    catch (error) {
      // If JWT verification fails, redirect to login page
      console.error('JWT verification failed:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Default case: Allow access if there's no issue
  return NextResponse.next();
}

// Define which paths this middleware applies to
export const config = {
  matcher: ['/products', '/profile'  , '/login', '/signup','/cart' ,'/shipping' ],  // Apply middleware to routes that need protection
};