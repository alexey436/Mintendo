import React, { useState } from 'react';
import { SOLUTION_FEATURES_DATA } from '../data/content';
import {
  Search,
  LayoutDashboard,
  Sliders,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Cpu,
} from 'lucide-react';

interface SpotlightCardProps {
  feature: typeof SOLUTION_FEATURES_DATA[0];
  icon: React.ReactNode;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ feature, icon }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-2xl border border-slate-800 bg-slate-900/70 p-7 overflow-hidden transition-all duration-300 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-950/30 flex flex-col justify-between group"
    >
      {/* Spotlight Hover Glow Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.12), transparent 80%)`
            : '',
        }}
      />

      <div className="relative z-10">
        {/* Card Header: Icon & Key Metric */}
        <div className="flex items-start justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
            {icon}
          </div>
          <div className="text-right">
            <span className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight group-hover:text-emerald-400 transition-colors">
              {feature.metric}
            </span>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              {feature.metricDesc}
            </div>
          </div>
        </div>

        {/* Feature Title & Tagline */}
        <div className="mb-3">
          <span className="text-xs font-semibold text-emerald-400 tracking-wide">
            {feature.tagline}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1 font-['Plus_Jakarta_Sans']">
            {feature.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {feature.description}
        </p>
      </div>

      {/* Highlights checklist */}
      <div className="relative z-10 pt-4 border-t border-slate-800/80">
        <ul className="space-y-2">
          {feature.highlights.map((h, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const SolutionFeaturesSection: React.FC = () => {
  const icons = [
    <Search className="w-6 h-6" key="seo" />,
    <Sparkles className="w-6 h-6" key="cro" />,
    <Sliders className="w-6 h-6" key="admin" />,
    <LayoutDashboard className="w-6 h-6" key="tracking" />,
    <Zap className="w-6 h-6" key="speed" />,
    <ShieldCheck className="w-6 h-6" key="security" />,
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-[#0B0F19] relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-800/50 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Стандарти студії Mintendo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 font-['Plus_Jakarta_Sans']">
            Розробка, орієнтована на окупність та прозорість
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Кожен проєкт створюється за суворими інженерними та маркетинговими стандартами. Ніяких зайвих доплат за те, що має бути в базі за замовчуванням.
          </p>
        </div>

        {/* 6 Spotlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SOLUTION_FEATURES_DATA.map((feat, idx) => (
            <SpotlightCard key={feat.id} feature={feat} icon={icons[idx]} />
          ))}
        </div>

        {/* Live Technical Quality Bar */}
        <div className="mt-14 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Core Web Vitals & Google Lighthouse перевірка перед релізом
              </h4>
              <p className="text-xs text-slate-400">
                Ми здаємо проєкт тільки тоді, коли показники швидкості, доступності та SEO знаходяться в зеленій зоні (90–100).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-center px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700">
              <span className="text-xs text-slate-400 block">Performance</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">98</span>
            </div>
            <div className="text-center px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700">
              <span className="text-xs text-slate-400 block">SEO</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">100</span>
            </div>
            <div className="text-center px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700">
              <span className="text-xs text-slate-400 block">Accessibility</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">96</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
