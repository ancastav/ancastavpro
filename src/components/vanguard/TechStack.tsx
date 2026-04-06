import React from 'react';
import { translations, Language } from "@/lib/translations";

interface TechStackProps {
  lang: Language;
}

export const TechStack: React.FC<TechStackProps> = ({ lang }) => {
  const t = translations[lang].techstack;

  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden font-poppins border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
            {t.title.split(' ').map((word, i) => (
              <React.Fragment key={i}>
                {i > 0 ? <span className="text-accent-blue">{word} </span> : <span>{word} </span>}
              </React.Fragment>
            ))}
          </h2>
          <div className="text-[10px] font-mono text-slate-400 border-b border-slate-100 pb-1">
            {t.status}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {t.technologies.map((tech, index) => (
            <div 
              key={tech.name}
              className="group p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 hover:border-accent-blue/20 transition-all duration-500 flex flex-col"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="text-3xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-125">
                {tech.icon}
              </div>
              <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-3 group-hover:text-accent-blue/60 font-mono">
                {tech.category}
              </div>
              <h3 className="text-slate-900 font-bold text-xl mb-3 tracking-tight group-hover:text-accent-blue transition-colors">
                {tech.name}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
