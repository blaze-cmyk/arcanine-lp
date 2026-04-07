import { useEffect, useRef, useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, Zap } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: DollarSign,
    title: "Set your stake",
    description: "Choose how much to invest — from $1 to $10,000. You're always in control of your risk.",
    accent: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    number: "02",
    icon: TrendingUp,
    title: "Predict the move",
    description: "Will the price go up or down? Pick a direction and set your timeframe. That's it.",
    accent: "from-profit/20 to-profit/5",
    iconBg: "bg-profit/10",
    iconColor: "text-profit",
  },
  {
    number: "03",
    icon: Zap,
    title: "Collect instantly",
    description: "Get results in seconds. Profits land in your account immediately — no waiting, no delays.",
    accent: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
];

const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Subtle radial glow behind section */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, hsl(var(--primary) / 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div
          className="text-center mb-20 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">
            From zero to profit
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.02em] leading-[1.08] mb-5 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(180deg, hsl(var(--foreground)) 22.5%, hsl(var(--foreground) / 0.7) 100%)",
            }}
          >
            Three moves.
            <br />
            One outcome.
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
            No charts to study. No jargon to learn. Just a simple decision that pays off in seconds.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Connecting line (desktop only) */}
          <div
            className="hidden md:block absolute top-[72px] left-[16.66%] right-[16.66%] h-px transition-all duration-1000 delay-500"
            style={{
              background: visible
                ? "linear-gradient(90deg, hsl(var(--primary) / 0.3), hsl(var(--border)), hsl(var(--primary) / 0.3))"
                : "transparent",
            }}
          />

          {steps.map(({ number, icon: Icon, title, description, iconBg, iconColor }, i) => (
            <div
              key={number}
              className="relative transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${200 + i * 150}ms`,
              }}
            >
              <div className="relative rounded-2xl p-8 h-full group transition-all duration-300 hover:translate-y-[-2px]"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(11,11,14,0.6) 100%)",
                  border: "1px solid hsl(var(--border) / 0.5)",
                }}
              >
                {/* Step number - large watermark */}
                <span
                  className="font-mono text-[5rem] font-black absolute top-3 right-5 select-none leading-none"
                  style={{ color: "hsl(var(--foreground) / 0.03)" }}
                >
                  {number}
                </span>

                {/* Icon circle */}
                <div className="relative z-10 mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-[0.95rem]">
                    {description}
                  </p>
                </div>

                {/* Bottom accent line on hover */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px transition-all duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
