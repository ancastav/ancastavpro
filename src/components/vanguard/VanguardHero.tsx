import React from 'react';
import { translations, Language } from "@/lib/translations";

interface VanguardHeroProps {
  lang: Language;
}

export const VanguardHero: React.FC<VanguardHeroProps> = ({ lang }) => {
  const t = translations[lang].hero;
  
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden bg-white">
      {/* Background Vanguard Glows (Subtler for Light Mode) */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Abstract Grid Pattern (Light) */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(to right, #2563eb11 1px, transparent 1px), linear-gradient(to bottom, #2563eb11 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 max-w-6xl mx-auto text-center animate-reveal">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-slate-200 bg-slate-50 mb-16 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500">{t.badge}</span>
        </div>

        <h1 className="text-5xl md:text-[100px] font-poppins mb-8 leading-[0.9] tracking-tighter uppercase transition-all duration-700 font-black">
          <span className="block text-slate-900">{t.title1}</span>
          <span className="block text-accent-blue">{t.title2}</span>
          <span className="block text-slate-400">{t.title3}</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-12 font-inter leading-relaxed">
          {t.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-diagnostic'))}
            className="group relative px-10 py-5 bg-accent-blue text-white font-black uppercase tracking-[0.2em] transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20 text-[10px] rounded-sm"
          >
            {t.cta1}
            <div className="absolute inset-0 border border-accent-blue/20 translate-x-1 translate-y-1 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
          </button>
          <a href="#pricing" className="px-10 py-5 border border-slate-200 text-slate-900 font-black uppercase tracking-[0.2em] transition-all duration-500 hover:bg-slate-50 text-[10px] rounded-sm">
            {t.cta2}
          </a>
        </div>
      </div>
      
      {/* Functional Metadata Detail (Light) */}
      <div className="absolute bottom-12 left-12 hidden lg:block animate-reveal" style={{ animationDelay: '1s' }}>
        <div className="flex flex-col gap-1">
          <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">{t.system_status}</span>
          <div className="flex items-center gap-2">
            <div className="w-20 h-[2px] bg-slate-100 overflow-hidden">
                <div className="h-full bg-accent-blue w-2/3 animate-pulse" />
            </div>
            <span className="text-[10px] font-mono text-accent-blue font-bold tracking-tighter">OPTIMIZED // 2026</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 hidden lg:block animate-reveal" style={{ animationDelay: '1.2s' }}>
        <div className="text-right">
          <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest font-bold">{t.geoposition}</span>
          <p className="text-[10px] font-mono text-slate-500 font-bold tracking-tighter uppercase">Caribbean // DOMINICAN_REPUBLIC // HQ</p>
        </div>
      </div>
    </section>
  );
};
