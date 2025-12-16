'use client';

import { m } from 'framer-motion';
import { AnimatedGradient } from '../ui/AnimatedGradient';
import { ParallaxImage } from '../ui/ParallaxImage';

const aboutImages = [
  {
    src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80',
    alt: 'A premium wooden chair photographed with dramatic lighting',
  },
  {
    src: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1600&q=80',
    alt: 'Close-up of modern furniture craftsmanship and texture',
  },
] as const;

export function AboutSection() {
  return (
    <section id="about" className="section sectionGradient" aria-labelledby="about-title">
      <AnimatedGradient className="sectionGradientBg" />
      <div className="container">
        <div className="aboutGrid">
          <m.div
            className="aboutCopy"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.22 } },
            }}
          >
            <m.header
              className="sectionHeader"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <p className="sectionKicker">About us</p>
              <h2 id="about-title" className="sectionTitle">
                About Furnions
              </h2>
              <p className="sectionSubtitle">
                We build small aesthetic furniture for spaces that host people — and moments.
              </p>
            </m.header>

            <m.ul
              className="bullets"
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.75 } },
              }}
            >
              <li>We design in-house.</li>
              <li>We manufacture with trusted partners.</li>
              <li>We obsess over quality, finish &amp; durability.</li>
              <li>Every piece is thoughtfully created for modern spaces.</li>
            </m.ul>

            <m.div
              className="aboutCallout"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <p>The goal is simple: a space that feels intentional — even when it’s small.</p>
            </m.div>
          </m.div>

          <m.div
            className="aboutMedia"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75 }}
          >
            <div className="aboutMediaGrid">
              <ParallaxImage
                src={aboutImages[0].src}
                alt={aboutImages[0].alt}
                fill
                className="aboutImage"
                sizes="(max-width: 900px) 92vw, 36vw"
                wrapperClassName="aboutImageWrap aboutImageWrapLarge"
                strength={24}
              />
              <ParallaxImage
                src={aboutImages[1].src}
                alt={aboutImages[1].alt}
                fill
                className="aboutImage"
                sizes="(max-width: 900px) 92vw, 26vw"
                wrapperClassName="aboutImageWrap aboutImageWrapSmall"
                strength={18}
              />
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
