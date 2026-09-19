/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PainPointsSection } from './components/PainPointsSection';
import { SolutionFeaturesSection } from './components/SolutionFeaturesSection';
import { CalculatorSection } from './components/CalculatorSection';
import { CasesSection } from './components/CasesSection';
import { WorkflowSection } from './components/WorkflowSection';
import { FaqSection } from './components/FaqSection';
import { FooterCtaSection } from './components/FooterCtaSection';
import { StickyMobileBar } from './components/StickyMobileBar';
import { ConsultationModal } from './components/ConsultationModal';
import { BackgroundVisuals } from './components/BackgroundVisuals';
import { ScrollReveal } from './components/ScrollReveal';
import { MobileVisualShowcase } from './components/MobileVisualShowcase';

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

        {/* Mobile Visual Showcase (Rich visuals and interactive phone mockup) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
          <ScrollReveal direction="up" delay={0.05}>
            <MobileVisualShowcase />
          </ScrollReveal>
        </section>

        {/* Pain Points Section */}
        <PainPointsSection />

        {/* Solutions & Core Advantages Section (Spotlight Cards) */}
        <SolutionFeaturesSection />

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
      </main>

      {/* Floating Sticky Mobile CTA Bar */}
      <StickyMobileBar
        onScrollToCalculator={scrollToCalculator}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Consultation & Quote Capture Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        presetData={modalPresetData}
      />
    </div>
  );
}

