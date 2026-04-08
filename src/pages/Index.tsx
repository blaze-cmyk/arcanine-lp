import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LiveWins from "@/components/landing/LiveWins";
import Features from "@/components/landing/Features";
import FAQ from "@/components/landing/FAQ";
import FairnessLogic from "@/components/landing/FairnessLogic";
import Stats from "@/components/landing/Stats";
import DemoCTA from "@/components/landing/DemoCTA";
import HowItWorks from "@/components/landing/HowItWorks";
import Footer from "@/components/landing/Footer";
import SectionDivider from "@/components/landing/SectionDivider";
import BackToTop from "@/components/landing/BackToTop";
import ScrollRevealWrapper from "@/components/landing/ScrollRevealWrapper";

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
      <Hero />
    </div>
    <LiveWins />
    <ScrollRevealWrapper>
      <Features />
    </ScrollRevealWrapper>
    <SectionDivider />
    <HowItWorks />
    <FairnessLogic />
    <Stats />
    <SectionDivider />
    <FAQ />
    <DemoCTA />
    <Footer />
    <BackToTop />
  </div>
);

export default Index;
