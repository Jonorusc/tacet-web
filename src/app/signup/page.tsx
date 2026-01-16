"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            router.push("/dashboard");
        }, 1500);
    };

    return (
        <main className="relative min-h-screen w-full bg-void selection:bg-white/20 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-starlight/40 hover:text-starlight text-xs font-mono mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    BACK TO SILENCE
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-void/50 border border-starlight/10 p-8 rounded-2xl backdrop-blur-sm"
                >
                    <h1 className="font-display text-4xl font-bold text-starlight mb-2">
                        Initialize Protocol.
                    </h1>
                    <p className="text-starlight/60 font-mono text-sm mb-8">
                        Create your secure Tacet identity.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-mono text-starlight/40 uppercase tracking-wider">Alias</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-starlight/5 border border-starlight/10 rounded px-4 py-3 text-starlight placeholder:text-starlight/20 focus:outline-none focus:border-signal-allow/50 transition-colors font-mono text-sm"
                                placeholder="Operator"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-mono text-starlight/40 uppercase tracking-wider">Signal Source</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-starlight/5 border border-starlight/10 rounded px-4 py-3 text-starlight placeholder:text-starlight/20 focus:outline-none focus:border-signal-allow/50 transition-colors font-mono text-sm"
                                placeholder="operator@echo.ai"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-mono text-starlight/40 uppercase tracking-wider">Key</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-starlight/5 border border-starlight/10 rounded px-4 py-3 text-starlight placeholder:text-starlight/20 focus:outline-none focus:border-signal-allow/50 transition-colors font-mono text-sm"
                                placeholder="••••••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 bg-starlight text-void font-mono text-sm uppercase tracking-widest py-4 rounded hover:bg-starlight/90 transition-all flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    <span>Establish Connection</span>
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}
