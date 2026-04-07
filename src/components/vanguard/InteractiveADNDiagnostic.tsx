"use client";
import React, { useState, useEffect } from 'react';
import { translations, Language } from "@/lib/translations";
import { getTrackingCode } from '@/lib/utils';
import { 
  CheckCircle2, 
  ArrowRight, 
  Loader2, 
  Zap, 
  Shield, 
  BarChart3, 
  MessageCircle, 
  Trophy, 
  TrendingUp, 
  RotateCcw,
  Award,
  Target
} from 'lucide-react';

interface InteractiveDiagnosticProps {
  lang: Language;
}

type Screen = 'welcome' | 'quiz' | 'analysis' | 'results';

export const InteractiveADNDiagnostic: React.FC<InteractiveDiagnosticProps> = ({ lang }) => {
  const t = translations[lang].dna_modules.quiz;
  const [screen, setScreen] = useState<Screen>('welcome');
  const [mounted, setMounted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isReporting, setIsReporting] = useState(false);
  const [reportStatus, setReportStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [trackingCode, setTrackingCode] = useState<string>('');
  const [leadData, setLeadData] = useState<any>(null);
  const analysisIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const defaultOptions = translations[lang].dna_modules.quiz.options;
  const allQuestions = translations[lang].dna_modules.quiz.steps.flatMap((step: any) => 
    step.questions.map((q: any) => ({ 
      ...q, 
      module: step.module,
      options: q.options || defaultOptions
    }))
  );

  const startQuiz = () => {
    setScreen('quiz');
    window.dispatchEvent(new CustomEvent('diagnostic-active', { detail: { active: true } }));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleStartWithLead = (e: any) => {
      setLeadData(e.detail);
      startQuiz();
      // Scroll to this component
      const el = document.getElementById('diagnostic-lab');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    window.addEventListener('start-diagnostic-with-lead', handleStartWithLead);
    return () => window.removeEventListener('start-diagnostic-with-lead', handleStartWithLead);
  }, []);

  const handleAnswer = (value: number, idx: number) => {
    if (isTransitioning) return;
    
    setSelectedOptionIdx(idx);
    setIsTransitioning(true);

    // Dynamic delay for visual feedback (500ms)
    setTimeout(() => {
      const newAnswers = [...answers, value];
      setAnswers(newAnswers);
      setSelectedOptionIdx(null);
      setIsTransitioning(false);

      if (currentQuestionIndex < allQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        const code = getTrackingCode();
        setTrackingCode(code);
        calculateAndAnalyze(newAnswers);
      }
    }, 500);
  };

  const calculateAndAnalyze = (finalAnswers: number[]) => {
    const total = finalAnswers.reduce((a, b) => a + b, 0);
    // Use the max possible value from the options (assumed to be the first one in translations)
    const maxVal = defaultOptions[0].value || 100;
    const calculatedScore = Math.round((total / (finalAnswers.length * maxVal)) * 100);
    setScore(calculatedScore);
    setScreen('analysis');
  };

  useEffect(() => {
    if (screen === 'analysis') {
      analysisIntervalRef.current = setInterval(() => {
        setAnalysisStep(prev => {
          if (prev < t.analysis.steps.length - 1) return prev + 1;
          
          if (analysisIntervalRef.current) {
            clearInterval(analysisIntervalRef.current);
            analysisIntervalRef.current = null;
          }
          
          setTimeout(() => setScreen('results'), 1000);
          return prev;
        });
      }, 1200);
    }

    return () => {
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
        analysisIntervalRef.current = null;
      }
    };
  }, [screen, t.analysis.steps.length]);

  const restart = () => {
    setScreen('welcome');
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setAnalysisStep(0);
    setScore(0);
    setReportStatus('idle');
    window.dispatchEvent(new CustomEvent('diagnostic-active', { detail: { active: false } }));
  };

  const sendReport = async (codeToUse: string) => {
    if (reportStatus !== 'idle') return;
    
    setReportStatus('sending');
    try {
      const response = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score,
          level: getResultLevel(),
          answers,
          lang,
          trackingCode: codeToUse,
          leadData
        })
      });

      if (response.ok) {
        setReportStatus('success');
      } else {
        setReportStatus('error');
      }
    } catch (error) {
      setReportStatus('error');
    }
  };

  useEffect(() => {
    if (screen === 'results' && reportStatus === 'idle' && trackingCode) {
      sendReport(trackingCode);
    }
  }, [screen, trackingCode]);

  const getRecommendedPlan = () => {
    const pt = translations[lang].investment;
    if (score <= 40) return { name: pt.plans.alpha, desc: pt.descriptions.alpha, icon: <Shield className="text-blue-500" /> };
    if (score <= 80) return { name: pt.plans.sigma, desc: pt.descriptions.sigma, icon: <Zap className="text-amber-500" />, featured: true };
    return { name: pt.plans.delta, desc: pt.descriptions.delta, icon: <Trophy className="text-accent-blue" /> };
  };

  const getResultLevel = () => {
    if (score <= 40) return t.results.levels.low;
    if (score <= 80) return t.results.levels.medium;
    return t.results.levels.high;
  };

  const ProgressBar = () => (
    <div className="w-full h-1 bg-slate-100 rounded-full mb-8 overflow-hidden">
      <div 
        className="h-full bg-accent-blue transition-all duration-500 ease-out"
        style={{ width: `${((currentQuestionIndex + 1) / allQuestions.length) * 100}%` }}
      />
    </div>
  );

  if (!mounted) {
    return (
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-16 text-center animate-pulse min-h-[400px] flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-slate-800 rounded-2xl mx-auto mb-8" />
        <div className="h-8 w-64 bg-slate-800 rounded-lg mx-auto mb-4" />
        <div className="h-4 w-48 bg-slate-800 rounded-lg mx-auto" />
      </div>
    );
  }

  if (screen === 'welcome') {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-16 text-center animate-reveal relative overflow-hidden group">
        {/* Glow effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent-blue/10 blur-[100px] group-hover:bg-accent-blue/20 transition-all duration-700" />
        
        <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 text-accent-blue border border-blue-500/20">
          <BarChart3 size={40} />
        </div>
        <h4 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">
          {t.welcome.title}
        </h4>
        <p className="text-slate-400 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
          {t.welcome.subtitle}
        </p>
        <button 
          onClick={startQuiz}
          className="group relative inline-flex items-center gap-3 px-10 py-5 bg-accent-blue text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/25 active:scale-95"
        >
          {t.welcome.cta}
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
        </button>
      </div>
    );
  }

  if (screen === 'quiz') {
    const question = allQuestions[currentQuestionIndex];
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/50 animate-reveal">
        <div className="flex items-center justify-between mb-8">
          <span className="px-3 py-1 bg-slate-800 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-700/50">
            {question.module}
          </span>
          <span className="text-sm font-mono text-slate-500">
            {currentQuestionIndex + 1} / {allQuestions.length}
          </span>
        </div>
        
        <ProgressBar />

        <h4 className="text-2xl font-bold text-white mb-10 min-h-[3.5rem]">
          {question.text}
        </h4>

        <div key={currentQuestionIndex} className="grid grid-cols-1 gap-4 animate-reveal">
          {question.options.map((opt: any, idx: number) => {
            const isSelected = selectedOptionIdx === idx;
            return (
              <button
                key={idx}
                disabled={isTransitioning}
                onClick={() => handleAnswer(opt.value, idx)}
                className={`group flex items-center justify-between p-5 border rounded-2xl text-left transition-all duration-300 
                  ${isSelected 
                    ? 'border-accent-blue bg-accent-blue/10 shadow-lg transform scale-[1.02] z-10' 
                    : 'border-slate-800 bg-slate-800/20 hover:border-accent-blue/50 hover:bg-slate-800/40'
                  } ${isTransitioning && !isSelected ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'}`}
              >
                <span className={`font-medium transition-colors ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                  {opt.text}
                </span>
                <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-300 
                  ${isSelected 
                    ? 'border-accent-blue bg-accent-blue shadow-inner' 
                    : 'border-slate-700 group-hover:border-accent-blue group-hover:bg-accent-blue/20'
                  }`}
                >
                  <CheckCircle2 
                    size={14} 
                    className={`text-white transition-all duration-300 ${isSelected ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-40'}`} 
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (screen === 'analysis') {
    return (
      <div className="bg-slate-900 rounded-3xl p-16 text-center text-white min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden animate-reveal">
        <div className="absolute inset-0 bg-blue-600/10 animate-pulse" />
        <Loader2 className="animate-spin text-accent-blue mb-8" size={64} />
        <h4 className="text-3xl font-black mb-4 tracking-tighter uppercase">
          {t.analysis.title}
        </h4>
        <div className="text-slate-400 font-mono text-sm tracking-widest h-6">
          {t.analysis.steps[analysisStep]}...
        </div>
        
        <div className="mt-12 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent-blue transition-all duration-1000 ease-linear"
            style={{ width: `${(analysisStep / (t.analysis.steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    );
  }

  if (screen === 'results') {
    const level = getResultLevel();
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-black/80 animate-reveal">
        <div className="bg-black p-12 text-center text-white relative border-b border-slate-800">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-white/10 rounded-full text-accent-blue text-xs font-bold uppercase tracking-widest mb-6">
              <Trophy size={14} />
              {level.status}
            </div>
            <div className="text-6xl font-black mb-2 tracking-tighter">
              {score}%
            </div>
            <p className="text-slate-400 font-medium uppercase tracking-widest text-sm">
              {t.results.score_label}
            </p>
            {trackingCode && (
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-md">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">ID SEGUIMIENTO:</span>
                <span className="text-[10px] font-mono text-accent-blue font-bold tracking-tighter uppercase">{trackingCode}</span>
              </div>
            )}
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 to-transparent" />
        </div>

        <div className="p-12 md:p-16 text-center">
          <p className="text-xl text-slate-300 font-medium leading-relaxed mb-12 max-w-2xl mx-auto">
            "{level.message}"
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: <Zap size={24} />, label: "Performance", value: `${score}%` },
              { icon: <TrendingUp size={24} />, label: "Scalability", value: score > 50 ? "High" : "Mid" },
              { icon: <Award size={24} />, label: "Maturity", value: level.status }
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-slate-800/40 rounded-2xl border border-slate-800 hover:border-accent-blue/30 transition-colors">
                <div className="text-accent-blue mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{stat.label}</div>
                <div className="text-white font-black">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Recommended Plan Section */}
          <div className="mb-12 p-8 bg-blue-500/5 border border-blue-500/10 rounded-3xl text-left animate-reveal">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center shadow-sm border border-slate-700">
                <Target className="text-accent-blue" size={20} />
              </div>
              <div>
                <h5 className="text-xs font-black text-accent-blue uppercase tracking-widest">{t.results.recommendation_title}</h5>
                <p className="text-white font-bold text-lg">{getRecommendedPlan().name}</p>
              </div>
            </div>
            
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-blue-500/10 shadow-sm mb-4">
              <div className="flex items-start gap-4">
                <div className="mt-1">{getRecommendedPlan().icon}</div>
                <div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {getRecommendedPlan().desc}
                  </p>
                  <div className="inline-flex items-center gap-2 text-[10px] font-black text-accent-blue uppercase tracking-widest px-3 py-1 bg-accent-blue/10 rounded-full border border-accent-blue/20">
                    <CheckCircle2 size={12} />
                    {t.results.recommendation_why}
                  </div>
                </div>
              </div>
            </div>

            {/* API Status Indicator */}
            <div className="flex items-center gap-2 px-1">
              {reportStatus === 'sending' && (
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  <Loader2 size={12} className="animate-spin" />
                  {t.results.sending_report}
                </div>
              )}
              {reportStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                  <CheckCircle2 size={12} />
                  {t.results.report_sent}
                </div>
              )}
              {reportStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest">
                   {t.results.report_error}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <a 
              href={`https://wa.me/18092329476?text=${encodeURIComponent(
                `📊 *REPORTE DE DIAGNÓSTICO ADN DIGITAL*\n\n` +
                `*Cliente:* ${leadData?.full_name || 'Nuevo Prospecto'}\n` +
                `*Nivel:* ${level.status}\n` +
                `*Puntaje:* ${score}%\n` +
                `*Plan Sugerido:* ${getRecommendedPlan().name}\n\n` +
                `Hola! Soy ${leadData?.full_name || ''}. He completado mi diagnóstico y me gustaría conocer más sobre las soluciones estratégicas de Ancastav.\n\n` +
                `*ID Seguimiento:* ${trackingCode}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-black transition-all duration-300 shadow-xl shadow-slate-900/10 active:scale-95"
            >
              <MessageCircle size={20} className="fill-white" />
              {t.results.cta}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <button 
              onClick={restart}
              className="w-full py-4 border border-slate-800 text-slate-500 rounded-2xl font-bold uppercase tracking-widest text-center hover:bg-slate-800 hover:text-slate-300 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} />
              {/* @ts-ignore */}
              {translations[lang].dna_modules.quiz.results.levels.restart || "Reiniciar"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
