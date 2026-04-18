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

  const digitHeight = 90;
  const targetIndex = strip.length - 2;
  const totalTravel = targetIndex * digitHeight;
  const containerH = 200;
  const centerOffset = (containerH - digitHeight) / 2;

  return (
    <div className="relative overflow-hidden w-[44px] sm:w-[80px] md:w-[120px]" style={{ height: containerH }}>
      <div className="absolute inset-x-0 top-0 z-20 pointer-events-none" style={{ height: 60, background: "linear-gradient(to bottom, #111111 20%, transparent 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none" style={{ height: 60, background: "linear-gradient(to top, #111111 20%, transparent 100%)" }} />
      <div
        className="flex flex-col items-center absolute left-0 right-0"
        style={{
          top: phase === "idle" ? `${centerOffset}px` : `${centerOffset - totalTravel}px`,
          transition: phase === "spinning" ? "top 1.4s cubic-bezier(0.23, 1, 0.32, 1)" : "none",
        }}
      >
        {strip.map((d, i) => {
          const distFromTarget = phase === "done" ? Math.abs(i - targetIndex) : -1;
          let colorClass = "text-[#00FF88] opacity-30";
          if (phase === "done") {
            if (distFromTarget === 0) colorClass = "text-[#00FF88] opacity-100";
            else if (distFromTarget === 1) colorClass = "text-[#00FF88] opacity-40";
          }
          return (
            <div key={i} className="flex items-center justify-center shrink-0" style={{ height: digitHeight }}>
              <span className={`text-[60px] sm:text-[100px] md:text-[150px] font-bold font-display leading-none select-none transition-all duration-500 ${colorClass}`} style={{ textShadow: "0 0 40px rgba(0,255,136,0.35)" }}>{d}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ReelSeparator = () => (
  <div className="flex items-center justify-center w-[1px] mx-0 h-[200px]">
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
    <section id="demo" className="py-16 sm:py-28 px-4 sm:px-6" style={{ background: "#0A0A0A" }}>
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-5xl md:text-[3.75rem] font-bold tracking-[-0.02em] leading-[1.05] mb-10 sm:mb-16 text-white">
          {t("demo.heading")}
          <br />
          {t("demo.headingLine2")}
        </h2>

        <div
          ref={ref}
          className="relative flex items-center rounded-2xl sm:rounded-3xl px-3 sm:px-6 md:px-10 mb-10 sm:mb-12 overflow-hidden max-w-full"
          style={{ background: "#111111", boxShadow: "inset 0 2px 30px rgba(0,0,0,0.7), inset 0 -2px 15px rgba(0,0,0,0.5), 0 0 80px rgba(0,255,136,0.06), 0 4px 40px rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,255,136,0.08) 0%, transparent 70%)" }} />
          <div className="flex items-center relative z-10 mr-1 h-[200px]">
            <span className="text-[60px] sm:text-[100px] md:text-[150px] font-bold font-display leading-none select-none text-[#00FF88]" style={{ textShadow: "0 0 40px rgba(0,255,136,0.35)" }}>$</span>
          </div>
          <div className="flex items-center relative z-10">
            {isVisible
              ? targets.map((digit, i) => (
                  <div key={i} className="flex items-center">
                    {i > 0 && <ReelSeparator />}
                    <SlotReel target={digit} delay={i * 250} />
                  </div>
                ))
              : targets.map((_, i) => <div key={i} className="w-[44px] sm:w-[80px] md:w-[120px] h-[200px]" />)}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 mb-10 sm:mb-12 text-sm sm:text-base" style={{ color: "#CCCCCC" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#00FF88" }}>
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M2 5L4.5 7.5L8 3" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            {t("demo.bullet1")}
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#00FF88" }}>
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M2 5L4.5 7.5L8 3" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            {t("demo.bullet2")}
          </div>
        </div>

        <button className="inline-flex items-center px-8 sm:px-10 py-3.5 font-semibold text-sm sm:text-base rounded-xl transition-transform duration-200 hover:scale-[1.02]" style={{ background: "#00FF88", color: "#0A0A0A", boxShadow: "0 0 30px rgba(0,255,136,0.35)" }}>
          {t("demo.cta")}
        </button>
      </div>
    </section>
  );
};

export default DemoCTA;
