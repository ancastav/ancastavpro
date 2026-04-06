import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from './lib/auth';

export async function proxy(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  // Si intenta acceder al CRM sin sesión
  if (request.nextUrl.pathname.startsWith('/crm')) {
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Si ya tiene sesión e intenta ir a login, redirigir al CRM
  if (request.nextUrl.pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/crm', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/crm/:path*', '/login'],
};
