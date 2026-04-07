// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
    // Check for token in cookies OR authorization header
    let token = request.cookies.get('token')?.value;
    
    // Also check authorization header (if passed from client)
    const authHeader = request.headers.get('authorization');
    if (!token && authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7);
    }
    
    const { pathname } = request.nextUrl;
    
    // Public routes (no authentication required)
    const publicRoutes = ['/login', '/register', '/forgot-password'];
    
    // If on public route and has token, redirect to dashboard
    if (publicRoutes.includes(pathname)) {
        if (token) {
            // Check user role from cookie if available
            const userStr = request.cookies.get('user')?.value;
            if (userStr) {
                try {
                    const user = JSON.parse(userStr);
                    const redirectUrl = user.role === 'admin' ? '/admin' : '/dashboard';
                    return NextResponse.redirect(new URL(redirectUrl, request.url));
                } catch (error) {
                    // If error, still redirect to dashboard
                    return NextResponse.redirect(new URL('/dashboard', request.url));
                }
            }
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }
    
    // For protected routes, if no token, redirect to login
    if (!token) {
        // Don't redirect API routes
        if (pathname.startsWith('/api/')) {
            return NextResponse.next();
        }
        
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }
    
    // For admin routes, check role
    if (pathname.startsWith('/admin')) {
        const userStr = request.cookies.get('user')?.value;
        
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                if (user.role !== 'admin' && user.role !== 'Administrator') {
                    return NextResponse.redirect(new URL('/dashboard', request.url));
                }
            } catch (error) {
                console.error('Error parsing user cookie:', error);
                return NextResponse.redirect(new URL('/login', request.url));
            }
        } else {
            // If no user cookie but has token, try to fetch user data
            // This is a fallback - ideally you'd set the cookie on login
            return NextResponse.next();
        }
    }
    
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
         * - api routes (handled separately)
         */
        '/((?!_next/static|_next/image|favicon.ico|public|api/auth/login).*)',
    ],
};