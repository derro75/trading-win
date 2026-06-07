// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server"; // Import NextResponse if you plan to use it for redirects

export default withAuth(
  // This is the actual middleware function that Next.js will execute.
  function middleware(req) {
    // You can access the user's session token here if needed
    // console.log("Middleware token:", req.nextauth.token);

    // Example: Redirect unauthenticated users from specific paths
    // if (!req.nextauth.token && req.nextUrl.pathname.startsWith('/dashboard')) {
    //   return NextResponse.redirect(new URL('/auth/login', req.url));
    // }

    return NextResponse.next(); // Continue to the requested page
  },
  {
    // Callbacks to determine if a user is authorized
    callbacks: {
      authorized: ({ token }) => {
        // Return true if the user is authorized, false otherwise.
        // For example, require a token for all protected routes.
        return !!token;
      },
    },
    // Specify pages for redirects if not authorized (e.g., if authorized returns false)
    pages: {
      signIn: '/auth/login', // Redirect to this page if authorization fails
    },
  }
);

// Define the matcher to specify which paths the middleware should run on.
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};

