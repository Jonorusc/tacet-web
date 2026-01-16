"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function NoiseOverlay() {
    const { scrollYProgress } = useScroll();

    // The noise gets quieter (more transparent) as you scroll down
    const opacity = useTransform(scrollYProgress, [0, 0.8], [0.15, 0.03]);

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.05]"
            style={{ opacity }}
        >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 animate-noise"></div>
        </motion.div>
    );
}
