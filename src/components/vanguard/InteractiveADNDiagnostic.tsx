"use client";
import React, { useState, useEffect } from 'react';
import { translations, Language } from "@/lib/translations";
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [score, setScore] = useState(0);
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
    window.dispatchEvent(new CustomEvent('diagnostic-active', { detail: { active: false } }));
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

  if (screen === 'welcome') {
    return (
      <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-16 text-center animate-reveal">
        <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 text-accent-blue">
          <BarChart3 size={40} />
        </div>
        <h4 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
          {t.welcome.title}
        </h4>
        <p className="text-slate-500 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
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
      <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 animate-reveal">
        <div className="flex items-center justify-between mb-8">
          <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {question.module}
          </span>
          <span className="text-sm font-mono text-slate-400">
            {currentQuestionIndex + 1} / {allQuestions.length}
          </span>
        </div>
        
        <ProgressBar />

        <h4 className="text-2xl font-bold text-slate-900 mb-10 min-h-[3.5rem]">
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
                    ? 'border-accent-blue bg-blue-50 shadow-md transform scale-[1.02] z-10' 
                    : 'border-slate-100 bg-white hover:border-accent-blue/50 hover:bg-slate-50'
                  } ${isTransitioning && !isSelected ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'}`}
              >
                <span className={`font-medium transition-colors ${isSelected ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}`}>
                  {opt.text}
                </span>
                <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-300 
                  ${isSelected 
                    ? 'border-accent-blue bg-accent-blue shadow-inner' 
                    : 'border-slate-200 group-hover:border-accent-blue group-hover:bg-accent-blue/10'
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
      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/5 animate-reveal">
        <div className="bg-slate-900 p-12 text-center text-white relative">
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
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 to-transparent" />
        </div>

        <div className="p-12 md:p-16 text-center">
          <p className="text-xl text-slate-700 font-medium leading-relaxed mb-12 max-w-2xl mx-auto">
            "{level.message}"
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: <Zap size={24} />, label: "Performance", value: `${score}%` },
              { icon: <TrendingUp size={24} />, label: "Scalability", value: score > 50 ? "High" : "Mid" },
              { icon: <Award size={24} />, label: "Maturity", value: level.status }
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-accent-blue mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{stat.label}</div>
                <div className="text-slate-900 font-black">{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <a 
              href={`https://wa.me/18092329476?text=${encodeURIComponent(
                `Hola! Acabo de completar el Diagnóstico ADN Digital.\n\n*Resultado:* ${level.status}\n*Puntaje:* ${score}%\n\nMe gustaría conocer más sobre las soluciones estratégicas de Ancastav.`
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
              className="w-full py-4 border border-slate-200 text-slate-500 rounded-2xl font-bold uppercase tracking-widest text-center hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
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
