import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LiveWins from "@/components/landing/LiveWins";
import Features from "@/components/landing/Features";
import FAQ from "@/components/landing/FAQ";
import DemoCTA from "@/components/landing/DemoCTA";
import RiskWarning from "@/components/landing/RiskWarning";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <div className="max-w-8xl mx-auto px-4 sm:px-6">
      <Navbar />
      <Hero />
    </div>
    <LiveWins />
    <Features />
    <FAQ />
    <DemoCTA />
    <Footer />
    <RiskWarning />
  </div>
);

export default Index;
