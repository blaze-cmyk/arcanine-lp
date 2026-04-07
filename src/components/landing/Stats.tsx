import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const STATS = [
  { value: 50000, suffix: "+", label: "Active traders", prefix: "" },
  { value: 130, suffix: "+", label: "Countries", prefix: "" },
  { value: 140, suffix: "+", label: "Trading assets", prefix: "" },
  { value: 2, suffix: "M+", label: "Monthly payouts", prefix: "$" },
];

const REVIEWS = [
  {
    name: "Alex R.",
    avatar: "🐺",
    text: "Fastest payouts I've ever experienced. Withdrew $4,200 and it hit my account in under 2 hours.",
    rating: 5,
    profit: "+$4,200",
  },
  {
    name: "Maria K.",
    avatar: "🦊",
    text: "The interface is incredibly smooth. I switched from IQ Option and never looked back.",
    rating: 5,
    profit: "+$1,850",
  },
  {
    name: "James T.",
    avatar: "🦅",
    text: "Started with $10, now consistently making $200-400 a week. The demo account helped me learn without risk.",
    rating: 5,
    profit: "+$12,400",
  },
  {
    name: "Sophie L.",
    avatar: "🐯",
    text: "140+ assets to trade and the charts are real-time. This is what a professional platform looks like.",
    rating: 4,
    profit: "+$3,100",
  },
];

const AnimatedNumber = ({
  value,
  prefix,
  suffix,
  trigger,
  duration = 2000,
}: {
  value: number;
  prefix: string;
  suffix: string;
  trigger: boolean;
  duration?: number;
}) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, value, duration]);

  const formatted = value >= 1000 ? display.toLocaleString("en-US") : String(display);

  return (
    <span className="text-5xl sm:text-6xl md:text-7xl font-bold font-display leading-none tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-[#E8A94A] via-[#D4892A] to-[#A05E12] font-mono-num select-none">
      {prefix}{formatted}{suffix}
    </span>
  );
};

const ReviewCard = ({
  review,
  visible,
  delay,
}: {
  review: (typeof REVIEWS)[0];
  visible: boolean;
  delay: number;
}) => (
  <div
    className="relative rounded-2xl p-6 overflow-hidden group transition-all duration-700"
    style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.008) 100%)",
      border: "1px solid rgba(255,255,255,0.06)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transitionDelay: `${delay}ms`,
    }}
  >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(232,169,74,0.04) 0%, transparent 70%)" }}
    />

    {/* Stars */}
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < review.rating ? "text-[#E8A94A] fill-[#E8A94A]" : "text-muted-foreground/20"}
        />
      ))}
    </div>

    {/* Text */}
    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
      "{review.text}"
    </p>

    {/* Author row */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-base" style={{ background: "rgba(255,255,255,0.05)" }}>
          {review.avatar}
        </div>
        <span className="text-sm font-medium text-foreground/80">{review.name}</span>
      </div>
      <span className="text-xs font-mono-num font-semibold text-profit">{review.profit}</span>
    </div>
  </div>
);

const Stats = () => {
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
    <section className="py-24 px-4 sm:px-6" ref={ref} id="testimonials">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.1] mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(180deg, #fff 22.5%, rgba(255,255,255,0.7) 100%)",
            }}
          >
            Trusted by traders<br className="hidden sm:block" /> worldwide
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Join thousands already winning with Arcanine
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 mb-16">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center gap-2 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${150 + i * 120}ms`,
              }}
            >
              <AnimatedNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                trigger={visible}
                duration={2000 + i * 200}
              />
              <p className="text-xs sm:text-sm text-muted-foreground tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-16" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)" }} />

        {/* Reviews grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.name} review={review} visible={visible} delay={600 + i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
