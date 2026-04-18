import { lazy, Suspense } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import BackToTop from "@/components/landing/BackToTop";
import SectionDivider from "@/components/landing/SectionDivider";
import ScrollRevealWrapper from "@/components/landing/ScrollRevealWrapper";

// Lazy-load below-the-fold sections to shrink initial JS bundle
const LiveMarkets = lazy(() => import("@/components/landing/LiveMarkets"));
const Features = lazy(() => import("@/components/landing/Features"));
const HowItWorks = lazy(() => import("@/components/landing/HowItWorks"));
const Stats = lazy(() => import("@/components/landing/Stats"));
const DemoCTA = lazy(() => import("@/components/landing/DemoCTA"));
const FAQ = lazy(() => import("@/components/landing/FAQ"));
const Footer = lazy(() => import("@/components/landing/Footer"));

const SectionFallback = () => <div className="min-h-[200px]" aria-hidden />;

const Index = () => (
  <div className="min-h-screen bg-background overflow-x-hidden relative">
    {/* Global noise texture */}
    <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] mix-blend-overlay">
      <svg width="100%" height="100%">
        <filter id="globalNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#globalNoise)" />
      </svg>
    </div>

    <div className="max-w-8xl mx-auto px-4 sm:px-6">
      <Navbar />
    </div>
    <Hero />

    <Suspense fallback={<SectionFallback />}>
      <LiveMarkets />
    </Suspense>

    <Suspense fallback={<SectionFallback />}>
      <ScrollRevealWrapper>
        <Features />
      </ScrollRevealWrapper>
    </Suspense>
    <SectionDivider />
    <Suspense fallback={<SectionFallback />}>
      <HowItWorks />
    </Suspense>

    <Suspense fallback={<SectionFallback />}>
      <Stats />
    </Suspense>
    <SectionDivider />
    <Suspense fallback={<SectionFallback />}>
      <DemoCTA />
    </Suspense>
    <Suspense fallback={<SectionFallback />}>
      <FAQ />
    </Suspense>
    <Suspense fallback={<SectionFallback />}>
      <Footer />
    </Suspense>
    <BackToTop />
  </div>
);

export default Index;
