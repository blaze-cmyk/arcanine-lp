const SectionDivider = () => (
  <div className="relative flex justify-center py-2">
    {/* Soft ambient glow behind the line */}
    <div
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-24 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 60% 100% at 50% 50%, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
      }}
    />
    {/* The line itself */}
    <div
      className="w-full max-w-5xl h-px relative"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, hsl(var(--border)) 15%, hsl(var(--primary) / 0.25) 50%, hsl(var(--border)) 85%, transparent 100%)",
      }}
    />
  </div>
);

export default SectionDivider;
