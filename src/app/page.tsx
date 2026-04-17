import React from 'react';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';
import Image from 'next/image';
import { translations, Language } from "@/lib/translations";
import { EliteHero } from "@/components/elite/EliteHero";
import { DigitalDNA } from "@/components/elite/DigitalDNA";
import { DigitalDNAModules } from "@/components/elite/DigitalDNAModules";
import { AgenticServices } from "@/components/elite/AgenticServices";
import { InteractivePricing } from "@/components/elite/InteractivePricing";
import { TechStack } from "@/components/elite/TechStack";
import { ProgressRoadmap } from "@/components/elite/ProgressRoadmap";
import { DiagnosticForm } from "@/components/elite/DiagnosticForm";
import { Navbar } from "@/components/elite/Navbar";
import { ClientOnlyInteractions } from "@/components/elite/ClientOnlyInteractions";
import { DiagnosticTrigger } from "@/components/elite/DiagnosticTrigger";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  const lang = acceptLanguage.startsWith('en') ? 'en' : ('es' as Language);
  const t = translations[lang].seo;

  return {
    title: t.title,
    description: t.description,
  };
}

export default async function Home() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  const lang = acceptLanguage.startsWith('en') ? 'en' : ('es' as Language);
  const t = JSON.parse(JSON.stringify(translations[lang]));

  // JSON-LD Structured Data
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ANCASTAV",
      "alternateName": "ANCASTAV Digital",
      "url": "https://ancastav.com",
      "logo": "https://ancastav.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-809-232-9476",
        "contactType": "customer service",
        "areaServed": "DO",
        "availableLanguage": ["Spanish", "English"]
      },
      "sameAs": [
        "https://www.facebook.com/ancastav",
        "https://www.instagram.com/ancastav",
        "https://www.linkedin.com/company/ancastav"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "image": "https://ancastav.com/AncastavLogo.svg",
      "@id": "https://ancastav.com",
      "url": "https://ancastav.com",
      "telephone": "+18092329476",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Puerto Plata",
        "addressLocality": "Puerto Plata",
        "addressRegion": "Puerto Plata",
        "postalCode": "57000",
        "addressCountry": "DO"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 19.7806,
        "longitude": -70.6871
      },
      "priceRange": "$$",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    }
  ];

  return (
    <main className="flex-1 bg-white overflow-x-hidden selection:bg-accent-blue selection:text-white font-inter">
      {/* JSON-LD for Google */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <ClientOnlyInteractions lang={lang} />
      
      {/* Navbar will handle its own state but data comes from server */}
      <Navbar lang={lang} t={t} />

      {/* Hero Experience - Optimized Server Component */}
      <EliteHero lang={lang} t={t.hero} />

      {/* Strategic Pillars */}
      <DigitalDNA lang={lang} t={t.dna} />

      {/* Diagnostic Modules Expansion */}
      <DigitalDNAModules lang={lang} t={t.dna_modules} />

      {/* Vertical Solutions */}
      <AgenticServices lang={lang} t={t.services} />

      {/* Trust & Stats Mid-Section */}
      <section className="py-32 px-6 border-y border-slate-100 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/5 to-transparent opacity-30" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-poppins font-black text-slate-900 mb-10 tracking-tighter uppercase transition-all duration-500 hover:tracking-tight">
            {t.stats.title.split(' ').map((word: string, i: number, arr: string[]) => (
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
      <InteractivePricing lang={lang} t={t.investment} />

      {/* Engineering Stack */}
      <TechStack lang={lang} />

      {/* Roadmap Process */}
      <ProgressRoadmap lang={lang} />

      {/* Final Conversion Section */}
      <section className="bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto py-24">
          <DiagnosticForm lang={lang} />
        </div>
      </section>
      
      {/* Footer Ecosystem */}
      <footer className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-4 mb-8">
              <h3 className="font-poppins font-black text-4xl text-accent-blue tracking-tighter flex flex-col gap-1 items-start">
                <span>ANCASTAV</span>
                <span className="text-[14px] text-slate-500 transition-colors uppercase tracking-widest font-medium">Digital Services</span>
              </h3>
            </div>
            <p className="text-slate-400 text-sm mb-10 leading-relaxed italic font-inter">
              {t.footer.bio}
            </p>
            <div className="flex gap-4">
               {[
                 { id: 'IG', url: 'https://www.instagram.com/ancastav/' },
                 { id: 'LI', url: 'https://www.linkedin.com/company/ancastav' },
                 { id: 'FB', url: 'https://www.facebook.com/ancastav' }
               ].map(social => (
                 <a 
                   key={social.id} 
                   href={social.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-[10px] text-slate-400 font-black hover:border-accent-blue hover:text-accent-blue transition-all cursor-pointer bg-white shadow-sm font-mono"
                 >
                   {social.id}
                 </a>
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
          <span>&copy; 2026 ANCASTAV Digital Services. {t.footer.rights}</span>
          <span className="text-accent-blue/40 animate-pulse">{t.footer.powered}</span>
        </div>
      </footer>
    </main>
  );
}
