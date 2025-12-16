'use client';

import { m } from 'framer-motion';
import { AnimatedGradient } from '../ui/AnimatedGradient';
import { EyeIcon, ShieldIcon, TouchIcon } from '../icons/PhilosophyIcons';

const statements = [
  {
    title: 'Designed to be seen',
    description: 'Clean silhouettes, premium materials, and proportion that reads from across the room.',
    Icon: EyeIcon,
  },
  {
    title: 'Built to be felt',
    description: 'Edges, textures, weight — every touchpoint is tuned for calm confidence.',
    Icon: TouchIcon,
  },
  {
    title: 'Crafted to last',
    description: 'Durable construction and finishes that age beautifully — not loudly.',
    Icon: ShieldIcon,
  },
] as const;

export function ProductPhilosophySection() {
  return (
    <section id="philosophy" className="section sectionGradient" aria-labelledby="philosophy-title">
      <AnimatedGradient className="sectionGradientBg" />
      <div className="container">
        <header className="sectionHeader">
          <p className="sectionKicker">Product philosophy</p>
          <h2 id="philosophy-title" className="sectionTitle">
            Minimal on purpose. Cinematic by nature.
          </h2>
        </header>

        <m.div
          className="stack"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.28 } },
          }}
        >
          {statements.map(({ title, description, Icon }) => (
            <m.div
              key={title}
              className="statement"
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.75 } },
              }}
            >
              <div className="statementIcon" aria-hidden>
                <Icon width={26} height={26} />
              </div>
              <div className="statementBody">
                <h3 className="statementTitle">{title}</h3>
                <p className="statementText">{description}</p>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
