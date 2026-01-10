import { Section } from "@/components/layout/Section";

export function CompanyOverview() {
  return (
    <Section>
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          About Callaloo Ventures
        </p>
        <h1 className="text-4xl font-semibold text-slate-900">
          Multifamily Real Estate Investing with Purpose
        </h1>
        <p className="max-w-3xl text-lg text-slate-600">
          Callaloo Ventures is a multifamily real estate investment platform focused on building quality housing portfolios while creating lasting community impact. We combine operational excellence with a purpose-driven approach to deliver value for investors and residents.
        </p>
        <div className="grid gap-6 pt-6 md:grid-cols-3">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">Multifamily Focus</h3>
            <p className="text-sm text-slate-600">
              We specialize in multifamily properties that provide quality housing and strong investment returns.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">Operational Excellence</h3>
            <p className="text-sm text-slate-600">
              Rigorous property management standards and quality control ensure our properties meet high benchmarks.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">Community Impact</h3>
            <p className="text-sm text-slate-600">
              Our approach creates stability for residents while delivering value for investors.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
