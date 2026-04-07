import { useState, useEffect, useRef, useMemo } from "react";

/**
 * Each reel is a vertical strip of 0-9 digits that translates upward
 * to land on the target digit — like a real mechanical counter.
 * Shows prev/current/next digits visible at all times.
 */
const SlotReel = ({ target, delay }: { target: number; delay: number }) => {
  const [phase, setPhase] = useState<"idle" | "spinning" | "done">("idle");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("spinning"), delay);
    const t2 = setTimeout(() => setPhase("done"), delay + 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [delay, target]);

  // Build strip: several full 0-9 cycles then end with prev → target → next
  const strip = useMemo(() => {
    const cycles = 3;
    const digits: number[] = [];
    for (let c = 0; c < cycles; c++) {
      for (let d = 0; d <= 9; d++) digits.push(d);
    }
    // Final partial cycle ending on target (with next digit after it)
    for (let d = 0; d <= target + 1; d++) digits.push(d % 10);
    return digits;
  }, [target]);

  const digitHeight = 180;
  // We want to land so the target digit (strip.length - 2) is centered
  const targetIndex = strip.length - 2;
  const totalTravel = targetIndex * digitHeight;

  // Container shows 3 digits: prev, current, next = 3 * digitHeight but we clip to look nice
  const containerH = 400;
  const centerOffset = (containerH - digitHeight) / 2; // 80px

  return (
    <div
      className="relative overflow-hidden"
      style={{ width: 120, height: containerH }}
    >
      {/* Top fade */}
      <div
        className="absolute inset-x-0 top-0 z-20 pointer-events-none"
        style={{
          height: 130,
          background: "linear-gradient(to bottom, #111115 20%, transparent 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 pointer-events-none"
        style={{
          height: 130,
          background: "linear-gradient(to top, #111115 20%, transparent 100%)",
        }}
      />

      {/* Digit strip */}
      <div
        className="flex flex-col items-center absolute left-0 right-0"
        style={{
          top:
            phase === "idle"
              ? `${centerOffset}px`
              : `${centerOffset - totalTravel}px`,
          transition:
            phase === "spinning"
              ? "top 1.4s cubic-bezier(0.23, 1, 0.32, 1)"
              : "none",
        }}
      >
        {strip.map((d, i) => {
          // After animation, highlight target and dim adjacent
          const distFromTarget = phase === "done" ? Math.abs(i - targetIndex) : -1;
          let colorClass = "text-[#3a3530]/50";
          if (phase === "done") {
            if (distFromTarget === 0) {
              colorClass =
                "text-transparent bg-clip-text bg-gradient-to-b from-[#E8A94A] via-[#D4892A] to-[#A05E12]";
            } else if (distFromTarget === 1) {
              colorClass = "text-[#5a4a30]/40";
            }
          }

          return (
            <div
              key={i}
              className="flex items-center justify-center shrink-0"
              style={{ height: digitHeight }}
            >
              <span
                className={`text-[130px] sm:text-[160px] font-bold font-display leading-none select-none transition-all duration-500 ${colorClass}`}
              >
                {d}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Thin vertical separator between reels */
const ReelSeparator = () => (
  <div className="flex flex-col items-center justify-center h-[400px] w-[1px] relative z-10">
    <div
      className="w-full h-full"
      style={{
        background:
          "linear-gradient(to bottom, transparent 10%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.06) 70%, transparent 90%)",
      }}
    />
  </div>
);

const DemoCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const targets = [1, 0, 0, 0, 0];

  return (
    <section className="py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display leading-tight mb-16">
          Trade live charts with
          <br />
          virtual funds
        </h2>

        {/* Slot machine container */}
        <div
          ref={ref}
          className="relative flex items-center rounded-2xl px-4 sm:px-8 mb-12 overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #18181C 0%, #111115 40%, #0D0D10 100%)",
            boxShadow:
              "inset 0 2px 30px rgba(0,0,0,0.7), inset 0 -2px 15px rgba(0,0,0,0.5), 0 0 80px rgba(200,140,40,0.05), 0 4px 40px rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {/* Warm ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(200,140,40,0.08) 0%, transparent 70%)",
            }}
          />

          {/* Horizontal highlight line across center */}
          <div
            className="absolute left-0 right-0 z-10 pointer-events-none"
            style={{
              top: "50%",
              transform: "translateY(-60px)",
              height: 180,
              borderTop: "1px solid rgba(255,255,255,0.04)",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              background: "rgba(255,255,255,0.015)",
            }}
          />

          {/* Dollar sign */}
          <div className="flex items-center relative z-10 mr-2" style={{ height: 400 }}>
            <span className="text-[130px] sm:text-[160px] font-bold font-display leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-[#E8A94A] via-[#D4892A] to-[#A05E12]">
              $
            </span>
          </div>

          {/* Reels with separators */}
          <div className="flex items-center relative z-10">
            {isVisible
              ? targets.map((digit, i) => (
                  <div key={i} className="flex items-center">
                    {i > 0 && <ReelSeparator />}
                    <SlotReel target={digit} delay={i * 250} />
                  </div>
                ))
              : targets.map((_, i) => (
                  <div key={i} style={{ width: 120, height: 400 }} />
                ))}
          </div>
        </div>

        {/* Bullet points */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 mb-12 text-base text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[hsl(var(--profit))] flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5L4.5 7.5L8 3"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            $10,000 preloaded in your demo account
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[hsl(var(--profit))] flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5L4.5 7.5L8 3"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            Unlimited balance refills at any time
          </div>
        </div>

        {/* CTA Button */}
        <button className="inline-flex items-center px-10 py-3.5 bg-gradient-accent text-primary-foreground font-semibold text-base rounded-xl glow-orange transition-colors duration-200">
          Try demo account
        </button>
      </div>
    </section>
  );
};

export default DemoCTA;
