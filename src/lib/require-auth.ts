import { getSession } from './auth';
import { NextResponse } from 'next/server';

export async function requireSession() {
  const session = await getSession();
  
  if (!session) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'No autorizado. Se requiere iniciar sesión.' },
        { status: 401 }
      )
    };
  }

  return {
    authorized: true,
    user: session.user
  };
}
