"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Disc, MessageSquare, Mail, Calendar } from "lucide-react";

type Signal = {
    id: string;
    source: string;
    message: string;
    status: "blocked" | "allowed";
    timestamp: string;
};

const MOCK_SIGNALS = [
    { source: "Slack", message: "@channel Update to staging?", icon: MessageSquare },
    { source: "Gmail", message: "Reminder: Dentist Apt", icon: Mail },
    { source: "Calendar", message: "Meeting with Dev Team", icon: Calendar },
    { source: "Discord", message: "Raid tonight?", icon: Disc },
];

export function LiveStream() {
    const [signals, setSignals] = useState<Signal[]>([]);

    // Simulation effect -> Adds a new signal every few seconds
    useEffect(() => {
        const interval = setInterval(() => {
            const randomSignal = MOCK_SIGNALS[Math.floor(Math.random() * MOCK_SIGNALS.length)];
            const status = Math.random() > 0.7 ? "allowed" : "blocked"; // mostly blocked

            const newSignal: Signal = {
                id: Math.random().toString(36).substr(2, 9),
                source: randomSignal.source,
                message: randomSignal.message,
                status: status as "blocked" | "allowed",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            };

            setSignals((prev) => [newSignal, ...prev].slice(0, 8)); // Keep last 8
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full flex flex-col border border-grid-line bg-void/30 backdrop-blur-sm relative overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-grid-line flex justify-between items-center bg-void/50">
                <h3 className="font-mono text-sm tracking-widest text-starlight/70 uppercase">Live Signal Stream</h3>
                <div className="flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-signal-block animate-pulse" />
                    <span className="font-mono text-[10px] text-signal-block">FILTER ACTIVE</span>
                </div>
            </div>

            {/* List */}
            <div className="flex-1 p-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void/90 pointer-events-none z-10" />

                <ul className="space-y-3">
                    <AnimatePresence initial={false}>
                        {signals.map((signal) => (
                            <motion.li
                                key={signal.id}
                                initial={{ opacity: 0, x: -20, height: 0 }}
                                animate={{ opacity: 1, x: 0, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className="flex items-center gap-3 p-2 rounded border border-starlight/5 bg-starlight/5"
                            >
                                <span className="font-mono text-[10px] text-starlight/30 w-16">{signal.timestamp}</span>

                                <div className={`w-1 h-8 rounded-full ${signal.status === 'blocked' ? 'bg-signal-block' : 'bg-signal-allow'} shadow-[0_0_8px_currentColor]`} />

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-display font-bold text-sm text-starlight">{signal.source}</span>
                                        {signal.status === 'blocked' ? (
                                            <span className="text-[10px] px-1 rounded bg-signal-block/10 text-signal-block border border-signal-block/20">BLOCKED</span>
                                        ) : (
                                            <span className="text-[10px] px-1 rounded bg-signal-allow/10 text-signal-allow border border-signal-allow/20">ALLOWED</span>
                                        )}
                                    </div>
                                    <p className="font-mono text-xs text-starlight/60 truncate">{signal.message}</p>
                                </div>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>

                {signals.length === 0 && (
                    <div className="h-full flex items-center justify-center">
                        <span className="font-mono text-xs text-starlight/20 animate-pulse">WAITING FOR SIGNALS...</span>
                    </div>
                )}
            </div>
        </div>
    );
}
