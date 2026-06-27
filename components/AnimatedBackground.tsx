'use client';

import { useReducedMotion } from 'framer-motion';

export default function AnimatedBackground() {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return null;

  return (
    <div className="animated-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="bg-orb bg-orb--1" />
      <div className="bg-orb bg-orb--2" />
      <div className="bg-orb bg-orb--3" />
      <div className="bg-orb bg-orb--4" />
      <div className="bg-dot-grid" />
    </div>
  );
}
