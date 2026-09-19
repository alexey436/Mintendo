import React, { useState } from 'react';
import { WORKFLOW_STEPS_DATA } from '../data/content';
import {
  GitBranch,
  CheckCircle2,
  Clock,
  UserCheck,
  Laptop,
  ArrowRight,
  ShieldCheck,
  Eye,
  FileCheck,
  Sparkles,
} from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const currentStep = WORKFLOW_STEPS_DATA[activeStepIndex];

  return (
    <section id="workflow" className="py-20 md:py-28 bg-[#080C16] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/50 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <GitBranch className="w-3.5 h-3.5" />
            <span>Прозорий процес розробки</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 font-['Plus_Jakarta_Sans']">
            5 кроків від першої розмови до перших продажів
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Жодних сюрпризів чи зникнень. Кожен етап розбитий на чіткі спринти з онлайн-контролем у вашому персональному трекері.
          </p>
        </div>

        {/* Interactive Step Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-10">
          {WORKFLOW_STEPS_DATA.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.stepNumber}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-950/50'
                    : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/60 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`w-6 h-6 rounded-full text-xs font-bold font-mono flex items-center justify-center ${
                      isActive
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    0{step.stepNumber}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {step.duration}
                  </span>
                </div>
                <div
                  className={`text-xs font-bold line-clamp-1 ${
                    isActive ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Step Description & Deliverables */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Етап 0{currentStep.stepNumber} із 05
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  Термін: {currentStep.duration}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 font-['Plus_Jakarta_Sans']">
                {currentStep.title}
              </h3>
              <p className="text-sm sm:text-base text-emerald-400 font-medium mb-6">
                {currentStep.subtitle}
              </p>

              {/* What client gets */}
              <div className="mb-6">
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  Результати цього етапу (Deliverables):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentStep.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-2.5 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client's role */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-start gap-3">
                <UserCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-white block mb-0.5">
                    Роль замовника на цьому кроці:
                  </span>
                  <span className="text-xs text-slate-300">
                    {currentStep.clientRole}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Mintendo Client Portal Mockup */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-slate-700 bg-slate-950 p-5 shadow-inner">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-white font-['Plus_Jakarta_Sans']">
                      Mintendo Client Portal
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                    LIVE TRACKING
                  </span>
                </div>

                {/* Progress Visualizer */}
                <div className="space-y-3 mb-4 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Загальний прогрес проєкту:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {currentStep.stepNumber * 20}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                      style={{ width: `${currentStep.stepNumber * 20}%` }}
                    />
                  </div>
                </div>

                {/* Simulated Kanban Sprint Card */}
                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2 mb-4">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Поточний спринт:</span>
                    <span className="text-emerald-400 font-semibold">У процесі</span>
                  </div>
                  <div className="text-xs font-bold text-white">
                    {currentStep.title}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                    <span>Відповідальний тімлід:</span>
                    <span className="text-slate-200">Mintendo Tech Lead</span>
                  </div>
                </div>

                {/* Assurance notice */}
                <div className="text-[11px] text-slate-400 flex items-center gap-2 p-2.5 rounded bg-emerald-950/20 border border-emerald-900/30">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ви бачите статус кожного файлу та макету без необхідності дзвонити щодня.</span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
