import { Section } from "@/components/layout/Section";

const partnerships = [
  {
    name: "Partnership Name",
    description: "Description of partnership and how it supports our mission.",
  },
  {
    name: "Partnership Name",
    description: "Description of partnership and how it supports our mission.",
  },
  {
    name: "Partnership Name",
    description: "Description of partnership and how it supports our mission.",
  },
];

export function KeyPartnerships() {
  return (
    <Section>
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Key Partnerships
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Strategic partnerships that support our operations.
        </h2>
        <p className="text-slate-600">
          We collaborate with organizations and institutions that support our multifamily operations, helping us deliver quality housing and strong investment performance.
        </p>
      </div>
      <div className="grid gap-6 pt-6 md:grid-cols-3">
        {partnerships.map((partnership, index) => (
          <div
            key={index}
            className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-slate-900">
              {partnership.name}
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              {partnership.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

