export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    // User routes
    '/account/:path*',
    '/admin/:path*',
  ],
};