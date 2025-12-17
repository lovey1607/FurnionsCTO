'use client';

import { m, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedGradient } from '../ui/AnimatedGradient';
import { EyeIcon, ShieldIcon, TouchIcon } from '../icons/PhilosophyIcons';

const statements = [
  {
    title: 'Designed to be seen',
    description: 'Clean silhouettes, premium materials, and proportion that reads from across the room.',
    Icon: EyeIcon,
    color: 'rgba(139, 69, 19, 0.8)',
  },
  {
    title: 'Built to be felt',
    description: 'Edges, textures, weight — every touchpoint is tuned for calm confidence.',
    Icon: TouchIcon,
    color: 'rgba(34, 139, 34, 0.8)',
  },
  {
    title: 'Crafted to last',
    description: 'Durable construction and finishes that age beautifully — not loudly.',
    Icon: ShieldIcon,
    color: 'rgba(100, 100, 180, 0.8)',
  },
] as const;

export function ProductPhilosophySection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Gradient intensity based on scroll
  const gradientOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="philosophySection"
      aria-labelledby="philosophy-title"
    >
      <m.div style={{ opacity: gradientOpacity }}>
        <AnimatedGradient className="sectionGradientBg" />
      </m.div>

      <div className="container">
        {/* Animated title with character reveal */}
        <m.header
          className="philosophyHeader"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="sectionKicker">Product philosophy</p>
          <h2 id="philosophy-title" className="philosophyTitle">
            <PhilosophyTitleReveal text="Minimal on purpose." />
            <PhilosophyTitleReveal text="Cinematic by nature." delay={0.3} />
          </h2>
        </m.header>

        {/* Philosophy statements with animated icons */}
        <div className="philosophyStack">
          {statements.map((statement, index) => (
            <PhilosophyStatement
              key={statement.title}
              statement={statement}
              index={index}
              progress={smoothProgress}
              isReducedMotion={shouldReduceMotion}
            />
          ))}
        </div>

        {/* Connecting animated line */}
        <m.div
          className="philosophyLine"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </section>
  );
}

interface TitleRevealProps {
  text: string;
  delay?: number;
}

function PhilosophyTitleReveal({ text, delay = 0 }: TitleRevealProps) {
  return (
    <span className="philosophyTitleLine">
      {text.split('').map((char, i) => (
        <m.span
          key={i}
          className="philosophyChar"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.02,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </m.span>
      ))}
    </span>
  );
}

interface StatementProps {
  statement: (typeof statements)[number];
  index: number;
  progress: ReturnType<typeof useSpring>;
  isReducedMotion: boolean | null;
}

function PhilosophyStatement({ statement, index, progress, isReducedMotion }: StatementProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { Icon, title, description, color } = statement;

  // Individual statement scroll tracking
  const { scrollYProgress: itemProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'start 40%'],
  });

  const itemSmooth = useSpring(itemProgress, { stiffness: 100, damping: 20 });

  // Icon animation
  const iconScale = useTransform(itemSmooth, [0, 0.5, 1], [0.8, 1.1, 1]);
  const iconRotate = useTransform(itemSmooth, [0, 0.5, 1], isReducedMotion ? [0, 0, 0] : [-10, 5, 0]);
  const iconGlow = useTransform(itemSmooth, [0, 0.5, 1], [0, 1, 0.6]);

  // Text reveal
  const textX = useTransform(itemSmooth, [0, 1], isReducedMotion ? [0, 0] : [-30, 0]);
  const textOpacity = useTransform(itemSmooth, [0, 0.5], [0, 1]);

  return (
    <m.div
      ref={ref}
      className="philosophyStatement"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={isReducedMotion ? undefined : { x: 10, transition: { duration: 0.2 } }}
    >
      {/* Animated icon container */}
      <m.div
        className="philosophyIcon"
        style={{
          scale: iconScale,
          rotate: iconRotate,
          boxShadow: useTransform(iconGlow, (g) => `0 0 ${g * 30}px ${color}`),
        }}
      >
        <Icon width={28} height={28} />
      </m.div>

      {/* Text content */}
      <m.div className="philosophyContent" style={{ x: textX, opacity: textOpacity }}>
        <h3 className="philosophyStatementTitle">{title}</h3>
        <p className="philosophyStatementText">{description}</p>
      </m.div>

      {/* Progress indicator line */}
      <m.div
        className="philosophyIndicator"
        style={{
          scaleX: itemSmooth,
          backgroundColor: color,
        }}
      />
    </m.div>
  );
}
