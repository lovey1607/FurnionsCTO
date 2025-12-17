'use client';

import Image from 'next/image';
import { m, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import { PRODUCTS } from '../../lib/useScrollAnimation';

export function FeaturedProductsSection() {
    const shouldReduceMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    });

    // Background particles effect
    const particleY = useTransform(smoothProgress, [0, 1], [0, -200]);

    return (
        <section
            ref={sectionRef}
            id="featured-products"
            className="featuredSection"
            aria-labelledby="featured-title"
        >
            {/* Animated background */}
            <div className="featuredBg">
                <m.div className="featuredParticles" style={{ y: particleY }}>
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="featuredParticle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`,
                            }}
                        />
                    ))}
                </m.div>
            </div>

            <div className="container">
                {/* Section header */}
                <m.header
                    className="featuredHeader"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="sectionKicker">Featured Products</p>
                    <h2 id="featured-title" className="featuredTitle">
                        Meet the Collection
                    </h2>
                    <p className="featuredSubtitle">
                        Each piece tells a story of thoughtful design and premium craftsmanship.
                    </p>
                </m.header>

                {/* 3D Card Stack Gallery */}
                <div className="featuredGallery">
                    {PRODUCTS.map((product, index) => (
                        <FeaturedCard
                            key={product.id}
                            product={product}
                            index={index}
                            totalProducts={PRODUCTS.length}
                            isHovered={hoveredIndex === index}
                            otherHovered={hoveredIndex !== null && hoveredIndex !== index}
                            onHover={() => setHoveredIndex(index)}
                            onLeave={() => setHoveredIndex(null)}
                            progress={smoothProgress}
                            isReducedMotion={shouldReduceMotion}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface FeaturedCardProps {
    product: (typeof PRODUCTS)[number];
    index: number;
    totalProducts: number;
    isHovered: boolean;
    otherHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
    progress: ReturnType<typeof useSpring>;
    isReducedMotion: boolean | null;
}

function FeaturedCard({
    product,
    index,
    totalProducts,
    isHovered,
    otherHovered,
    onHover,
    onLeave,
    progress,
    isReducedMotion,
}: FeaturedCardProps) {
    const cardRef = useRef<HTMLDivElement | null>(null);

    // Card entrance timing
    const segmentStart = index / totalProducts;
    const segmentEnd = (index + 1) / totalProducts;

    // Staggered reveal
    const cardOpacity = useTransform(
        progress,
        [segmentStart * 0.5, segmentStart * 0.5 + 0.1],
        [0, 1]
    );

    const cardY = useTransform(
        progress,
        [segmentStart * 0.5, segmentStart * 0.5 + 0.15],
        isReducedMotion ? [0, 0] : [100, 0]
    );

    // 3D stack effect - cards offset based on index
    const baseRotateY = (index - (totalProducts - 1) / 2) * 8;
    const stackOffset = (index - (totalProducts - 1) / 2) * 30;

    return (
        <m.div
            ref={cardRef}
            className="featuredCard"
            style={{
                opacity: cardOpacity,
                y: cardY,
                zIndex: isHovered ? 50 : totalProducts - index,
            }}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            animate={
                isReducedMotion
                    ? {}
                    : isHovered
                        ? {
                            scale: 1.08,
                            rotateY: 0,
                            x: 0,
                            zIndex: 50,
                        }
                        : otherHovered
                            ? {
                                scale: 0.92,
                                rotateY: baseRotateY * 0.5,
                                x: stackOffset * 0.5,
                                opacity: 0.6,
                            }
                            : {
                                scale: 1,
                                rotateY: baseRotateY,
                                x: stackOffset,
                            }
            }
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            {/* Card glow effect */}
            <m.div
                className="featuredCardGlow"
                animate={{ opacity: isHovered ? 0.8 : 0.3 }}
                transition={{ duration: 0.3 }}
            />

            {/* Product image */}
            <div className="featuredCardImage">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 85vw, 350px"
                    className="featuredImage"
                />

                {/* Spotlight overlay on hover */}
                <m.div
                    className="featuredSpotlight"
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                />
            </div>

            {/* Product info */}
            <m.div
                className="featuredCardInfo"
                animate={{
                    y: isHovered ? 0 : 10,
                    opacity: isHovered ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
            >
                <span className="featuredCardNumber">0{index + 1}</span>
                <h3 className="featuredCardName">{product.name}</h3>
                <p className="featuredCardTagline">{product.tagline}</p>

                {/* Expanded description on hover */}
                <m.p
                    className="featuredCardDescription"
                    animate={{
                        height: isHovered ? 'auto' : 0,
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {product.description}
                </m.p>
            </m.div>

            {/* Decorative corner */}
            <div className="featuredCardCorner" />
        </m.div>
    );
}
