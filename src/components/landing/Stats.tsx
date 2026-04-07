import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 50000, suffix: "+", label: "Active traders", prefix: "" },
  { value: 130, suffix: "+", label: "Countries", prefix: "" },
  { value: 140, suffix: "+", label: "Trading assets", prefix: "" },
  { value: 2, suffix: "M+", label: "Monthly payouts", prefix: "$" },
];

const AnimatedNumber = ({
  value,
  prefix,
  suffix,
  duration = 2000,
  trigger,
}: {
  value: number;
  prefix: string;
  suffix: string;
  duration?: number;
  trigger: boolean;
}) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, value, duration]);

  const formatted =
    value >= 1000
      ? display.toLocaleString("en-US")
      : String(display);

  return (
    <span
      className="text-5xl sm:text-6xl md:text-7xl font-bold font-display leading-none tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-[#E8A94A] via-[#D4892A] to-[#A05E12] font-mono-num"
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

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
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center gap-2 transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <AnimatedNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                trigger={visible}
                duration={2000 + i * 200}
              />
              <p className="text-sm text-muted-foreground tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
