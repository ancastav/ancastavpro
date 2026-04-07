'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { 
  X, Save, Globe, ImageIcon, 
  Clock, Hash, FileText, AlertCircle,
  CheckCircle2, Settings
} from 'lucide-react';

interface BlogPost {
  id?: string | number;
  slug: string;
  date: string;
  image: string;
  read_time: string;
  category?: { es: string; en: string };
  category_es?: string;
  category_en?: string;
  title?: { es: string; en: string };
  title_es?: string;
  title_en?: string;
  excerpt?: { es: string; en: string };
  excerpt_es?: string;
  excerpt_en?: string;
  content?: { es: string; en: string };
  content_es?: string;
  content_en?: string;
}

interface BlogFormProps {
  post?: BlogPost;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BlogForm({ post, onClose, onSuccess }: BlogFormProps) {
  const [activeTab, setActiveTab] = useState<'es' | 'en'>('es');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    slug: '',
    date: new Date().toISOString().split('T')[0],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
    read_time: '5 min',
    category_es: 'Tecnología',
    category_en: 'Technology',
    title_es: '',
    title_en: '',
    excerpt_es: '',
    excerpt_en: '',
    content_es: '',
    content_en: ''
  });

  useEffect(() => {
    if (post) {
      setFormData({
        slug: post.slug || '',
        date: post.date || new Date().toISOString().split('T')[0],
        image: post.image || '',
        read_time: post.read_time || '5 min',
        category_es: post.category_es || post.category?.es || '',
        category_en: post.category_en || post.category?.en || '',
        title_es: post.title_es || post.title?.es || '',
        title_en: post.title_en || post.title?.en || '',
        excerpt_es: post.excerpt_es || post.excerpt?.es || '',
        excerpt_en: post.excerpt_en || post.excerpt?.en || '',
        content_es: post.content_es || post.content?.es || '',
        content_en: post.content_en || post.content?.en || ''
      });
    }
  }, [post]);

  const handleTitleChange = (lang: 'es' | 'en', value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [`title_${lang}`]: value };
      if (lang === 'es' && !post) {
        // Auto-slug only for new posts and based on Spanish title
        newData.slug = value
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = post ? `/api/blog/${post.id}` : '/api/blog';
      const method = post ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al guardar el artículo');
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 lg:p-10">
      <div className="bg-[#0A0A0B] border border-white/10 w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-screen animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-accent-blue/10 text-accent-blue">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                {post ? 'Editar Artículo' : 'Nuevo Artículo Elite'}
              </h2>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Vanguard Insights CMS</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 text-slate-500 hover:text-white transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Language Navigation */}
              <div className="flex p-1 bg-white/5 rounded-2xl w-fit">
                <button
                  type="button"
                  onClick={() => setActiveTab('es')}
                  className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'es' ? 'bg-accent-blue text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-white'}`}
                >
                  <Globe size={14} /> Español
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('en')}
                  className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'en' ? 'bg-accent-blue text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-white'}`}
                >
                  <Globe size={14} /> English
                </button>
              </div>

              {/* Title & Content */}
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">
                    {activeTab === 'es' ? 'Título del Artículo' : 'Article Title'}
                  </label>
                  <input
                    type="text"
                    value={activeTab === 'es' ? formData.title_es : formData.title_en}
                    onChange={(e) => handleTitleChange(activeTab, e.target.value)}
                    placeholder={activeTab === 'es' ? 'Escribe el titular...' : 'Write the headline...'}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all placeholder:text-slate-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">
                    {activeTab === 'es' ? 'Resumen (Excerpt)' : 'Short Excerpt'}
                  </label>
                  <textarea
                    value={activeTab === 'es' ? formData.excerpt_es : formData.excerpt_en}
                    onChange={(e) => setFormData(prev => ({ ...prev, [`excerpt_${activeTab}`]: e.target.value }))}
                    placeholder={activeTab === 'es' ? 'Breve descripción para el listado...' : 'Brief description for the listing...'}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all placeholder:text-slate-700 h-24 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 px-1">
                    {activeTab === 'es' ? 'Contenido del Artículo (HTML Soportado)' : 'Article Content (HTML Supported)'}
                  </label>
                  <textarea
                    value={activeTab === 'es' ? formData.content_es : formData.content_en}
                    onChange={(e) => setFormData(prev => ({ ...prev, [`content_${activeTab}`]: e.target.value }))}
                    placeholder={activeTab === 'es' ? 'El alma del artículo...' : 'The soul of the article...'}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all placeholder:text-slate-700 h-96 resize-none font-mono"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Sidebar Settings Area */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-accent-blue flex items-center gap-2">
                  <Settings size={14} /> {activeTab === 'es' ? 'Configuración' : 'Settings'}
                </h3>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                    <Hash size={12} /> Slug (URL)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                      <ImageIcon size={12} /> {activeTab === 'es' ? 'Categoría' : 'Category'}
                    </label>
                    <input
                      type="text"
                      value={activeTab === 'es' ? formData.category_es : formData.category_en}
                      onChange={(e) => setFormData(prev => ({ ...prev, [`category_${activeTab}`]: e.target.value }))}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                      <Clock size={12} /> {activeTab === 'es' ? 'Lectura' : 'Reading'}
                    </label>
                    <input
                      type="text"
                      value={formData.read_time}
                      onChange={(e) => setFormData(prev => ({ ...prev, read_time: e.target.value }))}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-bold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                    <ImageIcon size={12} /> Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-400"
                    required
                  />
                  {formData.image && (
                    <div className="mt-4 rounded-2xl overflow-hidden aspect-video border border-white/10 relative">
                      <Image 
                        src={formData.image} 
                        alt="Preview" 
                        fill 
                        className="object-cover"
                        unoptimized={true} // For external splash urls
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Status & Feedback */}
              {error && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex gap-3 animate-shake">
                  <AlertCircle size={16} className="shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {success && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex gap-3">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <p>{activeTab === 'es' ? '¡Artículo guardado con éxito!' : 'Article saved successfully!'}</p>
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {activeTab === 'es' ? 'Modo Edición Elite' : 'Elite Editing Mode'}
          </div>
          <div className="flex gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="px-8 py-3 rounded-full text-sm font-bold text-slate-400 hover:text-white transition-all"
            >
              {activeTab === 'es' ? 'Cancelar' : 'Cancel'}
            </button>
            <button 
              onClick={handleSubmit}
              disabled={loading || success}
              className="flex items-center gap-2 px-10 py-3 bg-accent-blue text-white rounded-full font-bold hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={18} />
                  {activeTab === 'es' ? 'Publicar Ahora' : 'Publish Now'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
