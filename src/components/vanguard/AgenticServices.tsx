import React from 'react';
import { translations, Language } from "@/lib/translations";

interface AgenticServicesProps {
  lang: Language;
}

const serviceIcons = [
  { id: 'RE', icon: '🏘️' },
  { id: 'HC', icon: '🏥' },
  { id: 'EC', icon: '🛍️' },
  { id: 'RS', icon: '🍽️' },
  { id: 'AC', icon: '🎓' },
  { id: 'PS', icon: '💼' },
];

export const AgenticServices: React.FC<AgenticServicesProps> = ({ lang }) => {
  const t = translations[lang].services;
  
  return (
    <section id="services" className="py-32 px-6 bg-white relative overflow-hidden border-t border-slate-100 font-poppins">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl animate-reveal">
            <div className="text-accent-blue text-xs font-bold tracking-[0.3em] uppercase mb-4">{t.badge}</div>
            <h2 className="text-4xl md:text-7xl font-poppins text-slate-900 mb-6 uppercase tracking-tighter font-black">
              {t.title.split(' ')[0]} <span className="text-accent-blue">{t.title.split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-slate-500 text-lg">
              {t.description}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-slate-900 font-poppins">
          {t.items.map((service, index) => (
            <div 
              key={index}
              onClick={() => window.dispatchEvent(new CustomEvent('open-diagnostic'))}
              className="group relative p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:border-accent-blue/30 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700 cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute -top-12 -right-12 text-9xl opacity-[0.02] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-125 group-hover:-rotate-12 pointer-events-none grayscale group-hover:grayscale-0">
                {serviceIcons[index].icon}
              </div>
              
              <div className="flex items-center justify-between mb-8">
                <div className="px-3 py-1 rounded-full border border-accent-blue/20 bg-accent-blue/5 text-[9px] font-black text-accent-blue tracking-widest uppercase">
                  {service.tag}
                </div>
                <span className="text-3xl group-hover:scale-125 transition-transform duration-500">{serviceIcons[index].icon}</span>
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-accent-blue transition-colors uppercase tracking-tight">
                {service.title}
              </h3>
              
              <p className="text-slate-500 text-sm leading-relaxed mb-10 group-hover:text-slate-700 transition-colors">
                {service.description}
              </p>
              
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-black opacity-40 group-hover:opacity-100 transition-all text-accent-blue">
                <span>{t.explore}</span>
                <div className="w-8 h-[1px] bg-accent-blue transform scale-x-50 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
