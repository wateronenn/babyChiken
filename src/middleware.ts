import { withAuth } from 'next-auth/middleware'
export const config = {
  matcher: [
    // User routes
    '/account/:path*',
    '/admin/:path*',
  ],
};
export default withAuth({
  pages: {
    signIn: "/login",
  },
});