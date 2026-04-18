import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { REVIEWS } from "@/data/reviews";

const STATS_DATA = [
  { value: 50000, suffix: "+", prefix: "", labelKey: "stats.activeTraders" },
  { value: 130, suffix: "+", prefix: "", labelKey: "stats.countries" },
  { value: 140, suffix: "+", prefix: "", labelKey: "stats.tradingAssets" },
  { value: 2, suffix: "M+", prefix: "$", labelKey: "stats.monthlyPayouts" },
];

const INITIAL_COUNT = 12;
const LOAD_INCREMENT = 16;

const AnimatedNumber = ({ value, prefix, suffix, trigger, duration = 2000 }: { value: number; prefix: string; suffix: string; trigger: boolean; duration?: number }) => {
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
    <span className="text-5xl sm:text-6xl md:text-7xl font-bold font-display leading-none tracking-tight text-[#00FF88] select-none tabular-nums" style={{ textShadow: "0 0 40px rgba(0,255,136,0.35)" }}>
      {prefix}{formatted}{suffix}
    </span>
  );
};

const ReviewCard = ({ review, visible, delay }: { review: (typeof REVIEWS)[0]; visible: boolean; delay: number }) => (
  <div
    className="relative rounded-2xl p-6 overflow-hidden group transition-all duration-700"
    style={{
      background: "#111111",
      border: "1px solid rgba(255,255,255,0.06)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transitionDelay: `${delay}ms`,
    }}
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(0,255,136,0.05) 0%, transparent 70%)" }} />
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < review.rating ? "text-[#00FF88] fill-[#00FF88]" : "text-muted-foreground/20"} />
      ))}
    </div>
    <p className="text-sm text-[#CCCCCC] leading-relaxed mb-4">"{review.text}"</p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-base" style={{ background: "rgba(255,255,255,0.05)" }}>{review.avatar}</div>
        <span className="text-sm font-medium text-white">{review.name}</span>
      </div>
      <span className="text-xs font-display tabular-nums font-semibold text-[#00FF88]">{review.profit}</span>
    </div>
  </div>
);

const Stats = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden" ref={ref} id="testimonials">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(232,169,74,0.05) 0%, transparent 65%)" }} />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 transition-all duration-700" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.1] mb-4 bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(180deg, #fff 22.5%, rgba(255,255,255,0.7) 100%)" }}>
            {t("stats.heading")}<br className="hidden sm:block" /> {t("stats.headingLine2")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">{t("stats.subheading")}</p>
        </div>

        <div className="flex flex-wrap justify-evenly gap-8 mb-16">
          {STATS_DATA.map((stat, i) => (
            <div key={stat.labelKey} className="flex flex-col items-center text-center gap-2 transition-all duration-700" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transitionDelay: `${150 + i * 120}ms` }}>
              <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} trigger={visible} duration={2000 + i * 200} />
              <p className="text-xs sm:text-sm text-muted-foreground tracking-wide uppercase">{t(stat.labelKey)}</p>
            </div>
          ))}
        </div>

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
