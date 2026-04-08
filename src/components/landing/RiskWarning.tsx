import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";

const RiskWarning = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-4 items-start rounded-xl bg-card/50 border border-border p-6 sm:p-8">
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-10 h-10 rounded-lg bg-[hsl(var(--loss))]/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[hsl(var(--loss))]" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">{t("riskWarning.title")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{t("riskWarning.text1")}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("riskWarning.text2")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskWarning;
