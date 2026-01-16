"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6">
            <div className="z-10 flex flex-col items-center text-center">
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-display text-8xl font-bold uppercase tracking-tighter sm:text-[10rem] md:text-[12rem] leading-none"
                    >
                        TACET
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="mt-6 max-w-md text-lg text-starlight/60 md:text-xl font-light"
                >
                    In an economy of attention, silence is the ultimate luxury.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="mt-12"
                >
                    <Link href="/signup">
                        <button className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-starlight/20 px-8 py-3 transition-colors hover:border-starlight/50 hover:bg-starlight/5">
                            <span className="relative z-10 font-medium tracking-wide">Enter the Quiet</span>
                            <span className="absolute inset-0 z-0 bg-starlight/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </button>
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Chaos Circles */}
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                        filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="h-[40vw] w-[40vw] rounded-full border border-starlight/10 md:h-[30vw] md:w-[30vw]"
                />
                <motion.div
                    animate={{
                        rotate: [360, 0],
                        scale: [1.2, 1, 1.2],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute h-[50vw] w-[50vw] rounded-full border border-starlight/10 md:h-[35vw] md:w-[35vw]"
                />
                <motion.div
                    animate={{
                        rotate: [0, 180],
                        scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute h-[60vw] w-[60vw] rounded-full border border-dashed border-starlight/5 md:h-[45vw] md:w-[45vw]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 animate-bounce opacity-50"
            >
                <ArrowDown className="text-starlight/40" />
            </motion.div>
        </section>
    );
}
