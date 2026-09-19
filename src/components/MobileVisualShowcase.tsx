import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Smartphone,
  Zap,
  TrendingUp,
  ShieldCheck,
  Search,
  CheckCircle2,
  Sparkles,
  Users,
  MousePointerClick,
  Layers,
} from 'lucide-react';

export const MobileVisualShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'speed' | 'cro' | 'seo'>('speed');

  return (
    <div className="my-8 md:my-12">
      {/* Mobile-First Interactive Visual Banner Card */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-slate-950 border border-slate-700/80 p-5 sm:p-7 shadow-2xl overflow-hidden">
        
        {/* Glow behind the showcase */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Top Tag and Interactive Mode Switcher for Mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 relative z-10 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <Smartphone className="w-5 h-5" />
            </span>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Mobile-First UI & Візуальна оптимізація
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Як виглядає сайт Mintendo на смартфонах
              </h3>
            </div>
          </div>

          {/* Interactive Switcher Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 self-start sm:self-auto overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setActiveTab('speed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'speed'
                  ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Швидкість 99</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cro')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'cro'
                  ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Конверсія +38%</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('seo')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'seo'
                  ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Google ТОП</span>
            </button>
          </div>
        </div>

        {/* Visual Smartphone Viewport Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
          
          {/* Visual Phone Mockup Component */}
          <div className="lg:col-span-6 flex justify-center">
            <motion.div
              layout
              className="w-full max-w-[320px] rounded-[32px] bg-slate-950 border-[6px] border-slate-800 shadow-2xl overflow-hidden relative"
            >
              {/* Dynamic Island / Notch */}
              <div className="h-5 bg-slate-900 flex items-center justify-center relative">
                <div className="w-20 h-3 bg-black rounded-full" />
              </div>

              {/* Simulated Phone Screen Content */}
              <div className="p-4 space-y-3 bg-[#0B0F19] text-left">
                
                {/* Mini Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-black tracking-wider text-white">MINTENDO.</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-semibold">
                    ● 60 FPS
                  </span>
                </div>

                {/* Hero Title in Mobile Frame */}
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold text-emerald-400">⚡ Розробка під ключ</div>
                  <div className="text-sm font-bold text-white leading-tight">
                    Сайт, що перетворює трафік у продажі
                  </div>
                </div>

                {/* Dynamic Screen Tab Content */}
                {activeTab === 'speed' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-300 font-medium">PageSpeed Mobile</span>
                      <span className="text-xs font-bold text-emerald-400 font-mono">99 / 100</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="w-[99%] h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
                    </div>
                    <div className="text-[10px] text-slate-400 flex justify-between">
                      <span>Завантаження: 0.4 сек</span>
                      <span className="text-emerald-400 font-medium">Миттєво</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'cro' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-slate-900 border border-blue-500/30 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-300 font-medium">Конверсія відвідувачів</span>
                      <span className="text-xs font-bold text-blue-400 font-mono">+38.4%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 text-[10px] pt-1">
                      <div className="p-1.5 rounded bg-slate-950 border border-slate-800 text-center">
                        <span className="text-slate-400 block">Звичайний сайт</span>
                        <span className="font-bold text-slate-300">1.2% лідів</span>
                      </div>
                      <div className="p-1.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-center">
                        <span className="text-emerald-400 block">З Mintendo</span>
                        <span className="font-bold text-emerald-300">5.8% лідів</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'seo' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-slate-900 border border-amber-500/30 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-300 font-medium">Google Ranking</span>
                      <span className="text-xs font-bold text-amber-400 font-mono">ТОП-3</span>
                    </div>
                    <div className="space-y-1 text-[10px] text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>Мікророзмітка Schema.org</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>Семантичні теги & OpenGraph</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Live Floating Notification on Phone */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="p-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-[10px] flex items-center justify-between shadow-lg"
                >
                  <span className="flex items-center gap-1.5">
                    <MousePointerClick className="w-3.5 h-3.5 text-emerald-400" />
                    Нова заявка з форми сайту
                  </span>
                  <span className="font-mono font-bold text-white">+1,200 $</span>
                </motion.div>

                {/* Mini CTA Button in Phone Frame */}
                <div className="w-full py-2 rounded-xl bg-emerald-500 text-center text-xs font-bold text-white shadow-md shadow-emerald-500/30">
                  Замовити консультацію
                </div>

              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="h-4 bg-slate-900 flex items-center justify-center">
                <div className="w-24 h-1 bg-slate-600 rounded-full" />
              </div>
            </motion.div>
          </div>

          {/* Right Visual Feature Cards (High-contrast, scannable for mobile & desktop) */}
          <div className="lg:col-span-6 space-y-3.5">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    0.4–0.8 секунди завантаження на 4G/5G
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Користувачі не йдуть до конкурентів через довге завантаження. Кожен мегабайт коду оптимізовано для мобільних пристроїв.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Адаптивні цільові кнопки під великий палець (Thumb Zone)
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Усі конверсійні елементи розташовані в зоні природного дотику однією рукою, що збільшує кількість дзвінків та лідів на 30+%.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Плавні анімації 60 FPS без навантаження на процесор телефону
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Використовуємо апаратне прискорення GPU. Жодних підвисань або перегріву батареї смартфона відвідувача.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
