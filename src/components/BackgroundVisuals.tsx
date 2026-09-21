import React, { useEffect, useRef } from 'react';

export const BackgroundVisuals: React.FC = () => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (progressBarRef.current) {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
              const progress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
              progressBarRef.current.style.transform = `scaleX(${progress})`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Reading/Scroll Progress Bar (pure CSS transform, GPU accelerated, 0 React re-renders) */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 origin-left z-50 shadow-sm shadow-emerald-400/50 pointer-events-none transition-transform duration-75 ease-out"
        style={{ transform: 'scaleX(0)' }}
      />

      {/* Fixed Ambient Background Canvas */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Subtle Tech Cyber Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:48px_48px]"
        />

        {/* Diagonal Soft Laser Beams */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]" />

        {/* Floating Orb 1: Emerald (Top Right) - Mobile GPU-optimized */}
        <div
          className="anim-orb-1 absolute -top-10 -right-10 sm:-top-20 sm:-right-20 w-40 sm:w-[500px] h-40 sm:h-[500px] rounded-full bg-emerald-500/10 blur-[30px] sm:blur-[120px] pointer-events-none"
        />

        {/* Floating Orb 2: Cyan / Blue (Middle Left) - Mobile GPU-optimized */}
        <div
          className="anim-orb-2 absolute top-1/3 -left-20 sm:-left-32 w-40 sm:w-[550px] h-40 sm:h-[550px] rounded-full bg-cyan-600/10 blur-[30px] sm:blur-[130px] pointer-events-none"
        />

        {/* Floating Orb 3: Violet / Teal (Bottom Right) - rendered only on sm+ to save mobile GPU */}
        <div
          className="anim-orb-3 hidden sm:block absolute top-2/3 right-[-5%] sm:right-[-10%] w-[480px] h-[480px] rounded-full bg-teal-500/10 blur-[130px] pointer-events-none"
        />

        {/* Floating Orb 4: Deep Indigo Glow (Near Bottom) - rendered only on sm+ to save mobile GPU */}
        <div
          className="anim-orb-1 hidden sm:block absolute bottom-10 left-1/4 w-[420px] h-[420px] rounded-full bg-blue-600/10 blur-[110px] pointer-events-none"
        />

        {/* Constellation / Glowing Star Dust particles */}
        <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:64px_64px] opacity-[0.04]" />
      </div>
    </>
  );
};
