'use client';

import Image from 'next/image';
import { m, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

const items = [
  {
    label: 'Cafes',
    copy: 'Elevate your space — without over-designing it.',
    image:
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80',
    alt: 'A minimal cafe interior with warm wooden furniture and soft lighting',
    accent: 'rgba(139, 69, 19, 0.3)',
  },
  {
    label: 'Airbnbs',
    copy: 'Create lasting memories through thoughtful details.',
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
    alt: 'A serene Airbnb-style room with modern furniture',
    accent: 'rgba(34, 139, 34, 0.3)',
  },
  {
    label: 'Offices',
    copy: 'Calm focus. Quiet confidence. Work that feels premium.',
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    alt: 'A modern office with sleek, small aesthetic furniture',
    accent: 'rgba(100, 100, 180, 0.3)',
  },
  {
    label: 'Homes',
    copy: 'Small pieces that make every day feel designed.',
    image:
      'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1600&q=80',
    alt: 'A cozy home corner with a chair and warm tones',
    accent: 'rgba(180, 130, 70, 0.3)',
  },
] as const;

export function WhoWeServeSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll progress for the sticky horizontal scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Horizontal scroll transform - moves cards left as user scrolls down
  const xTransform = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['5%', '-75%']
  );

  // Title animation
  const titleScale = useTransform(smoothProgress, [0, 0.2], [1, 0.95]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.1, 0.2], [1, 1, 0.7]);

  return (
    <section
      ref={sectionRef}
      id="who-we-serve"
      className="whoWeServeSection"
      aria-labelledby="who-we-serve-title"
    >
      <div className="whoWeServeSticky">
        {/* Section header with parallax */}
        <m.header
          className="whoWeServeHeader"
          style={{
            scale: titleScale,
            opacity: titleOpacity,
          }}
        >
          <m.p
            className="sectionKicker"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Who we serve
          </m.p>
          <m.h2
            id="who-we-serve-title"
            className="sectionTitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Designed for modern spaces — from first impression to last detail.
          </m.h2>
        </m.header>

        {/* Horizontal scrolling cards container */}
        <div className="whoWeServeCardsWrapper">
          <m.div
            ref={cardsContainerRef}
            className="whoWeServeCards"
            style={{ x: xTransform }}
          >
            {items.map((item, index) => (
              <ServeCard
                key={item.label}
                item={item}
                index={index}
                progress={smoothProgress}
                isReducedMotion={shouldReduceMotion}
              />
            ))}
          </m.div>
        </div>

        {/* Scroll progress line */}
        <div className="whoWeServeProgress">
          <m.div
            className="whoWeServeProgressFill"
            style={{ scaleX: smoothProgress }}
          />
        </div>
      </div>
    </section>
  );
}

interface ServeCardProps {
  item: (typeof items)[number];
  index: number;
  progress: ReturnType<typeof useSpring>;
  isReducedMotion: boolean | null;
}

function ServeCard({ item, index, progress, isReducedMotion }: ServeCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Individual card scroll tracking
  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // 3D tilt effect based on card position
  const numCards = items.length;
  const cardStart = index / numCards;
  const cardMid = (index + 0.5) / numCards;
  const cardEnd = (index + 1) / numCards;

  const rotateY = useTransform(
    progress,
    [cardStart, cardMid, cardEnd],
    isReducedMotion ? [0, 0, 0] : [15, 0, -15]
  );

  const rotateX = useTransform(
    progress,
    [cardStart, cardMid, cardEnd],
    isReducedMotion ? [0, 0, 0] : [-5, 0, 5]
  );

  const cardScale = useTransform(
    progress,
    [cardStart, cardMid, cardEnd],
    isReducedMotion ? [1, 1, 1] : [0.92, 1, 0.92]
  );

  // Image parallax within card
  const imageY = useTransform(
    cardProgress,
    [0, 1],
    isReducedMotion ? [0, 0] : [-20, 20]
  );

  return (
    <m.article
      ref={cardRef}
      className="serveCard"
      style={{
        rotateY,
        rotateX,
        scale: cardScale,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={isReducedMotion ? undefined : {
        scale: 1.02,
        rotateY: 0,
        rotateX: 0,
        transition: { duration: 0.3 }
      }}
    >
      {/* Accent glow */}
      <div
        className="serveCardGlow"
        style={{ background: item.accent }}
      />

      {/* Card image */}
      <div className="serveCardMedia">
        <m.div className="serveCardImageWrap" style={{ y: imageY }}>
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width: 900px) 85vw, 40vw"
            className="serveCardImage"
          />
        </m.div>
        <div className="serveCardOverlay" />
      </div>

      {/* Card content */}
      <div className="serveCardBody">
        <m.p
          className="serveCardLabel"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
        >
          {item.label}
        </m.p>
        <m.p
          className="serveCardCopy"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
        >
          {item.copy}
        </m.p>
      </div>

      {/* Interactive corner accent */}
      <div className="serveCardCorner" />
    </m.article>
  );
}
