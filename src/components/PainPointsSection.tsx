import React, { useState } from 'react';
import { PAIN_POINTS_DATA } from '../data/content';
import { ScrollReveal } from './ScrollReveal';
import {
  AlertTriangle,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  TrendingDown,
  Clock,
  Coins,
  Smartphone,
  Sparkles,
} from 'lucide-react';

export const PainPointsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'both' | 'solutions'>('both');

  const painIcons = [
    <TrendingDown className="w-5 h-5 text-rose-400" key="1" />,
    <Clock className="w-5 h-5 text-amber-400" key="2" />,
    <Coins className="w-5 h-5 text-rose-400" key="3" />,
    <Smartphone className="w-5 h-5 text-amber-400" key="4" />,
  ];

  return (
    <section id="pain-points" className="py-16 md:py-24 bg-[#0B0F19] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/50 border border-rose-800/50 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Реалії ринку веб-розробки</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 font-['Plus_Jakarta_Sans']">
              Чому 80% замовників шкодують про витрачений бюджет?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Більшість студій та фрілансерів продають просто гарну картинку або набір коду. Ми в Mintendo починаємо з бізнес-результату, захищаючи ваш спокій і гроші.
            </p>

            {/* Perspective switch buttons */}
            <div className="mt-6 flex flex-col sm:inline-flex sm:flex-row p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-inner w-full sm:w-auto gap-1">
              <button
                onClick={() => setActiveTab('both')}
                className={`px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all min-h-[40px] flex items-center justify-center ${
                  activeTab === 'both'
                    ? 'bg-slate-800 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Порівняння: Біль vs. Рішення
              </button>
              <button
                onClick={() => setActiveTab('solutions')}
                className={`px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all min-h-[40px] ${
                  activeTab === 'solutions'
                    ? 'bg-emerald-500 text-white shadow shadow-emerald-500/25'
                    : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Зелена зона Mintendo</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Pain Cards Grid - Broken down into fast individual cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {PAIN_POINTS_DATA.map((item, idx) => (
            <ScrollReveal key={item.id} direction="up" delay={idx * 0.05}>
              <div
                className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between h-full"
              >
                {/* Top part: Pain Point in Red/Dark tone */}
                {activeTab === 'both' && (
                  <div className="p-5 sm:p-7 border-b border-slate-800/80 bg-gradient-to-br from-rose-950/15 via-slate-900/40 to-transparent">
                    <div className="flex items-start gap-3.5 sm:gap-4 mb-3">
                      <div className="p-2 sm:p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 shrink-0">
                        {painIcons[idx]}
                      </div>
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-bold">
                          Типова проблема #{idx + 1}
                        </span>
                        <h3 className="text-base sm:text-xl font-bold text-white tracking-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 mb-3 leading-relaxed">
                      {item.clientPain}
                    </p>

                    <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-900/40 text-xs text-rose-300 flex items-start sm:items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5 sm:mt-0" />
                      <span><strong>Наслідок:</strong> {item.consequences}</span>
                    </div>
                  </div>
                )}

                {/* Bottom part: Mintendo Solution (Green / Emerald Zone) */}
                <div className="p-5 sm:p-7 bg-gradient-to-br from-emerald-950/30 via-slate-900/90 to-slate-900 border-t border-emerald-900/40 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Як це вирішено в Mintendo:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                      {item.mintendoSolution}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-emerald-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-800/60 px-3 py-1.5 rounded-full w-fit">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      {item.guaranteeBadge}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      100% зафіксовані гарантії
                    </span>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Banner */}
        <ScrollReveal direction="up" delay={0.08}>
          <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Вже маєте гіркий досвід розробки або готовий непрацюючий сайт?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Проведемо безкоштовний аудит помилок UX/CRO та швидкості вашого сайту за 24 години.
              </p>
            </div>
            <a
              href="#calculator"
              className="shrink-0 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-900/40 hover:bg-emerald-800/50 border border-emerald-700/50 transition-all flex items-center gap-2"
            >
              <span>Оцінити новий проєкт</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
