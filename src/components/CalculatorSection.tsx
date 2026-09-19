import React, { useState, useMemo } from 'react';
import {
  ProjectType,
  DesignTier,
  ExtraModuleId,
  CalculatorState,
} from '../types';
import {
  PROJECT_TYPES_CONFIG,
  DESIGN_TIERS_CONFIG,
  EXTRA_MODULES_LIST,
} from '../data/content';
import {
  Calculator,
  Check,
  Plus,
  Clock,
  DollarSign,
  Gift,
  Send,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Flame,
  FileSpreadsheet,
} from 'lucide-react';

interface CalculatorSectionProps {
  onSelectCalculation: (summary: {
    projectType: string;
    totalPrice: number;
    totalDays: number;
    selectedModules: string[];
    urgency: string;
  }) => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({
  onSelectCalculation,
}) => {
  const [calcState, setCalcState] = useState<CalculatorState>({
    projectType: 'corporate',
    designTier: 'custom_ui',
    selectedModules: ['payment', 'crm', 'telegram_bot'],
    urgency: 'standard',
  });

  const toggleModule = (id: ExtraModuleId) => {
    setCalcState((prev) => {
      const exists = prev.selectedModules.includes(id);
      return {
        ...prev,
        selectedModules: exists
          ? prev.selectedModules.filter((m) => m !== id)
          : [...prev.selectedModules, id],
      };
    });
  };

  // Calculation Logic
  const calculation = useMemo(() => {
    const pTypeConfig = PROJECT_TYPES_CONFIG[calcState.projectType];
    const designConfig = DESIGN_TIERS_CONFIG[calcState.designTier];

    // Base price multiplied by design tier
    let price = pTypeConfig.basePrice * designConfig.priceMultiplier;
    let days = pTypeConfig.baseDays + designConfig.daysDelta;

    // Add extra modules
    calcState.selectedModules.forEach((modId) => {
      const mod = EXTRA_MODULES_LIST.find((m) => m.id === modId);
      if (mod) {
        price += mod.price;
        days += mod.days;
      }
    });

    // Urgency adjustment
    if (calcState.urgency === 'fast') {
      price = Math.round(price * 1.25);
      days = Math.max(7, Math.round(days * 0.65)); // 35% faster
    }

    const priceUSD = Math.round(price);
    const priceUAH = Math.round(priceUSD * 41.5);

    return {
      priceUSD,
      priceUAH,
      days,
    };
  }, [calcState]);

  const handleFixEstimate = () => {
    const pType = PROJECT_TYPES_CONFIG[calcState.projectType].name;
    const modules = calcState.selectedModules.map(
      (mId) => EXTRA_MODULES_LIST.find((m) => m.id === mId)?.name || mId
    );

    onSelectCalculation({
      projectType: pType,
      totalPrice: calculation.priceUSD,
      totalDays: calculation.days,
      selectedModules: modules,
      urgency: calcState.urgency === 'fast' ? 'Терміновий (Fast-track)' : 'Стандартний',
    });
  };

  const getTelegramUrl = () => {
    const pType = PROJECT_TYPES_CONFIG[calcState.projectType].name;
    const msg = `Вітаю, Mintendo! Я розрахував проєкт на сайті:
- Тип: ${pType}
- Бюджет: ~$${calculation.priceUSD}
- Термін: ~${calculation.days} роб. днів
- Модулі: ${calcState.selectedModules.length} шт.
Хочу зафіксувати ціну та отримати комерційну пропозицію!`;
    return `https://t.me/mintendo_studio?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="calculator" className="py-20 md:py-28 bg-[#080C16] relative border-t border-slate-800">
      {/* Glow highlight behind calculator */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/50 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Інтерактивний кошторис онлайн</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 font-['Plus_Jakarta_Sans']">
            Розрахуйте вартість та точні терміни вашого сайту
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Прозорий конфігуратор без прихованих зірочок. Оберіть параметри та дізнайтеся реальний бюджет розробки під ключ.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls (Steps 1 to 4) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step 1: Project Type */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Крок 1 із 4
                </span>
                <span className="text-xs text-slate-400">Оберіть категорію сайту</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-4">
                Який тип сайту потрібен вашому бізнесу?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(Object.keys(PROJECT_TYPES_CONFIG) as ProjectType[]).map((pKey) => {
                  const item = PROJECT_TYPES_CONFIG[pKey];
                  const isSelected = calcState.projectType === pKey;
                  return (
                    <button
                      key={pKey}
                      type="button"
                      onClick={() => setCalcState((prev) => ({ ...prev, projectType: pKey }))}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-950/30 shadow-md shadow-emerald-950/50'
                          : 'border-slate-800 bg-slate-800/40 hover:bg-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-white">{item.name}</span>
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                        <span className="text-slate-400">від {item.baseDays} роб. днів</span>
                        <span className="font-mono font-bold text-emerald-400">від ${item.basePrice}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Design Tier */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Крок 2 із 4
                </span>
                <span className="text-xs text-slate-400">Рівень візуалу та анімацій</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-4">
                Який рівень дизайну та візуалу вам необхідний?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.keys(DESIGN_TIERS_CONFIG) as DesignTier[]).map((dTier) => {
                  const item = DESIGN_TIERS_CONFIG[dTier];
                  const isSelected = calcState.designTier === dTier;
                  return (
                    <button
                      key={dTier}
                      type="button"
                      onClick={() => setCalcState((prev) => ({ ...prev, designTier: dTier }))}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-950/30'
                          : 'border-slate-800 bg-slate-800/40 hover:bg-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-white">{item.name}</span>
                          {isSelected && (
                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed mb-3">
                          {item.description}
                        </p>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400">
                        {item.priceMultiplier === 1
                          ? 'Базовий тариф'
                          : `+${Math.round((item.priceMultiplier - 1) * 100)}% до вартості`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Extra Modules (Multi-select) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Крок 3 із 4
                </span>
                <span className="text-xs text-slate-400">Додаткові модулі та сервіси</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Які інтеграції та функції потрібно підключити?
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Можна обрати декілька. Базове SEO, мобільний адаптив та хостинг-налаштування вже включені безкоштовно.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EXTRA_MODULES_LIST.map((mod) => {
                  const isChecked = calcState.selectedModules.includes(mod.id);
                  return (
                    <div
                      key={mod.id}
                      onClick={() => toggleModule(mod.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 select-none ${
                        isChecked
                          ? 'border-emerald-500/80 bg-emerald-950/20'
                          : 'border-slate-800 bg-slate-800/30 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border transition-all shrink-0 ${
                            isChecked
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : 'border-slate-600 bg-slate-800'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white mb-1">
                            {mod.name}
                          </div>
                          <div className="text-[11px] text-slate-400 leading-snug">
                            {mod.description}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          +${mod.price}
                        </span>
                        <div className="text-[10px] text-slate-500">+{mod.days} дні</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Urgency Setting */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Крок 4 із 4
                </span>
                <span className="text-xs text-slate-400">Пріоритет термінів</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-4">
                Наскільки терміново потрібен реліз сайту?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setCalcState((prev) => ({ ...prev, urgency: 'standard' }))}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    calcState.urgency === 'standard'
                      ? 'border-emerald-500 bg-emerald-950/30'
                      : 'border-slate-800 bg-slate-800/40 hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">Стандартний темп</span>
                    <Clock className="w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-300">
                    Планова розробка без овертаймів за регламентом. Оптимальний бюджет.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setCalcState((prev) => ({ ...prev, urgency: 'fast' }))}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                    calcState.urgency === 'fast'
                      ? 'border-amber-500 bg-amber-950/30'
                      : 'border-slate-800 bg-slate-800/40 hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-amber-400" />
                      Прискорений Fast-Track (-35% часу)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Виділена команда, робота у вихідні, запуск до гарячого сезону. (+25% до бюджету).
                  </p>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Summary & Quote Action Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-7 shadow-2xl shadow-emerald-950/30 backdrop-blur-md">
              
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Попередній кошторис
                </span>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  Fixed Price
                </span>
              </div>

              {/* Price Display */}
              <div className="mb-6">
                <div className="text-xs text-slate-400 mb-1">Орієнтовна вартість розробки:</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                    ${calculation.priceUSD.toLocaleString()}
                  </span>
                  <span className="text-sm font-medium text-slate-400">
                    (~{calculation.priceUAH.toLocaleString()} ₴)
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  *Остаточний кошторис фіксується в договорі після брифінгу
                </div>
              </div>

              {/* Timeline Display */}
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Термін розробки:</span>
                </div>
                <span className="text-sm font-bold text-white font-mono">
                  {calculation.days} робочих днів
                </span>
              </div>

              {/* Free Included Bonuses Box */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 mb-6">
                <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 mb-2.5">
                  <Gift className="w-4 h-4 text-emerald-400" />
                  <span>Вже включено безкоштовно ($450 цінності):</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Базове SEO та розмітка Schema.org</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Підключення Google Analytics 4 та міток</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>30 днів безкоштовної техпідтримки</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Відеоінструкція по роботі з адмінкою</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleFixEstimate}
                  id="calc-submit-btn"
                  className="w-full py-4 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Зафіксувати ціну та отримати КП</span>
                </button>

                <a
                  href={getTelegramUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="calc-telegram-btn"
                  className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-blue-400" />
                  <span>Обговорити розрахунок у Telegram</span>
                </a>
              </div>

              <div className="mt-4 text-center">
                <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-slate-500" />
                  Гарантія незмінності ціни за договором Mintendo
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
