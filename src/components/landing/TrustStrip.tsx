import { Zap, Shield, Banknote, Globe } from "lucide-react";

const items = [
  { icon: Zap, text: "Execute trades in milliseconds" },
  { icon: Shield, text: "Secure transactions" },
  { icon: Banknote, text: "Fast withdrawals" },
  { icon: Globe, text: "Available globally" },
];

const TrustStrip = () => (
  <section className="py-12">
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3 justify-center">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-secondary-foreground">{text}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStrip;
