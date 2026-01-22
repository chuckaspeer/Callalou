import { Section } from "@/components/layout/Section";

export function CompanyOverview() {
  return (
    <Section>
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold text-slate-900">
          A Long-Term View of Multifamily Real Estate
        </h1>
        <p className="max-w-3xl text-lg text-slate-600">
          Callaloo Ventures was founded on a simple belief: Real estate decisions matter — not just financially, but structurally. Multifamily housing shapes how people live, how communities function, and how wealth is built over time. That responsibility requires patience, discipline, and a clear understanding of what endures beyond any single market cycle.
        </p>
      </div>
    </Section>
  );
}
