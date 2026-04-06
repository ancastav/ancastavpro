import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const secretKey = "vanguardia_ancastav_secret_key_change_me_in_prod";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function login(formData: FormData) {
  // Configuración de usuario solicitada por el usuario (Ancastav)
  const user = { email: "admin@ancastav.com", id: "1" };
  const password = "password123"; // El usuario debería cambiarla después

  if (formData.get("password") !== password || formData.get("email") !== user.email) {
    return null;
  }

  // Crear la sesión
  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 horas
  const session = await encrypt({ user, expires });

  // Guardar en cookies
  const cookieStore = await cookies();
  cookieStore.set("session", session, { expires, httpOnly: true });
  
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
