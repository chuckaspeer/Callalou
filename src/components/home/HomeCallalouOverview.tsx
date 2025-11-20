import { Section } from "@/components/layout/Section";

const pillars = [
  {
    title: "Belonging Infrastructure",
    copy: "Housing, hospitality, and community products that anchor the New Majority with dignity.",
  },
  {
    title: "Cultural Capital",
    copy: "Media, storytelling, and creator platforms that reclaim narrative ownership.",
  },
  {
    title: "Care Economies",
    copy: "Health, wellness, and financial tools that move overlooked families from fragile to flourishing.",
  },
];

export function HomeCallalouOverview() {
  return (
    <Section>
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Callalou Ventures
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Brand promise: story-first capital for the builders of home.
        </h2>
        <p className="max-w-3xl text-slate-600">
          Callalou is named after a Caribbean dish that mixes bold ingredients
          into something nourishing. We invest with the same intention—combining
          capital, narrative strategy, and operator empathy so founders can
          translate community credibility into scalable companies.
        </p>
      </div>
      <div className="grid gap-6 pt-6 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-slate-900">
              {pillar.title}
            </h3>
            <p className="mt-3 text-sm text-slate-600">{pillar.copy}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

