import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getSql } from './db';
import bcrypt from 'bcryptjs';

interface SessionPayload extends JWTPayload {
  user: { email: string; id: string };
  expires: Date;
}

const secretKey = process.env.AUTH_SECRET || "elite_ancastav_secret_key_change_me_in_prod";
const key = new TextEncoder().encode(secretKey);

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function comparePasswords(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(key);
}

export async function decrypt(input: string): Promise<SessionPayload> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload as SessionPayload;
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const sql = getSql();
  if (!sql) return null;

  const userRes = await sql`
    SELECT id, email, name, password FROM admin_users 
    WHERE email = ${email}
    LIMIT 1
  `;

  if (userRes.length === 0) return null;
  
  const user = userRes[0];
  const isCorrect = await comparePasswords(password, user.password);
  
  if (!isCorrect) return null;

  // No devolver el password al resto del app
  delete user.password;

  // Crear la sesión
  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 horas
  const session = await encrypt({ user, expires });

  // Guardar en cookies
  const cookieStore = await cookies();
  cookieStore.set("session", session, { 
    expires, 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });
  
  return user;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Actualizar sesión para evitar que expire si está activo
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
