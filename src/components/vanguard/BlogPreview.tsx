import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { blogPosts as staticPosts } from '@/lib/blog-data';
import { BlogCard } from './BlogCard';
import { ArrowRight, Loader2 } from 'lucide-react';

export const BlogPreview: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].blog;
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        if (res.ok && Array.isArray(data) && data.length > 0) {
          setPosts(data.slice(0, 3));
        } else {
          setPosts(staticPosts.slice(0, 3));
        }
      } catch (err) {
        console.error('Failed to fetch latest posts:', err);
        setPosts(staticPosts.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  const latestPosts = posts;

  return (
    <section id="insights" className="py-24 bg-slate-50/50 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent-blue/10 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.2em] text-accent-blue uppercase font-poppins">
                {t.badge}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-poppins font-black text-slate-900 tracking-tighter uppercase leading-[0.9] mb-6">
              {t.title}
            </h2>
            <p className="text-lg font-inter text-slate-500 leading-relaxed max-w-xl">
              {t.description}
            </p>
          </div>

          <Link 
            href="/blog"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-poppins font-black text-xs tracking-widest uppercase transition-all hover:bg-accent-blue hover:shadow-xl hover:shadow-blue-500/20 active:scale-95"
          >
            <span>{t.viewAll}</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center gap-4 text-slate-400">
              <Loader2 size={40} className="animate-spin text-accent-blue" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] font-poppins">Sincronizando Vanguard Insights...</p>
            </div>
          ) : latestPosts.map((post, i) => (
            <BlogCard key={post.id || post.slug || i} post={post} lang={language} />
          ))}
        </div>
      </div>
    </section>
  );
};
