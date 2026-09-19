import React, { useState, useEffect } from 'react';
import { Menu, X, Send, PhoneCall, Calculator, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
  onScrollToCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  onScrollToCalculator,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Болі & Рішення', href: '#pain-points' },
    { name: 'Переваги', href: '#features' },
    { name: 'Про нас', href: '#about' },
    { name: 'Калькулятор', href: '#calculator' },
    { name: 'Кейси', href: '#cases' },
    { name: 'Процес', href: '#workflow' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          id="navbar-logo-link"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-600 p-[1px] flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:shadow-emerald-500/35 transition-all">
            <div className="w-full h-full bg-[#0B0F19] rounded-[11px] flex items-center justify-center">
              <span className="font-extrabold text-xl tracking-tight text-white font-['Plus_Jakarta_Sans']">
                M<span className="text-emerald-400">.</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white font-['Plus_Jakarta_Sans'] group-hover:text-emerald-400 transition-colors">
              Mintendo
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
              Web & CRO Studio
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-white transition-colors relative py-1 focus:outline-none focus:text-emerald-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-emerald-400 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Direct Phone link */}
          <a
            href="tel:+380935938981"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900/70 hover:bg-slate-800 border border-slate-700/70 rounded-lg transition-all"
            title="Зателефонувати: +38 (093) 593-89-81"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>+38 (093) 593-89-81</span>
          </a>

          {/* Quick Telegram link */}
          <a
            href="https://t.me/mintendo_studio"
            target="_blank"
            rel="noopener noreferrer"
            id="nav-telegram-btn"
            className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-all"
            title="Швидкий чат у Telegram"
          >
            <Send className="w-3.5 h-3.5 text-blue-400" />
            <span>Telegram чат</span>
          </a>

          {/* Calculator direct trigger */}
          <button
            onClick={onScrollToCalculator}
            id="nav-calc-btn"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 rounded-lg transition-all"
          >
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>Калькулятор</span>
          </button>

          {/* Consultation button */}
          <button
            onClick={onOpenConsultation}
            id="nav-consultation-btn"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 rounded-lg shadow-sm shadow-emerald-500/20 active:scale-[0.98] transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Консультація</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          id="mobile-menu-toggle"
          aria-label="Перемкнути меню"
          className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0F19]/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-2 text-base font-medium text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-800/60 hover:text-emerald-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToCalculator();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold text-emerald-300 bg-emerald-950/50 border border-emerald-800/60 rounded-lg"
            >
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Калькулятор</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-400 rounded-lg"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Консультація</span>
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between px-2 text-xs">
            <a
              href="tel:+380935938981"
              className="flex items-center gap-1.5 text-emerald-400 font-semibold hover:underline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>+38 (093) 593-89-81</span>
            </a>
            <a
              href="https://t.me/mintendo_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-blue-400 font-medium hover:underline"
            >
              <Send className="w-3.5 h-3.5" />
              <span>@mintendo_studio</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
