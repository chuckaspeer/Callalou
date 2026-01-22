import { Section } from "@/components/layout/Section";

export function OperationalApproach() {
  return (
    <Section background="muted" className="rounded-3xl shadow-sm">
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-slate-900">
          Grounded in Experience
        </h2>
        <p className="max-w-3xl text-slate-600">
          Callaloo Ventures approaches multifamily investing from the operator&apos;s perspective. That means decisions are informed by hands-on experience — understanding how properties function day to day, how teams work together, and how thoughtful stewardship affects long-term outcomes. Rather than chasing trends or shortcuts, we focus on fundamentals:
        </p>
        <ul className="list-disc space-y-2 pl-6 pt-4 text-slate-600">
          <li>Sound underwriting</li>
          <li>Operational clarity</li>
          <li>Aligned partnerships</li>
          <li>Realistic expectations</li>
        </ul>
      </div>
    </Section>
  );
}
