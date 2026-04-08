const SpotlightDivider = () => (
  <div className="relative w-full h-24 sm:h-32 overflow-hidden pointer-events-none select-none">
    {/* Primary warm spotlight cone */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[480px] h-full"
      style={{
        background:
          "radial-gradient(ellipse 100% 160% at 50% 0%, rgba(255,106,0,0.10) 0%, rgba(255,106,0,0.04) 40%, transparent 80%)",
      }}
    />
    {/* Wider subtle ambient glow */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-full"
      style={{
        background:
          "radial-gradient(ellipse 100% 120% at 50% 0%, rgba(255,138,42,0.04) 0%, transparent 70%)",
      }}
    />
    {/* Thin bright center line */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-40 sm:w-64 h-px"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255,106,0,0.3) 30%, rgba(255,106,0,0.5) 50%, rgba(255,106,0,0.3) 70%, transparent 100%)",
        boxShadow: "0 0 12px rgba(255,106,0,0.15), 0 1px 8px rgba(255,106,0,0.08)",
      }}
    />
  </div>
);

export default SpotlightDivider;
