const SectionDivider = () => (
  <div className="flex justify-center">
    <div
      className="w-full max-w-4xl h-px"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(255,106,0,0.15) 0%, transparent 70%)",
        boxShadow: "0 0 20px rgba(255,106,0,0.06)",
      }}
    />
  </div>
);

export default SectionDivider;
