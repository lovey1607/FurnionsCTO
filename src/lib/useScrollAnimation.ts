'use client';

import { useScroll, useTransform, useSpring, MotionValue, useReducedMotion } from 'framer-motion';
import { RefObject, useMemo } from 'react';

/**
 * Hook for tracking scroll progress within a specific element
 * Returns a value from 0 to 1 representing scroll progress
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  offset: ['start end', 'end start'] | ['start start', 'end end'] = ['start end', 'end start']
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });
  return scrollYProgress;
}

/**
 * Hook for creating sticky scroll sections with progress tracking
 * The section stays in view for the specified scroll distance (in vh)
 */
export function useStickyScroll(
  ref: RefObject<HTMLElement | null>,
  scrollDistance: number = 200
): {
  progress: MotionValue<number>;
  smoothProgress: MotionValue<number>;
} {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', `end+=${scrollDistance}vh start`] as unknown as ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return { progress: scrollYProgress, smoothProgress };
}

/**
 * Hook for creating parallax effects with different speeds
 * Returns y offset for an element based on scroll position
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  speed: number = 0.5,
  direction: 'up' | 'down' = 'up'
): MotionValue<number> {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const multiplier = direction === 'up' ? -1 : 1;
  const distance = shouldReduceMotion ? 0 : 100 * speed * multiplier;

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return y;
}

/**
 * Hook for creating 3D depth parallax with multiple layers
 */
export function useParallax3D(
  ref: RefObject<HTMLElement | null>,
  depth: number = 1
): {
  y: MotionValue<number>;
  scale: MotionValue<number>;
  rotateX: MotionValue<number>;
} {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-50 * depth, 50 * depth]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [1, 1, 1] : [0.9, 1, 0.9]
  );

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [0, 0, 0] : [15, 0, -15]
  );

  return { y, scale, rotateX };
}

/**
 * Hook for text reveal animations based on scroll
 * Returns opacity and y values for smooth text reveal
 */
export function useTextReveal(
  ref: RefObject<HTMLElement | null>,
  delay: number = 0
): {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
} {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'start 60%'],
  });

  const adjustedProgress = useTransform(
    scrollYProgress,
    [delay, delay + 0.5],
    [0, 1]
  );

  const opacity = useTransform(adjustedProgress, [0, 1], [0, 1]);
  const y = useTransform(
    adjustedProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [30, 0]
  );

  return { opacity, y };
}

/**
 * Hook for scale and fade animations during scroll
 */
export function useScaleOnScroll(
  ref: RefObject<HTMLElement | null>,
  scaleRange: [number, number] = [0.8, 1]
): {
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
} {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'start 40%'],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : scaleRange
  );

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return { scale, opacity };
}

/**
 * Hook for horizontal scroll effect - transforms vertical scroll to horizontal movement
 */
export function useHorizontalScroll(
  ref: RefObject<HTMLElement | null>,
  width: number = 200
): MotionValue<number> {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -width]
  );

  return x;
}

/**
 * Hook for creating smooth counter/number animations
 */
export function useCounterAnimation(
  scrollProgress: MotionValue<number>,
  start: number = 0,
  end: number = 100
): MotionValue<number> {
  return useTransform(scrollProgress, [0, 1], [start, end]);
}

/**
 * Product configuration for showcases
 */
export const PRODUCTS = [
  {
    id: 'bear-butler',
    name: 'Bear Butler',
    tagline: 'Whimsical charm meets utility',
    description: 'A delightful bathroom companion that brings joy to everyday moments.',
    image: '/products/bear-butler.jpg',
  },
  {
    id: 'wine-rack',
    name: 'Wave Wine Rack',
    tagline: 'Sculptural storage',
    description: 'Organic curves meet functional design in this statement wine rack.',
    image: '/products/wine-rack.jpg',
  },
  {
    id: 'wall-shelf',
    name: 'Rustic Wall Bar',
    tagline: 'Elevate your space',
    description: 'Handcrafted wine shelf with integrated glass storage.',
    image: '/products/wall-shelf.jpg',
  },
  {
    id: 'bedside-table',
    name: 'Lattice Side Table',
    tagline: 'Geometric elegance',
    description: 'Intricate patterns create visual interest and modern appeal.',
    image: '/products/bedside-table.jpg',
  },
  {
    id: 'nesting-tables',
    name: 'Nesting Tables',
    tagline: 'Versatile sophistication',
    description: 'Three tables that work together or apart for endless possibilities.',
    image: '/products/nesting-tables.jpg',
  },
] as const;
