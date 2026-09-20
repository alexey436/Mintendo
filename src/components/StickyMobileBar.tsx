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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F19]/95 backdrop-blur-lg border-t border-slate-800 px-3 py-2.5 shadow-2xl flex items-center gap-2">
      {/* Quick Calculator Button */}
      <button
        onClick={onScrollToCalculator}
        className="flex-1 min-h-[44px] py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-[0.98] transition-all"
      >
        <Calculator className="w-4 h-4" />
        <span>Розрахувати ціну</span>
      </button>

      {/* Telegram Link */}
      <a
        href="https://t.me/mintendo_studio"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-slate-800 text-blue-400 border border-slate-700 flex items-center justify-center shrink-0 active:scale-95 transition-all"
      >
        <Send className="w-4 h-4" />
      </a>

      {/* Consultation Modal Trigger */}
      <button
        onClick={onOpenConsultation}
        aria-label="Консультація"
        className="min-h-[44px] py-2.5 px-3 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-1 shrink-0 active:scale-95 transition-all"
      >
        <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
        <span>Зв'язок</span>
      </button>
    </div>
  );
};
