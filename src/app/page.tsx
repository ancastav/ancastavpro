'use client';

import React, { useState, useEffect } from 'react';
import { VanguardHero } from "@/components/vanguard/VanguardHero";
import { DigitalDNA } from "@/components/vanguard/DigitalDNA";
import { DigitalDNAModules } from "@/components/vanguard/DigitalDNAModules";
import { AgenticServices } from "@/components/vanguard/AgenticServices";
import { InteractivePricing } from "@/components/vanguard/InteractivePricing";
import { TechStack } from "@/components/vanguard/TechStack";
import { ProgressRoadmap } from "@/components/vanguard/ProgressRoadmap";
import { WhatsAppFloat } from "@/components/vanguard/WhatsAppFloat";
import { DiagnosticModal } from "@/components/vanguard/DiagnosticModal";
import { DiagnosticForm } from "@/components/vanguard/DiagnosticForm";
import { translations, Language } from "@/lib/translations";
import Link from 'next/link';

export default function Home() {
  const [lang, setLang] = useState<Language>('es');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('ancastav_lang') as Language;
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setLang(savedLang);
    }
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'es' ? 'en' : 'es';
    setLang(newLang);
    localStorage.setItem('ancastav_lang', newLang);
  };

  const t = translations[lang];
  return (
    <main className="flex-1 bg-white overflow-x-hidden selection:bg-accent-blue selection:text-white font-inter">
      <DiagnosticModal lang={lang} />
      <WhatsAppFloat />
      
      {/* Navigation Overlay */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-4 flex items-center justify-between bg-white border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-accent-blue rounded-sm rotate-45 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          <span className="font-poppins text-3xl tracking-tighter text-accent-blue cursor-pointer font-black flex items-baseline gap-1">
            ancastav
          </span>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-black">
          <a href="#services" className="text-slate-400 hover:text-accent-blue transition-all duration-300">{t.nav.solutions}</a>
          <a href="#pricing" className="text-slate-400 hover:text-accent-blue transition-all duration-300">{t.nav.pricing}</a>
          <a href="#diagnostic-lab" className="text-slate-400 hover:text-accent-blue transition-all duration-300 font-bold border-b border-accent-blue/40 pb-1">{t.nav.diagnostic}</a>
          
          <div className="flex items-center gap-4 ml-4">
            {/* Language Toggle Button */}
            <button 
              onClick={toggleLang}
              className="px-3 py-1.5 border border-slate-200 rounded-lg hover:border-accent-blue hover:text-accent-blue transition-all duration-300 flex items-center gap-2 bg-white text-slate-400"
            >
              <span className="text-[14px]">🌐</span>
              <span className="font-mono text-[9px] tracking-widest">{lang.toUpperCase()}</span>
            </button>

            <Link href="/login" className="px-6 py-2 bg-slate-50 border border-slate-200 hover:border-accent-blue hover:bg-accent-blue/5 transition-all duration-500 rounded-full text-slate-900 backdrop-blur-md shadow-sm">
              {t.nav.portal}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Experience */}
      <VanguardHero lang={lang} />

      {/* Strategic Pillars */}
      <DigitalDNA lang={lang} />

      {/* Diagnostic Modules Expansion */}
      <DigitalDNAModules lang={lang} />

      {/* Vertical Solutions */}
      <AgenticServices lang={lang} />

      {/* Trust & Stats Mid-Section */}
      <section className="py-32 px-6 border-y border-slate-100 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/5 to-transparent opacity-30" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-poppins font-black text-slate-900 mb-10 tracking-tighter uppercase transition-all duration-500 hover:tracking-tight">
            {t.stats.title.split(' ').map((word, i, arr) => (
              <React.Fragment key={i}>
                {i >= arr.length - 2 ? <span className="text-accent-blue italic">{word} </span> : <span>{word} </span>}
              </React.Fragment>
            ))}
          </h2>
          <p className="text-xl text-slate-500 mb-16 leading-relaxed max-w-2xl mx-auto">
            {t.stats.description}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: t.stats.uptime, value: '99.9%' },
              { label: t.stats.conversion, value: '+45%' },
              { label: t.stats.latency, value: '<40ms' },
              { label: t.stats.growth, value: '3X' },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col items-center group">
                <span className="text-accent-blue font-black font-poppins text-4xl mb-2 group-hover:scale-110 transition-transform duration-500">{stat.value}</span>
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider group-hover:text-slate-600 transition-colors font-mono">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Plans */}
      <InteractivePricing lang={lang} />

      {/* Engineering Stack */}
      <TechStack lang={lang} />

      {/* Roadmap Process */}
      <ProgressRoadmap lang={lang} />

      {/* Final Conversion Section */}
      <section id="diagnostico" className="bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto py-24">
          <DiagnosticForm lang={lang} />
        </div>
      </section>
      
      {/* Footer Ecosystem */}
      <footer className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="lg:col-span-1">
            <h3 className="font-poppins font-black text-4xl text-accent-blue mb-8 tracking-tighter flex flex-col gap-1 items-start">
              <span>ancastav</span>
              <span className="text-[14px] text-slate-500 transition-colors uppercase tracking-widest font-medium">Digital Services</span>
            </h3>
            <p className="text-slate-400 text-sm mb-10 leading-relaxed italic font-inter">
              {t.footer.bio}
            </p>
            <div className="flex gap-4">
               {['TW', 'LI', 'IG'].map(social => (
                 <div key={social} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-[10px] text-slate-400 font-black hover:border-accent-blue hover:text-accent-blue transition-all cursor-pointer bg-white shadow-sm font-mono">
                   {social}
                 </div>
               ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-black uppercase text-accent-blue tracking-[0.3em] mb-4 font-mono">{t.footer.sections.systems}</span>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors font-inter">{t.footer.links.nodes}</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors font-inter">{t.footer.links.assistant}</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors font-inter">{t.footer.links.security}</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors font-inter">{t.footer.links.cloud}</a>
          </div>

          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-black uppercase text-accent-blue tracking-[0.3em] mb-4 font-mono">{t.footer.sections.company}</span>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors font-inter">{t.footer.links.vision}</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors font-inter">{t.footer.links.success}</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors font-inter">{t.footer.links.lab}</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors font-inter">{t.footer.links.contact}</a>
          </div>

          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-4 font-mono">{t.footer.sections.legal}</span>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors font-inter">{t.footer.links.privacy}</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors font-inter">{t.footer.links.terms}</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors font-inter">{t.footer.links.cookies}</a>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase font-black text-slate-300 tracking-[0.4em] font-mono">
          <span>&copy; 2026 ancastav Digital Services. {t.footer.rights}</span>
          <span className="text-accent-blue/40 animate-pulse">{t.footer.powered}</span>
        </div>
      </footer>
    </main>
  );
}
