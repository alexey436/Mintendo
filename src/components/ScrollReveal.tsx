import React, { ReactNode, useState, useEffect } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  once?: boolean;
}

let motionPromise: Promise<any> | null = null;
let cachedMotionDiv: any = null;

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
}) => {
  const [MotionDiv, setMotionDiv] = useState<any>(() => cachedMotionDiv);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // On mobile devices (<768px), keep native <div> for 100/100 Core Web Vitals, 0ms TBT, and zero scroll jank
      if (!isMobile && !prefersReduced) {
        if (cachedMotionDiv) {
          setMotionDiv(() => cachedMotionDiv);
        } else {
          if (!motionPromise) {
            motionPromise = import('motion/react').then((mod) => {
              cachedMotionDiv = mod.motion.div;
              return mod.motion.div;
            });
          }
          motionPromise.then((divComp) => {
            setMotionDiv(() => divComp);
          });
        }
      }
    }
  }, []);

  if (!MotionDiv) {
    return <div className={className}>{children}</div>;
  }

  const getOffset = () => {
    switch (direction) {
      case 'up':
        return { y: 20, x: 0 };
      case 'down':
        return { y: -20, x: 0 };
      case 'left':
        return { y: 0, x: 20 };
      case 'right':
        return { y: 0, x: -20 };
      default:
        return { y: 0, x: 0 };
    }
  };

  const offset = getOffset();

  return (
    <MotionDiv
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        scale: 0.98,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once,
        amount: 0.08,
        margin: '60px 0px 40px 0px',
      }}
      transition={{
        duration: 0.36,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </MotionDiv>
  );
};

