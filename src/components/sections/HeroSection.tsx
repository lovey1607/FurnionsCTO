'use client';

import Image from 'next/image';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1800&q=80';

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 46],
  );

  return (
    <section ref={ref} id="hero" className="hero" aria-label="Furnions hero">
      <div className="heroGrid">
        <m.div
          className="heroCopy"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.96 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.26 },
            },
          }}
        >
          <m.p
            className="heroKicker"
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Furnions
          </m.p>

          <m.h1
            className="heroTitle"
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Small Furniture. Big Aesthetic.
          </m.h1>

          <m.p
            className="heroSubtitle"
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.08 } },
            }}
          >
            Designed for Cafes, Airbnbs, Offices &amp; Modern Homes
          </m.p>

          <m.div
            className="heroMeta"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <span className="pill">In-house design</span>
            <span className="pill">Premium finish</span>
            <span className="pill">Built to last</span>
          </m.div>
        </m.div>

        <div className="heroImageWrap">
          <m.div style={{ y: imageY }} className="heroImageMotion">
            <Image
              src={HERO_IMAGE}
              alt="Cinematic hero shot of a modern wooden chair in a dark studio"
              priority
              fill
              sizes="(max-width: 900px) 92vw, 48vw"
              className="heroImage"
            />
          </m.div>
        </div>
      </div>

      <m.a
        href="#who-we-serve"
        className="scrollIndicator"
        aria-label="Scroll to Who we serve"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <m.span
          aria-hidden
          className="scrollChevron"
          animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </m.span>
        <span className="scrollLabel">Scroll</span>
      </m.a>
    </section>
  );
}
