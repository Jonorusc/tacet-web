import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { Hero } from "@/components/hero";
import { FeatureStream } from "@/components/feature-stream";
import { TheGate } from "@/components/the-gate";
import { Pricing } from "@/components/pricing";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-void selection:bg-white/20">
      <NoiseOverlay />
      <Hero />
      <FeatureStream />
      <Pricing />
      <TheGate />
    </main>
  );
}
