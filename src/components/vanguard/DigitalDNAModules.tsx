import React from 'react';
import { translations, Language } from "@/lib/translations";
import { InteractiveADNDiagnostic } from './InteractiveADNDiagnostic';

interface DigitalDNAModulesProps {
  lang: Language;
}

export const DigitalDNAModules: React.FC<DigitalDNAModulesProps> = ({ lang }) => {
  const t = translations[lang].dna_modules;
  
  return (
    <section id="diagnostic-lab" className="py-24 px-6 bg-slate-950 relative overflow-hidden font-poppins">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-12 animate-reveal">
          <div>
            <div className="inline-block px-3 py-1 mb-4 border border-slate-800 bg-slate-900 rounded text-[9px] font-bold text-slate-500 font-mono text-white/50">
              ● {t.badge}
            </div>
            <h3 className="text-3xl font-black text-white uppercase tracking-tight">
              {t.title}
            </h3>
          </div>
          <div className="text-slate-500 text-sm max-w-md md:text-right font-mono uppercase tracking-widest leading-relaxed">
            <span className="text-accent-blue font-bold">ARC // DIAGNOSTIC_V3</span> <br/>
            {t.subtitle}
          </div>
        </div>

        <div className="animate-reveal" style={{ animationDelay: '0.2s' }}>
          <InteractiveADNDiagnostic lang={lang} />
        </div>
      </div>
    </section>
  );
};
