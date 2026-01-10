import { Section } from "@/components/layout/Section";

export function BurnTheBoatsDetails() {
  return (
    <Section background="muted" className="rounded-3xl shadow-inner">
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-slate-900">
          Operational Application
        </h2>
        <div className="max-w-3xl space-y-4 text-slate-600">
          <p>
            &quot;Burn the Boats&quot; is not recklessness — it&apos;s radical commitment to strategic action. This leadership principle guides how we approach multifamily real estate operations and investment decisions.
          </p>
          <p>
            <strong className="text-slate-900">In Investment Decisions:</strong> We commit fully to properties that meet our criteria, moving forward with conviction after thorough due diligence and strategic analysis.
          </p>
          <p>
            <strong className="text-slate-900">In Operations:</strong> We build operational excellence with no retreat, maintaining high standards for property management, tenant relations, and quality housing.
          </p>
          <p>
            <strong className="text-slate-900">In Community Impact:</strong> We invest with conviction, clarity, and purpose — transforming neighborhoods into places people are proud to call home while delivering value for investors.
          </p>
        </div>
      </div>
    </Section>
  );
}

