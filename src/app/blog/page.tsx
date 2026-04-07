'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { blogPosts as staticPosts } from '@/lib/blog-data';
import { BlogCard } from '@/components/vanguard/BlogCard';
import { Layout } from '../../components/vanguard/Layout';
import { Search, Loader2 } from 'lucide-react';

export default function BlogPage() {
  const { language } = useLanguage();
  const t = translations[language].blog;
  const [activeCategory, setActiveCategory] = useState<'all' | 'ai' | 'dev' | 'security'>('all');
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        if (res.ok && Array.isArray(data) && data.length > 0) {
          setPosts(data);
        } else {
          // Fallback to static posts if DB is empty or fails
          setPosts(staticPosts);
        }
      } catch (err) {
        console.error('Failed to fetch blog posts, using fallback:', err);
        setPosts(staticPosts);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const categories = [
    { id: 'all', label: t.categories.all },
    { id: 'ai', label: t.categories.ai },
    { id: 'dev', label: t.categories.dev },
    { id: 'security', label: t.categories.security },
  ] as const;

  const filteredPosts = posts.filter(post => {
    if (activeCategory === 'all') return true;
    
    // Support both new DB category fields and old object structure
    const catEn = (post.category_en || post.category?.en || '').toLowerCase();
    
    if (activeCategory === 'ai' && (catEn.includes('intelligence') || catEn.includes('ia'))) return true;
    if (activeCategory === 'dev' && (catEn.includes('development') || catEn.includes('desarrollo'))) return true;
    if (activeCategory === 'security' && (catEn.includes('security') || catEn.includes('seguridad'))) return true;
    return false;
  });

  return (
    <Layout>
      <main className="pt-32 pb-24 min-h-screen bg-white">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="max-w-4xl mb-20">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent-blue/10 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.2em] text-accent-blue uppercase font-poppins">
                {t.badge}
              </span>
            </div>
            <h1 className="text-5xl md:text-8xl font-poppins font-black text-slate-900 tracking-tighter uppercase leading-[0.85] mb-8">
              {t.title}
            </h1>
            <p className="text-xl font-inter text-slate-500 leading-relaxed max-w-2xl">
              {t.description}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-16 pb-8 border-b border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all ${
                  activeCategory === cat.id
                    ? 'bg-accent-blue text-white shadow-xl shadow-blue-500/20'
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
             <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-400">
               <Loader2 size={40} className="animate-spin text-accent-blue" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em] font-poppins">Sincronizando Insights...</p>
             </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredPosts.map((post, i) => (
                <BlogCard key={post.id || post.slug || i} post={post} lang={language} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-slate-400 font-inter">No se encontraron artículos en esta categoría.</p>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
