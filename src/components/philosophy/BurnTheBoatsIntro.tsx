import { Section } from "@/components/layout/Section";

export function BurnTheBoatsIntro() {
  return (
    <Section>
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Leadership Philosophy
        </p>
        <h1 className="text-4xl font-semibold text-slate-900">
          Burn the Boats: A Leadership Principle
        </h1>
        <div className="max-w-3xl space-y-4 text-lg text-slate-600">
          <p>
            &quot;Burn the Boats&quot; represents a leadership principle that guides how we approach multifamily real estate investing: a commitment to bold action, decisive leadership, and full belief in the path ahead.
          </p>
          <p>
            This philosophy informs our operational decisions and investment approach. We move forward with conviction, clarity, and purpose — not through reckless risk, but through thorough preparation, disciplined execution, and strategic commitment.
          </p>
          <p className="font-medium text-slate-900">
            In practice, this means making strategic investments with full commitment, building operational excellence with no retreat, and standing firmly in our approach to creating value for investors and residents.
          </p>
        </div>
      </div>
    </Section>
  );
}

