import { Section } from "@/components/layout/Section";
import { TrackedLink } from "@/components/layout/TrackedLink";
import type { InsightCategory, InsightPlatform } from "@/content/insights";

const FORMATS: { platform: InsightPlatform; learn: string }[] = [
  { platform: "LinkedIn", learn: "Frameworks and standards you can audit." },
  { platform: "YouTube", learn: "Full breakdowns, downside first." },
  { platform: "Instagram", learn: "Principles, discipline, stewardship." },
  { platform: "Facebook", learn: "Community and relationship continuity." },
];

function buildMediaHref(category: InsightCategory | "All", platform: InsightPlatform): string {
  const params = new URLSearchParams();
  if (category !== "All") params.set("category", category);
  params.set("platform", platform);
  return `/media?${params.toString()}`;
}

interface FormatsSectionProps {
  selectedCategory: InsightCategory | "All";
}

export function FormatsSection({ selectedCategory }: FormatsSectionProps) {
  return (
    <Section background="muted" className="rounded-2xl">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Where we publish
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">Formats</h2>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FORMATS.map(({ platform, learn }) => (
          <div
            key={platform}
            className="rounded-xl border border-slate-200 bg-white/80 p-4"
          >
            <p className="text-sm font-semibold text-slate-900">{platform}</p>
            <p className="mt-2 text-sm text-slate-600">{learn}</p>
            <TrackedLink
              href={buildMediaHref(selectedCategory, platform)}
              event="click_format_lane"
              eventProps={{ platform }}
              className="mt-3 inline-block text-xs font-medium text-slate-700 hover:text-slate-900"
            >
              View on Media →
            </TrackedLink>
          </div>
        ))}
      </div>
    </Section>
  );
}
