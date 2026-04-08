"use client";
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { DiagnosticForm } from './DiagnosticForm';
import { Language } from "@/lib/translations";

interface DiagnosticModalProps {
  lang: Language;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [flow, setFlow] = useState<'contact' | 'diagnostic'>('contact');
  const isQuizActive = React.useRef(false);

  useEffect(() => {
    // Listener for quiz state
    const handleQuizState = (e: any) => {
      isQuizActive.current = e.detail.active;
      if (isQuizActive.current) {
        setIsOpen(false);
      }
    };
    window.addEventListener('diagnostic-active', handleQuizState);

    // 1. Global event listener triggers
    const handleOpenContact = () => {
      setFlow('contact');
      setIsOpen(true);
    };
    
    const handleOpenDiagnostic = () => {
      setFlow('diagnostic');
      setIsOpen(true);
    };

    window.addEventListener('open-contact', handleOpenContact);
    window.addEventListener('open-diagnostic', handleOpenDiagnostic);

    // 2. Exit intent trigger
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if mouse leaves toward the top (URL bar area) or loses focus completely
      if ((e.clientY <= 5 || !e.relatedTarget) && !isQuizActive.current) {
        const shown = sessionStorage.getItem('ancastav_diagnostic_modal_seen');
        if (!shown) {
          setFlow('contact'); // Default exit intent to contact-only
          setIsOpen(true);
          sessionStorage.setItem('ancastav_diagnostic_modal_seen', 'true');
        }
      }
    };
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('diagnostic-active', handleQuizState);
      window.removeEventListener('open-contact', handleOpenContact);
      window.removeEventListener('open-diagnostic', handleOpenDiagnostic);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-reveal">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white border border-slate-100 rounded-3xl shadow-2xl shadow-blue-500/10 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-all shadow-sm"
        >
          <X size={18} />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto custom-scrollbar p-0">
          <DiagnosticForm isModalMode={true} lang={lang} flow={flow} />
        </div>
      </div>
    </div>
  );
};
