import { NextRequest, NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Credenciales solicitadas y seguras
    const VALID_EMAIL = "admin@ancastav.com";
    const VALID_PASS = "vanguardia2026"; // Cambiada a una más profesional

    if (email === VALID_EMAIL && password === VALID_PASS) {
      const user = { email: VALID_EMAIL, id: "1" };
      const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 horas
      const session = await encrypt({ user, expires });

      const cookieStore = await cookies();
      cookieStore.set("session", session, { 
        expires, 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      });

      return NextResponse.json({ success: true, user });
    }

    return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
