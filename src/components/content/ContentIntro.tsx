import { Section } from "@/components/layout/Section";

export function ContentIntro() {
  return (
    <Section>
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Media Hub
        </p>
        <h1 className="text-4xl font-semibold text-slate-900">
          Insights on Multifamily Real Estate Investing
        </h1>
        <div className="max-w-3xl space-y-4 text-slate-600">
          <p>
            Our media hub features educational content, market insights, and operational strategies for multifamily real estate investing. Learn about our approach to building quality housing portfolios while creating community impact.
          </p>
          <p>
            Content includes videos, articles, and educational resources that balance operational insights with the purpose-driven approach that differentiates Callaloo Ventures in the multifamily real estate space.
          </p>
        </div>
      </div>
    </Section>
  );
}

