import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";

const Index = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <Navbar />
      <Hero />
    </div>
  </div>
);

export default Index;
