import { useState, useEffect, useRef } from "react";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const TARGET = [1, 0, 0, 0, 0]; // $10000

const SlotDigit = ({ target, delay }: { target: number; delay: number }) => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsSpinning(true);
      // Spin through multiple cycles then land on target
      const totalSteps = 20 + target; // spin a few rounds
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setCurrentOffset(step);
        if (step >= totalSteps) {
          clearInterval(interval);
          setIsSpinning(false);
          setIsDone(true);
        }
      }, 60);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [target, delay]);

  const displayDigit = isDone ? target : currentOffset % 10;
  // Show adjacent digits for the slot effect
  const prevDigit = (displayDigit + 9) % 10;
  const nextDigit = (displayDigit + 1) % 10;

  return (
    <div className="relative h-[180px] sm:h-[220px] w-[72px] sm:w-[90px] overflow-hidden">
      {/* Fade overlays */}
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-card to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card to-transparent z-10" />

      <div className="flex flex-col items-center transition-transform duration-100 ease-out">
        <span className="text-7xl sm:text-9xl font-bold text-muted-foreground/30 leading-none h-[60px] sm:h-[73px] flex items-center font-mono">
          {DIGITS[prevDigit]}
        </span>
        <span
          className={`text-7xl sm:text-9xl font-bold leading-none h-[60px] sm:h-[74px] flex items-center font-mono transition-colors duration-300 ${
            isDone
              ? "text-transparent bg-clip-text bg-gradient-to-b from-[hsl(35,90%,60%)] to-[hsl(24,100%,45%)]"
              : "text-muted-foreground/50"
          }`}
        >
          {DIGITS[displayDigit]}
        </span>
        <span className="text-7xl sm:text-9xl font-bold text-muted-foreground/30 leading-none h-[60px] sm:h-[73px] flex items-center font-mono">
          {DIGITS[nextDigit]}
        </span>
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

  return (
    <section className="py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display leading-tight mb-16">
          Trade live charts with
          <br />
          virtual funds
        </h2>

        {/* Slot machine */}
        <div
          ref={ref}
          className="relative flex items-center gap-2 sm:gap-3 rounded-2xl bg-card border border-border px-8 sm:px-10 py-8 mb-12"
        >
          {/* Dollar sign */}
          <span className="text-7xl sm:text-9xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-b from-[hsl(35,90%,60%)] to-[hsl(24,100%,45%)] mr-1">
            $
          </span>
          {isVisible &&
            TARGET.map((digit, i) => (
              <SlotDigit key={i} target={digit} delay={i * 200} />
            ))}
          {!isVisible &&
            TARGET.map((_, i) => (
              <div
                key={i}
                className="h-[180px] sm:h-[220px] w-[72px] sm:w-[90px]"
              />
            ))}
        </div>

        {/* Bullet points */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 mb-12 text-base text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[hsl(var(--profit))] flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                <path d="M2 5L4.5 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            $10,000 preloaded in your demo account
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-[hsl(var(--profit))] flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                <path d="M2 5L4.5 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
