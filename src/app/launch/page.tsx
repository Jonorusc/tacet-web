'use client';

import { useClerk } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function LaunchPage() {
    const { signOut } = useClerk();
    const [attemptedDeepLink, setAttemptedDeepLink] = useState(false);

    useEffect(() => {
        // Attempt to open the Tacet desktop app via custom protocol
        const timeout = setTimeout(() => {
            window.location.href = 'tacet://open';
            setAttemptedDeepLink(true);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="min-h-screen bg-void flex items-center justify-center p-4 relative overflow-hidden font-display">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),rgba(255,255,255,0))]" />
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] pointer-events-none animate-[noise_0.5s_steps(2)_infinite]" />

            <div className="relative z-10 text-center max-w-lg w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-signal-allow/10 flex items-center justify-center border border-signal-allow/20">
                            <CheckCircle2 className="w-8 h-8 text-signal-allow" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-starlight mb-4 tracking-tighter">
                        Authentication Verified
                    </h1>

                    <p className="text-white/60 mb-8 font-body leading-relaxed max-w-sm mx-auto">
                        Your identity has been confirmed.
                        {attemptedDeepLink ? " Launching Tacet Protocol..." : " Preparing to launch Tacet Protocol..."}
                    </p>

                    <div className="flex flex-col gap-4 justify-center items-center">
                        <button
                            onClick={() => window.location.href = 'tacet://open'}
                            className="flex items-center gap-2 px-8 py-4 rounded-full bg-starlight text-void hover:bg-white transition-all duration-300 font-body text-sm font-medium hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] w-full sm:w-auto"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Open Tacet App
                        </button>


                        <div className="flex items-center gap-6 mt-4 w-full justify-center">
                            <Link
                                href="/"
                                className="text-white/40 hover:text-white/80 text-xs font-mono transition-colors"
                            >
                                Return to Landing
                            </Link>
                            <button
                                onClick={() => signOut({ redirectUrl: '/' })}
                                className="text-rose-500/60 hover:text-rose-500 text-xs font-mono transition-colors"
                            >
                                Disconnect Signal
                            </button>
                        </div>
                    </div>
                </motion.div>
                <span className="text-white/60 text-xs font-mono ">If Tacet App is not opening, try to open it manually from your applications folder.</span>
            </div>
        </div>
    );
}
