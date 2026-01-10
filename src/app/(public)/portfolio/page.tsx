import { PortfolioMetrics } from "@/components/portfolio/PortfolioMetrics";
import { MarketOverview } from "@/components/portfolio/MarketOverview";
import { InvestmentStrategy } from "@/components/portfolio/InvestmentStrategy";
import { OperationalExamples } from "@/components/portfolio/OperationalExamples";
import { BuildingShowcase } from "@/components/portfolio/BuildingShowcase";
import { TrackRecord } from "@/components/portfolio/TrackRecord";
import { Section } from "@/components/layout/Section";

export default function PortfolioPage() {
  return (
    <div className="space-y-16">
      <Section>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Portfolio
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">
            Multifamily Real Estate Portfolio
          </h1>
          <p className="max-w-3xl text-lg text-slate-600">
            Our portfolio focuses on quality multifamily properties that combine strong investment returns with positive community impact. We maintain high operational standards and strategic market focus.
          </p>
        </div>
      </Section>
      <PortfolioMetrics />
      <MarketOverview />
      <InvestmentStrategy />
      <OperationalExamples />
      <BuildingShowcase />
      <TrackRecord />
    </div>
  );
}
