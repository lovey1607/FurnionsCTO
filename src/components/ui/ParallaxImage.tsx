'use client';

import Image, { type ImageProps } from 'next/image';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type ParallaxImageProps = Omit<ImageProps, 'ref'> & {
  strength?: number;
  wrapperClassName?: string;
};

export function ParallaxImage({
  strength = 28,
  wrapperClassName,
  style,
  ...props
}: ParallaxImageProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [
    shouldReduceMotion ? 0 : -strength,
    shouldReduceMotion ? 0 : strength,
  ]);

  return (
    <div ref={ref} className={wrapperClassName}>
      <m.div style={{ y, height: '100%', width: '100%', position: 'relative' }}>
        <Image {...props} style={{ ...style }} />
      </m.div>
    </div>
  );
}
