import { withAuth } from 'next-auth/middleware'
export const config = {
  matcher: [
    // User routes
    '/admin/:path*',
  ],
};
export default withAuth({
  pages: {
    signIn: "/login",
  },
});