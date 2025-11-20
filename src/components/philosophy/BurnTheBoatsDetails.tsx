import { Section } from "@/components/layout/Section";

const commitments = [
  {
    title: "No tourist capital",
    copy: "We deploy with operators who live the problem and plan to stay long after headlines fade.",
  },
  {
    title: "Co-learning as diligence",
    copy: "We spend time in community, collect qualitative signals, and co-create strategy before wiring a dollar.",
  },
  {
    title: "Care is a KPI",
    copy: "Founder wellbeing, responsible governance, and regenerative economics drive our win-loss review.",
  },
];

export function BurnTheBoatsDetails() {
  return (
    <Section background="muted" className="rounded-3xl shadow-inner">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-slate-900">
            Radical conviction, practical frameworks.
          </h2>
          <p className="text-slate-600">
            Burn the Boats is not reckless bravado. It is a disciplined operating
            system that centers preparation, partnership, and accountability.
          </p>
          <p className="text-slate-600">
            We help founders design capital stacks, board relationships, and
            community compacts that withstand volatility.
          </p>
        </div>
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6">
          {commitments.map((commitment) => (
            <div key={commitment.title}>
              <h3 className="text-xl font-semibold text-slate-900">
                {commitment.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{commitment.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

