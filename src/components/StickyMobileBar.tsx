import React from 'react';
import { Calculator, Send, PhoneCall } from 'lucide-react';

interface StickyMobileBarProps {
  onScrollToCalculator: () => void;
  onOpenConsultation: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  onScrollToCalculator,
  onOpenConsultation,
}) => {
  return (
    <nav
      aria-label="Швидкі дії на мобільному"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F19]/95 backdrop-blur-xl border-t border-slate-800/90 px-3 pt-2 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_25px_rgba(0,0,0,0.6)] flex items-center gap-2"
    >
      {/* Quick Calculator Button */}
      <button
        onClick={onScrollToCalculator}
        className="flex-1 min-h-[44px] py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer"
      >
        <Calculator className="w-4 h-4 shrink-0" />
        <span>Розрахувати ціну</span>
      </button>

      {/* Telegram Link */}
      <a
        href="https://t.me/mintendovip"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Чат у Telegram"
        className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-slate-900 text-blue-400 border border-slate-700/80 hover:bg-slate-800 flex items-center justify-center shrink-0 active:scale-95 transition-all cursor-pointer"
      >
        <Send className="w-4 h-4" />
      </a>

      {/* Consultation Modal Trigger */}
      <button
        onClick={onOpenConsultation}
        aria-label="Консультація з експертом"
        className="min-h-[44px] py-2.5 px-3 rounded-xl bg-slate-900 text-slate-200 border border-slate-700/80 hover:bg-slate-800 font-semibold text-xs flex items-center justify-center gap-1 shrink-0 active:scale-95 transition-all cursor-pointer"
      >
        <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>Зв'язок</span>
      </button>
    </nav>
  );
};
