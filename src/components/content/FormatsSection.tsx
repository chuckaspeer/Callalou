import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { TrackedLink } from "@/components/layout/TrackedLink";
import type { InsightCategory, InsightPlatform, PlatformConfig } from "@/content/insights";

const FALLBACK_FORMATS: PlatformConfig[] = [
  {
    platform: "LinkedIn",
    label: "LinkedIn",
    learn: "Frameworks and standards you can audit.",
    order: 1,
  },
  {
    platform: "YouTube",
    label: "YouTube",
    learn: "Full breakdowns, downside first.",
    order: 2,
  },
  {
    platform: "Instagram",
    label: "Instagram",
    learn: "Principles, discipline, stewardship.",
    order: 3,
  },
  {
    platform: "Facebook",
    label: "Facebook",
    learn: "Community and relationship continuity.",
    order: 4,
  },
];

function buildInsightsHref(
  category: InsightCategory | "All",
  platform: InsightPlatform
): string {
  const params = new URLSearchParams();
  if (category !== "All") params.set("category", category);
  params.set("platform", platform);
  const q = params.toString();
  return q ? `/insights?${q}` : "/insights";
}

interface FormatsSectionProps {
  selectedCategory: InsightCategory | "All";
  platforms?: PlatformConfig[];
}

export function FormatsSection({ selectedCategory, platforms }: FormatsSectionProps) {
  const items = platforms && platforms.length > 0 ? platforms : FALLBACK_FORMATS;

  return (
    <Section background="muted" className="rounded-2xl">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Where we publish
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">Formats</h2>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const { platform, label, learn, url } = item;
          const title = label ?? platform;
          const href = url && url.trim().length > 0 ? url : buildInsightsHref(selectedCategory, platform);

          return (
            <div
              key={platform}
              className="rounded-xl border border-slate-200 bg-white/80 p-4"
            >
              <p className="text-sm font-semibold text-slate-900">{title}</p>
              {learn && (
                <p className="mt-2 text-sm text-slate-600">{learn}</p>
              )}
              <Link
                href={href}
                {...(url
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="mt-3 inline-block text-xs font-medium text-slate-700 hover:text-slate-900"
              >
                {url ? `View on ${title} →` : "View on Insights →"}
              </Link>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
