import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import {
  Calendar,
  Rocket,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Globe2,
  Users,
  Code2,
  ArrowRight,
  Sparkles,
  Layers,
  HeartHandshake,
} from 'lucide-react';

interface AboutSectionProps {
  onOpenConsultation?: () => void;
  onScrollToCalculator?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenConsultation,
  onScrollToCalculator,
}) => {
  const stats = [
    {
      id: 'stat-years',
      number: '3+',
      unit: 'роки',
      label: 'На ринку розробки',
      desc: 'Працюємо з 2023 року. Відточили власну методологію запуску прибуткових сайтів без переплат.',
      icon: Calendar,
      color: 'emerald',
    },
    {
      id: 'stat-projects',
      number: '85+',
      unit: 'проєктів',
      label: 'Успішно реалізовано',
      desc: 'Від конверсійних лендінгів до складних корпоративних систем, інтернет-магазинів та вебсервісів.',
      icon: Rocket,
      color: 'teal',
    },
    {
      id: 'stat-deadline',
      number: '99.4%',
      unit: 'в дедлайн',
      label: 'Здача точно в строк',
      desc: 'Фіксуємо графік у договорі зі штрафними санкціями за кожен день затримки. 0 зірваних релізів.',
      icon: ShieldCheck,
      color: 'emerald',
    },
    {
      id: 'stat-revenue',
      number: '$3.8M+',
      unit: 'виручки',
      label: 'Згенеровано клієнтам',
      desc: 'Сумарний обсяг онлайн-продажів та кваліфікованих заявок, зароблених нашими клієнтами через сайти.',
      icon: TrendingUp,
      color: 'cyan',
    },
    {
      id: 'stat-speed',
      number: '0.5с',
      unit: 'швидкість',
      label: 'PageSpeed 95-100/100',
      desc: 'Миттєве завантаження на мобільних пристроях. Максимальний рейтинг від Google та дешевший трафік.',
      icon: Zap,
      color: 'emerald',
    },
    {
      id: 'stat-geography',
      number: '14',
      unit: 'країн',
      label: 'Географія бізнесів',
      desc: 'Клієнти з України, Польщі, Німеччини, США, Великої Британії, Канади, ОАЕ та інших ринків.',
      icon: Globe2,
      color: 'teal',
    },
  ];

  const principles = [
    {
      id: 'principle-boutique',
      title: 'Бутіковий підхід, а не конвеєр',
      desc: 'Ми свідомо не беремо більше 3–4 проєктів на місяць. Це гарантує, що лід-розробник і дизайнер занурюються у ваш бізнес на 100%, а не віддають завдання стажерам.',
      icon: Users,
    },
    {
      id: 'principle-engineering',
      title: 'Чистий код без зайвого баласту',
      desc: 'Ніяких важких застарілих конструкторів чи звалища плагінів. Працюємо на сучасному стеку (React, Next.js, Node.js, TypeScript), що забезпечує довговічність і безпеку.',
      icon: Code2,
    },
    {
      id: 'principle-money',
      title: 'Дизайн заради прибутку, а не для краси',
      desc: 'Кожен екран, форма та кнопка проєктуються на основі психології покупки та аналізу конкурентів. Головна мета сайту — перетворювати відвідувачів у реальних покупців.',
      icon: Layers,
    },
    {
      id: 'principle-partnership',
      title: 'Пряма чесна комунікація',
      desc: 'Створюємо спільний робочий чат у Telegram або Slack із командою розробки. Ви бачите щотижневий прогрес на живому демо-сервері та контролюєте результат.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#090D18] relative border-t border-slate-800/80">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.04}>
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-600/40 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm shadow-emerald-950/50">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>3 роки досвіду та твердих результатів • Monvorge studio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5 font-['Plus_Jakarta_Sans'] leading-tight">
              3 роки створюємо сайти, які щодня{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                приносять реальний прибуток
              </span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Monvorge studio — це інженерно-маркетингова команда. Ми не займаємося «сайтами заради галочки».
              За 3 роки на ринку ми вибудували процеси так, щоб кожен вкладений вами долар у розробку повертався
              новими клієнтами та високими чеками.
            </p>
          </div>
        </ScrollReveal>

        {/* 6 Key Numbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {stats.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <ScrollReveal key={item.id} direction="up" delay={0.05 + index * 0.04}>
                <div className="h-full p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 group hover:shadow-xl hover:shadow-emerald-950/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-700/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 group-hover:bg-emerald-900/50 transition-all">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {item.unit}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight group-hover:text-emerald-300 transition-colors">
                        {item.number}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-100 mb-2 font-['Plus_Jakarta_Sans']">
                      {item.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-emerald-400/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Підтверджено практикою</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Philosophy & Principles Block */}
        <ScrollReveal direction="up" delay={0.08}>
          <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 lg:p-12 mb-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-3xl mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2 block">
                НАШІ СТАНДАРТИ РОБОТИ
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-['Plus_Jakarta_Sans'] mb-3">
                Чому 85+ клієнтів обрали саме команду Monvorge studio
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Ми добре знаємо, як часто бізнеси обпікаються на недобросовісних підрядниках: зриви термінів,
                зникнення розробників та крива верстка на мобільних. Тому в Monvorge studio впроваджено 4 непорушних правила:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {principles.map((p) => {
                const PIcon = p.icon;
                return (
                  <div key={p.id} className="flex gap-4 sm:gap-5 items-start">
                    <div className="w-11 h-11 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-emerald-400 shrink-0 mt-1">
                      <PIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white mb-2 font-['Plus_Jakarta_Sans']">
                        {p.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Callout & Action Bar */}
            <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-3.5 text-left w-full sm:w-auto">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Працюємо офіційно за договором</div>
                  <div className="text-xs text-slate-400">Фіксація вартості, етапів та дедлайнів до старту робіт</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                {onScrollToCalculator && (
                  <button
                    type="button"
                    onClick={onScrollToCalculator}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer text-center"
                  >
                    Розрахувати кошторис
                  </button>
                )}
                {onOpenConsultation && (
                  <button
                    type="button"
                    onClick={onOpenConsultation}
                    className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <span>Обговорити ваш проєкт</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
