import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Clock, Sparkles } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetData?: {
    projectType?: string;
    totalPrice?: number;
    totalDays?: number;
    selectedModules?: string[];
    urgency?: string;
    sourceCase?: string;
  };
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  presetData,
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [channel, setChannel] = useState('telegram');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#0E131F] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">
              Запит зафіксовано!
            </h3>
            <p className="text-sm text-slate-300">
              Дякуємо, <strong>{name}</strong>. Тімлід Mintendo зв'яжеться з вами за вказаним контактом <strong>{contact}</strong> протягом 15 хвилин для узгодження деталей.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors"
              >
                Закрити вікно
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-800/50 text-emerald-400 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mintendo Direct Request</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">
                {presetData?.totalPrice
                  ? 'Фіксація кошторису проєкту'
                  : 'Безкоштовна консультація з експертом'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Обговоримо цілі вашого бізнесу, розрахуємо точні дедлайни та підготуємо стратегію запуску.
              </p>
            </div>

            {/* Calculated Preset Teaser if came from calculator */}
            {presetData?.totalPrice && (
              <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/30 mb-5 text-xs text-slate-300 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{presetData.projectType}</div>
                  <div className="text-[11px] text-slate-400">
                    Термін: {presetData.totalDays} роб. днів • {presetData.selectedModules?.length || 0} додаткових модулів
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-emerald-400 font-mono">
                    ${presetData.totalPrice}
                  </div>
                  <div className="text-[10px] text-emerald-300">Гарантія ціни</div>
                </div>
              </div>
            )}

            {presetData?.sourceCase && (
              <div className="p-3 rounded-xl bg-slate-900 border border-blue-500/30 mb-5 text-xs text-blue-300">
                Кейс для обговорення: <strong>{presetData.sourceCase}</strong>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ваше ім'я *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Олександр"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Телефон або Telegram нік *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+38 (0__) ___-__-__ або @username"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Канал для зв'язку
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'telegram', label: 'Telegram' },
                    { id: 'phone', label: 'Дзвінок' },
                    { id: 'whatsapp', label: 'WhatsApp' },
                  ].map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setChannel(ch.id)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                        channel === ch.id
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Коротко про ваші задачі (необов'язково)
                </label>
                <textarea
                  rows={2}
                  placeholder="Потрібен сайт для залучення клієнтів з реклами..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Отримати КП та консультацію</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Зв'язуємося протягом 15 хвилин у робочі години</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
