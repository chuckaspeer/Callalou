import { Section } from "@/components/layout/Section";

export function PortfolioMetrics() {
  return (
    <Section>
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Portfolio Metrics
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Multifamily Portfolio Overview
        </h2>
        <p className="max-w-3xl text-slate-600">
          Our portfolio focuses on quality multifamily properties that deliver strong returns while creating positive community impact.
        </p>
      </div>
      <div className="grid gap-6 pt-8 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Property Types
          </h3>
          <p className="text-2xl font-bold text-slate-900 mb-2">Multifamily</p>
          <p className="text-sm text-slate-600">
            Focus on residential multifamily properties designed for long-term value creation.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Primary Market
          </h3>
          <p className="text-2xl font-bold text-slate-900 mb-2">Cincinnati</p>
          <p className="text-sm text-slate-600">
            Deep market knowledge and operational expertise in the Cincinnati metropolitan area.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Investment Strategy
          </h3>
          <p className="text-2xl font-bold text-slate-900 mb-2">Value-Add & Stabilized</p>
          <p className="text-sm text-slate-600">
            Properties that offer value-add opportunities and stabilized cash flow.
          </p>
        </div>
      </div>
    </Section>
  );
}
