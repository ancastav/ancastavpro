import { getSql } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { requireSession } from '@/lib/require-auth';

export async function POST(req: NextRequest) {
  const auth = await requireSession();
  if (!auth.authorized) return auth.response;

  try {
    const sql = getSql();
    if (!sql) throw new Error('Database connection failed: missing URL');
    
    const { lead_id, appointment_date, appointment_time, notes } = await req.json();

    const result = await sql`
      INSERT INTO appointments (lead_id, appointment_date, appointment_time, notes)
      VALUES (${lead_id}, ${appointment_date}, ${appointment_time}, ${notes})
      RETURNING *
    `;

    return NextResponse.json({ success: true, appointment: result[0] });
  } catch (error: any) {
    console.error('Error al agendar cita:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function GET() {
  const auth = await requireSession();
  if (!auth.authorized) return auth.response;

  try {
    const sql = getSql();
    if (!sql) throw new Error('Database connection failed: missing URL');

    const appointments = await sql`
      SELECT 
        a.id, 
        a.lead_id, 
        TO_CHAR(a.appointment_date, 'YYYY-MM-DD') as appointment_date, 
        a.appointment_time, 
        a.notes, 
        a.status,
        l.full_name as lead_name 
      FROM appointments a
      JOIN landing_leads l ON a.lead_id = l.id
      ORDER BY a.appointment_date ASC, a.appointment_time ASC
    `;
    return NextResponse.json(appointments);
  } catch (error: any) {
    console.error('Error al obtener citas:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
