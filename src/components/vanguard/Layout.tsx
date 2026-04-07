'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { WhatsAppFloat } from './WhatsAppFloat';
import { DiagnosticModal } from './DiagnosticModal';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  return (
    <div className="flex-1 bg-white overflow-x-hidden selection:bg-accent-blue selection:text-white font-inter flex flex-col min-h-screen">
      <DiagnosticModal lang={language} />
      <WhatsAppFloat />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-4 flex items-center justify-between bg-white border-b border-slate-100 shadow-sm transition-all duration-300">
        <Link href="/" className="flex items-center gap-3 group outline-none">
          <Image 
            src="/AncastavLogo.svg" 
            alt="ANCASTAV" 
            width={32} 
            height={32} 
            className="w-8 h-8 object-contain"
            priority
          />
          <span className="font-poppins text-3xl tracking-tighter text-accent-blue font-black flex items-baseline gap-1">
            ancastav
          </span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-black">
          <Link href="/#services" className="text-slate-400 hover:text-accent-blue transition-all duration-300">{t.nav.solutions}</Link>
          <Link href="/#pricing" className="text-slate-400 hover:text-accent-blue transition-all duration-300">{t.nav.pricing}</Link>
          <Link href="/#diagnostic-lab" className="text-slate-400 hover:text-accent-blue transition-all duration-300 font-bold border-b border-accent-blue/40 pb-1">{t.nav.diagnostic}</Link>
          <Link href="/admin/dashboard" className="text-slate-400 hover:text-accent-blue transition-all duration-300">{t.nav.blog}</Link>
          
          <div className="flex items-center gap-4 ml-4">
            <button 
              onClick={toggleLanguage}
              className="px-3 py-1.5 border border-slate-200 rounded-lg hover:border-accent-blue hover:text-accent-blue transition-all duration-300 flex items-center gap-2 bg-white text-slate-400 outline-none"
            >
              <span className="text-[14px]">🌐</span>
              <span className="font-mono text-[9px] tracking-widest">{language.toUpperCase()}</span>
            </button>

            <Link href="/login" className="px-6 py-2 bg-slate-50 border border-slate-200 hover:border-accent-blue hover:bg-accent-blue/5 transition-all duration-500 rounded-full text-slate-900 backdrop-blur-md shadow-sm">
              {t.nav.portal}
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Global Footer (Simplified for blog pages, but could be shared) */}
      <footer className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-4 mb-8">
              <h3 className="font-poppins font-black text-4xl text-accent-blue tracking-tighter flex flex-col gap-1 items-start">
                <span>ancastav</span>
                <span className="text-[14px] text-slate-500 transition-colors uppercase tracking-widest font-medium">Digital Services</span>
              </h3>
            </div>
            <p className="text-slate-400 text-sm mb-10 leading-relaxed italic font-inter">
              {t.footer.bio}
            </p>
          </div>
          
          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-black uppercase text-accent-blue tracking-[0.3em] mb-4 font-mono">{t.footer.sections.systems}</span>
            <Link href="/#services" className="text-sm text-slate-400 hover:text-slate-900 font-inter">{t.footer.links.nodes}</Link>
            <Link href="/#services" className="text-sm text-slate-400 hover:text-slate-900 font-inter">{t.footer.links.assistant}</Link>
          </div>

          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-black uppercase text-accent-blue tracking-[0.3em] mb-4 font-mono">{t.footer.sections.company}</span>
            <Link href="/#vision" className="text-sm text-slate-400 hover:text-slate-900 font-inter">{t.footer.links.vision}</Link>
            <Link href="/#diagnostic-lab" className="text-sm text-slate-400 hover:text-slate-900 font-inter">{t.footer.links.lab}</Link>
          </div>

          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-4 font-mono">{t.footer.sections.legal}</span>
            <Link href="/privacy" className="text-sm text-slate-400 hover:text-slate-900 font-inter">{t.footer.links.privacy}</Link>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase font-black text-slate-300 tracking-[0.4em] font-mono">
          <span>&copy; 2026 ancastav Digital Services. {t.footer.rights}</span>
          <span className="text-accent-blue/40 animate-pulse">{t.footer.powered}</span>
        </div>
      </footer>
    </div>
  );
};
