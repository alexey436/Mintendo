import React, { useState } from 'react';
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
} from 'lucide-react';

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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <footer id="contact" className="bg-[#070A12] relative border-t border-slate-800/80 pt-20 pb-12">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Conversion Block Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
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

        {/* Form and Direct Messengers Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-20">
          
          {/* Left: Lead Generation Form */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-7 sm:p-9 shadow-2xl relative">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 border border-emerald-500/30">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">
                  Дякуємо! Вашу заявку прийнято
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Тімлід Mintendo вже вивчає інформацію. Ми зв'яжемося з вами через <strong>{formData.contact}</strong> протягом 15 хвилин у робочий час.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-emerald-400 hover:underline cursor-pointer"
                  >
                    Відправити ще одну заявку
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
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
                      required
                      placeholder="Олексій"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Телефон або Telegram нік *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+38 (0__) ___-__-__ або @username"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                    />
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
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
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
                          onClick={() => setFormData({ ...formData, preferredChannel: item.id })}
                          className={`py-2.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                            formData.preferredChannel === item.id
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
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
                  className="w-full py-4 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Відправити запит на розрахунок</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center pt-2">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Конфіденційність гарантовано. Жодного спаму чи нав'язливих дзвінків.</span>
                </div>
              </form>
            )}
          </div>

          {/* Right: Direct Messengers & Mintendo Guarantees */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
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
                  href="https://t.me/mintendo_studio"
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
                      <div className="text-[10px] text-slate-400">@mintendo_studio (онлайн)</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="https://wa.me/380990000000"
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
                      <div className="text-[10px] text-slate-400">Швидка консультація</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="tel:+380990000000"
                  className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-700/60 flex items-center justify-center text-slate-300">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">+38 (099) 000-00-00</div>
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

        </div>

        {/* Bottom Copyright and Meta */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300 font-['Plus_Jakarta_Sans']">Mintendo Web Studio</span>
            <span>© {new Date().getFullYear()}. Усі права захищено.</span>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <span>Договір публічної оферти</span>
            <span>Політика конфіденційності</span>
            <span className="text-emerald-500 font-mono">100% передача прав замовнику</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
