import Link from "next/link";
import { Section } from "@/components/layout/Section";

const features = [
  {
    id: "feature-newsletter",
    title: "Belonging Field Notes",
    type: "Newsletter",
    summary:
      "Operator interviews and data stories about housing, migration, and diaspora capital.",
  },
  {
    id: "feature-events",
    title: "Why Home Matters (Live)",
    type: "Event Series",
    summary:
      "Fireside conversations hosted across Brooklyn, Atlanta, and Antigua spotlighting community architects.",
  },
  {
    id: "feature-podcast",
    title: "Burn the Boats Podcast",
    type: "Audio",
    summary:
      "Short reflections on conviction, risk, and building wealth with people at the center.",
  },
];

export function HomeContentPreview() {
  return (
    <Section>
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Media & Insights
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Media & Insights
        </h2>
        <p className="text-slate-600">
          Thoughtful perspectives on multifamily investing, housing, and long-term value. Explore videos, essays, and commentary grounded in experience — not hype.
        </p>
      </div>
      <div className="grid gap-6 pt-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              {feature.type}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm text-slate-600">{feature.summary}</p>
          </div>
        ))}
      </div>
      <div>
        <Link
          href="/media"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900"
        >
          Explore the Media Hub →
        </Link>
      </div>
    </Section>
  );
}

