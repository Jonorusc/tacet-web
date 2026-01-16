"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const features = [
    {
        id: 1,
        title: "The Shield",
        desc: "Blocks 99% of algorithmic noise. Only urgent signals pass.",
        visual: "🛡️",
    },
    {
        id: 2,
        title: "Context AI",
        desc: "Understands 'Server Down' vs 'Happy Hour'.",
        visual: "🧠",
    },
    {
        id: 3,
        title: "Deep Flow",
        desc: "Reclaim 4-hour blocks of uninterrupted creation.",
        visual: "🌊",
    },
];

function FeatureItem({ feature }: { feature: typeof features[0] }) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        margin: "0px -50% 0px -50%" // Trigger when element crosses the vertical center line
    });

    return (
        <div
            ref={ref}
            className="group relative flex h-[60vh] w-[80vw] shrink-0 flex-col justify-between border-l border-white/10 p-12 transition-colors hover:border-white/30 md:w-[35vw]"
        >
            <motion.span
                className={`text-8xl transition-all duration-500 ${isInView
                    ? "scale-110 grayscale-0 opacity-100"
                    : "opacity-20 grayscale group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100"
                    }`}
            >
                {feature.visual}
            </motion.span>
            <div>
                <h3 className="font-display text-4xl font-semibold text-white/90">
                    {feature.title}
                </h3>
                <p className="mt-4 text-lg text-white/50">{feature.desc}</p>
            </div>
        </div>
    );
}

export function FeatureStream() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-void">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-24 px-12 md:px-24">
                    <div className="flex h-[60vh] w-[80vw] shrink-0 flex-col justify-center md:w-[40vw]">
                        <h2 className="font-display text-5xl font-bold leading-tight md:text-7xl text-white/90">
                            Stop the <br /> <span className="text-white/40">Invasion.</span>
                        </h2>
                        <p className="mt-8 text-xl text-white/50">
                            Your attention is being harvested.
                            <br />
                            Tacet builds the wall.
                        </p>
                    </div>

                    {features.map((feature) => (
                        <FeatureItem key={feature.id} feature={feature} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
