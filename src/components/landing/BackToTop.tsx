import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center border border-border/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ background: "rgba(18, 18, 22, 0.8)" }}
      aria-label="Back to top"
    >
      <ArrowUp size={18} className="text-muted-foreground" />
    </button>
  );
};

export default BackToTop;
