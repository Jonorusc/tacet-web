"use client";

import { motion } from "framer-motion";
import { Check, Cpu, VolumeX, Globe } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

type Language = "en" | "pt";
type Billing = "monthly" | "yearly";

const CONTENT = {
    en: {
        title: "Choose your silence.",
        subtitle: "Tacet runs locally on your machine. Your data never leaves the shield.",
        monthly: "Monthly",
        yearly: "Yearly",
        save: "Save 10%",
        tiers: [
            {
                name: "TACET NULL",
                price: { monthly: "$0", yearly: "$0" },
                period: "forever",
                description: "Absolute silence. No judgment.",
                features: [
                    "Binary Shield (On/Off)",
                    "System Audio Mute",
                    "Visual Fog (Grayscale)",
                    "Process Blocking",
                ],
                cta: "Download Beta",
            },
            {
                name: "TACET CORE",
                price: { monthly: "$5", yearly: "$54" },
                period: { monthly: "/ mo", yearly: "/ year" },
                description: "Intelligent control. Signal over noise.",
                features: [
                    "Local AI Semantic Filter",
                    "Natural Language Tuning",
                    "Network Gap (DNS Sinkhole)",
                    "Spotify Exception Mode",
                    "Focus Analytics",
                ],
                cta: "Create Account",
            },
        ],
    },
    pt: {
        title: "Escolha o silêncio.",
        subtitle: "Tacet roda localmente no seu computador. Seus dados nunca saem do escudo.",
        monthly: "Mensal",
        yearly: "Anual",
        save: "Economize 10%",
        tiers: [
            {
                name: "TACET NULL",
                price: { monthly: "R$0", yearly: "R$0" },
                period: "sempre",
                description: "Silêncio absoluto. Sem julgamentos.",
                features: [
                    "Escudo Binário (On/Off)",
                    "Mudo de Sistema",
                    "Névoa Visual (Grayscale)",
                    "Bloqueio de Processos",
                ],
                cta: "Baixar Beta",
            },
            {
                name: "TACET CORE",
                price: { monthly: "R$30", yearly: "R$320" },
                period: { monthly: "/ mês", yearly: "/ ano" },
                description: "Controle inteligente. Sinal sobre ruído.",
                features: [
                    "Filtro Semântico IA Local",
                    "Ajuste em Linguagem Natural",
                    "Simulador de Falha de Rede",
                    "Modo Exceção Spotify",
                    "Analytics de Foco",
                ],
                cta: "Criar Conta",
            },
        ],
    },
};

const ICONS = [VolumeX, Cpu];

export function Pricing() {
    const [lang, setLang] = useState<Language>("en");
    const [billing, setBilling] = useState<Billing>("yearly");

    const t = CONTENT[lang];

    return (
        <section className="relative py-32 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="space-y-4 max-w-xl">
                        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter text-starlight">
                            {t.title}
                        </h2>
                        <p className="font-mono text-starlight/60">
                            {t.subtitle}
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                        {/* Language Toggle */}
                        <div className="flex bg-void/50 border border-starlight/10 rounded-full p-1">
                            <button
                                onClick={() => setLang('en')}
                                className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${lang === 'en' ? 'bg-starlight/10 text-starlight' : 'text-starlight/40 hover:text-starlight'}`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setLang('pt')}
                                className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${lang === 'pt' ? 'bg-starlight/10 text-starlight' : 'text-starlight/40 hover:text-starlight'}`}
                            >
                                PT
                            </button>
                        </div>

                        {/* Billing Toggle */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setBilling("monthly")}
                                className={`text-sm font-mono transition-colors ${billing === "monthly" ? "text-starlight" : "text-starlight/40"
                                    }`}
                            >
                                {t.monthly}
                            </button>

                            <button
                                onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
                                className="relative w-12 h-6 rounded-full border border-starlight/10 bg-void/50 transition-colors"
                            >
                                <motion.div
                                    animate={{ x: billing === "yearly" ? 24 : 2 }}
                                    className="absolute top-1 bottom-1 w-4 rounded-full bg-starlight"
                                />
                            </button>

                            <button
                                onClick={() => setBilling("yearly")}
                                className={`text-sm font-mono transition-colors ${billing === "yearly" ? "text-starlight" : "text-starlight/40"
                                    }`}
                            >
                                {t.yearly}
                            </button>
                            <span className="text-[10px] bg-signal-allow/10 text-signal-allow px-2 py-0.5 rounded border border-signal-allow/20 font-mono">
                                {t.save}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {t.tiers.map((tier, i) => {
                        const Icon = ICONS[i];
                        const isCore = i === 1;
                        const accentText = isCore ? "text-signal-allow" : "text-starlight";
                        const accentBorder = isCore ? "border-signal-allow/20" : "border-starlight/10";
                        const glow = isCore ? "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.1)]" : "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]";

                        return (
                            <div
                                key={tier.name}
                                className={`relative group p-8 md:p-12 rounded-2xl border bg-void/50 backdrop-blur-sm transition-all duration-500 hover:scale-[1.01] ${accentBorder} ${glow}`}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-8">
                                    <div>
                                        <h3
                                            className={`font-mono text-sm tracking-[0.2em] uppercase mb-2 ${accentText}`}
                                        >
                                            {tier.name}
                                        </h3>
                                        <div className="flex items-baseline gap-1">
                                            <motion.span
                                                key={billing} // Animate on change
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="font-display text-5xl md:text-6xl text-starlight"
                                            >
                                                {tier.price[billing as keyof typeof tier.price]}
                                            </motion.span>
                                            <span className="font-mono text-xs text-starlight/40">
                                                {/* Handle translated period structure */}
                                                {typeof tier.period === 'string' ? tier.period : tier.period[billing as keyof typeof tier.period]}
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className={`p-3 rounded-full border ${accentBorder} bg-void/50`}
                                    >
                                        <Icon className={`w-6 h-6 ${accentText}`} />
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-starlight/70 mb-10 font-light h-10">
                                    {tier.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-4 mb-12 h-40">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3">
                                            <Check
                                                className={`w-4 h-4 ${accentText} opacity-50`}
                                            />
                                            <span className="text-sm font-mono text-starlight/80">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <Link href="/signup" className="w-full">
                                    <button
                                        className={`w-full py-4 rounded font-mono text-xs uppercase tracking-widest transition-all duration-300 ${isCore
                                            ? "bg-signal-allow text-void hover:bg-signal-allow/90 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                                            : "border border-starlight/20 text-starlight hover:bg-starlight hover:text-void"
                                            }`}
                                    >
                                        {tier.cta}
                                    </button>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
