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

const SectionDivider = () => (
  <div className="max-w-xl mx-auto h-px" style={{ background: "radial-gradient(ellipse at center, hsla(var(--border), 0.5) 0%, transparent 70%)" }} />
);

const Index = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <div className="max-w-8xl mx-auto px-4 sm:px-6">
      <Navbar />
      <Hero />
    </div>
    <LiveWins />
    <Features />
    <SectionDivider />
    <HowItWorks />
    <FairnessLogic />
    <SectionDivider />
    <Stats />
    <FAQ />
    <SectionDivider />
    <DemoCTA />
    <Footer />
  </div>
);

export default Index;
