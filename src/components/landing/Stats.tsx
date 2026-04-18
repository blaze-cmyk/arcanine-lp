import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { REVIEWS } from "@/data/reviews";

const STATS_DATA = [
  { value: 50000, suffix: "+", prefix: "", labelKey: "stats.activeTraders" },
  { value: 130, suffix: "+", prefix: "", labelKey: "stats.countries" },
  { value: 140, suffix: "+", prefix: "", labelKey: "stats.tradingAssets" },
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

const TRUNCATE_LENGTH = 160;

const ReviewCard = ({ review, visible, delay }: { review: typeof REVIEWS[number]; visible: boolean; delay: number }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > TRUNCATE_LENGTH;
  const displayText = expanded || !isLong ? review.text : review.text.slice(0, TRUNCATE_LENGTH).trimEnd() + "…";

  return (
    <div
      className="relative rounded-2xl p-6 overflow-hidden group transition-all duration-700 flex flex-col"
      style={{
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.06)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(0,255,136,0.05) 0%, transparent 70%)" }} />
      <div className="flex items-center justify-between mb-2">
        <span className="text-base font-semibold text-white">{review.name}</span>
        <span className="text-xs font-display tabular-nums font-semibold text-[#00FF88]">{review.profit}</span>
      </div>
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className={i < review.rating ? "text-[#00FF88] fill-[#00FF88]" : "text-muted-foreground/20"} />
        ))}
      </div>
      <p className="text-sm text-[#CCCCCC] leading-relaxed mb-3">"{displayText}"</p>
      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-xs font-medium text-[#3B9EFF] hover:text-[#5BB1FF] transition-colors self-start inline-flex items-center gap-1"
        >
          {expanded ? "Show less" : "Read More"} <span aria-hidden>→</span>
        </button>
      )}
    </div>
  );
};

const Stats = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [shownCount, setShownCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const visibleReviews = REVIEWS.slice(0, shownCount);
  const hasMore = shownCount < REVIEWS.length;

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden" ref={ref} id="testimonials">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(232,169,74,0.05) 0%, transparent 65%)" }} />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 transition-all duration-700" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.1] mb-4 bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(180deg, #fff 22.5%, rgba(255,255,255,0.7) 100%)" }}>
            {t("stats.heading")} {t("stats.headingLine2")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("stats.subheading")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleReviews.map((review, i) => (
            <ReviewCard
              key={`${review.name}-${i}`}
              review={review}
              visible={visible}
              delay={i < INITIAL_COUNT ? 600 + i * 80 : 0}
            />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShownCount((c) => Math.min(c + LOAD_INCREMENT, REVIEWS.length))}
              className="group relative px-8 py-3 rounded-full text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(0,255,136,0.25)",
                boxShadow: "0 0 24px rgba(0,255,136,0.08)",
              }}
            >
              <span className="relative z-10">Load more reviews ({REVIEWS.length - shownCount} left)</span>
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "radial-gradient(circle at center, rgba(0,255,136,0.12), transparent 70%)" }} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Stats;
