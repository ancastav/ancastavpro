'use client';

import React from 'react';
import { Language } from "@/lib/translations";
import { DiagnosticTrigger } from './DiagnosticTrigger';

interface DigitalDNAProps {
  lang: Language;
  t: any;
}

const pillarIcons = [
  (
    <svg className="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  (
    <svg className="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2" />
    </svg>
  ),
  (
    <svg className="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  (
    <svg className="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  )
];

export const DigitalDNA: React.FC<DigitalDNAProps> = ({ lang, t }) => {
  
  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden border-t border-slate-100 font-poppins">
      {/* Decorative background grid (Light) */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 animate-reveal">
          <div className="inline-block px-4 py-1 mb-6 border border-accent-blue/30 bg-accent-blue/5 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-accent-blue">
            {t.badge}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
            {t.title.split(' ')[0]} <span className="text-accent-blue">{t.title.split(' ')[1]}</span> {t.title.split(' ')[2]}
          </h2>
          <p className="text-slate-500 text-lg max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.pillars.map((pillar: any, index: number) => (
            <DiagnosticTrigger 
              key={index}
              className="group p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-accent-blue/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 animate-reveal cursor-pointer"
            >
              <div className="mb-6 p-4 inline-block rounded-xl bg-white group-hover:bg-accent-blue/10 group-hover:scale-110 transition-all duration-500 shadow-sm">
                {pillarIcons[index]}
              </div>
              
              <div className="text-accent-blue/60 text-[10px] font-bold uppercase tracking-widest mb-2 font-mono">
                {pillar.label}
              </div>
              
              <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-accent-blue transition-colors uppercase tracking-tight">
                {pillar.title}
              </h3>
              
              <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-800 transition-colors">
                {pillar.description}
              </p>

              <div className="mt-8 overflow-hidden h-[1px] w-full bg-slate-200">
                <div className="h-full bg-accent-blue w-0 group-hover:w-full transition-all duration-700" />
              </div>
            </DiagnosticTrigger>
          ))}
        </div>
      </div>
    </section>
  );
};
