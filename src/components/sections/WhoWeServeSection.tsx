'use client';

import { m } from 'framer-motion';
import { ParallaxImage } from '../ui/ParallaxImage';

const items = [
  {
    label: 'Cafes',
    copy: 'Elevate your space — without over-designing it.',
    image:
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80',
    alt: 'A minimal cafe interior with warm wooden furniture and soft lighting',
  },
  {
    label: 'Airbnbs',
    copy: 'Create lasting memories through thoughtful details.',
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
    alt: 'A serene Airbnb-style room with modern furniture',
  },
  {
    label: 'Offices',
    copy: 'Calm focus. Quiet confidence. Work that feels premium.',
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    alt: 'A modern office with sleek, small aesthetic furniture',
  },
  {
    label: 'Homes',
    copy: 'Small pieces that make every day feel designed.',
    image:
      'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1600&q=80',
    alt: 'A cozy home corner with a chair and warm tones',
  },
] as const;

export function WhoWeServeSection() {
  return (
    <section id="who-we-serve" className="section" aria-labelledby="who-we-serve-title">
      <div className="container">
        <header className="sectionHeader">
          <p className="sectionKicker">Who we serve</p>
          <h2 id="who-we-serve-title" className="sectionTitle">
            Designed for modern spaces — from first impression to last detail.
          </h2>
          <p className="sectionSubtitle">
            Cafes, Airbnbs, offices and homes all need the same thing: furniture that looks intentional.
          </p>
        </header>

        <m.div
          className="cardsGrid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18 } },
          }}
        >
          {items.map((item) => (
            <m.article
              key={item.label}
              className="serveCard"
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <div className="serveCardMedia">
                <ParallaxImage
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="serveCardImage"
                  sizes="(max-width: 900px) 92vw, 46vw"
                  wrapperClassName="serveCardImageWrap"
                />
                <div className="serveCardOverlay" />
              </div>

              <div className="serveCardBody">
                <p className="serveCardLabel">{item.label}</p>
                <p className="serveCardCopy">{item.copy}</p>
              </div>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
