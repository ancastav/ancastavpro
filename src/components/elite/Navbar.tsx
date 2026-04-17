'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Language } from "@/lib/translations";

interface NavbarProps {
  lang: Language;
  t: any;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, t }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 px-6 md:px-12 py-4 flex items-center justify-between border-b transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md border-slate-100 shadow-sm py-3' : 'bg-transparent border-transparent py-5'
    }`}>
      <div className="flex items-center gap-3 group">
          <Image 
            src="/AncastavLogo.svg" 
            alt="ANCASTAV" 
            width={32} 
            height={32} 
            className="group-hover:rotate-12 transition-transform duration-500"
            priority
          />
        <span className="font-poppins text-3xl tracking-tighter text-accent-blue cursor-pointer font-black flex items-baseline gap-1">
          ANCASTAV
        </span>
      </div>
      
      <div className="hidden lg:flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-black">
        <a href="#solutions" className="text-slate-400 hover:text-accent-blue transition-all duration-300">{t.nav.solutions}</a>
        <a href="#pricing" className="text-slate-400 hover:text-accent-blue transition-all duration-300">{t.nav.pricing}</a>
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-diagnostic'))}
          className="text-slate-400 hover:text-accent-blue transition-all duration-300 font-bold border-b border-accent-blue/40 pb-1"
        >
          {t.nav.diagnostic}
        </button>
        
        <div className="flex items-center gap-4 ml-4">
          {/* Language Toggle Button */}
          <button 
            className="px-3 py-1.5 border border-slate-200 rounded-lg flex items-center gap-2 bg-white text-slate-400 cursor-default"
          >
            <span className="text-[14px]">🌐</span>
            <span className="font-mono text-[10px] tracking-widest">{lang.toUpperCase()}</span>
          </button>

          <Link href="/login" className="px-6 py-2 bg-slate-50 border border-slate-200 hover:border-accent-blue hover:bg-accent-blue/5 transition-all duration-500 rounded-full text-slate-900 backdrop-blur-md shadow-sm">
            {t.nav.portal}
          </Link>
        </div>
      </div>
    </nav>
  );
};
