import { useState, useEffect, useRef, useMemo } from "react";

/**
 * Each reel is a vertical strip of 0-9 digits that translates upward
 * to land on the target digit — like a real mechanical counter.
 */
const SlotReel = ({ target, delay }: { target: number; delay: number }) => {
  const [phase, setPhase] = useState<"idle" | "spinning" | "done">("idle");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("spinning"), delay);
    // Total spin duration: 1.2s + stagger
    const t2 = setTimeout(() => setPhase("done"), delay + 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [delay, target]);

  // Build a strip: several full 0-9 cycles then end at target
  const strip = useMemo(() => {
    const cycles = 3; // full rotations before landing
    const digits: number[] = [];
    for (let c = 0; c < cycles; c++) {
      for (let d = 0; d <= 9; d++) digits.push(d);
    }
    // Add final partial cycle ending on target
    for (let d = 0; d <= target; d++) digits.push(d);
    return digits;
  }, [target]);

  const digitHeight = 120; // px per digit
  const totalTravel = (strip.length - 1) * digitHeight;

  // Container height and centering offset
  const containerHeight = { base: 200, sm: 240 };
  // Center offset = (containerH - digitH) / 2
  const centerOffset = (containerHeight.sm - digitHeight) / 2; // 60px on sm

  return (
    <div className="relative w-[70px] sm:w-[88px] h-[200px] sm:h-[240px] overflow-hidden">
      {/* Top/bottom fade masks */}
      <div className="absolute inset-x-0 top-0 h-[72px] sm:h-[88px] bg-gradient-to-b from-[#111115] via-[#111115]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[72px] sm:h-[88px] bg-gradient-to-t from-[#111115] via-[#111115]/80 to-transparent z-20 pointer-events-none" />

      {/* Digit strip — offset so active digit is vertically centered */}
      <div
        className="flex flex-col items-center absolute left-0 right-0"
        style={{
          top: phase === "idle"
            ? `${centerOffset}px`
            : `${centerOffset - totalTravel}px`,
          transition:
            phase === "spinning"
              ? "top 1.4s cubic-bezier(0.23, 1, 0.32, 1)"
              : "none",
        }}
      >
        {strip.map((d, i) => {
          const isTarget = phase === "done" && i === strip.length - 1;
          return (
            <div
              key={i}
              className="flex items-center justify-center shrink-0"
              style={{ height: digitHeight }}
            >
              <span
                className={`text-[80px] sm:text-[104px] font-bold font-display leading-none select-none transition-all duration-500 ${
                  isTarget
                    ? "text-transparent bg-clip-text bg-gradient-to-b from-[#E8A94A] via-[#D4892A] to-[#A05E12]"
                    : "text-[#3a3530]/60"
                }`}
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
          className="relative flex items-center rounded-2xl px-6 sm:px-10 py-4 mb-12 overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #151518 0%, #111115 40%, #0E0E11 100%)",
            boxShadow:
              "inset 0 2px 20px rgba(0,0,0,0.6), inset 0 -1px 10px rgba(0,0,0,0.4), 0 0 60px rgba(200,140,40,0.06)",
          }}
        >
          {/* Warm ambient glow behind digits */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(200,140,40,0.07) 0%, transparent 70%)",
            }}
          />

          {/* Dollar sign */}
          <div className="h-[200px] sm:h-[240px] flex items-center relative z-10 mr-1 sm:mr-2">
            <span className="text-[80px] sm:text-[104px] font-bold font-display leading-none select-none text-transparent bg-clip-text bg-gradient-to-b from-[#E8A94A] via-[#D4892A] to-[#A05E12]">
              $
            </span>
          </div>

          {/* Reels */}
          <div className="flex gap-0 relative z-10">
            {isVisible
              ? targets.map((digit, i) => (
                  <SlotReel key={i} target={digit} delay={i * 250} />
                ))
              : targets.map((_, i) => (
                  <div
                    key={i}
                    className="w-[70px] sm:w-[88px] h-[200px] sm:h-[240px]"
                  />
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
        <button className="px-10 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:brightness-110 transition-all">
          Try demo account
        </button>
      </div>
    </section>
  );
};

export default DemoCTA;
