import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/db';
import { getSession, comparePasswords, hashPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();
    const sql = getSql();
    if (!sql) return NextResponse.json({ error: 'DB Error' }, { status: 500 });

    // Verificar contraseña actual
    const userRes = await sql`
      SELECT id, password FROM admin_users 
      WHERE email = ${session.user.email}
    `;

    if (userRes.length === 0) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const user = userRes[0];
    const isCorrect = await comparePasswords(currentPassword, user.password);

    if (!isCorrect) {
      return NextResponse.json({ error: 'Contraseña actual incorrecta' }, { status: 400 });
    }

    // Hash de la nueva contraseña
    const hashedNewPassword = await hashPassword(newPassword);

    // Actualizar contraseña
    await sql`
      UPDATE admin_users 
      SET password = ${hashedNewPassword} 
      WHERE email = ${session.user.email}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
