import { AlertTriangle } from "lucide-react";

const RiskWarning = () => (
  <section className="py-12 px-4 sm:px-6 border-t border-border">
    <div className="max-w-6xl mx-auto">
      <div className="flex gap-4 items-start rounded-xl bg-card/50 border border-border p-6 sm:p-8">
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-10 h-10 rounded-lg bg-[hsl(var(--loss))]/10 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-[hsl(var(--loss))]" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">
            General Risk Warning
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Binary options trading carries a high level of risk and can result in the loss of all your invested capital. You should not invest more than you can afford to lose. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite. There is a possibility that you may sustain a loss of some or all of your initial investment and therefore you should not invest money that you cannot afford to lose.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You should be aware of all the risks associated with trading binary options and seek advice from an independent financial advisor if you have any doubts. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default RiskWarning;
