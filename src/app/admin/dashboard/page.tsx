'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  X,
  Calendar,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  ChevronLeft,
  Loader2,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import BlogForm from '@/components/elite/BlogForm';
import Image from "next/image";

// Types
interface BlogPost {
  id: string | number;
  slug: string;
  date: string;
  image: string;
  read_time: string;
  category_es?: string;
  category_en?: string;
  title_es?: string;
  title_en?: string;
}

interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  plan_selected: string;
  status: 'NEW' | 'CONTACTED' | 'CLOSED' | 'REJECTED';
  message: string;
  created_at: string;
  contact_log: Array<{ type: string; date: string; notes?: string }>;
}

interface Appointment {
  id: string;
  lead_name: string;
  appointment_date: string;
  appointment_time: string;
  notes: string;
  status: string;
}

export default function UnifiedAdminDashboard() {
  const { language } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'agenda' | 'blog' | 'settings'>('overview');
  
  // Blog State
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogSearch, setBlogSearch] = useState('');
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>(undefined);
  
  // CRM State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [crmLoading, setCrmLoading] = useState(true);
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);

  // General State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetching
  useEffect(() => {
    fetchBlogData();
    fetchCRMData();
  }, []);

  const fetchBlogData = async () => {
    setBlogLoading(true);
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPosts(data);
    } catch (err) {
      console.error("Blog fetch error:", err);
    } finally {
      setBlogLoading(false);
    }
  };

  const fetchCRMData = async () => {
    setCrmLoading(true);
    try {
      const leadsRes = await fetch('/api/leads');
      const leadsData = await leadsRes.json();
      setLeads(Array.isArray(leadsData) ? leadsData : []);

      const apptRes = await fetch('/api/appointments');
      const apptData = await apptRes.json();
      setAppointments(Array.isArray(apptData) ? apptData : []);
    } catch (err) {
      console.error("CRM fetch error:", err);
    } finally {
      setCrmLoading(false);
    }
  };

  const logContact = async (id: string, method: 'WA' | 'EMAIL' | 'CALL') => {
    setUpdatingLeadId(id);
    const entry = { type: method, date: new Date().toISOString() };
    try {
      await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'CONTACTED', contact_log_entry: entry })
      });
      fetchCRMData();
    } catch (e) {
      console.error("Update error:", e);
    } finally {
      setUpdatingLeadId(null);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  // Stats Derived
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'NEW').length;
  const upcomingAppts = appointments.length;

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col fixed h-full z-50">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 group outline-none">
            <div className="w-8 h-8 rounded-lg bg-accent-blue flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold leading-none">A</span>
            </div>
            <span className="font-bold tracking-tight text-lg">Ancastav <span className="text-accent-blue text-[10px] uppercase font-black">Elite</span></span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarItem 
            icon={<LayoutIcon size={18} />} 
            label={language === 'es' ? 'Overview' : 'Overview'} 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
          />
          <SidebarItem 
            icon={<Users size={18} />} 
            label={language === 'es' ? 'Leads & Pipeline' : 'Leads & Pipeline'} 
            active={activeTab === 'leads'} 
            onClick={() => setActiveTab('leads')} 
          />
          <SidebarItem 
            icon={<Calendar size={18} />} 
            label={language === 'es' ? 'Agenda' : 'Agenda'} 
            active={activeTab === 'agenda'} 
            onClick={() => setActiveTab('agenda')} 
          />
          <SidebarItem 
            icon={<FileText size={18} />} 
            label={language === 'es' ? 'Blog/Insights' : 'Blog Content'} 
            active={activeTab === 'blog'} 
            onClick={() => setActiveTab('blog')} 
          />
          
          <div className="pt-4 mt-4 border-t border-white/5">
            <SidebarItem 
              icon={<Settings size={18} />} 
              label={language === 'es' ? 'Configuración' : 'Settings'} 
              active={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')} 
            />
          </div>
        </nav>

        <div className="p-4 border-t border-white/5">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-rose-400 transition-colors rounded-xl hover:bg-rose-500/5 group"
           >
              <X size={18} className="group-hover:rotate-90 transition-transform" />
              <span className="text-sm font-bold uppercase tracking-widest ont-mono text-[10px]">Cerrar Sesión</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tight italic uppercase mb-1 drop-shadow-sm">
              {activeTab === 'overview' && 'ANCASTAV HUB'}
              {activeTab === 'leads' && (language === 'es' ? 'PIPELINE DE LEADS' : 'LEADS PIPELINE')}
              {activeTab === 'agenda' && (language === 'es' ? 'GESTIÓN DE AGENDA' : 'AGENDA MANAGEMENT')}
              {activeTab === 'blog' && (language === 'es' ? 'EDITOR DE INSIGHTS' : 'INSIGHTS EDITOR')}
              {activeTab === 'settings' && (language === 'es' ? 'SEGURIDAD MASTER' : 'MASTER SECURITY')}
            </h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] font-mono">
              Elite Control System · 2026 Edition
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-10 px-4 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 group hover:border-accent-blue/50 transition-all cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">Sistema Operativo</span>
            </div>
            {activeTab === 'blog' && (
               <button 
                 onClick={() => { setEditingPost(undefined); setIsBlogFormOpen(true); }}
                 className="h-10 px-6 bg-accent-blue text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center gap-2"
               >
                 <Plus size={14} />
                 Nuevo Post
               </button>
            )}
          </div>
        </header>

        {/* Content Tabs */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'overview' && (
            <OverviewTab stats={{ totalLeads, newLeads, upcomingAppts, postsCount: posts.length }} />
          )}
          {activeTab === 'leads' && (
            <LeadsTab leads={leads} loading={crmLoading} logContact={logContact} updatingId={updatingLeadId} />
          )}
          {activeTab === 'agenda' && (
            <AgendaTab appointments={appointments} />
          )}
          {activeTab === 'blog' && (
            <BlogTab 
              posts={posts} 
              loading={blogLoading} 
              searchTerm={blogSearch} 
              setSearchTerm={setBlogSearch} 
              onEdit={(post: BlogPost) => { setEditingPost(post); setIsBlogFormOpen(true); }} 
              onDelete={async (id: string | number) => {
                if (confirm('¿Eliminar post?')) {
                  await fetch(`/api/blog/${id}`, { method: 'DELETE' });
                  fetchBlogData();
                }
              }}
            />
          )}
          {activeTab === 'settings' && (
            <SettingsTab />
          )}
        </div>
      </main>

      {/* Modals */}
      {isBlogFormOpen && (
        <BlogForm 
          post={editingPost} 
          onClose={() => setIsBlogFormOpen(false)} 
          onSuccess={fetchBlogData} 
        />
      )}
    </div>
  );
}

// --- Sub-Components ---

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl gap-3 transition-all ${
        active 
          ? 'bg-accent-blue text-white shadow-xl shadow-blue-600/30 font-bold' 
          : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[11px] font-black uppercase tracking-wider">{label}</span>
      </div>
      {active && <ChevronRight size={14} className="animate-pulse" />}
    </button>
  );
}

function OverviewTab({ stats }: any) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Leads Totales" value={stats.totalLeads} icon={<Users size={20} />} trend="+12%" />
        <StatCard label="Pendientes" value={stats.newLeads} icon={<Clock size={20} />} trend="New" color="rose" />
        <StatCard label="Próximas Citas" value={stats.upcomingAppts} icon={<Calendar size={20} />} trend="Next" color="amber" />
        <StatCard label="Artículos Blog" value={stats.postsCount} icon={<FileText size={20} />} trend="Elite" color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 aspect-video flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <TrendingUp size={48} className="text-accent-blue mb-4 animate-bounce" />
            <h3 className="font-black italic text-xl mb-2 tracking-tighter uppercase">Rendimiento Operativo</h3>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest text-center px-12">
               Visualización de datos en tiempo real procesada por el motor Ancastav 
            </p>
        </div>
        <div className="bg-gradient-to-br from-accent-blue/10 to-transparent border border-white/10 rounded-[2.5rem] p-8 aspect-video flex flex-col justify-end">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-blue mb-2">Elite Status</h4>
            <h2 className="text-3xl font-black italic uppercase leading-none mb-4">Sistemas <br /> Optimizados</h2>
            <div className="flex gap-2">
                {[1,2,3,4,5].map(i => <div key={i} className="h-1 w-8 bg-accent-blue/30 rounded-full" />)}
            </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, trend, color = 'blue' }: any) {
  const colors: any = {
    blue: 'text-accent-blue bg-accent-blue/10',
    rose: 'text-rose-400 bg-rose-400/10',
    amber: 'text-amber-400 bg-amber-400/10',
    indigo: 'text-indigo-400 bg-indigo-400/10'
  };
  return (
    <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl ${colors[color]} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
           {trend}
        </div>
      </div>
      <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{label}</h3>
      <p className="text-3xl font-black italic tracking-tighter">{value}</p>
    </div>
  );
}

function LeadsTab({ leads, loading, logContact, updatingId }: any) {
  return (
     <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-[#111] border-b border-white/5">
                    <tr className="text-slate-500 font-black text-[9px] uppercase tracking-[0.2em]">
                        <th className="px-8 py-5">Cliente</th>
                        <th className="px-8 py-5">Interés</th>
                        <th className="px-8 py-5 text-center">Acciones Directas</th>
                        <th className="px-8 py-5">Último Contacto</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {loading ? (
                       <tr><td colSpan={4} className="py-24 text-center text-slate-500 font-black uppercase tracking-[0.4em]">Sincronizando Pipeline...</td></tr>
                    ) : leads.map((lead: Lead) => (
                      <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-8 py-4">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center font-black text-accent-blue border border-accent-blue/20">
                                 {lead.full_name.charAt(0)}
                              </div>
                              <div className="flex flex-col">
                                 <span className="font-black text-sm group-hover:text-accent-blue transition-colors uppercase italic tracking-tighter">{lead.full_name}</span>
                                 <span className="text-[10px] text-slate-500 font-mono">{lead.email}</span>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-4">
                           <span className="text-[9px] font-black uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">{lead.plan_selected}</span>
                        </td>
                        <td className="px-8 py-4">
                            <div className="flex items-center justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                <LeadsAction icon={<Phone size={14}/>} onClick={() => logContact(lead.id, 'CALL')} color="blue" disabled={updatingId === lead.id} />
                                <LeadsAction icon={<MessageSquare size={14}/>} onClick={() => { logContact(lead.id, 'WA'); window.open(`https://wa.me/${lead.phone.replace(/\D/g, '')}`, '_blank'); }} color="emerald" disabled={updatingId === lead.id} />
                                <LeadsAction icon={<Mail size={14}/>} onClick={() => { logContact(lead.id, 'EMAIL'); window.open(`mailto:${lead.email}`); }} color="indigo" disabled={updatingId === lead.id} />
                            </div>
                        </td>
                        <td className="px-8 py-4">
                             {lead.contact_log?.slice(-1).map((log, i) => (
                                <div key={i} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-emerald-400">
                                   <CheckCircle2 size={10} />
                                   {log.type} · {new Date(log.date).toLocaleDateString()}
                                </div>
                             ))}
                        </td>
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>
     </div>
  );
}

function LeadsAction({ icon, onClick, color, disabled }: any) {
    const colors: any = {
      blue: 'bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white',
      emerald: 'bg-emerald-600/10 text-emerald-400 hover:bg-emerald-600 hover:text-white',
      indigo: 'bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600 hover:text-white'
    };
    return (
      <button onClick={onClick} disabled={disabled} className={`p-2.5 rounded-xl border border-white/5 transition-all active:scale-95 disabled:opacity-30 ${colors[color]}`}>
        {icon}
      </button>
    );
}

function AgendaTab({ appointments }: { appointments: Appointment[] }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const blanks = Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }, (_, i) => i);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-4">
                <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem]">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-blue mb-6">Sesiones Próximas</h3>
                    <div className="space-y-4">
                       {appointments.slice(0, 4).map(a => (
                           <div key={a.id} className="p-4 bg-white/5 rounded-2xl border-l-4 border-l-accent-blue hover:bg-white/[0.08] transition-all">
                               <div className="text-[10px] font-black text-accent-blue uppercase mb-1">{a.appointment_time} · {a.appointment_date}</div>
                               <div className="font-black italic text-sm">{a.lead_name}</div>
                           </div>
                       ))}
                       {appointments.length === 0 && <p className="text-slate-500 font-mono text-[9px] uppercase tracking-widest italic">No hay citas registradas</p>}
                    </div>
                </div>
                <div className="p-6 bg-accent-blue rounded-[2rem] text-white shadow-xl shadow-blue-600/20 group">
                    <Calendar size={24} className="mb-4 group-hover:rotate-12 transition-transform" />
                    <h4 className="font-black italic uppercase text-lg mb-1">Elite Agenda</h4>
                    <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest leading-normal">Optimiza tu tiempo estratégico con nuestro motor de planificación.</p>
                </div>
            </div>

            <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-xl font-black italic uppercase drop-shadow-sm">
                        {currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
                    </h2>
                    <div className="flex gap-2">
                        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="p-2 hover:bg-white/10 rounded-xl transition-all border border-white/5"><ChevronLeft size={20}/></button>
                        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="p-2 hover:bg-white/10 rounded-xl transition-all border border-white/5"><ChevronRight size={20}/></button>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'].map(d => (
                        <div key={d} className="text-center text-[9px] font-black text-slate-500 mb-4">{d}</div>
                    ))}
                    {blanks.map(b => <div key={`b-${b}`} />)}
                    {days.map(d => {
                        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                        const hasAppt = appointments.some(a => a.appointment_date === dateStr);
                        return (
                            <div key={d} className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all border cursor-pointer hover:border-accent-blue/50 hover:bg-accent-blue/5 ${hasAppt ? 'border-accent-blue bg-accent-blue/20' : 'border-white/5 bg-white/[0.02]'}`}>
                                <span className="text-[10px] font-black">{d}</span>
                                {hasAppt && <div className="w-1 h-1 bg-accent-blue rounded-full mt-1 animate-pulse" />}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function BlogTab({ posts, loading, searchTerm, setSearchTerm, onEdit, onDelete }: any) {
    const filtered = posts.filter((p: any) => 
        (p.title_es || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.title_en || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col h-[700px]">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <FileText size={24} className="text-accent-blue" />
                    <h2 className="text-xl font-black italic uppercase tracking-tight">Publicaciones Elite</h2>
                </div>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      type="text" 
                      placeholder="FILTRAR CONTENIDO..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-black/40 border border-white/10 rounded-full py-3 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-accent-blue/50 w-80 transition-all placeholder:text-slate-600"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-600">
                        <Loader2 size={48} className="animate-spin text-accent-blue" />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Sincronizando Insights...</p>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="sticky top-0 bg-[#0A0A0B] z-10 border-b border-white/5">
                            <tr className="text-slate-500 font-black text-[9px] uppercase tracking-[0.2em]">
                                <th className="px-8 py-4">Artículo</th>
                                <th className="px-8 py-4">Categoría</th>
                                <th className="px-8 py-4">Métricas</th>
                                <th className="px-8 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filtered.map((post: BlogPost) => (
                                <tr key={post.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 relative shadow-lg">
                                                <Image src={post.image} alt="" fill className="object-cover transition-transform group-hover:scale-110" unoptimized={true} />
                                            </div>
                                            <span className="font-black italic uppercase tracking-tighter text-sm group-hover:text-accent-blue transition-colors max-w-xs truncate">
                                                {post.title_es}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 border border-white/5 px-3 py-1.5 rounded-lg">{post.category_es}</span>
                                    </td>
                                    <td className="px-8 py-5 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                                        {post.read_time} · ACTIVE
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-20 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => window.open(`/blog/${post.slug}`, '_blank')} className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-all"><Eye size={16}/></button>
                                            <button onClick={() => onEdit(post)} className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"><Edit3 size={16}/></button>
                                            <button onClick={() => onDelete(post.id)} className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

function SettingsTab() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) { return setMsg({ type: 'error', text: 'Las contraseñas no coinciden' }); }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMsg({ type: 'success', text: 'Credenciales actualizadas correctamente' });
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Lock size={120} />
            </div>
            <div className="flex items-center gap-4 mb-10">
                <div className="p-4 rounded-3xl bg-accent-blue/10 text-accent-blue border border-accent-blue/20 shadow-lg shadow-blue-500/10">
                    <KeyRound size={28} />
                </div>
                <div>
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">Gestión de Seguridad</h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Credenciales Maestras Elite</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-4">Contraseña Actual</label>
                    <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-accent-blue transition-all" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-4">Nueva Pass</label>
                        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-accent-blue transition-all" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-4">Confirmar</label>
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-accent-blue transition-all" required />
                    </div>
                </div>

                {msg.text && (
                    <div className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 ${msg.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                        <AlertCircle size={16} />
                        {msg.text}
                    </div>
                )}

                <button 
                  disabled={loading}
                  className="w-full py-5 bg-accent-blue text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl shadow-2xl shadow-blue-500/30 hover:bg-blue-600 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                    {loading ? 'Sincronizando...' : 'Actualizar Credenciales Maestras'}
                </button>
            </form>
        </div>
    </div>
  );
}
