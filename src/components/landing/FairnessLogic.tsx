import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const METHODS = [
  {
    label: "Net Banking",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="6" y="8" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 4L6 8h16L14 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 12v6M14 12v6M18 12v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "GPay / UPI",
    icon: (
      <span className="text-lg font-bold tracking-tight" style={{ color: "#fff" }}>
        G<span style={{ color: "#4285F4" }}>P</span>ay
      </span>
    ),
  },
  {
    label: "UPI",
    icon: (
      <span className="text-xl font-extrabold tracking-tighter text-foreground">
        UPI
      </span>
    ),
  },
  {
    label: "PhonePe UPI",
    icon: (
      <span className="text-base font-bold text-foreground tracking-tight">
        PhonePe
      </span>
    ),
  },
  {
    label: "Crypto Methods",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="11" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 7v2m0 8v2m-4-8h2.5a1.5 1.5 0 010 3H10m0 0h3.5a1.5 1.5 0 010 3H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "AstroPay",
    icon: (
      <span className="text-base font-bold text-foreground tracking-tight">
        AstroPay
      </span>
    ),
  },
];

const FairnessLogic = () => {
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Subtle top glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,106,0,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.1] mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(180deg, #fff 22.5%, rgba(255,255,255,0.7) 100%)",
            }}
          >
            Transparent Deposit,{" "}
            <br className="hidden sm:block" />
            Fast Withdrawal
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Transfer safely via familiar payment methods
          </p>
        </div>

        {/* Payment grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {METHODS.map((method, i) => (
            <div
              key={method.label}
              className="group relative rounded-2xl h-24 flex items-center justify-center transition-all duration-700 cursor-default"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${200 + i * 80}ms`,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 100%, rgba(255,106,0,0.06) 0%, transparent 70%)",
                }}
              />
              <div className="flex items-center gap-3 text-foreground/80">
                <span className="text-foreground/60">{method.icon}</span>
                <span className="text-sm font-medium">{method.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="flex justify-center mt-12 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "800ms",
          }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-gradient-accent text-primary-foreground transition-all duration-200 hover:shadow-lg"
            style={{
              boxShadow: "0 0 30px rgba(255,106,0,0.2)",
            }}
          >
            Start Trading
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FairnessLogic;
