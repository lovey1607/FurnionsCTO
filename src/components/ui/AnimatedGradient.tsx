'use client';

import { m } from 'framer-motion';

export function AnimatedGradient({ className }: { className?: string }) {
  return (
    <m.div
      aria-hidden
      className={className}
      initial={{ backgroundPosition: '0% 50%' }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
    />
  );
}
