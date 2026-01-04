/**
 * Temporary Stagger fallback component
 * TODO: Replace with @gettymade/construct/Stagger when published to npm
 *
 * For now, this just renders children without animation.
 * Original provides staggered entrance animations.
 */

import React from 'react';

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  animation?: string; // Ignored for now
}

export function Stagger({ children, className }: StaggerProps) {
  return <div className={className}>{children}</div>;
}
