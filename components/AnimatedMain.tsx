'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { createContext, useContext, useRef, ReactNode } from 'react';

type Direction = 'left' | 'right' | 'up' | 'down';

const DirectionContext = createContext<Direction>('left');
export const useDirection = () => useContext(DirectionContext);

/**
 * Page-order map for top-level nav links so transitions can infer
 * forward / back / deeper / shallower and animate accordingly.
 */
const PAGE_ORDER: Record<string, number> = {
  '/': 0,
  '/vision': 1,
  '/architecture': 2,
  '/tools': 3,
  '/docs/install': 4,
  '/blog': 5,
  '/faq': 6,
  '/mcp': 7,
  '/about': 8,
};

function calcDirection(from: string, to: string): Direction {
  if (from.startsWith(to) && from !== to) return 'down';
  if (to.startsWith(from) && to !== from) return 'up';
  const fo = PAGE_ORDER[from];
  const tO = PAGE_ORDER[to];
  if (fo !== undefined && tO !== undefined) return tO > fo ? 'left' : 'right';
  return to < from ? 'right' : 'left';
}

const slideVariants: Record<Direction, Variants> = {
  left: {
    initial: { x: '28%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-28%', opacity: 0 },
  },
  right: {
    initial: { x: '-28%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '28%', opacity: 0 },
  },
  up: {
    initial: { y: '28%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-28%', opacity: 0 },
  },
  down: {
    initial: { y: '-28%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '28%', opacity: 0 },
  },
};

export default function AnimatedMain({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const prevRef = useRef(pathname);
  const dirRef = useRef<Direction>('left');

  if (pathname !== prevRef.current) {
    dirRef.current = calcDirection(prevRef.current, pathname);
    prevRef.current = pathname;
  }

  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <DirectionContext.Provider value={dirRef.current}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          className="h-full"
          variants={slideVariants[dirRef.current]}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </DirectionContext.Provider>
  );
}
