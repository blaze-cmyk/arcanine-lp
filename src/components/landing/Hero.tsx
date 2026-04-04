import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(152_100%_45%/0.08),transparent_60%)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,hsl(152_100%_45%/0.05),transparent_70%)] blur-3xl" />
      
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-muted-foreground mb-8 animate-slide-up">
          <span className="w-2 h-2 rounded-full bg-profit animate-pulse-soft" />
          Live markets open
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6 animate-slide-up-delay-1">
          Up or Down.{" "}
          <br className="hidden sm:block" />
          <span className="text-gradient">Decide in Seconds.</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 animate-slide-up-delay-2 leading-relaxed">
          Predict whether the price will go up or down — and earn instantly when you're right. No charts. No complexity. Just a decision.
        </p>
        
        <div className="animate-slide-up-delay-3 flex flex-col items-center gap-3">
          <button className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl glow-green hover:scale-105 transition-all duration-200">
            Start Demo Trading
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <span className="text-sm text-muted-foreground">No signup required</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40">
        <div className="w-5 h-8 rounded-full border-2 border-current flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-current animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
