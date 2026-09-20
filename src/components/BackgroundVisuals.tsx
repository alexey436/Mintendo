import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const BackgroundVisuals: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Top Reading/Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 origin-left z-50 shadow-sm shadow-emerald-400/50"
        style={{ scaleX }}
      />

      {/* Fixed Ambient Background Canvas */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Tech Cyber Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:48px_48px]"
        />

        {/* Diagonal Soft Laser Beams */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]" />

        {/* Floating Orb 1: Emerald (Top Right) */}
        <div
          className="anim-orb-1 absolute -top-20 -right-20 w-72 sm:w-[500px] h-72 sm:h-[500px] rounded-full bg-emerald-500/12 blur-[60px] sm:blur-[120px] pointer-events-none"
        />

        {/* Floating Orb 2: Cyan / Blue (Middle Left) */}
        <div
          className="anim-orb-2 absolute top-1/3 -left-32 w-80 sm:w-[550px] h-80 sm:h-[550px] rounded-full bg-cyan-600/10 blur-[60px] sm:blur-[130px] pointer-events-none"
        />

        {/* Floating Orb 3: Violet / Teal (Bottom Right) */}
        <div
          className="anim-orb-3 absolute top-2/3 right-[-10%] w-72 sm:w-[480px] h-72 sm:h-[480px] rounded-full bg-teal-500/10 blur-[60px] sm:blur-[130px] pointer-events-none"
        />

        {/* Floating Orb 4: Deep Indigo Glow (Near Bottom) */}
        <div
          className="anim-orb-1 absolute bottom-10 left-1/4 w-60 sm:w-[420px] h-60 sm:h-[420px] rounded-full bg-blue-600/10 blur-[60px] sm:blur-[110px] pointer-events-none"
        />

        {/* Constellation / Glowing Star Dust particles */}
        <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:64px_64px] opacity-[0.05]" />
      </div>
    </>
  );
};
