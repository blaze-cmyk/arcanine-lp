import Hero from "@/components/landing/Hero";
import TradingPreview from "@/components/landing/TradingPreview";
import TrustStrip from "@/components/landing/TrustStrip";
import HowItWorks from "@/components/landing/HowItWorks";
import WhatIsThis from "@/components/landing/WhatIsThis";
import WhyDifferent from "@/components/landing/WhyDifferent";
import LiveActivity from "@/components/landing/LiveActivity";
import FinalCTA from "@/components/landing/FinalCTA";

const Index = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Hero />
    <TradingPreview />
    <TrustStrip />
    <HowItWorks />
    <WhatIsThis />
    <WhyDifferent />
    <LiveActivity />
    <FinalCTA />
  </div>
);

export default Index;
