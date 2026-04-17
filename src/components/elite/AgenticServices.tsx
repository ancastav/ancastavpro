'use client';

import React from 'react';
import { Language } from "@/lib/translations";
import { ClientTrigger } from './ClientTrigger';

interface AgenticServicesProps {
  lang: Language;
  t: any;
}

const serviceIcons = [
  { id: 'RE', icon: '🏘️' },
  { id: 'HC', icon: '🏥' },
  { id: 'EC', icon: '🛍️' },
  { id: 'RS', icon: '🍽️' },
  { id: 'AC', icon: '🎓' },
  { id: 'PS', icon: '💼' },
];

export const AgenticServices: React.FC<AgenticServicesProps> = ({ lang, t }) => {
  
  return (
    <section id="services" className="py-32 px-6 bg-white relative overflow-hidden border-t border-slate-100 font-poppins">
      {/* Decorative background grid (Sync with DigitalDNA) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 animate-reveal">
          <div className="inline-block px-4 py-1 mb-6 border border-accent-blue/30 bg-accent-blue/5 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-accent-blue font-mono">
            ● {t.badge}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
            {t.title.split(' ')[0]} <span className="text-accent-blue italic">{t.title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.items.map((service: any, index: number) => (
            <ClientTrigger 
              key={index}
              event="open-contact"
              className="group relative p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-accent-blue/20 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer animate-reveal overflow-hidden"
            >
              {/* Background accent icon (Reduced opacity) */}
              <div className="absolute -top-6 -right-6 text-8xl opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none filter grayscale group-hover:grayscale-0">
                {serviceIcons[index].icon}
              </div>

              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="px-3 py-1 rounded-full border border-slate-200 bg-white text-[9px] font-bold text-slate-400 tracking-widest uppercase font-mono group-hover:border-accent-blue/30 group-hover:text-accent-blue transition-all shadow-sm">
                  {service.tag}
                </div>
                <span className="text-3xl group-hover:rotate-12 transition-transform duration-500 filter grayscale group-hover:grayscale-0">{serviceIcons[index].icon}</span>
              </div>
              
              <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-accent-blue transition-colors uppercase tracking-tight relative z-10">
                {service.title}
              </h3>
              
              <p className="text-slate-500 text-sm leading-relaxed mb-10 group-hover:text-slate-800 transition-colors relative z-10">
                {service.description}
              </p>
              
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-black group-hover:text-accent-blue transition-all text-slate-400 font-mono relative z-10">
                <span>{t.explore}</span>
                <div className="w-8 h-[1px] bg-slate-200 transform scale-x-50 group-hover:scale-x-100 group-hover:bg-accent-blue origin-left transition-all duration-500" />
              </div>

              {/* Progress bar signature from DigitalDNA */}
              <div className="absolute bottom-0 left-0 h-[1px] w-full bg-slate-100">
                <div className="h-full bg-accent-blue w-0 group-hover:w-full transition-all duration-1000 ease-out" />
              </div>
            </ClientTrigger>
          ))}
        </div>
      </div>
    </section>
  );
};

