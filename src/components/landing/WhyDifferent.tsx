import { Layers, Zap, Sparkles } from "lucide-react";

const reasons = [
  {
    icon: Layers,
    title: "No complexity",
    description: "No charts. No overload. Just action.",
  },
  {
    icon: Zap,
    title: "Built for speed",
    description: "From click to result in seconds.",
  },
  {
    icon: Sparkles,
    title: "Designed to feel alive",
    description: "Real-time feedback, smooth interactions, instant results.",
  },
];

const WhyDifferent = () => (
  <section className="py-24 px-4">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
          Why it's <span className="text-gradient">different</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {reasons.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="text-center group"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyDifferent;
