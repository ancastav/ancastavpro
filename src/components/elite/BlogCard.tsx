import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog-data';
import { Language } from '@/lib/translations';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

interface BlogCardProps {
  post: any; // Flexible for now during migration
  lang: Language;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, lang }) => {
  // Helper to handle both old object structure and new DB flat structure
  const getField = (field: string) => {
    if (post[field] && typeof post[field] === 'object') {
      return post[field][lang];
    }
    const key = `${field}_${lang}`;
    return post[key] || post[field] || '';
  };

  const title = getField('title');
  const excerpt = getField('excerpt');
  const category = getField('category');
  const readTime = post.read_time || post.readTime || '';

  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col h-full bg-white border border-slate-100 rounded-3xl overflow-hidden transition-all duration-500 hover:border-accent-blue/30 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden aspect-video">
        <Image 
          src={post.image} 
          alt={title} 
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          unoptimized={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-accent-blue border border-white/20">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-8">
        <div className="flex items-center gap-4 mb-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {readTime}
          </span>
        </div>

        <h3 className="text-xl font-poppins font-black text-slate-900 mb-4 group-hover:text-accent-blue transition-colors line-clamp-2 uppercase tracking-tighter uppercase leading-tight">
          {title}
        </h3>

        <p className="text-slate-500 text-sm font-inter line-clamp-3 mb-6 flex-grow leading-relaxed">
          {excerpt}
        </p>

        <div className="flex items-center gap-2 text-[10px] font-black text-accent-blue uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
          <span>{lang === 'es' ? 'Leer Artículo' : 'Read Article'}</span>
          <ArrowRight size={14} strokeWidth={3} />
        </div>
      </div>
    </Link>
  );
};
