"use client";
import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { translations, Language } from "@/lib/translations";

interface DiagnosticFormProps {
  isModalMode?: boolean;
  lang: Language;
}

export const DiagnosticForm: React.FC<DiagnosticFormProps> = ({ isModalMode = false, lang }) => {
  const t = translations[lang].diagnostic;
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    plan_selected: 'RE',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`${isModalMode ? 'p-8' : 'max-w-xl mx-auto py-12 px-6'} bg-blue-50 border border-blue-100 rounded-3xl text-center animate-reveal`}>
        <div className="w-16 h-16 bg-accent-blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/20">
          <CheckCircle2 size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-poppins font-black text-slate-900 mb-2 uppercase">{t.successTitle}</h3>
        <p className="text-blue-600 text-sm font-medium font-inter">{t.successMessage}</p>
      </div>
    );
  }

  const FormContent = (
    <div className={`${isModalMode ? 'p-8 pt-10' : 'py-16 px-6'} relative overflow-hidden bg-white`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-accent-blue" />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-accent-blue text-[9px] font-black uppercase mb-4 tracking-widest font-mono">
            <Sparkles size={10} /> {t.badge}
          </div>
          <h2 className={`${isModalMode ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} font-poppins font-black text-slate-900 mb-4 uppercase tracking-tighter`}>
            {t.title1} <span className="text-accent-blue">{t.title2}</span>
          </h2>
          <p className="text-slate-500 text-base font-inter">{t.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-blue-500/5 relative overflow-hidden group">
          <div className="space-y-1.5">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] pl-2 font-mono">{t.fields.name}</label>
            <input 
              required
              type="text" 
              placeholder={t.placeholders.name}
              value={formData.full_name}
              onChange={e => setFormData({...formData, full_name: e.target.value})}
              className="w-full bg-white border border-slate-200 rounded-xl py-3 px-5 text-sm text-slate-900 focus:outline-none focus:border-accent-blue transition-all placeholder:text-slate-300 font-inter"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] pl-2 font-mono">{t.fields.email}</label>
            <input 
              required
              type="email" 
              placeholder={t.placeholders.email}
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full bg-white border border-slate-200 rounded-xl py-3 px-5 text-sm text-slate-900 focus:outline-none focus:border-accent-blue transition-all placeholder:text-slate-300 font-inter"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] pl-2 font-mono">{t.fields.phone}</label>
            <input 
              required
              type="tel" 
              placeholder={t.placeholders.phone}
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-white border border-slate-200 rounded-xl py-3 px-5 text-sm text-slate-900 focus:outline-none focus:border-accent-blue transition-all placeholder:text-slate-300 font-inter"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] pl-2 font-mono">{t.fields.sector}</label>
            <select 
              value={formData.plan_selected}
              onChange={e => setFormData({...formData, plan_selected: e.target.value})}
              className="w-full bg-white border border-slate-200 rounded-xl py-3 px-5 text-sm text-slate-900 focus:outline-none focus:border-accent-blue transition-all font-inter appearance-none"
            >
              <option value="RE">Real Estate</option>
              <option value="HC">Salud & Clínicas</option>
              <option value="EC">E-Commerce PRO</option>
              <option value="RS">Restauración</option>
              <option value="AC">Academias Digitales</option>
              <option value="PS">Servicios Profesionales</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] pl-2 font-mono">{t.fields.message}</label>
            <textarea 
              rows={3}
              placeholder={t.placeholders.message}
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              className="w-full bg-white border border-slate-200 rounded-2xl py-3 px-5 text-sm text-slate-900 focus:outline-none focus:border-accent-blue transition-all placeholder:text-slate-300 font-inter resize-none"
            />
          </div>

          {status === 'error' && <p className="md:col-span-2 text-red-500 text-[10px] font-bold text-center font-inter">{t.errorMessage}</p>}

          <button 
            disabled={status === 'loading'}
            type="submit" 
            className="md:col-span-2 mt-2 bg-accent-blue hover:bg-accent-blue-hover text-white font-black uppercase py-4 rounded-2xl flex items-center justify-center gap-3 group transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20 tracking-[0.1em] text-[11px] font-poppins"
          >
            {status === 'loading' ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <span>{t.submit}</span>
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );

  return isModalMode ? FormContent : <section id="diagnostico" className="py-24 px-6 relative overflow-hidden">{FormContent}</section>;
};
