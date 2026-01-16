'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function NotFound() {
    const [attemptedDeepLink, setAttemptedDeepLink] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            window.location.href = 'tacet://open';
            setAttemptedDeepLink(true);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="min-h-screen bg-void flex items-center justify-center p-4 relative overflow-hidden font-display">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),rgba(255,255,255,0))]" />
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] pointer-events-none animate-[noise_0.5s_steps(2)_infinite]" />

            <div className="relative z-10 text-center max-w-lg w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-starlight to-white/10 mb-4 tracking-tighter">
                        404
                    </h1>
                    <h2 className="text-2xl text-starlight mb-6 font-medium">Signal Lost</h2>

                    <p className="text-white/60 mb-8 font-body leading-relaxed max-w-sm mx-auto">
                        The frequency you are looking for does not exist in this sector.
                        {attemptedDeepLink && " We attempted to redirect you to the Tacet App."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-starlight transition-all duration-300 font-body text-sm hover:scale-105 active:scale-95 backdrop-blur-md"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Return Home
                        </Link>

                        <button
                            onClick={() => window.location.href = 'tacet://open'}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-starlight text-void hover:bg-white transition-all duration-300 font-body text-sm font-medium hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Open Tacet App
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        </div>
    );
}
