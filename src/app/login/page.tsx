"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Usamos una API simple de login para facilitar la gestión de cookies
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/crm');
      } else {
        setError('Acceso denegado: Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error en el servidor. Intente de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#05070A] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbits */}
      <div className="absolute w-[800px] h-[800px] border border-white/[0.05] rounded-full -top-1/4 -left-1/4 animate-spin-slow"></div>
      <div className="absolute w-[600px] h-[600px] border border-white/[0.03] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase mb-4 tracking-tighter">
                <Lock size={12} /> Zona Restringida
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Ancastav <span className="text-blue-500">PRO</span></h1>
            <p className="text-slate-400 text-sm">Panel de Gestión y Control Digital</p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest pl-2">Email Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-500" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ancastav.com"
                  required
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-700" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest pl-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-slate-500" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-700" 
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-xs text-center font-bold bg-red-400/10 py-3 rounded-xl border border-red-400/20">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 group transition-all active:scale-[0.98] shadow-xl shadow-blue-600/20"
            >
              <span>{loading ? 'Accediendo...' : 'Iniciar Sesión'}</span>
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-[10px] text-slate-600 uppercase font-bold tracking-[0.2em]">
          Este sistema es propiedad exclusiva de ANCASTAV DIGITAL SERVICES. 
        </p>
      </div>
    </div>
  );
}
