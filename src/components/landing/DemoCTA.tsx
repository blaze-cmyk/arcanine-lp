import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";

const SlotReel = ({ target, delay }: { target: number; delay: number }) => {
  const [phase, setPhase] = useState<"idle" | "spinning" | "done">("idle");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("spinning"), delay);
    const t2 = setTimeout(() => setPhase("done"), delay + 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [delay, target]);

  const strip = useMemo(() => {
    const cycles = 3;
    const digits: number[] = [];
    for (let c = 0; c < cycles; c++) for (let d = 0; d <= 9; d++) digits.push(d);
    for (let d = 0; d <= target + 1; d++) digits.push(d % 10);
    return digits;
  }, [target]);

  const digitHeight = 140;
  const targetIndex = strip.length - 2;
  const totalTravel = targetIndex * digitHeight;
  const containerH = 300;
  const centerOffset = (containerH - digitHeight) / 2;

  return (
    <div className="relative overflow-hidden" style={{ width: 120, height: containerH }}>
      <div className="absolute inset-x-0 top-0 z-20 pointer-events-none" style={{ height: 90, background: "linear-gradient(to bottom, #0B0B0E 20%, transparent 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none" style={{ height: 90, background: "linear-gradient(to top, #0B0B0E 20%, transparent 100%)" }} />
      <div
        className="flex flex-col items-center absolute left-0 right-0"
        style={{
          top: phase === "idle" ? `${centerOffset}px` : `${centerOffset - totalTravel}px`,
          transition: phase === "spinning" ? "top 1.4s cubic-bezier(0.23, 1, 0.32, 1)" : "none",
        }}
      >
        {strip.map((d, i) => {
          const distFromTarget = phase === "done" ? Math.abs(i - targetIndex) : -1;
          let colorClass = "text-transparent bg-clip-text bg-gradient-to-b from-[#E8A94A] via-[#D4892A] to-[#A05E12] opacity-30";
          if (phase === "done") {
            if (distFromTarget === 0) colorClass = "text-transparent bg-clip-text bg-gradient-to-b from-[#E8A94A] via-[#D4892A] to-[#A05E12] opacity-100";
            else if (distFromTarget === 1) colorClass = "text-transparent bg-clip-text bg-gradient-to-b from-[#E8A94A] via-[#D4892A] to-[#A05E12] opacity-40";
          }
          return (
            <div key={i} className="flex items-center justify-center shrink-0" style={{ height: digitHeight }}>
              <span className={`text-[130px] sm:text-[150px] font-bold font-display leading-none select-none transition-all duration-500 ${colorClass}`}>{d}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ReelSeparator = () => (
  <div className="flex items-center justify-center w-[1px] mx-0" style={{ height: 300 }}>
    <div className="w-full h-3/5" style={{ background: "linear-gradient(to bottom, transparent 10%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.06) 70%, transparent 90%)" }} />
  </div>
);

const DemoCTA = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const targets = [1, 0, 0, 0, 0];

  return (
    <section id="demo" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-[3.75rem] font-bold tracking-[-0.02em] leading-[1] mb-16 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(180deg, #fff 22.5%, rgba(255,255,255,0.7) 100%)' }}>
          {t("demo.heading")}
          <br />
          {t("demo.headingLine2")}
        </h2>

        <div
          ref={ref}
          className="relative flex items-center rounded-3xl px-6 sm:px-10 mb-12 overflow-hidden"
          style={{ background: "#0B0B0E", boxShadow: "inset 0 2px 30px rgba(0,0,0,0.7), inset 0 -2px 15px rgba(0,0,0,0.5), 0 0 80px rgba(200,140,40,0.05), 0 4px 40px rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(200,140,40,0.08) 0%, transparent 70%)" }} />
          <div className="flex items-center relative z-10 mr-1" style={{ height: 300 }}>
            <span className="text-[130px] sm:text-[150px] font-bold font-display leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-[#E8A94A] via-[#D4892A] to-[#A05E12]">$</span>
          </div>
          <div className="flex items-center relative z-10">
            {isVisible
              ? targets.map((digit, i) => (
                  <div key={i} className="flex items-center">
                    {i > 0 && <ReelSeparator />}
                    <SlotReel target={digit} delay={i * 250} />
                  </div>
                ))
              : targets.map((_, i) => <div key={i} style={{ width: 120, height: 300 }} />)}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 mb-12 text-base text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[hsl(var(--profit))] flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M2 5L4.5 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            {t("demo.bullet1")}
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[hsl(var(--profit))] flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M2 5L4.5 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            {t("demo.bullet2")}
          </div>
        </div>

        <button className="inline-flex items-center px-10 py-3.5 bg-gradient-accent text-primary-foreground font-semibold text-base rounded-xl glow-orange transition-colors duration-200">
          {t("demo.cta")}
        </button>
      </div>
    </section>
  );
};

export default DemoCTA;
