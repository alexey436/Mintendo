import React, { useState } from 'react';
import { CASES_DATA } from '../data/content';
import { CaseStudy } from '../types';
import { ScrollReveal } from './ScrollReveal';
import {
  TrendingUp,
  Award,
  Zap,
  ArrowUpRight,
  Sparkles,
  CheckCircle,
  ExternalLink,
  Clock,
  Layers,
} from 'lucide-react';

interface CasesSectionProps {
  onSelectCaseConsultation: (caseTitle: string) => void;
}

export const CasesSection: React.FC<CasesSectionProps> = ({
  onSelectCaseConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCaseModal, setActiveCaseModal] = useState<CaseStudy | null>(null);

  const categories = [
    { id: 'all', label: 'Усі кейси' },
    { id: 'corporate', label: 'Корпоративні & B2B' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'lms', label: 'LMS & Освіта' },
    { id: 'landing', label: 'Лендінги' },
  ];

  const filteredCases = selectedCategory === 'all'
    ? CASES_DATA
    : CASES_DATA.filter((c) => c.category === selectedCategory);

  return (
    <section id="cases" className="py-20 md:py-28 bg-[#0B0F19] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-700/50 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>Соціальний доказ & Кейси</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 font-['Plus_Jakarta_Sans']">
              Результати, підтверджені цифрами та конверсією
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Кожен проєкт Mintendo — це інвестиція з прогнозованою окупністю. Погляньте, як наші рішення трансформували бізнес наших клієнтів.
            </p>

            {/* Category Filter Pills - Mobile scrollable & Desktop wrapped */}
            <div className="flex overflow-x-auto sm:flex-wrap items-center justify-start sm:justify-center gap-2 mt-6 sm:mt-8 pb-2 sm:pb-0 px-2 sm:px-0 -mx-2 sm:mx-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredCases.map((item, idx) => (
            <ScrollReveal key={item.id} direction="up" delay={idx * 0.05}>
              <div
                className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-xl hover:border-slate-700 transition-all flex flex-col group h-full"
              >
              {/* Image Preview Container with Overlaid Highlight Metric */}
              <div className="relative h-60 sm:h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={`Кейс розробки сайту Mintendo: ${item.title} – ${item.categoryLabel}`}
                  width={640}
                  height={360}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 backdrop-blur-md text-slate-200 border border-slate-700/80 shadow">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono text-slate-300 bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    {item.duration}
                  </span>
                </div>

                {/* Hero Result Banner */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 flex items-center justify-between">
                  <div>
                    <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono tracking-tight">
                      {item.highlightMetric}
                    </span>
                    <div className="text-xs font-semibold text-slate-300">
                      {item.highlightLabel}
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveCaseModal(item)}
                    className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer"
                    title="Детальніше про кейс"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-semibold text-slate-400 mb-1">
                    Клієнт: {item.client}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight font-['Plus_Jakarta_Sans']">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {item.summary}
                  </p>

                  {/* 3 Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 mb-5">
                    {item.metrics.map((m, i) => (
                      <div key={i} className="text-center">
                        <div className="text-xs sm:text-sm font-bold text-white font-mono">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags and CTA */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectCaseConsultation(item.title)}
                    type="button"
                    className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Хочу такий самий результат</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  </button>
                </div>
              </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* Case Details Modal */}
      {activeCaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                  {activeCaseModal.categoryLabel}
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-white mt-1">
                  {activeCaseModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveCaseModal(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              {activeCaseModal.summary}
            </p>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 p-3 sm:p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
              {activeCaseModal.metrics.map((m, i) => (
                <div key={i}>
                  <div className="text-base sm:text-xl font-bold text-emerald-400 font-mono">
                    {m.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-bold text-white">Що було зроблено командою Mintendo:</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Глибинний аудит поведінки користувачів та усунення 7 вузьких місць у воронці</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Розробка унікального UI/UX в Figma з оптимізацією конверсії на мобільних пристроях</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Повна технічна SEO оптимізація та Core Web Vitals на рівні 99/100</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Інтеграція CRM, платіжних шлюзів та персональних сповіщень у робочий Telegram</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  const title = activeCaseModal.title;
                  setActiveCaseModal(null);
                  onSelectCaseConsultation(title);
                }}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-400 transition-colors"
              >
                Обговорити подібний проєкт
              </button>
              <button
                onClick={() => setActiveCaseModal(null)}
                className="px-5 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
