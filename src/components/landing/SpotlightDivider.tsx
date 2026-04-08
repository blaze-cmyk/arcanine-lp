const SpotlightDivider = () => (
  <div className="relative w-full pointer-events-none select-none" style={{ height: 1 }}>
    {/* Wide ambient glow — fades naturally into background */}
    <div
      className="absolute left-1/2 -translate-x-1/2"
      style={{
        top: "-80px",
        width: "min(80vw, 900px)",
        height: "160px",
        background:
          "radial-gradient(ellipse 100% 100% at 50% 100%, rgba(255,106,0,0.07) 0%, rgba(255,106,0,0.02) 50%, transparent 100%)",
      }}
    />
    {/* Narrow intense core */}
    <div
      className="absolute left-1/2 -translate-x-1/2"
      style={{
        top: "-40px",
        width: "min(50vw, 500px)",
        height: "80px",
        background:
          "radial-gradient(ellipse 100% 100% at 50% 100%, rgba(255,138,42,0.08) 0%, transparent 70%)",
      }}
    />
    {/* Thin luminous center line */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 h-px"
      style={{
        width: "min(40vw, 400px)",
        background:
          "linear-gradient(90deg, transparent, rgba(255,106,0,0.35) 25%, rgba(255,106,0,0.5) 50%, rgba(255,106,0,0.35) 75%, transparent)",
        boxShadow: "0 0 16px 2px rgba(255,106,0,0.12), 0 0 40px 4px rgba(255,106,0,0.05)",
      }}
    />
  </div>
);

export default SpotlightDivider;
