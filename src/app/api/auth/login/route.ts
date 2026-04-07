import { NextRequest, NextResponse } from 'next/server';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import { getSql } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const sql = getSql();
    if (!sql) {
      return NextResponse.json({ error: 'Configuración de base de datos faltante' }, { status: 500 });
    }

    const userRes = await sql`
      SELECT id, email, name FROM admin_users 
      WHERE email = ${email} AND password = ${password}
      LIMIT 1
    `;

    if (userRes.length > 0) {
      const user = userRes[0];
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
