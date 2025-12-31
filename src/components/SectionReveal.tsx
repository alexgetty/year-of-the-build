/**
 * SectionReveal
 *
 * Scroll-triggered reveal animation for page sections.
 * Uses Framer Motion's viewport detection for entrance animations.
 */

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionRevealProps {
  /** Section content */
  children: ReactNode;
  /** Animation type */
  animation?: 'fade' | 'slideUp' | 'scale';
  /** Delay before animation starts */
  delay?: number;
  /** Custom className */
  className?: string;
}

const animations = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function SectionReveal({
  children,
  animation = 'slideUp',
  delay = 0,
  className,
}: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const preset = animations[animation];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      variants={preset}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for smooth decel
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
