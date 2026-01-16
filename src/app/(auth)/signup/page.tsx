"use client";

import { useSignUp, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const { isLoaded: isUserLoaded, isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isUserLoaded && isSignedIn) {
            router.push("/launch");
        }
    }, [isUserLoaded, isSignedIn, router]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [verifying, setVerifying] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        setLoading(true);
        setError("");

        try {
            await signUp.create({
                firstName,
                emailAddress: email,
                password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setVerifying(true);
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            setError(err.errors?.[0]?.message || "Failed to create account.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerification = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        setLoading(true);
        setError("");

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push("/launch");
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2));
                setError("Verification failed. Please try again.");
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            setError(err.errors?.[0]?.message || "Verification failed.");
        } finally {
            setLoading(false);
        }
    };

    if (verifying) {
        return (
            <main className="relative min-h-screen w-full bg-void selection:bg-white/20 flex items-center justify-center p-6">
                {/* ... existing layout for verification ... */}
                <div className="w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-void/50 border border-starlight/10 p-8 rounded-2xl backdrop-blur-sm"
                    >
                        <h1 className="font-display text-4xl font-bold text-starlight mb-2">
                            Verify Signal.
                        </h1>
                        <p className="text-starlight/60 font-mono text-sm mb-8">
                            Enter the code sent to {email}
                        </p>

                        <form onSubmit={handleVerification} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-mono text-starlight/40 uppercase tracking-wider">Verification Code</label>
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                    className="w-full bg-starlight/5 border border-starlight/10 rounded px-4 py-3 text-starlight placeholder:text-starlight/20 focus:outline-none focus:border-signal-allow/50 transition-colors font-mono text-sm tracking-[0.5em] text-center"
                                    placeholder="000000"
                                />
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 text-rose-500 text-xs font-mono bg-rose-500/10 p-3 rounded border border-rose-500/20">
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-6 bg-starlight text-void font-mono text-sm uppercase tracking-widest py-4 rounded hover:bg-starlight/90 transition-all flex items-center justify-center gap-2 group"
                            >
                                {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <span>Verify Identity</span>
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
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                className="w-full bg-starlight/5 border border-starlight/10 rounded px-4 py-3 text-starlight placeholder:text-starlight/20 focus:outline-none focus:border-signal-allow/50 transition-colors font-mono text-sm"
                                placeholder="Operator"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-mono text-starlight/40 uppercase tracking-wider">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-starlight/5 border border-starlight/10 rounded px-4 py-3 text-starlight placeholder:text-starlight/20 focus:outline-none focus:border-signal-allow/50 transition-colors font-mono text-sm"
                                placeholder="operator@echo.ai"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-mono text-starlight/40 uppercase tracking-wider">Key</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={8}
                                required
                                className="w-full bg-starlight/5 border border-starlight/10 rounded px-4 py-3 text-starlight placeholder:text-starlight/20 focus:outline-none focus:border-signal-allow/50 transition-colors font-mono text-sm"
                                placeholder="••••••••••••"
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-rose-500 text-xs font-mono bg-rose-500/10 p-3 rounded border border-rose-500/20">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !isLoaded}
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

                    <div className="mt-8 text-center">
                        <p className="text-starlight/40 text-xs font-mono">
                            Already have an identity?{' '}
                            <Link href="/signin" className="text-starlight hover:underline">
                                Resume Protocol
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
