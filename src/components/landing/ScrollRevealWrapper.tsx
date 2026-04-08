import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const ScrollRevealWrapper = ({ children, className = "", delay = 0 }: Props) => {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollRevealWrapper;
