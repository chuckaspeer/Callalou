import { Section } from "@/components/layout/Section";

export function ContentIntro() {
  return (
    <Section>
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold text-slate-900">
          Insights on Multifamily Real Estate Investing
        </h1>
        <div className="max-w-3xl space-y-4 text-slate-600">
          <p>
            Real estate investing isn&apos;t just about deals. It&apos;s about decisions, discipline, and long-term thinking. This media hub shares perspectives drawn from real-world multifamily experience — offering clarity on markets, strategy, and the principles that guide durable outcomes.
          </p>
        </div>
        <div className="max-w-3xl space-y-4 pt-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            What You&apos;ll Find
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-slate-600">
            <li>Operator-level insights from hands-on experience</li>
            <li>Market commentary grounded in context</li>
            <li>Principles that inform sound decision-making</li>
            <li>Reflections on housing, community, and value</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

