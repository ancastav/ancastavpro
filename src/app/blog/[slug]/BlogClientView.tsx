'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from "../../../components/elite/Layout";
import { Calendar, Clock, ArrowLeft, Share2, Globe, Mail } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';

interface BlogClientViewProps {
  post: any;
  language: 'es' | 'en';
  translations: any;
}

export default function BlogClientView({ post, language, translations: t }: BlogClientViewProps) {
  const router = useRouter();

  // Helper to handle both old object structure and new DB flat structure
  const getField = (field: string) => {
    if (post[field] && typeof post[field] === 'object') {
      return post[field][language];
    }
    const key = `${field}_${language}`;
    return post[key] || post[field] || '';
  };

  const title = getField('title');
  const excerpt = getField('excerpt');
  const content = getField('content');
  const category = getField('category');
  const readTime = post.read_time || post.readTime || '';

  return (
    <Layout>
      <main className="pt-32 pb-24 min-h-screen bg-white">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-16">
            <button 
              onClick={() => router.back()}
              className="group inline-flex items-center gap-3 text-slate-400 hover:text-accent-blue transition-colors mb-12"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest font-poppins">{t.back}</span>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-accent-blue/10 rounded-full text-[9px] font-black uppercase tracking-widest text-accent-blue border border-accent-blue/10">
                {category}
              </span>
              <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {post.date?.split('T')[0] || post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {readTime}
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-7xl font-poppins font-black text-slate-900 tracking-tighter uppercase leading-[0.9] mb-8">
              {title}
            </h1>
            <p className="text-xl md:text-2xl font-inter text-slate-500 leading-relaxed border-l-4 border-accent-blue/30 pl-8 italic">
              {excerpt}
            </p>
          </div>

          {/* Featured Image */}
          <div className="max-w-6xl mx-auto mb-20 rounded-[40px] overflow-hidden shadow-2xl relative aspect-video group">
            <Image 
              src={post.image} 
              alt={title || 'Blog Post'} 
              fill
              priority
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              unoptimized={true}
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-slate-900/10 rounded-[40px]" />
          </div>

          {/* Article Content */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16">
              {/* Sidebar Social */}
                <div className="flex items-center gap-4">
                  <button className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all">
                    <Share2 size={20} />
                  </button>
                  <button className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-500 transition-all">
                    <Globe size={20} />
                  </button>
                  <button className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-700 hover:border-blue-700 transition-all">
                    <Mail size={20} />
                  </button>
                </div>

              {/* Main Text */}
              <article 
                className="flex-1 font-inter text-lg text-slate-700 leading-[1.8] prose prose-slate max-w-none 
                prose-h2:text-3xl prose-h2:font-poppins prose-h2:font-black prose-h2:uppercase prose-h2:tracking-tighter prose-h2:text-slate-900 prose-h2:mt-12 prose-h2:mb-6
                prose-p:mb-8
                prose-strong:text-slate-900 prose-strong:font-black
                prose-blockquote:border-l-4 prose-blockquote:border-accent-blue prose-blockquote:bg-accent-blue/5 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:text-slate-900"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

            {/* Newsletter / CTA Placeholder */}
            <div className="mt-24 p-12 bg-slate-900 rounded-[40px] text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative z-10">
                <h3 className="text-3xl font-poppins font-black text-white uppercase tracking-tighter mb-4">
                  {language === 'es' ? '¿Listo para evolucionar tu arquitectura?' : 'Ready to evolve your architecture?'}
                </h3>
                <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                  {language === 'es' ? 'Únete a los líderes que están dominando el ADN digital de sus sectores.' : 'Join the leaders who are dominating the digital DNA of their sectors.'}
                </p>
                <Link 
                  href="/#diagnostic" 
                  className="inline-flex px-10 py-5 bg-accent-blue text-white rounded-full font-poppins font-black text-sm tracking-widest uppercase hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all active:scale-95"
                >
                  {language === 'es' ? 'Iniciar Diagnóstico Lab' : 'Start Diagnostic Lab'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
