import React from 'react';
import {
  ArrowRight,
  Calculator,
  ShieldCheck,
  Zap,
  TrendingUp,
  Search,
  Sparkles,
  CheckCircle2,
  Clock,
  Code2,
} from 'lucide-react';

interface HeroSectionProps {
  onScrollToCalculator: () => void;
  onOpenConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToCalculator,
  onOpenConsultation,
}) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-emerald-500/15 via-blue-600/10 to-teal-400/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 blur-[90px] pointer-events-none rounded-full" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide w-fit mb-6 shadow-sm shadow-emerald-950">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Студія веб-розробки та конверсії • Mintendo</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300">Гарантія результату в договорі</span>
            </div>

            {/* Exact H1 from prompt */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6 font-['Plus_Jakarta_Sans']">
              Сайти для бізнесу від{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                Mintendo
              </span>
              , які приносять клієнтів, а не просто висять у мережі.
            </h1>

            {/* Subtitle from prompt */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
              Розробка під ключ із фокусом на UX, SEO та високу конверсію (CRO). Фіксовані терміни, прозора вартість та підтримка після запуску.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onScrollToCalculator}
                id="hero-calc-cta"
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 text-base font-bold text-white bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Calculator className="w-5 h-5 text-emerald-100 group-hover:rotate-12 transition-transform" />
                <span>Розрахувати вартість сайту</span>
                <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenConsultation}
                id="hero-consult-cta"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-base font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 rounded-xl transition-all cursor-pointer"
              >
                <span>Отримати консультацію</span>
              </button>
            </div>

            {/* Key Value Guarantees (Trust Badges) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">PageSpeed 90+</div>
                  <div className="text-[11px] text-slate-400">Залізна швидкість</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">SEO з 1-го дня</div>
                  <div className="text-[11px] text-slate-400">Індексація Google</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">0₴ доплат</div>
                  <div className="text-[11px] text-slate-400">Фіксована ціна</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">100% у строк</div>
                  <div className="text-[11px] text-slate-400">Штраф за затримку</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Live Showcase Preview Card */}
          <div className="lg:col-span-5 relative">
            {/* Outer card frame with glassmorphism */}
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-950/90 border border-slate-700/80 p-5 sm:p-6 shadow-2xl shadow-black/50 backdrop-blur-sm">
              
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
                    https://mintendo.agency/live-audit
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ONLINE PROD
                </span>
              </div>

              {/* Real Performance Metrics Widget */}
              <div className="space-y-4">
                
                {/* Google Lighthouse Core Web Vitals Box */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-emerald-950 border-2 border-emerald-400 shadow-lg shadow-emerald-500/20">
                      <span className="text-xl font-black text-emerald-400 font-mono">99</span>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider font-bold text-slate-400">Google PageSpeed</div>
                      <div className="text-sm font-semibold text-white">Ідеальні Core Web Vitals</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40">
                    0.6с FCP
                  </div>
                </div>

                {/* Conversion Rate Optimization (CRO) Live Impact */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-900/90 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                      Конверсія в лід (CRO Архітектура)
                    </span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">
                      +38.4%
                    </span>
                  </div>
                  {/* Progress bar comparison */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Звичайний шаблон</span>
                      <span>1.2%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="w-[18%] h-full bg-slate-600 rounded-full" />
                    </div>
                    <div className="flex justify-between text-[11px] text-emerald-400 font-medium pt-1">
                      <span>Сайт від Mintendo</span>
                      <span className="font-bold">5.8%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="w-[78%] h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Live Client Stage Tracker Mini-Widget */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                      Онлайн контроль етапів для клієнта
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">Спринт 3/5</span>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-1.5 mb-2">
                    <div className="h-1.5 rounded bg-emerald-500" title="Бриф завершено" />
                    <div className="h-1.5 rounded bg-emerald-500" title="Прототип CRO завершено" />
                    <div className="h-1.5 rounded bg-emerald-400 animate-pulse" title="Розробка в процесі" />
                    <div className="h-1.5 rounded bg-slate-800" title="Тестування" />
                    <div className="h-1.5 rounded bg-slate-800" title="Реліз" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="text-emerald-400 font-medium">✓ Етап 3: Чиста розробка & SEO</span>
                    <span>Дедлайн: 14 робочих днів</span>
                  </div>
                </div>

                {/* Instant Quote Calculator preview teaser */}
                <button
                  onClick={onScrollToCalculator}
                  className="w-full py-2.5 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between transition-colors group cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    Спробувати інтерактивний калькулятор Mintendo
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>
            </div>

            {/* Decorative background glow behind the card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur-xl -z-10 opacity-70" />
          </div>

        </div>
      </div>
    </section>
  );
};
