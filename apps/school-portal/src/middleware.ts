import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Role-based routing - only redirect to specific dashboards on exact /dashboard path
    if (token && pathname === '/dashboard') {
      const userRole = token.role as string;
      
      // Admin users should go to admin dashboard
      if (userRole === 'admin') {
        return NextResponse.redirect(new URL('/dashboard/admin', req.url));
      }
      
      // Instructor users should go to instructor dashboard  
      if (userRole === 'instructor') {
        return NextResponse.redirect(new URL('/dashboard/instructor', req.url));
      }
    }

    // Prevent students from accessing admin/instructor areas
    if (token && token.role === 'student') {
      if (pathname.startsWith('/dashboard/admin') || pathname.startsWith('/dashboard/instructor')) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect all dashboard routes
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
  ]
};