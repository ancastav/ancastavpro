'use client';

import React, { useState } from 'react';
import { 
  X, Save, Calendar, Clock, 
  User, MessageSquare, AlertCircle,
  CheckCircle2, Loader2
} from 'lucide-react';

interface Lead {
  id: string;
  full_name: string;
  email: string;
}

interface AppointmentFormProps {
  leads: Lead[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function AppointmentForm({ leads, onClose, onSuccess }: AppointmentFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    lead_id: '',
    appointment_date: new Date().toISOString().split('T')[0],
    appointment_time: '14:00',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.lead_id) {
      setError('Debes seleccionar un cliente.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al agendar la cita');
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-[#0A0A0B] border border-white/10 w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
              <Calendar size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Nuevo Agendamiento Elite</h2>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Planificación Estratégica</p>
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
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            {/* Lead Selector */}
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
                <User size={12} /> Seleccionar Cliente
              </label>
              <select
                value={formData.lead_id}
                onChange={(e) => setFormData(prev => ({ ...prev, lead_id: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all appearance-none cursor-pointer"
                required
              >
                <option value="" className="bg-[#0A0A0B]">--- Selecciona un Lead ---</option>
                {leads.map(lead => (
                  <option key={lead.id} value={lead.id} className="bg-[#0A0A0B]">
                    {lead.full_name} ({lead.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
                  <Calendar size={12} /> Fecha
                </label>
                <input
                  type="date"
                  value={formData.appointment_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, appointment_date: e.target.value }))}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all [color-scheme:dark]"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
                  <Clock size={12} /> Hora
                </label>
                <input
                  type="time"
                  value={formData.appointment_time}
                  onChange={(e) => setFormData(prev => ({ ...prev, appointment_time: e.target.value }))}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all [color-scheme:dark]"
                  required
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
                <MessageSquare size={12} /> Notas de la Sesión
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Objetivo de la reunión, puntos clave..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all placeholder:text-slate-700 h-32 resize-none"
              />
            </div>
          </div>

          {/* Feedback */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={16} className="shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex gap-3 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 size={16} className="shrink-0" />
              <p>¡Cita agendada correctamente!</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 rounded-full text-sm font-bold text-slate-400 hover:text-white transition-all hover:bg-white/5"
            >
              Cancelar
            </button>
            <button 
              disabled={loading || success}
              className="flex-[2] flex items-center justify-center gap-2 py-4 bg-accent-blue text-white rounded-full font-bold hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <Save size={18} />
                  Programar Sesión
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
