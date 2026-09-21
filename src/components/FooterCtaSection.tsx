import React, { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';
import {
  Send,
  PhoneCall,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Clock,
  Lock,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { sendLeadToTelegram } from '../utils/telegram';
import { validateName, validateContact, sanitizeContactInput, sanitizeNameInput } from '../utils/validation';

interface FooterCtaProps {
  initialProjectType?: string;
  initialEstimate?: number;
}

export const FooterCtaSection: React.FC<FooterCtaProps> = ({
  initialProjectType = 'Корпоративний сайт',
  initialEstimate,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    preferredChannel: 'telegram',
    projectType: initialProjectType,
    comment: '',
  });
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; contact?: boolean }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalContactDisplay, setFinalContactDisplay] = useState('');

  const handleChannelChange = (newChannel: string) => {
    setFormData((prev) => {
      let nextContact = prev.contact;
      if (newChannel === 'phone' || newChannel === 'whatsapp') {
        if (!nextContact || nextContact === '+380' || nextContact === '+380 ') {
          nextContact = '+380 ';
        } else {
          nextContact = sanitizeContactInput(nextContact, newChannel);
        }
      } else {
        // Telegram mode
        if (nextContact === '+380' || nextContact === '+380 ') {
          nextContact = '';
        }
      }

      return {
        ...prev,
        preferredChannel: newChannel,
        contact: nextContact,
      };
    });

    if (touched.contact && formData.contact) {
      const sanitized = sanitizeContactInput(formData.contact, newChannel);
      const v = validateContact(sanitized, newChannel);
      setErrors((prev) => ({ ...prev, contact: v.error }));
    }
  };

  const handleContactFocus = () => {
    if (
      (formData.preferredChannel === 'phone' || formData.preferredChannel === 'whatsapp') &&
      (!formData.contact || formData.contact.trim() === '')
    ) {
      setFormData((prev) => ({ ...prev, contact: '+380 ' }));
    }
  };

  const handleNameChange = (val: string) => {
    const hasDigits = /\d/.test(val);
    const sanitized = sanitizeNameInput(val);
    setFormData((prev) => ({ ...prev, name: sanitized }));

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
    const sanitized = sanitizeContactInput(val, formData.preferredChannel);
    setFormData((prev) => ({ ...prev, contact: sanitized }));
    if (touched.contact) {
      const v = validateContact(sanitized, formData.preferredChannel);
      setErrors((prev) => ({ ...prev, contact: v.error }));
    }
  };

  const handleNameBlur = () => {
    setTouched((prev) => ({ ...prev, name: true }));
    const v = validateName(formData.name);
    setErrors((prev) => ({ ...prev, name: v.error }));
  };

  const handleContactBlur = () => {
    setTouched((prev) => ({ ...prev, contact: true }));
    const v = validateContact(formData.contact, formData.preferredChannel);
    setErrors((prev) => ({ ...prev, contact: v.error }));
  };

  const contactValidation = validateContact(formData.contact, formData.preferredChannel);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameV = validateName(formData.name);
    const contactV = validateContact(formData.contact, formData.preferredChannel);

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
        name: formData.name.trim(),
        contact: contactV.formatted,
        preferredChannel: formData.preferredChannel,
        projectType: formData.projectType,
        comment: formData.comment.trim(),
        budget: initialEstimate,
        source: 'Контактна форма у футері',
      });
    } catch (err) {
      console.error('Error submitting footer lead:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <footer id="contact" className="bg-[#070A12] relative border-t border-slate-800/80 pt-16 pb-28 md:pt-20 md:pb-16">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Conversion Block Header */}
        <ScrollReveal direction="up" delay={0.05}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/50 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Старт вашого проєкту</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-['Plus_Jakarta_Sans']">
              Готові отримати сайт, який окупається з першого місяця?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Залиште заявку на розрахунок або напишіть у зручний месенджер. Ми підготуємо аудит вашої ніші та персональну комерційну пропозицію за 24 години.
            </p>
          </div>
        </ScrollReveal>

        {/* Form and Direct Messengers Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-16 sm:mb-20">
          
          {/* Left: Lead Generation Form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={0.06}>
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-9 shadow-2xl relative">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 border border-emerald-500/30">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">
                  Дякуємо! Вашу заявку прийнято
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Тімлід Mintendo вже вивчає інформацію. Ми зв'яжемося з вами через <strong className="text-emerald-400 font-mono">{finalContactDisplay || formData.contact}</strong> протягом 15 хвилин у робочий час.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        contact: '',
                        preferredChannel: 'telegram',
                        projectType: initialProjectType,
                        comment: '',
                      });
                      setErrors({});
                      setTouched({});
                    }}
                    className="text-xs text-emerald-400 hover:underline cursor-pointer"
                  >
                    Відправити ще одну заявку
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Заявка на розрахунок проєкту / аудит
                  </span>
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Відповідь за 15 хв
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Ваше ім'я *
                    </label>
                    <input
                      type="text"
                      placeholder="Олексій"
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      onBlur={handleNameBlur}
                      className={`w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 text-base sm:text-sm focus:outline-none transition-colors border ${
                        touched.name && errors.name
                          ? 'bg-rose-950/20 border-rose-500/80 focus:border-rose-400'
                          : touched.name && !errors.name && formData.name.trim()
                          ? 'bg-emerald-950/20 border-emerald-500/60 focus:border-emerald-400'
                          : 'bg-slate-800/80 border-slate-700 focus:border-emerald-500'
                      }`}
                    />
                    {touched.name && errors.name ? (
                      <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    ) : (
                      <p className="text-[10px] text-slate-500 mt-1.5">
                        Тільки букви (без цифр та спецсимволів)
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        {formData.preferredChannel === 'telegram'
                          ? 'Telegram нікнейм або телефон *'
                          : formData.preferredChannel === 'phone'
                          ? 'Номер телефону (тільки цифри) *'
                          : 'Номер WhatsApp (тільки цифри) *'}
                      </label>
                      {formData.contact && contactValidation.isValid && (
                        <span className="text-[10px] text-emerald-400 font-medium">
                          ✓ Формат вірний
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder={
                        formData.preferredChannel === 'telegram'
                          ? '@username (латиницею) або +380 (44) 123-12-31'
                          : '+380 (44) 123-12-31'
                      }
                      value={formData.contact}
                      onFocus={handleContactFocus}
                      onChange={(e) => handleContactChange(e.target.value)}
                      onBlur={handleContactBlur}
                      className={`w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 text-base sm:text-sm focus:outline-none transition-colors border font-mono ${
                        touched.contact && errors.contact
                          ? 'bg-rose-950/20 border-rose-500/80 focus:border-rose-400'
                          : touched.contact && !errors.contact && formData.contact.trim() && formData.contact !== '+380 '
                          ? 'bg-emerald-950/20 border-emerald-500/60 focus:border-emerald-400'
                          : 'bg-slate-800/80 border-slate-700 focus:border-emerald-500'
                      }`}
                    />
                    {touched.contact && errors.contact ? (
                      <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.contact}</span>
                      </p>
                    ) : formData.contact && contactValidation.isValid ? (
                      <p className="text-[11px] text-emerald-400 mt-1.5 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          {contactValidation.type === 'phone'
                            ? `Номер підтверджено: ${contactValidation.formatted}`
                            : `Telegram підтверджено: ${contactValidation.formatted}`}
                        </span>
                      </p>
                    ) : (
                      <p className="text-[10px] text-slate-500 mt-1.5">
                        {formData.preferredChannel === 'telegram'
                          ? 'Введіть @нікнейм у Telegram або номер у форматі +380 (44) 123-12-31'
                          : 'Формат номеру: +380 (44) 123-12-31 (введіть 9 цифр після коду)'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Тип сайту
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-base sm:text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                      <option value="Landing Page">Landing Page (Лендінг)</option>
                      <option value="Корпоративний сайт">Корпоративний сайт</option>
                      <option value="Інтернет-магазин">Інтернет-магазин (E-commerce)</option>
                      <option value="Вебсервіс / SaaS">Вебсервіс / SaaS платформа</option>
                      <option value="LMS Освітня платформа">LMS Освітня платформа</option>
                      <option value="Редизайн та CRO аудит">Редизайн та CRO аудит</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Зручний спосіб зв'язку
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'telegram', label: 'Telegram' },
                        { id: 'phone', label: 'Дзвінок' },
                        { id: 'whatsapp', label: 'WhatsApp' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleChannelChange(item.id)}
                          className={`py-2.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                            formData.preferredChannel === item.id
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-sm'
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Коротко про проєкт або посилання на старий сайт (необов'язково)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Наприклад: інтернет-магазин одягу, потрібна оплата картами та інтеграція з CRM..."
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  id="footer-submit-btn"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Відправляємо запит...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Відправити запит на розрахунок</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center pt-2">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Конфіденційність гарантовано. Жодного спаму чи нав'язливих дзвінків.</span>
                </div>
              </form>
            )}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Direct Messengers & Mintendo Guarantees */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="up" delay={0.08}>
              <div className="flex flex-col justify-between space-y-6">
            
            {/* Quick Messenger Cards */}
            <div className="p-7 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
              <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                Бажаєте почати діалог просто зараз?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Напишіть нашому провідному розробнику в Telegram або WhatsApp без заповнення форм:
              </p>

              <div className="space-y-2.5">
                <a
                  href="https://t.me/mintendovip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:text-white flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <Send className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">Написати в Telegram</div>
                      <div className="text-[10px] text-slate-400">@mintendovip (онлайн)</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="https://wa.me/380935938981"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 hover:text-white flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">Написати у WhatsApp</div>
                      <div className="text-[10px] text-slate-400">+38 (093) 593-89-81</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="tel:+380935938981"
                  className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-700/60 flex items-center justify-center text-slate-300">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">+38 (093) 593-89-81</div>
                      <div className="text-[10px] text-slate-400">Прямий номер студії (09:00 - 19:00)</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Mintendo USP Manifesto Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/20 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                <ShieldCheck className="w-4 h-4" />
                <span>Офіційна місія бренду Mintendo</span>
              </div>
              <p className="italic text-slate-200 leading-relaxed font-['Plus_Jakarta_Sans']">
                «Mintendo — створюємо сайти, які окупаються за рахунок продуманої конверсії (CRO), залізної швидкості завантаження та SEO-оптимізації з першого дня. Прозора ціна та контроль етапів розробки онлайн».
              </p>
            </div>

              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Bottom Copyright and Meta */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300 font-['Plus_Jakarta_Sans']">Mintendo Web Studio</span>
            <span>© {new Date().getFullYear()}. Усі права захищено.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6 text-slate-400">
            <span>Публічна оферта</span>
            <span>Політика конфіденційності</span>
            <span className="text-emerald-500 font-mono">100% передача прав замовнику</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
