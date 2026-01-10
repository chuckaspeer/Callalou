import { Section } from "@/components/layout/Section";

export function InvestmentStrategy() {
  return (
    <Section>
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Investment Approach
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Investment Strategy
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Value-Add Properties
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Properties with potential for improvement through renovations, operational enhancements, and strategic management.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
              <li>Properties requiring capital improvements</li>
              <li>Operational optimization opportunities</li>
              <li>Market repositioning potential</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Stabilized Properties
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Well-maintained properties with established cash flow and strong operational performance.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
              <li>Consistent rental income</li>
              <li>Strong tenant retention</li>
              <li>Proven operational track record</li>
            </ul>
          </div>
        </div>
        <div className="pt-6 space-y-4">
          <h3 className="text-xl font-semibold text-slate-900">
            Investment Criteria
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <p className="font-medium text-slate-900">Property Quality</p>
              <p className="text-sm text-slate-600">
                Well-located properties with strong physical condition and improvement potential.
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-slate-900">Market Fundamentals</p>
              <p className="text-sm text-slate-600">
                Markets with stable demand, economic growth, and favorable regulatory environment.
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-slate-900">Value Creation</p>
              <p className="text-sm text-slate-600">
                Opportunities to enhance value through operations, improvements, and strategic management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
