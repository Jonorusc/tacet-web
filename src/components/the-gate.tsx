"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function TheGate() {
    const [email, setEmail] = useState("");
    const [focused, setFocused] = useState(false);

    return (
        <section className="relative flex h-[80vh] w-full flex-col items-center justify-center border-t border-white/5 bg-void px-6">
            <div className="w-full max-w-2xl text-center">
                <h2 className="mb-12 font-display text-4xl font-bold md:text-6xl">
                    Join the Silence.
                </h2>

                <div className="relative mx-auto w-full max-w-md flex justify-center">
                    <Link href="/signup">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative flex items-center gap-4 px-8 py-4 bg-starlight text-void font-mono text-sm uppercase tracking-widest rounded transition-all hover:shadow-[0_0_40px_rgba(229,229,229,0.3)]"
                        >
                            <span>Enter the Quiet</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />

                            {/* Button Glow Effect */}
                            <div className="absolute inset-0 rounded bg-starlight blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        </motion.button>
                    </Link>
                </div>

                <p className="mt-12 text-sm text-white/30">
                    Calculated silence. Instant access.
                </p>
            </div>

            <footer className="absolute bottom-6 w-full text-center text-xs text-white/10">
                © 2026 Tacet Inc. All noise cancelled.
            </footer>
        </section>
    );
}
