import React, { useState } from 'react';
import { FAQ_ITEMS_DATA } from '../data/content';
import { ScrollReveal } from './ScrollReveal';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';

interface FaqSectionProps {
  onOpenConsultation: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenConsultation }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#0B0F19] relative border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05}>
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Часті запитання (FAQ)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 font-['Plus_Jakarta_Sans']">
              Чесні відповіді на важливі питання
            </h2>
            <p className="text-slate-300 text-sm sm:text-lg">
              Жодних розмитих формулювань. Ми за повну прозорість та чіткі умови ще до старту робіт.
            </p>
          </div>
        </ScrollReveal>

        {/* Accordions */}
        <div className="space-y-3 sm:space-y-4">
          {FAQ_ITEMS_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal key={idx} direction="up" delay={idx * 0.03}>
                <div
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? 'border-emerald-500/50 bg-slate-900/90 shadow-lg shadow-emerald-950/20'
                      : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-lg font-bold text-white font-['Plus_Jakarta_Sans'] leading-snug">
                      {item.question}
                    </span>
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'bg-emerald-500/20 text-emerald-400 rotate-180'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80">
                      <p>{item.answer}</p>
                      <div className="mt-3 text-[11px] font-mono text-emerald-400">
                        Категорія: {item.category}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <ScrollReveal direction="up" delay={0.06}>
          <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  Залишилося специфічне запитання щодо вашого проєкту?
                </h4>
                <p className="text-xs text-slate-400">
                  Тімлід Mintendo відповість вам особисто протягом 15 хвилин.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenConsultation}
              className="shrink-0 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-400 shadow-md transition-all cursor-pointer"
            >
              Задати питання в чаті
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
