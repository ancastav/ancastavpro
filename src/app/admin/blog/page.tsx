'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  FileText, 
  Settings, 
  BarChart3, 
  Trash2, 
  Edit3, 
  Eye, 
  ChevronRight,
  TrendingUp,
  Users,
  Layout as LayoutIcon,
  Bell,
  AlertCircle,
  RefreshCw,
  Database,
  Lock,
  KeyRound,
  X
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import BlogForm from '@/components/vanguard/BlogForm';
import Image from "next/image";

interface BlogPost {
  id: string | number;
  slug: string;
  date: string;
  image: string;
  read_time: string;
  readTime?: string;
  category?: { es: string; en: string };
  category_es?: string;
  category_en?: string;
  title?: { es: string; en: string };
  title_es?: string;
  title_en?: string;
}

export default function BlogAdminPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>(undefined);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      
      if (res.status === 500 && (data.code === 'DATABASE_URL_MISSING' || data.error?.toLowerCase().includes('connection missing'))) {
        setError('DATABASE_URL_MISSING');
        setPosts([]);
      } else if (!res.ok) {
        throw new Error(data.error || 'Error fetching posts');
      } else {
        setPosts(data);
        setError(null);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      console.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm(language === 'es' ? '¿Estás seguro de eliminar este artículo?' : 'Are you sure you want to delete this article?')) return;
    
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error deleting post');
      fetchPosts();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setEditingPost(undefined);
    setIsFormOpen(true);
  };

  const filteredPosts = posts.filter(post => {
    const title = post.title_es || post.title?.es || '';
    const titleEn = post.title_en || post.title?.en || '';
    return title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           titleEn.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const stats = [
    { label: language === 'es' ? 'Vistas Totales' : 'Total Views', value: '1,280', change: '+12%', icon: Eye },
    { label: language === 'es' ? 'Artículos' : 'Articles', value: posts.length, change: '0', icon: FileText },
    { label: language === 'es' ? 'Lectores' : 'Readers', value: '450', change: '+5%', icon: Users },
    { label: language === 'es' ? 'Engagement' : 'Engagement', value: '78%', change: '+2%', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col fixed h-full z-50">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-accent-blue flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <span className="text-white font-bold leading-none">A</span>
            </div>
            <span className="font-bold tracking-tight text-lg">Ancastav <span className="text-accent-blue text-xs uppercase">PRO</span></span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/admin/blog" className="block outline-none">
            <NavItem icon={<LayoutIcon size={18} />} label="Overview" active />
          </Link>
          <button onClick={() => alert(language === 'es' ? 'Sección de edición avanzada próximamente.' : 'Advanced editing section coming soon.')} className="w-full">
            <NavItem icon={<FileText size={18} />} label="Blog Content" />
          </button>
          <Link href="/crm" className="block outline-none">
            <NavItem icon={<Users size={18} />} label="Contacts & Leads" />
          </Link>
          <button onClick={() => alert(language === 'es' ? 'Analytics avanzado próximamente.' : 'Advanced Analytics coming soon.')} className="w-full">
            <NavItem icon={<BarChart3 size={18} />} label="Analytics" />
          </button>
          <div className="pt-4 mt-4 border-t border-white/5">
            <button onClick={() => setIsSettingsOpen(true)} className="w-full">
              <NavItem icon={<Settings size={20} />} label="Settings" />
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="bg-gradient-to-br from-blue-600/20 to-transparent p-4 rounded-xl border border-blue-500/20">
            <p className="text-xs text-blue-400 font-medium mb-1">Elite Plan</p>
            <p className="text-sm font-semibold mb-3">Vanguard Admin</p>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-accent-blue w-3/4 rounded-full" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">
              {language === 'es' ? 'Panel de Control del Blog' : 'Blog Control Center'}
            </h1>
            <p className="text-slate-400">
              {language === 'es' ? 'Gestiona tus publicaciones Vanguard desde aquí.' : 'Manage your Vanguard publications from here.'}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchPosts}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              title="Refrescar"
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
            <button 
              onClick={handleCreate}
              className="flex items-center gap-2 px-5 py-2.5 bg-accent-blue text-white rounded-full font-semibold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              <Plus size={18} />
              {language === 'es' ? 'Nuevo Artículo' : 'New Article'}
            </button>
          </div>
        </header>

        {/* Database Warning */}
        {error === 'DATABASE_URL_MISSING' && (
          <div className="mb-10 p-6 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-4">
               <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400">
                  <Database size={24} />
               </div>
                <div>
                   <h3 className="font-bold text-rose-400">DATABASE_URL No Detectada</h3>
                   <p className="text-sm text-rose-400/70 mb-3">Configura la variable de entorno en tu archivo .env local o en Vercel para activar el CMS.</p>
                   <button 
                     onClick={() => window.open('https://github.com/ancastav/vanguard-cms-guide', '_blank')}
                     className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 rounded-full transition-all border border-rose-500/30"
                   >
                     Manual de Activación
                   </button>
                </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/[0.08] transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl bg-white/5 text-accent-blue group-hover:scale-110 transition-transform">
                  <stat.icon size={24} />
                </div>
                <div className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full text-xs font-semibold">
                  <TrendingUp size={12} />
                  {stat.change}
                </div>
              </div>
              <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden flex flex-col h-[700px]">
          {/* Table Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileText size={20} className="text-accent-blue" />
              {language === 'es' ? 'Publicaciones Recientes' : 'Recent Publications'}
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder={language === 'es' ? 'Buscar artículos...' : 'Search articles...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/50 w-64 transition-all"
              />
            </div>
          </div>

          {/* Posts List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
                <div className="w-10 h-10 border-4 border-white/10 border-t-accent-blue rounded-full animate-spin" />
                <p className="text-xs font-black uppercase tracking-widest">Sincronizando con Neon Database...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500 opacity-50">
                <FileText size={48} />
                <p className="text-sm font-bold">{language === 'es' ? 'No se encontraron artículos.' : 'No articles found.'}</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#111] sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 tracking-wider">Articulo</th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 tracking-wider">Categoría</th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 tracking-wider">Fecha</th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 tracking-wider">Lectura</th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500 tracking-wider text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-white/5 relative">
                             <Image 
                               src={post.image} 
                               alt="" 
                               fill 
                               className="object-cover"
                               unoptimized={true}
                             />
                          </div>
                          <span className="font-medium group-hover:text-accent-blue transition-colors line-clamp-1">
                            {language === 'es' ? (post.title_es || post.title?.es) : (post.title_en || post.title?.en)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400 capitalize text-sm">
                        {language === 'es' ? (post.category_es || post.category?.es) : (post.category_en || post.category?.en)}
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm font-mono">{post.date}</td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{post.read_time || post.readTime}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button 
                             onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                             className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-accent-blue hover:text-white transition-all shadow-sm"
                             title="Vista Previa"
                           >
                              <Eye size={16} />
                           </button>
                           <button 
                             onClick={() => handleEdit(post)}
                             className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all shadow-sm" 
                             title="Editar"
                           >
                              <Edit3 size={16} />
                           </button>
                           <button 
                             onClick={() => handleDelete(post.id)}
                             className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm" 
                             title="Eliminar"
                           >
                              <Trash2 size={16} />
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* Blog Form Modal */}
      {isFormOpen && (
        <BlogForm 
          post={editingPost} 
          onClose={() => setIsFormOpen(false)} 
          onSuccess={fetchPosts} 
        />
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <PasswordChangeModal 
          onClose={() => setIsSettingsOpen(false)} 
        />
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center justify-between px-4 py-3 rounded-xl gap-3 transition-all ${
      active 
        ? 'bg-accent-blue text-white shadow-lg shadow-blue-500/20' 
        : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-semibold text-sm tracking-tight">{label}</span>
      </div>
      {active && <ChevronRight size={14} />}
    </button>
  );
}

function PasswordChangeModal({ onClose }: { onClose: () => void }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al cambiar contraseña');
      
      setSuccess(true);
      setTimeout(onClose, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-[#0D0D10] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute right-6 top-6 text-slate-500 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Lock size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Seguridad de Cuenta</h2>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-0.5">Gestión de Acceso Elite</p>
          </div>
        </div>

        {success ? (
          <div className="py-10 text-center animate-in slide-in-from-bottom-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <RefreshCw size={32} className="animate-spin" />
            </div>
            <h3 className="text-lg font-bold text-emerald-400">¡Contraseña Actualizada!</h3>
            <p className="text-sm text-slate-400 mt-2">Cerrando ventana...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-2">Contraseña Actual</label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-3 text-slate-500" size={16} />
                <input 
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-2">Nueva Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3 text-slate-500" size={16} />
                <input 
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-2">Confirmar Nueva Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3 text-slate-500" size={16} />
                <input 
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                  placeholder="Repite la contraseña"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold flex items-center gap-2">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xl shadow-blue-600/20 disabled:opacity-50"
            >
              <span>{loading ? 'Procesando...' : 'Actualizar Credenciales'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
