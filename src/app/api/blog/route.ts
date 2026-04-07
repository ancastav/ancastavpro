import { NextRequest, NextResponse } from 'next/server';
import { getSql } from '@/lib/db';
import { getSession } from '@/lib/auth';

// GET /api/blog - Listar todos los posts o buscar por slug (Público)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    const sql = getSql();
    if (!sql) {
      return NextResponse.json({ 
        error: 'Database connection missing',
        code: 'DATABASE_URL_MISSING' 
      }, { status: 500 });
    }

    if (slug) {
      const post = await sql`
        SELECT * FROM blog_posts 
        WHERE slug = ${slug}
        LIMIT 1
      `;
      return NextResponse.json(post[0] || null);
    }

    const posts = await sql`
      SELECT * FROM blog_posts 
      ORDER BY date DESC, created_at DESC
    `;
    
    return NextResponse.json(posts);
  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

// POST /api/blog - Crear un nuevo post (Protegido)
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sql = getSql();
    if (!sql) {
      return NextResponse.json({ 
        error: 'Database connection missing',
        code: 'DATABASE_URL_MISSING' 
      }, { status: 500 });
    }

    const body = await req.json();
    const { 
      slug, date, image, read_time,
      category_es, category_en,
      title_es, title_en,
      excerpt_es, excerpt_en,
      content_es, content_en 
    } = body;

    // Validación básica - solo slug y título en español son obligatorios
    if (!slug || !title_es) {
      return NextResponse.json({ error: 'Faltan campos obligatorios (slug, título en español)' }, { status: 400 });
    }

    // Auto-fill English fields if not provided
    const finalTitleEn = title_en || title_es;
    const finalCategoryEn = category_en || category_es;
    const finalExcerptEn = excerpt_en || excerpt_es || '';
    const finalContentEn = content_en || content_es || '';

    const result = await sql`
      INSERT INTO blog_posts (
        slug, date, image, read_time,
        category_es, category_en,
        title_es, title_en,
        excerpt_es, excerpt_en,
        content_es, content_en
      ) VALUES (
        ${slug}, ${date || new Date().toISOString().split('T')[0]}, ${image}, ${read_time},
        ${category_es}, ${finalCategoryEn},
        ${title_es}, ${finalTitleEn},
        ${excerpt_es || ''}, ${finalExcerptEn},
        ${content_es || ''}, ${finalContentEn}
      )
      RETURNING *
    `;

    return NextResponse.json({ success: true, post: result[0] });
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    if (error.message?.includes('unique constraint')) {
      return NextResponse.json({ error: 'El slug ya existe' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
