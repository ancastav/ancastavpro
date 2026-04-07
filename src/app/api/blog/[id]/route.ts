import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/db';
import { getSession } from '@/lib/auth';

// PATCH /api/blog/[id] - Editar post (Protegido)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const sql = getSql();
    if (!sql) throw new Error('DB Connection missing');

    // Mapeo dinamico para construir la query de UPDATE
    const fields = Object.keys(body).filter(k => k !== 'id' && k !== 'created_at');
    if (fields.length === 0) {
      return NextResponse.json({ error: 'No data to update' }, { status: 400 });
    }

    // Usar object para el update con neon
    const result = await sql`
      UPDATE blog_posts 
      SET ${sql(body, ...fields)}
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json({ success: true, post: result[0] });
  } catch (error: any) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

// DELETE /api/blog/[id] - Eliminar post (Protegido)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const sql = getSql();
    if (!sql) throw new Error('DB Connection missing');

    await sql`
      DELETE FROM blog_posts WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
