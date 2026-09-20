/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PainPointsSection } from './components/PainPointsSection';
import { SolutionFeaturesSection } from './components/SolutionFeaturesSection';
import { AboutSection } from './components/AboutSection';
import { StickyMobileBar } from './components/StickyMobileBar';
import { BackgroundVisuals } from './components/BackgroundVisuals';

// Code-split below-the-fold heavy components for optimal mobile PageSpeed (LCP & TBT)
const CalculatorSection = lazy(() =>
  import('./components/CalculatorSection').then((m) => ({ default: m.CalculatorSection }))
);
const CasesSection = lazy(() =>
  import('./components/CasesSection').then((m) => ({ default: m.CasesSection }))
);
const WorkflowSection = lazy(() =>
  import('./components/WorkflowSection').then((m) => ({ default: m.WorkflowSection }))
);
const FaqSection = lazy(() =>
  import('./components/FaqSection').then((m) => ({ default: m.FaqSection }))
);
const FooterCtaSection = lazy(() =>
  import('./components/FooterCtaSection').then((m) => ({ default: m.FooterCtaSection }))
);
const ConsultationModal = lazy(() =>
  import('./components/ConsultationModal').then((m) => ({ default: m.ConsultationModal }))
);

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [modalPresetData, setModalPresetData] = useState<{
    projectType?: string;
    totalPrice?: number;
    totalDays?: number;
    selectedModules?: string[];
    urgency?: string;
    sourceCase?: string;
  } | undefined>(undefined);

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenConsultation = (preset?: typeof modalPresetData) => {
    setModalPresetData(preset);
    setIsConsultationOpen(true);
  };

  const handleCalculationSelect = (summary: {
    projectType: string;
    totalPrice: number;
    totalDays: number;
    selectedModules: string[];
    urgency: string;
  }) => {
    handleOpenConsultation(summary);
  };

  const handleCaseSelect = (caseTitle: string) => {
    handleOpenConsultation({ sourceCase: caseTitle });
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-x-hidden">
      {/* Dynamic Animated Ambient Background with Glowing Orbs & Tech Grid */}
      <BackgroundVisuals />

      {/* Fixed Navigation Bar */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
        onScrollToCalculator={scrollToCalculator}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          onScrollToCalculator={scrollToCalculator}
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* Pain Points Section */}
        <PainPointsSection
          onOpenConsultation={() =>
            handleOpenConsultation({ projectType: 'Безкоштовний аудит сайту' })
          }
        />

        {/* Solutions & Core Advantages Section (Spotlight Cards) */}
        <SolutionFeaturesSection />

        {/* About Us / Experience & Stats (3 years, 85+ projects, principles) */}
        <AboutSection
          onOpenConsultation={() => handleOpenConsultation()}
          onScrollToCalculator={scrollToCalculator}
        />

        <Suspense
          fallback={
            <div className="py-24 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
            </div>
          }
        >
          {/* Interactive Cost & Timeline Calculator */}
          <CalculatorSection onSelectCalculation={handleCalculationSelect} />

          {/* Case Studies & Social Proof */}
          <CasesSection onSelectCaseConsultation={handleCaseSelect} />

          {/* 5-Step Workflow & Online Project Tracker */}
          <WorkflowSection />

          {/* FAQ Section */}
          <FaqSection onOpenConsultation={() => handleOpenConsultation()} />

          {/* Footer & Final Contact CTA */}
          <FooterCtaSection />
        </Suspense>
      </main>

      {/* Floating Sticky Mobile CTA Bar */}
      <StickyMobileBar
        onScrollToCalculator={scrollToCalculator}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Consultation & Quote Capture Modal (Loaded on demand only when opened) */}
      {isConsultationOpen && (
        <Suspense fallback={null}>
          <ConsultationModal
            isOpen={isConsultationOpen}
            onClose={() => setIsConsultationOpen(false)}
            presetData={modalPresetData}
          />
        </Suspense>
      )}
    </div>
  );
}

