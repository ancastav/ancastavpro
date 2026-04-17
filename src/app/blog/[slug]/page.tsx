import React from 'react';
import { Metadata } from 'next';
import { getSql } from '@/lib/db';
import { blogPosts as staticPosts } from "@/lib/blog-data";
import { translations } from '@/lib/translations';
import { headers } from 'next/headers';
import BlogClientView from './BlogClientView';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  const sql = getSql();
  try {
    if (sql) {
      const posts = await sql`
        SELECT * FROM blog_posts 
        WHERE slug = ${slug}
        LIMIT 1
      `;
      if (posts && posts.length > 0) return posts[0];
    }
  } catch (error) {
    console.error('Error fetching post from DB:', error);
  }
  
  // Fallback to static data
  return staticPosts.find((p) => p.slug === slug) || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post No Encontrado | ANCASTAV',
    };
  }

  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  const language = acceptLanguage.startsWith('en') ? 'en' : 'es';

  const getField = (field: string) => {
    const postData = post as any;
    if (postData[field] && typeof postData[field] === 'object') {
      return postData[field][language];
    }
    const key = `${field}_${language}`;
    return postData[key] || postData[field] || '';
  };

  const title = getField('title');
  const excerpt = getField('excerpt');

  return {
    title: `${title} | ANCASTAV`,
    description: excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: `${title} | ANCASTAV Digital`,
      description: excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ANCASTAV`,
      description: excerpt,
      images: [post.image],
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  const language = acceptLanguage.startsWith('en') ? 'en' : 'es';
  const t = translations[language].blog;

  return <BlogClientView post={post} language={language} translations={t} />;
}
