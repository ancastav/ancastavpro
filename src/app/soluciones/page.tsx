import React from 'react';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';
import { translations, Language } from "@/lib/translations";
import { Navbar } from "@/components/elite/Navbar";
import { ClientOnlyInteractions } from "@/components/elite/ClientOnlyInteractions";
import { ClientTrigger } from "@/components/elite/ClientTrigger";
import { SolutionsAccordion } from "@/components/elite/SolutionsAccordion";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  const lang = acceptLanguage.startsWith('en') ? 'en' : ('es' as Language);
  const t = translations[lang].seo;

  return {
    title: `${lang === 'es' ? 'Soluciones' : 'Solutions'} | ${t.title}`,
    description: translations[lang].solutions_page.hero.description,
  };
}

export default async function SolutionsPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  const lang = acceptLanguage.startsWith('en') ? 'en' : ('es' as Language);
  const t = translations[lang];
  const s = t.solutions_page;

  return (
    <main className="flex-1 bg-white overflow-x-hidden selection:bg-accent-blue selection:text-white font-inter">
      <ClientOnlyInteractions lang={lang} />
      <Navbar lang={lang} t={t} />

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 px-6 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-blue/5 to-transparent opacity-50" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-blue/10 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-block px-4 py-1 mb-8 border border-accent-blue/30 bg-accent-blue/5 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold text-accent-blue font-mono animate-in fade-in slide-in-from-bottom-4 duration-700">
            ● {s.hero.badge}
          </div>
          <h1 className="text-5xl md:text-8xl font-poppins font-black text-slate-900 mb-8 tracking-tighter uppercase animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {s.hero.title.split(' ')[0]} <span className="text-accent-blue italic">{s.hero.title.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed animate-in fade-in duration-1000 delay-300">
            {s.hero.description}
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6 relative bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <SolutionsAccordion items={s.items} t={t} />

          <div className="sticky top-40 space-y-10">
            <div className="bg-slate-900 rounded-[3rem] p-12 text-white overflow-hidden relative shadow-2xl shadow-blue-900/40">
              <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                <span className="text-[12rem] font-black italic">ANCASTAV</span>
              </div>
              
              <h2 className="text-4xl font-poppins font-black mb-6 tracking-tighter uppercase relative z-10">
                ¿Listo para el <br /><span className="text-accent-blue">Siguiente Nivel?</span>
              </h2>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed relative z-10">
                Tu infraestructura digital es el cimiento de tu éxito. Iniciemos hoy la construcción de tu identidad de élite.
              </p>
              
              <div className="space-y-4 relative z-10">
                <a 
                  href={`https://wa.me/18092329476?text=${encodeURIComponent(lang === 'es' ? 'Hola, me gustaría recibir asesoría sobre sus servicios.' : 'Hello, I would like to receive consulting about your services.')}`}
                  target="_blank"
                  className="w-full py-5 bg-accent-blue text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                >
                  <span>💬</span> {s.cta.whatsapp}
                </a>
                <ClientTrigger 
                  event="open-diagnostic"
                  className="w-full py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
                >
                  <span>📅</span> {s.cta.appointment}
                </ClientTrigger>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Elite Delivery Model - Centered Final Call */}
      <section className="py-24 px-6 bg-slate-50/50">
        <div className="max-w-2xl mx-auto text-center border border-slate-100 rounded-[3rem] p-12 bg-white shadow-sm">
           <span className="inline-block px-4 py-1.5 bg-accent-blue/10 text-accent-blue text-[10px] font-black uppercase tracking-widest rounded-full mb-8">
             Elite Delivery Model
           </span>
           <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium">
             {lang === 'es' 
               ? 'Nuestro proceso de implementación garantiza la entrega de sistemas robustos, seguros y optimizados para el mercado global.'
               : 'Our implementation process ensures the delivery of robust, secure systems optimized for the global market.'}
           </p>
           <div className="h-[1px] w-32 bg-slate-100 mx-auto mb-10" />
           <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-accent-blue shadow-inner text-xl">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Protocolos de Élite</span>
                <span className="text-[9px] font-mono text-slate-400">STATUS: NODE_READY</span>
              </div>
           </div>
        </div>
      </section>

      {/* Reusing Footer Logic */}
      <footer className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex flex-col gap-4 mb-8">
              <h3 className="font-poppins font-black text-4xl text-accent-blue tracking-tighter flex flex-col gap-1 items-start">
                <span>ANCASTAV</span>
                <span className="text-[14px] text-slate-500 uppercase tracking-widest font-medium">Digital Services</span>
              </h3>
            </Link>
            <p className="text-slate-400 text-sm mb-10 leading-relaxed italic">
              {t.footer.bio}
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-black uppercase text-accent-blue tracking-[0.3em] mb-4">{t.footer.sections.systems}</span>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors">{t.footer.links.nodes}</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors">{t.footer.links.assistant}</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors">{t.footer.links.security}</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors">{t.footer.links.cloud}</a>
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-black uppercase text-accent-blue tracking-[0.3em] mb-4">{t.footer.sections.company}</span>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors">{t.footer.links.vision}</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors">{t.footer.links.success}</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors">{t.footer.links.lab}</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors">{t.footer.links.contact}</a>
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-4">{t.footer.sections.legal}</span>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors">{t.footer.links.privacy}</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors">{t.footer.links.terms}</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-900 transition-colors">{t.footer.links.cookies}</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase font-black text-slate-300 tracking-[0.4em] font-mono">
          <span>&copy; 2026 ANCASTAV Digital Services. {t.footer.rights}</span>
          <span className="text-accent-blue/40 animate-pulse">{t.footer.powered}</span>
        </div>
      </footer>
    </main>
  );
}
