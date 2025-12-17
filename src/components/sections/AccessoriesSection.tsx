'use client';

import Image from 'next/image';
import { m, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';

const ACCESSORIES = [
    {
        id: 'drum-table',
        name: 'Drum Side Table',
        tagline: 'Architectural elegance',
        description: 'Intricate lattice pattern drum table with timeless appeal.',
        image: '/products/drum-side-table.jpg',
        color: 'rgba(180, 140, 100, 0.3)',
    },
    {
        id: 'leaf-coasters',
        name: 'Botanical Coasters',
        tagline: 'Nature-inspired details',
        description: 'Hand-engraved wooden coasters with botanical leaf patterns.',
        image: '/products/leaf-coasters.jpg',
        color: 'rgba(139, 179, 139, 0.3)',
    },
] as const;

export function AccessoriesSection() {
    const shouldReduceMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    });

    // Background parallax
    const bgY = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 100]);

    return (
        <section
            ref={sectionRef}
            id="accessories"
            className="accessoriesSection"
            aria-labelledby="accessories-title"
            style={{ position: 'relative' }}
        >
            {/* Parallax background pattern */}
            <m.div className="accessoriesBg" style={{ y: bgY }}>
                <div className="accessoriesPattern" />
            </m.div>

            <div className="container">
                {/* Section header */}
                <m.header
                    className="accessoriesHeader"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="sectionKicker">New Arrivals</span>
                    <h2 id="accessories-title" className="accessoriesTitle">
                        Small Details, Big Impact
                    </h2>
                    <p className="accessoriesSubtitle">
                        Thoughtful accessories that complete your space with style.
                    </p>
                </m.header>

                {/* Floating cards showcase */}
                <div className="accessoriesShowcase">
                    {ACCESSORIES.map((item, index) => (
                        <AccessoryCard
                            key={item.id}
                            item={item}
                            index={index}
                            isActive={activeIndex === index}
                            onHover={() => setActiveIndex(index)}
                            isReducedMotion={shouldReduceMotion}
                        />
                    ))}
                </div>

                {/* Feature highlights */}
                <m.div
                    className="accessoriesFeatures"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    {['Handcrafted', 'Sustainable', 'Unique'].map((feature, i) => (
                        <m.div
                            key={feature}
                            className="accessoriesFeature"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            whileHover={{ y: -5, scale: 1.05 }}
                        >
                            <span className="accessoriesFeatureIcon">
                                {i === 0 ? '✋' : i === 1 ? '🌱' : '✨'}
                            </span>
                            <span>{feature}</span>
                        </m.div>
                    ))}
                </m.div>
            </div>
        </section>
    );
}

interface AccessoryCardProps {
    item: (typeof ACCESSORIES)[number];
    index: number;
    isActive: boolean;
    onHover: () => void;
    isReducedMotion: boolean | null;
}

function AccessoryCard({ item, index, isActive, onHover, isReducedMotion }: AccessoryCardProps) {
    const cardRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress: cardProgress } = useScroll({
        target: cardRef,
        offset: ['start 90%', 'start 50%'],
    });

    const cardY = useTransform(cardProgress, [0, 1], isReducedMotion ? [0, 0] : [80, 0]);
    const cardOpacity = useTransform(cardProgress, [0, 0.5], [0, 1]);
    const cardRotate = useTransform(cardProgress, [0, 1], isReducedMotion ? [0, 0] : [10, 0]);

    return (
        <m.div
            ref={cardRef}
            className={`accessoryCard ${isActive ? 'accessoryCardActive' : ''}`}
            style={{
                y: cardY,
                opacity: cardOpacity,
                rotateY: cardRotate,
            }}
            onMouseEnter={onHover}
            whileHover={isReducedMotion ? undefined : {
                scale: 1.03,
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 },
            }}
        >
            {/* Glow effect */}
            <m.div
                className="accessoryCardGlow"
                style={{ background: item.color }}
                animate={{ opacity: isActive ? 0.8 : 0.3 }}
                transition={{ duration: 0.3 }}
            />

            {/* Image */}
            <div className="accessoryCardImage">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 90vw, 400px"
                    className="accessoryImage"
                />
                <m.div
                    className="accessoryCardShine"
                    animate={{ x: isActive ? '200%' : '-100%' }}
                    transition={{ duration: 0.6 }}
                />
            </div>

            {/* Card content */}
            <div className="accessoryCardContent">
                <m.span
                    className="accessoryCardTag"
                    animate={{
                        backgroundColor: isActive ? 'rgba(139, 69, 19, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                    }}
                >
                    New
                </m.span>
                <h3 className="accessoryCardName">{item.name}</h3>
                <p className="accessoryCardTagline">{item.tagline}</p>
                <m.p
                    className="accessoryCardDescription"
                    animate={{
                        opacity: isActive ? 1 : 0,
                        height: isActive ? 'auto' : 0,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {item.description}
                </m.p>
                <m.button
                    className="accessoryCardButton"
                    animate={{
                        opacity: isActive ? 1 : 0.7,
                        scale: isActive ? 1 : 0.95,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    View Details
                    <span className="accessoryCardButtonArrow">→</span>
                </m.button>
            </div>

            <div className="accessoryCardCorner" />
        </m.div>
    );
}
