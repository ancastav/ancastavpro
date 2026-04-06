import React from 'react';
import { translations, Language } from "@/lib/translations";

interface ProgressRoadmapProps {
  lang: Language;
}

export const ProgressRoadmap: React.FC<ProgressRoadmapProps> = ({ lang }) => {
  const t = translations[lang].roadmap;

  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-poppins font-black text-slate-900 mb-16 text-center uppercase tracking-tighter">
          {t.title.split(' ').map((word, i, arr) => (
            <React.Fragment key={i}>
              {i === arr.length - 1 ? <span className="text-accent-blue">{word} </span> : <span>{word} </span>}
            </React.Fragment>
          ))}
        </h2>
        
        <div className="flex flex-col gap-12 relative before:absolute before:left-4 md:before:left-1/2 before:w-[1px] before:h-full before:bg-slate-100">
          {t.steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Animated Node */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                <div className={`w-10 h-10 rounded-full border-4 border-white flex items-center justify-center glass-vanguard shadow-md ${step.originalStatus === 'COMPLETE' ? 'bg-accent-blue text-white' : step.originalStatus === 'IN_PROGRESS' ? 'bg-white text-accent-blue border-accent-blue animate-pulse' : 'bg-white text-slate-300'}`}>
                  {step.originalStatus === 'COMPLETE' ? '✓' : step.id}
                </div>
              </div>
              
              <div className={`w-full md:w-1/2 p-8 glass-vanguard rounded-xl border-slate-100 shadow-sm animate-reveal ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                <div className={`flex items-center gap-4 mb-3 ${index % 2 === 0 ? 'justify-start md:justify-end' : 'justify-start'}`}>
                  <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase font-mono">{step.date}</span>
                  <span className={`px-2 py-[2px] text-[8px] font-bold rounded-full ${step.originalStatus === 'COMPLETE' ? 'bg-blue-50 text-accent-blue' : step.originalStatus === 'IN_PROGRESS' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                    {step.originalStatus === 'COMPLETE' ? t.status.complete : step.originalStatus === 'IN_PROGRESS' ? t.status.progress : t.status.queued}
                  </span>
                </div>
                <h3 className="text-xl font-poppins font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
