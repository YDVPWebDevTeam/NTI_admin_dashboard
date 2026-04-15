import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const ADMIN_LOGIN_PATH = '/login';
const FORCE_CHANGE_PASSWORD_PATH = '/force-change-password';

function isPublicAdminPath(pathname: string): boolean {
  return pathname === ADMIN_LOGIN_PATH || pathname === FORCE_CHANGE_PASSWORD_PATH;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminDashboardPath = pathname.startsWith('/admin');
  const isAdminAuthPath = isPublicAdminPath(pathname);

  if (!isAdminDashboardPath && !isAdminAuthPath) {
    return NextResponse.next();
  }

  if (isAdminDashboardPath) {
    return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
  }

  const hasPasswordChangeToken = Boolean(request.cookies.get('requiresPasswordChangeToken')?.value);

  if (pathname === FORCE_CHANGE_PASSWORD_PATH) {
    if (!hasPasswordChangeToken) {
      return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
    }

    return NextResponse.next();
  }

  if (isPublicAdminPath(pathname)) {
    if (hasPasswordChangeToken && pathname === ADMIN_LOGIN_PATH) {
      return NextResponse.redirect(new URL(FORCE_CHANGE_PASSWORD_PATH, request.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/force-change-password'],
};
