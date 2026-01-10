import { Section } from "@/components/layout/Section";

export function TrackRecord() {
  return (
    <Section>
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Performance
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Track Record
        </h2>
        <p className="max-w-3xl text-slate-600">
          Our investment approach focuses on building a portfolio of quality multifamily properties that deliver consistent performance through disciplined operations and strategic management.
        </p>
        <div className="grid gap-6 md:grid-cols-3 pt-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Operational Excellence
            </h3>
            <p className="text-slate-600 text-sm">
              Rigorous property management standards and quality control measures ensure our properties meet high operational benchmarks.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Tenant Retention
            </h3>
            <p className="text-slate-600 text-sm">
              Focus on responsive management and quality living environments supports strong tenant satisfaction and retention.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Value Creation
            </h3>
            <p className="text-slate-600 text-sm">
              Strategic improvements and operational enhancements create value for both investors and residents.
            </p>
          </div>
        </div>
        <div className="pt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm text-slate-600">
            <strong className="text-slate-900">Note:</strong> Detailed performance metrics and track record information are available to accredited investors with pre-existing relationships through our private investor portal. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </Section>
  );
}
