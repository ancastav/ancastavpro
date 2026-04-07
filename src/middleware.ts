import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

// Definir las rutas protegidas
const protectedRoutes = ['/admin', '/crm'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Verificar si la ruta actual es protegida
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  
  if (isProtectedRoute) {
    const sessionCookie = request.cookies.get('session')?.value;
    
    // Si no hay sesión, redirigir al login
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    try {
      // Intentar desencriptar para validar que sea legítima
      await decrypt(sessionCookie);
      return NextResponse.next();
    } catch (error) {
      // Si la sesión es inválida, borrar cookie y redirigir
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('session');
      return response;
    }
  }

  return NextResponse.next();
}

// Configurar el matcher para eficiencia
export const config = {
  matcher: [
    '/admin/:path*',
    '/crm/:path*',
  ],
};
