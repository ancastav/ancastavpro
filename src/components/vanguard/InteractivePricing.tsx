import React from 'react';
import { translations, Language } from "@/lib/translations";

interface InteractivePricingProps {
  lang: Language;
}

export const InteractivePricing: React.FC<InteractivePricingProps> = ({ lang }) => {
  const t = translations[lang].investment;

  const plans = [
    {
      name: t.plans.alpha,
      price: '249',
      description: t.descriptions.alpha,
      features: t.features.alpha,
      cta: t.cta.alpha,
      featured: false
    },
    {
      name: t.plans.sigma,
      price: '369',
      description: t.descriptions.sigma,
      features: t.features.sigma,
      cta: t.cta.sigma,
      featured: true,
      badge: t.popular
    },
    {
      name: t.plans.delta,
      price: '499',
      description: t.descriptions.delta,
      features: t.features.delta,
      cta: t.cta.delta,
      featured: false
    }
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-slate-50 relative overflow-hidden font-poppins">
      {/* Background glow effects (Subtle) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
            {t.title.split(' ').map((word, i) => (
              <React.Fragment key={i}>
                {i === 2 ? <span className="text-accent-blue">{word} </span> : <span>{word} </span>}
              </React.Fragment>
            ))}
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center font-poppins text-slate-900">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`relative p-8 rounded-3xl border transition-all duration-500 overflow-hidden group
                ${plan.featured 
                  ? 'bg-white border-accent-blue/40 shadow-2xl shadow-blue-500/10 py-12 scale-105 z-10' 
                  : 'bg-white border-slate-100 hover:border-slate-300'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.featured && (
                <div className="absolute top-6 right-6 px-3 py-1 bg-accent-blue text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                  {plan.badge}
                </div>
              )}
              
              <h3 className={`text-2xl font-black mb-2 uppercase tracking-tighter ${plan.featured ? 'text-accent-blue' : 'text-slate-900'}`}>
                {plan.name}
              </h3>
              
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-slate-400 text-lg font-mono">$</span>
                <span className="text-5xl font-black text-slate-900 tracking-tighter">{plan.price}</span>
                <span className="text-slate-400 text-sm ml-2 font-mono">USD</span>
              </div>
              
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                {plan.description}
              </p>
              
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                    <svg className="w-4 h-4 text-accent-blue shrink-0 font-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all duration-300
                  ${plan.featured 
                    ? 'bg-accent-blue text-white hover:bg-slate-900 hover:scale-[1.02] shadow-lg shadow-blue-500/20' 
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200 hover:scale-[1.02]'}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <p className="text-slate-400 text-xs font-mono uppercase tracking-widest">
                {t.footnote}
            </p>
        </div>
      </div>
    </section>
  );
};
