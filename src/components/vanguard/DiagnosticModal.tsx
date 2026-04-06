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

  useEffect(() => {
    // 1. Initial delay trigger
    const timer = setTimeout(() => {
      const shown = sessionStorage.getItem('ancastav_diagnostic_modal_seen');
      if (!shown) {
        setIsOpen(true);
        sessionStorage.setItem('ancastav_diagnostic_modal_seen', 'true');
      }
    }, 60000); // 1 minute

    // 2. Global event listener trigger
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-diagnostic', handleOpen);

    // 3. Exit intent trigger
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        const shown = sessionStorage.getItem('ancastav_diagnostic_modal_seen');
        if (!shown) {
          setIsOpen(true);
          sessionStorage.setItem('ancastav_diagnostic_modal_seen', 'true');
        }
      }
    };
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-diagnostic', handleOpen);
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
          <DiagnosticForm isModalMode={true} lang={lang} />
        </div>
      </div>
    </div>
  );
};
