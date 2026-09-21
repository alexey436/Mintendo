import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Clock, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { sendLeadToTelegram } from '../utils/telegram';
import { validateName, validateContact, sanitizeContactInput, sanitizeNameInput } from '../utils/validation';

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
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; contact?: boolean }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalContactDisplay, setFinalContactDisplay] = useState('');

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

  // Handle channel change: re-sanitize contact if switching to phone
  const handleChannelChange = (newChannel: string) => {
    setChannel(newChannel);
    if (newChannel === 'phone' || newChannel === 'whatsapp') {
      if (!contact || contact === '+380' || contact === '+380 ') {
        setContact('+380 ');
      } else {
        const sanitized = sanitizeContactInput(contact, newChannel);
        setContact(sanitized);
        if (touched.contact) {
          const v = validateContact(sanitized, newChannel);
          setErrors((prev) => ({ ...prev, contact: v.error }));
        }
      }
    } else {
      // Telegram mode
      if (contact === '+380' || contact === '+380 ') {
        setContact('');
        setErrors((prev) => ({ ...prev, contact: undefined }));
      }
    }
  };

  const handleNameChange = (val: string) => {
    const hasDigits = /\d/.test(val);
    const sanitized = sanitizeNameInput(val);
    setName(sanitized);

    if (hasDigits) {
      setErrors((prev) => ({ ...prev, name: "Ім'я має складатися тільки з букв (без цифр)" }));
      setTouched((prev) => ({ ...prev, name: true }));
      return;
    }

    if (touched.name) {
      const v = validateName(sanitized);
      setErrors((prev) => ({ ...prev, name: v.error }));
    }
  };

  const handleContactChange = (val: string) => {
    const sanitized = sanitizeContactInput(val, channel);
    setContact(sanitized);
    if (touched.contact) {
      const v = validateContact(sanitized, channel);
      setErrors((prev) => ({ ...prev, contact: v.error }));
    }
  };

  const handleContactFocus = () => {
    if ((channel === 'phone' || channel === 'whatsapp') && (!contact || contact.trim() === '')) {
      setContact('+380 ');
    }
  };

  const handleNameBlur = () => {
    setTouched((prev) => ({ ...prev, name: true }));
    const v = validateName(name);
    setErrors((prev) => ({ ...prev, name: v.error }));
  };

  const handleContactBlur = () => {
    setTouched((prev) => ({ ...prev, contact: true }));
    const v = validateContact(contact, channel);
    setErrors((prev) => ({ ...prev, contact: v.error }));
  };

  // Real-time validation info for contact
  const contactValidation = validateContact(contact, channel);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameV = validateName(name);
    const contactV = validateContact(contact, channel);

    setTouched({ name: true, contact: true });
    setErrors({
      name: nameV.error,
      contact: contactV.error,
    });

    if (!nameV.isValid || !contactV.isValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setFinalContactDisplay(contactV.formatted);

    try {
      await sendLeadToTelegram({
        name: name.trim(),
        contact: contactV.formatted,
        preferredChannel: channel,
        message: message.trim(),
        projectType: presetData?.projectType || (presetData?.totalPrice ? 'Калькулятор вартості' : 'Консультація з експертом'),
        budget: presetData?.totalPrice,
        timeline: presetData?.totalDays ? `${presetData.totalDays} днів` : undefined,
        selectedOptions: presetData?.selectedModules,
        source: presetData?.projectType === 'Безкоштовний аудит сайту'
          ? 'Кнопка: Безкоштовний аудит сайту'
          : presetData?.sourceCase
          ? `Кейс: ${presetData.sourceCase}`
          : presetData?.totalPrice
          ? 'Калькулятор вартості'
          : 'Модальне вікно',
      });
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#0E131F] border border-slate-700/80 rounded-3xl p-5 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Закрити модальне вікно"
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
              Дякуємо, <strong>{name}</strong>. Тімлід Mintendo зв'яжеться з вами за вказаним контактом <strong className="text-emerald-400">{finalContactDisplay || contact}</strong> протягом 15 хвилин для узгодження деталей.
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
                {presetData?.projectType === 'Безкоштовний аудит сайту'
                  ? 'Безкоштовний аудит сайту за 24 години'
                  : presetData?.totalPrice
                  ? 'Фіксація кошторису проєкту'
                  : 'Безкоштовна консультація з експертом'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {presetData?.projectType === 'Безкоштовний аудит сайту'
                  ? 'Знайдемо критичні помилки UX, затримки завантаження та точки втрати клієнтів на вашому сайті.'
                  : 'Обговоримо цілі вашого бізнесу, розрахуємо точні дедлайни та підготуємо стратегію запуску.'}
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

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="modal-client-name" className="block text-xs font-semibold text-slate-300 mb-1">
                  Ваше ім'я *
                </label>
                <input
                  id="modal-client-name"
                  type="text"
                  placeholder="Олександр"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onBlur={handleNameBlur}
                  className={`w-full px-4 py-2.5 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none transition-colors border ${
                    touched.name && errors.name
                      ? 'bg-rose-950/20 border-rose-500/80 focus:border-rose-400'
                      : touched.name && !errors.name && name.trim()
                      ? 'bg-emerald-950/20 border-emerald-500/60 focus:border-emerald-400'
                      : 'bg-slate-800/80 border-slate-700 focus:border-emerald-500'
                  }`}
                />
                {touched.name && errors.name ? (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-400 mt-1">
                    Тільки букви (без цифр та спецсимволів)
                  </p>
                )}
              </div>

              <div>
                <span id="modal-channel-label" className="block text-xs font-semibold text-slate-300 mb-1">
                  Спосіб зв'язку
                </span>
                <div className="grid grid-cols-3 gap-2" role="group" aria-labelledby="modal-channel-label">
                  {[
                    { id: 'telegram', label: 'Telegram' },
                    { id: 'phone', label: 'Дзвінок' },
                    { id: 'whatsapp', label: 'WhatsApp' },
                  ].map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      aria-pressed={channel === ch.id}
                      onClick={() => handleChannelChange(ch.id)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        channel === ch.id
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-sm'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="modal-client-contact" className="text-xs font-semibold text-slate-300">
                    {channel === 'telegram'
                      ? 'Telegram нікнейм або телефон *'
                      : channel === 'phone'
                      ? 'Номер телефону (тільки цифри) *'
                      : 'Номер WhatsApp (тільки цифри) *'}
                  </label>
                  {contact && contactValidation.isValid && (
                    <span className="text-[10px] text-emerald-400 font-medium">
                      ✓ Формат вірний
                    </span>
                  )}
                </div>
                <input
                  id="modal-client-contact"
                  type="text"
                  placeholder={
                    channel === 'telegram'
                      ? '@username (латиницею) або +380 (44) 123-12-31'
                      : '+380 (44) 123-12-31'
                  }
                  value={contact}
                  onFocus={handleContactFocus}
                  onChange={(e) => handleContactChange(e.target.value)}
                  onBlur={handleContactBlur}
                  className={`w-full px-4 py-2.5 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none transition-colors border font-mono ${
                    touched.contact && errors.contact
                      ? 'bg-rose-950/20 border-rose-500/80 focus:border-rose-400'
                      : touched.contact && !errors.contact && contact.trim() && contact !== '+380 '
                      ? 'bg-emerald-950/20 border-emerald-500/60 focus:border-emerald-400'
                      : 'bg-slate-800/80 border-slate-700 focus:border-emerald-500'
                  }`}
                />
                {touched.contact && errors.contact ? (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.contact}</span>
                  </p>
                ) : contact && contactValidation.isValid ? (
                  <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {contactValidation.type === 'phone'
                        ? `Номер підтверджено: ${contactValidation.formatted}`
                        : `Telegram підтверджено: ${contactValidation.formatted}`}
                    </span>
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-400 mt-1">
                    {channel === 'telegram'
                      ? 'Введіть @нікнейм у Telegram або номер у форматі +380 (44) 123-12-31'
                      : 'Формат номеру: +380 (44) 123-12-31 (введіть 9 цифр після коду)'}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="modal-client-message" className="block text-xs font-semibold text-slate-300 mb-1">
                  Коротко про ваші задачі (необов'язково)
                </label>
                <textarea
                  id="modal-client-message"
                  rows={2}
                  placeholder={
                    presetData?.projectType === 'Безкоштовний аудит сайту'
                      ? 'Посилання на ваш діючий сайт або що саме турбує...'
                      : 'Потрібен сайт для залучення клієнтів з реклами...'
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Відправляємо заявку...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>
                      {presetData?.projectType === 'Безкоштовний аудит сайту'
                        ? 'Замовити безкоштовний аудит'
                        : 'Отримати КП та консультацію'}
                    </span>
                  </>
                )}
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
