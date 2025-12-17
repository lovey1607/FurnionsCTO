'use client';

import Image from 'next/image';
import { m, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { PRODUCTS } from '../../lib/useScrollAnimation';

export function ProductShowcaseSection() {
    const shouldReduceMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);

    // Track scroll progress through the section (sticky for multiple products)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Calculate which product is active based on scroll progress
    // Each product gets ~20% of the scroll (5 products)
    const activeProduct = useTransform(smoothProgress, [0, 1], [0, PRODUCTS.length - 0.01]);

    // Background gradient shift
    const gradientHue = useTransform(smoothProgress, [0, 1], [30, 150]);

    // Background gradient shift - move transform outside JSX
    const backgroundGradient = useTransform(
        gradientHue,
        (h: number) =>
            `radial-gradient(ellipse at 30% 30%, hsla(${h}, 40%, 15%, 0.4), transparent 60%),
             radial-gradient(ellipse at 70% 70%, hsla(${h + 60}, 35%, 12%, 0.3), transparent 50%)`
    );

    return (
        <section
            ref={sectionRef}
            id="product-showcase"
            className="productShowcase"
            aria-labelledby="showcase-title"
        >
            <div className="productShowcaseSticky">
                {/* Dynamic gradient background */}
                <m.div
                    className="productShowcaseBg"
                    style={{
                        background: backgroundGradient,
                    }}
                />

                {/* Section header */}
                <m.div
                    className="productShowcaseHeader"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="sectionKicker">Our Collection</p>
                    <h2 id="showcase-title" className="productShowcaseTitle">
                        Crafted to Inspire
                    </h2>
                </m.div>

                {/* Product display area */}
                <div className="productShowcaseContent">
                    {/* Central product image */}
                    <div className="productImageContainer">
                        {PRODUCTS.map((product, index) => (
                            <ProductImage
                                key={product.id}
                                product={product}
                                index={index}
                                progress={smoothProgress}
                                isReducedMotion={shouldReduceMotion}
                            />
                        ))}
                    </div>

                    {/* Product info callouts */}
                    <div className="productInfoContainer">
                        {PRODUCTS.map((product, index) => (
                            <ProductInfo
                                key={product.id}
                                product={product}
                                index={index}
                                progress={smoothProgress}
                                isReducedMotion={shouldReduceMotion}
                            />
                        ))}
                    </div>
                </div>

                {/* Scroll progress indicator */}
                <div className="productProgressBar">
                    <m.div
                        className="productProgressFill"
                        style={{ scaleX: smoothProgress }}
                    />
                </div>

                {/* Product navigation dots */}
                <div className="productDots">
                    {PRODUCTS.map((product, index) => (
                        <ProductDot
                            key={product.id}
                            index={index}
                            progress={smoothProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface ProductImageProps {
    product: (typeof PRODUCTS)[number];
    index: number;
    progress: ReturnType<typeof useSpring>;
    isReducedMotion: boolean | null;
}

function ProductImage({ product, index, progress, isReducedMotion }: ProductImageProps) {
    const numProducts = PRODUCTS.length;
    const segmentSize = 1 / numProducts;
    const start = index * segmentSize;
    const mid = start + segmentSize * 0.5;
    const end = start + segmentSize;

    // Fade and scale for this product
    const opacity = useTransform(progress,
        index === 0
            ? [0, start + 0.05, mid, end - 0.05, end]
            : [start - 0.05, start + 0.05, mid, end - 0.05, end + 0.05],
        index === 0
            ? [1, 1, 1, 1, 0]
            : index === numProducts - 1
                ? [0, 1, 1, 1, 1]
                : [0, 1, 1, 1, 0]
    );

    const scale = useTransform(progress,
        [start, mid, end],
        isReducedMotion ? [1, 1, 1] : [0.85, 1, 0.85]
    );

    const rotateY = useTransform(progress,
        [start, mid, end],
        isReducedMotion ? [0, 0, 0] : [-15, 0, 15]
    );

    const zIndex = useTransform(progress,
        [start, mid, end],
        [1, 10, 1]
    );

    return (
        <m.div
            className="productImageWrapper"
            style={{
                opacity,
                scale,
                rotateY,
                zIndex,
            }}
        >
            <div className="productImageInner">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 900px) 80vw, 50vw"
                    className="productImage"
                    priority={index === 0}
                />
                <div className="productImageGlow" />
            </div>
        </m.div>
    );
}

interface ProductInfoProps {
    product: (typeof PRODUCTS)[number];
    index: number;
    progress: ReturnType<typeof useSpring>;
    isReducedMotion: boolean | null;
}

function ProductInfo({ product, index, progress, isReducedMotion }: ProductInfoProps) {
    const numProducts = PRODUCTS.length;
    const segmentSize = 1 / numProducts;
    const start = index * segmentSize;
    const mid = start + segmentSize * 0.5;
    const end = start + segmentSize;

    // Text reveal animations
    const opacity = useTransform(progress,
        index === 0
            ? [0, start + 0.05, mid, end - 0.1, end]
            : [start, start + 0.1, mid, end - 0.1, end],
        index === 0
            ? [1, 1, 1, 1, 0]
            : index === numProducts - 1
                ? [0, 1, 1, 1, 1]
                : [0, 1, 1, 1, 0]
    );

    const x = useTransform(progress,
        [start, start + 0.1, end - 0.1, end],
        isReducedMotion ? [0, 0, 0, 0] : index % 2 === 0 ? [-60, 0, 0, 60] : [60, 0, 0, -60]
    );

    return (
        <m.div
            className={`productInfo ${index % 2 === 0 ? 'productInfoLeft' : 'productInfoRight'}`}
            style={{ opacity, x }}
        >
            <span className="productNumber">0{index + 1}</span>
            <h3 className="productName">{product.name}</h3>
            <p className="productTagline">{product.tagline}</p>
            <p className="productDescription">{product.description}</p>
        </m.div>
    );
}

interface ProductDotProps {
    index: number;
    progress: ReturnType<typeof useSpring>;
}

function ProductDot({ index, progress }: ProductDotProps) {
    const numProducts = PRODUCTS.length;
    const segmentSize = 1 / numProducts;
    const start = index * segmentSize;
    const end = start + segmentSize;
    const mid = start + segmentSize * 0.5;

    const scale = useTransform(progress,
        [start, mid, end],
        [1, 1.5, 1]
    );

    const opacity = useTransform(progress,
        [start - 0.05, start + 0.05, end - 0.05, end + 0.05],
        [0.4, 1, 1, 0.4]
    );

    return (
        <m.button
            className="productDot"
            style={{ scale, opacity }}
            aria-label={`View product ${index + 1}`}
        />
    );
}
