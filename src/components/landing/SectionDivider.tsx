const SectionDivider = () => (
  <div className="flex justify-center pointer-events-none">
    <div className="relative w-full max-w-3xl">
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,106,0,0.4) 30%, rgba(255,106,0,0.4) 70%, transparent 100%)",
        }}
      />
      <div
        className="h-24"
        style={{
          background:
            "radial-gradient(ellipse 40% 100% at 50% 0%, rgba(255,106,0,0.06) 0%, transparent 100%)",
        }}
      />
    </div>
  </div>
);

export default SectionDivider;
