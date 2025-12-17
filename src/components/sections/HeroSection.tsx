'use client';

import Image from 'next/image';
import { m, useReducedMotion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1800&q=80';

// Word-by-word animation for the title
const titleWords = ['Small', 'Furniture.', 'Big', 'Aesthetic.'];

// Particles for ambient effect
const PARTICLE_COUNT = 15;

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Track mouse for interactive parallax
  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (shouldReduceMotion) return;
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

  // Main scroll progress for the entire hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Smooth spring for better animation feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Image parallax and zoom
  const imageY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 100]
  );

  const imageScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [1.05, 1.05, 1.05] : [1.05, 1.15, 1.25]
  );

  const imageRotate = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 3]
  );

  // Hero content fade and transform
  const heroOpacity = useTransform(smoothProgress, [0, 0.3, 0.6], [1, 1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.6], shouldReduceMotion ? [0, 0] : [0, -100]);
  const heroScale = useTransform(smoothProgress, [0, 0.6], shouldReduceMotion ? [1, 1] : [1, 0.9]);

  // Floating elements parallax based on mouse
  const mouseX = shouldReduceMotion ? 0 : (mousePosition.x - 0.5) * 30;
  const mouseY = shouldReduceMotion ? 0 : (mousePosition.y - 0.5) * 30;

  // Scroll indicator fade
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="heroSection"
      aria-label="Furnions hero"
      style={{ position: 'relative' }}
    >
      {/* Animated gradient background */}
      <m.div
        className="heroGradientBg"
        animate={{
          background: [
            'radial-gradient(ellipse at 20% 30%, rgba(139, 69, 19, 0.25), transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(34, 139, 34, 0.18), transparent 50%)',
            'radial-gradient(ellipse at 30% 50%, rgba(139, 69, 19, 0.3), transparent 55%), radial-gradient(ellipse at 70% 30%, rgba(34, 139, 34, 0.22), transparent 55%)',
            'radial-gradient(ellipse at 20% 30%, rgba(139, 69, 19, 0.25), transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(34, 139, 34, 0.18), transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles */}
      <div className="heroParticles">
        {isLoaded && [...Array(PARTICLE_COUNT)].map((_, i) => (
          <m.div
            key={i}
            className="heroParticle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              y: [0, -100 - Math.random() * 100],
              x: [0, (Math.random() - 0.5) * 50],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Floating decorative orbs with mouse interaction */}
      <m.div
        className="floatingOrb floatingOrb1"
        animate={{
          x: mouseX * 0.5,
          y: mouseY * 0.5,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.6, scale: 1 }}
        viewport={{ once: true }}
      />
      <m.div
        className="floatingOrb floatingOrb2"
        animate={{
          x: mouseX * -0.3,
          y: mouseY * -0.3,
        }}
        transition={{ type: 'spring', stiffness: 40, damping: 25 }}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.4, scale: 1 }}
        viewport={{ once: true }}
      />
      <m.div
        className="floatingOrb floatingOrb3"
        animate={{
          x: mouseX * 0.7,
          y: mouseY * 0.7,
        }}
        transition={{ type: 'spring', stiffness: 30, damping: 30 }}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.5, scale: 1 }}
        viewport={{ once: true }}
      />

      {/* Animated lines/rays */}
      <div className="heroRays">
        {[...Array(5)].map((_, i) => (
          <m.div
            key={i}
            className="heroRay"
            style={{
              left: `${15 + i * 18}%`,
              transformOrigin: 'bottom center',
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{
              scaleY: [0, 1, 0.8, 1],
              opacity: [0, 0.15, 0.1, 0.15],
            }}
            transition={{
              duration: 3,
              delay: 0.5 + i * 0.2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="heroSticky" style={{ position: 'relative' }}>
        <div className="heroGrid">
          <m.div
            className="heroCopy"
            style={{
              opacity: heroOpacity,
              y: heroY,
              scale: heroScale,
            }}
          >
            {/* Animated brand badge */}
            <m.div
              className="heroBadge"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <m.span
                className="heroBadgeIcon"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                ✦
              </m.span>
              <span>Furnions</span>
            </m.div>

            <div className="heroTitleWrap">
              <h1 className="heroTitle">
                {titleWords.map((word, i) => (
                  <m.span
                    key={word}
                    className="heroTitleWord"
                    initial={{ opacity: 0, y: 50, rotateX: -40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.3 + i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <m.span
                      className="heroTitleWordInner"
                      whileHover={shouldReduceMotion ? undefined : {
                        scale: 1.05,
                        color: 'rgba(245, 245, 220, 1)',
                        textShadow: '0 0 30px rgba(139, 69, 19, 0.5)',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {word}
                    </m.span>
                  </m.span>
                ))}
              </h1>
            </div>

            <m.p
              className="heroSubtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Designed for Cafes, Airbnbs, Offices &amp; Modern Homes
            </m.p>

            {/* Animated feature pills */}
            <m.div
              className="heroMeta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {['In-house design', 'Premium finish', 'Built to last'].map((pill, i) => (
                <m.span
                  key={pill}
                  className="pill pillAnimated"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                  whileHover={shouldReduceMotion ? undefined : {
                    scale: 1.08,
                    y: -3,
                    boxShadow: '0 10px 30px rgba(139, 69, 19, 0.3)',
                  }}
                >
                  <m.span
                    className="pillDot"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                  {pill}
                </m.span>
              ))}
            </m.div>

            {/* CTA Button */}
            <m.div
              className="heroCta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <m.a
                href="#product-showcase"
                className="heroCtaButton"
                whileHover={shouldReduceMotion ? undefined : {
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(139, 69, 19, 0.4)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Explore Collection</span>
                <m.span
                  className="heroCtaArrow"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </m.span>
              </m.a>
            </m.div>
          </m.div>

          {/* Hero Image with advanced effects */}
          <m.div
            className="heroImageWrap"
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: '1000px' }}
          >
            <m.div
              style={{
                y: imageY,
                scale: imageScale,
                rotateZ: imageRotate,
              }}
              className="heroImageMotion"
            >
              <Image
                src={HERO_IMAGE}
                alt="Cinematic hero shot of a modern wooden chair in a dark studio"
                priority
                fill
                sizes="(max-width: 900px) 92vw, 48vw"
                className="heroImage"
              />

              {/* Shine effect overlay */}
              <m.div
                className="heroImageShine"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  delay: 2,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: 'easeInOut',
                }}
              />
            </m.div>

            {/* Gradient overlay */}
            <m.div
              className="heroImageOverlay"
              style={{
                opacity: useTransform(smoothProgress, [0, 0.5], [0.3, 0.7])
              }}
            />

            {/* Floating product badge */}
            <m.div
              className="heroProductBadge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="heroProductBadgeLabel">Featured</span>
              <span className="heroProductBadgeName">Modern Chair</span>
            </m.div>
          </m.div>
        </div>

        {/* Scroll indicator */}
        <m.a
          href="#product-showcase"
          className="scrollIndicator"
          aria-label="Scroll to discover"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <m.div
            className="scrollIndicatorMouse"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <m.div
              className="scrollIndicatorWheel"
              animate={{ opacity: [1, 0], y: [0, 10] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </m.div>
          <m.span
            className="scrollLabel"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </m.span>
        </m.a>
      </div>
    </section>
  );
}
