'use client';

import { MotionProvider } from '../motion/MotionProvider';
import { FloatingWhatsAppButton } from '../FloatingWhatsAppButton';
import { AboutSection } from '../sections/AboutSection';
import { CommunitySection } from '../sections/CommunitySection';
import { ContactSection } from '../sections/ContactSection';
import { FooterSection } from '../sections/FooterSection';
import { HeroSection } from '../sections/HeroSection';
import { ProductPhilosophySection } from '../sections/ProductPhilosophySection';
import { WhoWeServeSection } from '../sections/WhoWeServeSection';

export function HomePage() {
  return (
    <MotionProvider>
      <a className="skipLink" href="#content">
        Skip to content
      </a>

      <main id="content">
        <HeroSection />
        <WhoWeServeSection />
        <ProductPhilosophySection />
        <AboutSection />
        <CommunitySection />
        <ContactSection />
        <FooterSection />
      </main>

      <FloatingWhatsAppButton />
    </MotionProvider>
  );
}
