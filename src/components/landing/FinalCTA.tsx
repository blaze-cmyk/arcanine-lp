import { ArrowRight } from "lucide-react";

const FinalCTA = () => (
  <section className="py-32 px-4 relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(152_100%_45%/0.08),transparent_60%)]" />
    <div className="relative max-w-2xl mx-auto text-center">
      <h2 className="text-4xl sm:text-5xl font-black mb-6">
        Ready to make your{" "}
        <span className="text-gradient">move</span>?
      </h2>
      <p className="text-lg text-muted-foreground mb-10">
        Start trading in seconds. No experience needed.
      </p>
      <div className="flex flex-col items-center gap-3">
        <button className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl glow-green hover:scale-105 transition-all duration-200">
          Try Demo Now
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <span className="text-sm text-muted-foreground">No signup required</span>
      </div>
    </div>
  </section>
);

export default FinalCTA;
