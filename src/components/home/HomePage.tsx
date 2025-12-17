'use client';

import { MotionProvider } from '../motion/MotionProvider';
import { FloatingWhatsAppButton } from '../FloatingWhatsAppButton';
import { AboutSection } from '../sections/AboutSection';
import { AccessoriesSection } from '../sections/AccessoriesSection';
import { CommunitySection } from '../sections/CommunitySection';
import { ContactSection } from '../sections/ContactSection';
import { FeaturedProductsSection } from '../sections/FeaturedProductsSection';
import { FooterSection } from '../sections/FooterSection';
import { HeroSection } from '../sections/HeroSection';
import { ProductPhilosophySection } from '../sections/ProductPhilosophySection';
import { ProductShowcaseSection } from '../sections/ProductShowcaseSection';
import { WhoWeServeSection } from '../sections/WhoWeServeSection';

export function HomePage() {
  return (
    <MotionProvider>
      <a className="skipLink" href="#content">
        Skip to content
      </a>

      <main id="content">
        <HeroSection />
        <ProductShowcaseSection />
        <WhoWeServeSection />
        <FeaturedProductsSection />
        <AccessoriesSection />
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
