"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, Clock, MessageSquare, 
  TrendingUp, CheckCircle2,
  Calendar, Phone, Mail, LogOut, 
  ArrowRight, ChevronLeft, ChevronRight
} from 'lucide-react';

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

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState<'leads' | 'calendar'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const leadsRes = await fetch('/api/leads');
      const leadsData = await leadsRes.json();
      setLeads(leadsData);
      
      const apptRes = await fetch('/api/appointments');
      const apptData = await apptRes.json();
      setAppointments(apptData);
    } catch (e) {
      console.error("Error fetching data:", e);
    } finally {
      setLoading(false);
    }
  }

  async function logContact(id: string, method: 'WA' | 'EMAIL' | 'CALL') {
    setUpdatingId(id);
    const entry = { type: method, date: new Date().toISOString() };
    try {
      await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'CONTACTED', contact_log_entry: entry })
      });
      fetchData();
    } catch (e) {
      console.error("Update error:", e);
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  }

  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'NEW').length;
  const upcomingAppts = appointments.length;

  return (
    <div className="min-h-screen bg-[#F4F7FA] text-slate-900 font-sans flex">
      {/* Sidebar Navigation */}
      <aside className="w-24 bg-[#05070A] border-r border-white/5 flex flex-col items-center py-10 sticky top-0 h-screen">
        <div className="mb-12 font-black text-white text-xl">A<span className="text-blue-500">.</span></div>
        <nav className="flex flex-col gap-8 flex-1">
          <NavIcon active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} icon={<Users size={24} />} label="Leads" />
          <NavIcon active={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} icon={<Calendar size={24} />} label="Agenda" />
          <NavIcon active={false} icon={<TrendingUp size={24} />} label="Stats" />
        </nav>
        <button onClick={handleLogout} className="p-3 text-slate-500 hover:text-red-400 transition-colors mt-auto">
          <LogOut size={24} />
        </button>
      </aside>

      <main className="flex-1 p-10">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-end mb-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-0.5">
                 {activeTab === 'leads' ? 'Pipeline de Leads' : 'Gestión de Citas'}
              </h1>
              <p className="text-slate-400 text-xs font-medium tracking-wide italic">Panel de Control Estratégico Ancastav PRO</p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard label="Leads Totales" value={totalLeads} icon={<Users size={18} className="text-blue-600" />} />
            <StatCard label="Pendientes" value={newLeads} icon={<Clock size={18} className="text-orange-500" />} color="orange" />
            <StatCard label="Próximas Citas" value={upcomingAppts} icon={<Calendar size={18} className="text-indigo-500" />} color="indigo" />
          </div>

          {activeTab === 'leads' ? (
             <LeadsTable leads={leads} loading={loading} logContact={logContact} updatingId={updatingId} />
          ) : (
             <CalendarView appointments={appointments} />
          )}
        </div>
      </main>
    </div>
  );
}

function NavIcon({ active, icon, onClick, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`relative p-4 rounded-2xl transition-all group ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}
    >
      {icon}
      <span className="absolute left-full ml-4 px-2 py-1 bg-black text-white text-[10px] font-black uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </button>
  );
}

function StatCard({ label, value, icon }: any) {
  return (
    <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-lg shadow-slate-200/30">
      <div className="flex justify-between items-start mb-2">
        <div className="p-2 bg-slate-50 rounded-xl">{icon}</div>
      </div>
      <div className="text-3xl font-black mb-0.5 leading-none">{value}</div>
      <div className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">{label}</div>
    </div>
  );
}

function LeadsTable({ leads, loading, logContact, updatingId }: any) {
  return (
    <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 text-slate-400 font-bold text-[10px] uppercase tracking-widest border-b border-slate-100">
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Interés</th>
              <th className="px-6 py-4 text-center">Acciones</th>
              <th className="px-6 py-4">Historial</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
               <tr><td colSpan={4} className="py-24 text-center text-slate-400 font-bold uppercase tracking-widest">Sincronizando Leads...</td></tr>
            ) : leads.map((lead: Lead) => (
              <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm">
                        {lead.full_name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-extrabold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">{lead.full_name}</span>
                      <span className="text-[10px] text-slate-400 font-bold leading-tight">{lead.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-2.5">
                  <div className="py-1 px-2.5 bg-slate-100 rounded-lg w-fit">
                    <span className="text-[8px] font-black text-slate-700 uppercase">{lead.plan_selected}</span>
                  </div>
                </td>
                <td className="px-6 py-2.5">
                  <div className="flex items-center justify-center gap-1">
                    <ActionButton icon={<Phone size={10}/>} onClick={() => logContact(lead.id, 'CALL')} color="blue" disabled={updatingId === lead.id} />
                    <ActionButton icon={<MessageSquare size={10}/>} onClick={() => {
                        logContact(lead.id, 'WA');
                        window.open(`https://wa.me/${lead.phone.replace(/\D/g, '')}`, '_blank');
                    }} color="emerald" disabled={updatingId === lead.id} />
                    <ActionButton icon={<Mail size={10}/>} onClick={() => {
                        logContact(lead.id, 'EMAIL');
                        window.open(`mailto:${lead.email}`);
                    }} color="indigo" disabled={updatingId === lead.id} />
                  </div>
                </td>
                <td className="px-6 py-2.5">
                    <div className="flex flex-col gap-0.5">
                        {lead.contact_log?.slice(-1).map((log, i) => (
                            <div key={i} className="flex items-center gap-1 text-[7px] font-black uppercase text-slate-400">
                                <CheckCircle2 size={8} className="text-emerald-500" />
                                {log.type} - {new Date(log.date).toLocaleDateString()}
                            </div>
                        ))}
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CalendarView({ appointments }: { appointments: Appointment[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthName = currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const startDay = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: startDay }, (_, i) => i);

  const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const handleDayClick = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setIsModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Panel: Stats/Agenda - More Compact */}
        <div className="lg:col-span-3 space-y-3">
            <div className="bg-white p-4 rounded-[20px] border border-slate-100 shadow-sm">
                 <h3 className="font-black uppercase text-[9px] tracking-widest text-slate-400 mb-3">Agenda Próxima</h3>
                 <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                    {appointments.slice(0, 5).map(appt => (
                        <div key={appt.id} className="flex gap-2 relative pl-3 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[3px] before:bg-blue-600 before:rounded-full group hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
                            <div className="flex-1">
                                <div className="text-[8px] font-black uppercase text-blue-600">{appt.appointment_time}</div>
                                <div className="font-bold text-slate-900 text-xs truncate">{appt.lead_name}</div>
                            </div>
                        </div>
                    ))}
                    {appointments.length === 0 && <p className="text-[10px] text-slate-400 italic">Sin citas.</p>}
                 </div>
            </div>
            
            <div className="bg-blue-600 p-4 rounded-[20px] text-white shadow-lg shadow-blue-600/20">
                <Calendar size={18} className="mb-2 opacity-50" />
                <h4 className="font-black text-sm leading-tight mb-1">Tip</h4>
                <p className="text-blue-100 text-[10px] leading-snug">
                    Haz clic en un día para agendar una nueva sesión.
                </p>
            </div>
        </div>

        {/* Right Panel: Calendar Grid - More Compact */}
        <div className="lg:col-span-9 bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
            <h2 className="text-sm font-black text-slate-900 capitalize italic">{monthName}</h2>
            <div className="flex gap-1.5">
              <button onClick={prevMonth} className="p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 transition-all text-slate-400 hover:text-blue-600 active:scale-90">
                <ChevronLeft size={16} />
              </button>
              <button onClick={nextMonth} className="p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 transition-all text-slate-400 hover:text-blue-600 active:scale-90">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 p-2">
            <div className="grid grid-cols-7 mb-1">
              {dayNames.map(d => (
                <div key={d} className="text-center py-1 text-[8px] font-black uppercase text-slate-300">{d}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-0.5">
              {blanks.map(b => (
                <div key={`b-${b}`} className="aspect-[3.5/3] bg-slate-50/20 rounded-md"></div>
              ))}
              
              {days.map(day => {
                const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const dayAppts = appointments.filter(a => a.appointment_date === dateStr);
                const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

                return (
                  <div 
                    key={day} 
                    onClick={() => handleDayClick(day)}
                    className={`aspect-[3.5/3] rounded-md p-1 relative group hover:bg-blue-600 hover:text-white transition-all cursor-pointer border ${isToday ? 'border-blue-600 bg-blue-50/30' : 'border-transparent bg-slate-50/30'}`}
                  >
                    <span className={`text-[9px] font-black ${isToday ? 'text-blue-600 group-hover:text-white' : 'text-slate-400 group-hover:text-white'}`}>{day}</span>
                    {dayAppts.length > 0 && (
                      <div className="absolute bottom-0.5 right-0.5 flex gap-0.5">
                         {dayAppts.slice(0, 3).map((_, i) => (
                           <div key={i} className={`w-0.5 h-0.5 rounded-full ${isToday ? 'bg-blue-600' : 'bg-blue-400'} group-hover:bg-white`}></div>
                         ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {isModalOpen && (
          <ScheduleModal 
            date={selectedDate} 
            onClose={() => setIsModalOpen(false)} 
            onSave={(data: any) => {
              console.log('Saving appointment:', data);
              setIsModalOpen(false);
              alert(`Cita agendada para el ${selectedDate}`);
            }}
          />
        )}
    </div>
  );
}

function ScheduleModal({ date, onClose, onSave }: any) {
  const [formData, setFormData] = useState({
    name: '',
    time: '10:00',
    duration: '30 min',
    notes: ''
  });

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="bg-blue-600 p-6 text-white leading-none">
          <h3 className="text-xl font-black italic mb-1">Agendar Nueva Cita</h3>
          <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest">{date}</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Cliente / Lead</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Nombre completo..." 
              className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Hora</label>
              <input 
                type="time" 
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Duración</label>
              <select 
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all"
              >
                <option>30 min</option>
                <option>60 min</option>
                <option>90 min</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Notas / Objetivo</label>
            <textarea 
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Detalles de la sesión..." 
              className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all resize-none h-24"
            ></textarea>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 py-3 px-4 rounded-xl text-sm font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all">Cancelar</button>
            <button 
              onClick={() => onSave(formData)} 
              disabled={!formData.name}
              className="flex-1 py-3 px-4 rounded-xl text-sm font-black uppercase tracking-widest bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:shadow-none"
            >
              Confirmar Cita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, onClick, color, disabled }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white',
    emerald: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white',
    indigo: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white',
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`p-2 rounded-xl transition-all active:scale-95 disabled:opacity-50 ${colors[color]}`}>
      {icon}
    </button>
  );
}
