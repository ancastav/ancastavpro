'use client';

import React, { useState } from 'react';
import { ChevronDown, Globe, Laptop, Palette, Briefcase, Scale } from 'lucide-react';
import { ClientTrigger } from './ClientTrigger';

interface SolutionItem {
  title: string;
  description: string;
  icon: string;
}

interface SolutionsAccordionProps {
  items: SolutionItem[];
  t: {
    nav: {
      solutions: string;
      [key: string]: string;
    };
    [key: string]: any;
  };
}

const iconMap: { [key: string]: React.ReactNode } = {
  '🌐': <Globe className="w-6 h-6" />,
  '💻': <Laptop className="w-6 h-6" />,
  '🎨': <Palette className="w-6 h-6" />,
  '💼': <Briefcase className="w-6 h-6" />,
  '⚖️': <Scale className="w-6 h-6" />
};

export const SolutionsAccordion: React.FC<SolutionsAccordionProps> = ({ items, t }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2 w-full">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index}
            className={`group rounded-2xl border transition-all duration-500 overflow-hidden ${
              isOpen 
                ? 'border-accent-blue/30 bg-white shadow-lg shadow-blue-500/5' 
                : 'border-slate-100 bg-slate-50/30 hover:border-slate-200'
            }`}
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 ${
                  isOpen ? 'bg-accent-blue text-white scale-105' : 'bg-white border border-slate-100 text-slate-400 group-hover:text-accent-blue'
                }`}>
                  {iconMap[item.icon] || item.icon}
                </div>
                <h3 className={`text-sm font-poppins font-black uppercase tracking-widest transition-colors duration-300 ${
                  isOpen ? 'text-accent-blue' : 'text-slate-900 group-hover:text-accent-blue'
                }`}>
                  {item.title}
                </h3>
              </div>
              <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-accent-blue' : 'text-slate-300'}`}>
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>
            
            <div 
              className={`transition-all duration-500 ease-in-out ${
                isOpen ? 'max-h-[500px] opacity-100 pb-8 px-6' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pl-18 pr-4">
                <p className="text-slate-500 text-lg leading-relaxed mb-8 border-l-2 border-accent-blue/10 pl-6">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-4 pl-6">
                   <ClientTrigger 
                      event="open-contact"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-accent-blue text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] cursor-pointer hover:bg-slate-900 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                      <span>⚡</span> {t.nav.solutions}
                    </ClientTrigger>
                    
                   <div className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-accent-blue transition-all cursor-default">
                    <div className="w-8 h-[1px] bg-slate-200" />
                    <span>Protocolo Alpha-9</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
