import { getSql } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { sendLeadNotification, type Lead } from '@/lib/mail';
import { requireSession } from '@/lib/require-auth';

export async function POST(req: NextRequest) {
  try {
    const sql = getSql();
    if (!sql) throw new Error('Database connection failed: missing URL');

    const { full_name, email, phone, company, plan_selected, message } = await req.json();

    if (!full_name || !email) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO landing_leads (full_name, email, phone, company, plan_selected, message)
      VALUES (${full_name}, ${email}, ${phone}, ${company}, ${plan_selected}, ${message})
      RETURNING *
    `;

    // Fase 3: Notificar por email (Simulado en consola por ahora)
    await sendLeadNotification(result[0] as Lead);

    return NextResponse.json({ success: true, lead: result[0] });
  } catch (error: any) {
    console.error('Error al guardar el lead:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function GET() {
  const auth = await requireSession();
  if (!auth.authorized) return auth.response;

  try {
    const sql = getSql();
    if (!sql) throw new Error('Database connection failed: missing URL');

    const leads = await sql`
      SELECT * FROM landing_leads ORDER BY created_at DESC
    `;
    return NextResponse.json(leads);
  } catch (error: any) {
    console.error('Error al obtener los leads:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const auth = await requireSession();
  if (!auth.authorized) return auth.response;

  try {
    const sql = getSql();
    if (!sql) throw new Error('Database connection failed: missing URL');

    const { id, status, contact_log_entry } = await req.json();
    
    if (!id) {
      return NextResponse.json({ error: 'Falta el ID del lead' }, { status: 400 });
    }

    if (contact_log_entry) {
      // Actualizar el historial de contacto (appending to JSONB array)
      const result = await sql`
        UPDATE landing_leads 
        SET contact_log = contact_log || ${JSON.stringify([contact_log_entry])}::jsonb,
            status = COALESCE(${status}, status)
        WHERE id = ${id} 
        RETURNING *
      `;
      return NextResponse.json({ success: true, lead: result[0] });
    } else if (status) {
      const result = await sql`
        UPDATE landing_leads 
        SET status = ${status} 
        WHERE id = ${id} 
        RETURNING *
      `;
      return NextResponse.json({ success: true, lead: result[0] });
    }

    return NextResponse.json({ error: 'Nada para actualizar' }, { status: 400 });
  } catch (error: any) {
    console.error('Error al actualizar el lead:', error);
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 });
  }
}
