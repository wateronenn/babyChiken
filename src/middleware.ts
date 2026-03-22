export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    // User routes
    '/account/:path*',
    '/bookings/:path*',
    '/car-rentals/:path*',
    '/reset-password/:path*',

    // Admin routes
    '/admin/:path*',
  ],
};