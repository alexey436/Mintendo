/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PainPointsSection } from './components/PainPointsSection';
import { SolutionFeaturesSection } from './components/SolutionFeaturesSection';
import { StickyMobileBar } from './components/StickyMobileBar';
import { BackgroundVisuals } from './components/BackgroundVisuals';

// Code-split lower below-the-fold sections for optimal initial bundle size and zero TBT
const AboutSection = lazy(() =>
  import('./components/AboutSection').then((m) => ({ default: m.AboutSection }))
);
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

  // Progressive loading of deeper below-the-fold sections to ensure 0ms TBT and 95+ PageSpeed on mobile
  const [isBelowFoldReady, setIsBelowFoldReady] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (isBelowFoldReady) return;

    const triggerReady = () => {
      setIsBelowFoldReady(true);
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener('scroll', triggerReady);
      window.removeEventListener('touchstart', triggerReady);
      window.removeEventListener('mousemove', triggerReady);
      window.removeEventListener('keydown', triggerReady);
    };

    window.addEventListener('scroll', triggerReady, { passive: true, once: true });
    window.addEventListener('touchstart', triggerReady, { passive: true, once: true });
    window.addEventListener('mousemove', triggerReady, { passive: true, once: true });
    window.addEventListener('keydown', triggerReady, { passive: true, once: true });

    // Idle trigger to load seamlessly in background when browser is free
    let timer: ReturnType<typeof setTimeout>;
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleId = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => {
        timer = setTimeout(triggerReady, 400);
      });
      return () => {
        removeListeners();
        clearTimeout(timer);
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
        }
      };
    } else {
      timer = setTimeout(triggerReady, 600);
      return () => {
        removeListeners();
        clearTimeout(timer);
      };
    }
  }, [isBelowFoldReady]);

  const scrollToCalculator = () => {
    if (!isBelowFoldReady) {
      setIsBelowFoldReady(true);
      setTimeout(() => {
        const el = document.getElementById('calculator');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      const el = document.getElementById('calculator');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
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

      <main className="relative z-10 pb-20 md:pb-0">
        {/* Hero Section - rendered immediately for lightning-fast LCP */}
        <HeroSection
          onScrollToCalculator={scrollToCalculator}
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* Pain Points Section - immediately rendered to eliminate below-the-fold layout shift */}
        <PainPointsSection
          onOpenConsultation={() =>
            handleOpenConsultation({ projectType: 'Безкоштовний аудит сайту' })
          }
        />

        {/* Solutions & Core Advantages Section (Spotlight Cards) */}
        <SolutionFeaturesSection />

        {/* Below-the-fold deeper sections loaded progressively */}
        {isBelowFoldReady ? (
          <Suspense fallback={<div className="min-h-[300px]" />}>
            {/* About Us / Experience & Stats (3 years, 85+ projects, principles) */}
            <AboutSection
              onOpenConsultation={() => handleOpenConsultation()}
              onScrollToCalculator={scrollToCalculator}
            />

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
        ) : (
          <div id="calculator" className="min-h-[160px]" />
        )}
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

