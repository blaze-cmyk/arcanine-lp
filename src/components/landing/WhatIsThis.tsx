const WhatIsThis = () => (
  <section className="py-24 px-4">
    <div className="max-w-3xl mx-auto text-center">
      <div className="glass rounded-2xl p-10 sm:p-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(152_100%_45%/0.04),transparent_70%)]" />
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            What is <span className="text-gradient">this</span>?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            A fast, simplified trading platform where you predict short-term price movements across global markets.
          </p>
          <p className="text-muted-foreground">
            No indicators. No complicated tools. Just a clear decision.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default WhatIsThis;
