import { Section } from "@/components/layout/Section";

const audiences = [
  {
    title: "Builders of belonging",
    copy: "Founders architecting housing, hospitality, and civic tech rooted in community trust.",
  },
  {
    title: "Culture shapers",
    copy: "Creators and media operators exporting diaspora stories with modern business models.",
  },
  {
    title: "Stewards of capital",
    copy: "Family offices, foundations, and funds looking to deploy conviction capital alongside us.",
  },
];

export function CallalouWhoWeServe() {
  return (
    <Section>
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Who we serve
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          A coalition of operators, storytellers, and investors.
        </h2>
      </div>
      <div className="grid gap-6 pt-6 md:grid-cols-3">
        {audiences.map((audience) => (
          <div
            key={audience.title}
            className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-slate-900">
              {audience.title}
            </h3>
            <p className="mt-3 text-sm text-slate-600">{audience.copy}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

