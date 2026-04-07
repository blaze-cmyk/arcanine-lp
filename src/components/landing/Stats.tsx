import { Users, Globe, BarChart3, DollarSign, TrendingUp, Zap } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Active traders",
    colSpan: "col-span-2",
    size: "large",
  },
  {
    icon: DollarSign,
    value: "$1",
    label: "Minimum trade",
    colSpan: "col-span-1",
  },
  {
    icon: Zap,
    value: "$10",
    label: "Minimum deposit",
    colSpan: "col-span-1",
  },
  {
    icon: Globe,
    value: "130+",
    label: "Countries",
    colSpan: "col-span-1",
  },
  {
    icon: BarChart3,
    value: "140+",
    label: "Trading assets",
    colSpan: "col-span-1",
  },
  {
    icon: TrendingUp,
    value: "$2M+",
    label: "Monthly payouts",
    colSpan: "col-span-2",
    size: "large",
  },
];

const Stats = () => (
  <section className="py-24 px-4 sm:px-6">
    <div className="max-w-5xl mx-auto">
      <h2
        className="text-4xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1] mb-14 text-center bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #fff 22.5%, rgba(255,255,255,0.7) 100%)",
        }}
      >
        Traders worldwide trust Arcanine
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.colSpan} relative group rounded-2xl p-6 sm:p-8 overflow-hidden transition-all duration-300`}
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Subtle hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(255,106,0,0.04) 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10 flex items-center gap-4 sm:gap-5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <stat.icon className="w-5 h-5 text-muted-foreground" />
              </div>

              <div>
                <div
                  className={`font-bold tracking-tight leading-none ${
                    stat.size === "large"
                      ? "text-3xl sm:text-4xl"
                      : "text-2xl sm:text-3xl"
                  }`}
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, #fff 20%, rgba(255,255,255,0.75) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-12">
        <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-accent text-primary-foreground font-semibold text-base rounded-xl glow-orange transition-colors duration-200">
          Join us
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="ml-1"
          >
            <path
              d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
);

export default Stats;
