import { headers } from "next/headers";
import {
  CATEGORIES,
  VALID_PLATFORMS,
  getAllInsights,
  normalizeInsight,
  sortInsights,
  type InsightCategory,
  type InsightPlatform,
} from "@/content/insights";
import type { Insight, PlatformConfig } from "@/types/insights";
import { ContentIntro } from "@/components/content/ContentIntro";
import { CategoryFilter } from "@/components/content/CategoryFilter";
import { ReadingPathsSection } from "@/components/content/ReadingPathsSection";
import { FormatsSection } from "@/components/content/FormatsSection";
import { VideoGrid } from "@/components/content/VideoGrid";
import { FeaturedVideo } from "@/components/content/FeaturedVideo";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function parseCategory(value: string | string[] | undefined): InsightCategory | "All" {
  if (!value || typeof value !== "string") return "All";
  return CATEGORIES.includes(value as InsightCategory) ? (value as InsightCategory) : "All";
}

function parsePlatform(value: string | string[] | undefined): InsightPlatform | undefined {
  if (!value || typeof value !== "string") return undefined;
  return VALID_PLATFORMS.includes(value as InsightPlatform) ? (value as InsightPlatform) : undefined;
}

const isDev = process.env.NODE_ENV === "development";
const allowFallback = process.env.ALLOW_INSIGHTS_FALLBACK === "true";

function getNormalizedFallback(): Insight[] {
  const fallback = getAllInsights();
  return sortInsights(
    fallback
      .map((i) => normalizeInsight(i))
      .filter((i): i is Insight => i != null)
  );
}

type FetchMediaResult =
  | { data: Insight[]; platforms: PlatformConfig[] }
  | { error: { code: string; message: string; snippet?: string } };

const PLATFORM_LEARN_DEFAULTS: Partial<
  Record<
    InsightPlatform,
    {
      label?: string;
      learn?: string;
    }
  >
> = {
  LinkedIn: {
    learn: "Frameworks and standards you can audit.",
  },
  YouTube: {
    learn: "Full breakdowns, downside first.",
  },
  Instagram: {
    learn: "Principles, discipline, stewardship.",
  },
  Facebook: {
    learn: "Community and relationship continuity.",
  },
};

function derivePlatformsFromInsights(insights: Insight[]): PlatformConfig[] {
  const hasPlatform = new Set<InsightPlatform>();
  for (const item of insights) {
    if (item.platform) {
      hasPlatform.add(item.platform);
    }
  }

  const platforms: PlatformConfig[] = [];
  VALID_PLATFORMS.forEach((platform, index) => {
    if (!hasPlatform.has(platform)) return;
    const defaults = PLATFORM_LEARN_DEFAULTS[platform] ?? {};
    platforms.push({
      platform,
      label: defaults.label ?? platform,
      learn: defaults.learn,
      order: index + 1,
    });
  });

  return platforms;
}

async function fetchMedia(): Promise<FetchMediaResult> {
  try {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const base = host ? `${protocol}://${host}` : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

    if (!base) {
      if (isDev || allowFallback) return { data: getNormalizedFallback() };
      return { error: { code: "CONFIG", message: "Unable to determine API base URL (missing host / VERCEL_URL)." } };
    }

    const res = await fetch(`${base}/api/insights/media`, { cache: "no-store" });
    const data = (await res.json()) as {
      ok?: boolean;
      items?: unknown[];
      error?: { code?: string; message?: string; snippet?: string };
      platforms?: unknown;
    };

    if (data?.ok === true && Array.isArray(data.items)) {
      const normalized = (data.items as Partial<Insight>[])
        .map(normalizeInsight)
        .filter((i): i is Insight => i != null);
      const sorted = sortInsights(normalized);

      const apiPlatforms = Array.isArray(data.platforms)
        ? (data.platforms as PlatformConfig[])
        : [];
      const platforms =
        apiPlatforms.length > 0 ? apiPlatforms : derivePlatformsFromInsights(sorted);

      return { data: sorted, platforms };
    }

    const apiError = data?.error;
    const code = typeof apiError?.code === "string" ? apiError.code : "UPSTREAM";
    const message = typeof apiError?.message === "string" ? apiError.message : "Insights API returned invalid or error response.";
    const snippet = typeof apiError?.snippet === "string" ? apiError.snippet : undefined;

    if (isDev || allowFallback)
      return { data: getNormalizedFallback(), platforms: derivePlatformsFromInsights(getNormalizedFallback()) };
    return { error: { code, message, snippet } };
  } catch {
    if (isDev || allowFallback)
      return { data: getNormalizedFallback(), platforms: derivePlatformsFromInsights(getNormalizedFallback()) };
    return {
      error: {
        code: "UPSTREAM",
        message: "Failed to load insights (network or server error).",
      },
    };
  }
}

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const category = parseCategory(params.category);
  const platform = parsePlatform(params.platform);
  const result = await fetchMedia();

  if ("error" in result) {
    return (
      <div className="space-y-16">
        <ContentIntro />
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
          <h2 className="text-lg font-semibold">Insights data unavailable</h2>
          <p className="mt-2 text-sm">
            The Media/Insights API is misconfigured or unavailable. Please set{" "}
            <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs">INSIGHTS_SCRIPT_URL</code> in your
            deployment environment (e.g. Vercel) to the Google Apps Script Web App URL.
          </p>
          <p className="mt-3 text-sm font-medium">
            Error: {result.error.code} — {result.error.message}
          </p>
          {result.error.snippet && (
            <pre className="mt-3 max-h-32 overflow-auto rounded bg-amber-100/80 p-3 text-xs">
              {result.error.snippet}
            </pre>
          )}
        </div>
        <CategoryFilter currentCategory={category} selectedPlatform={platform} />
        <FormatsSection selectedCategory={category} />
        <VideoGrid insights={[]} />
        <FeaturedVideo insights={[]} />
      </div>
    );
  }

  const insights = result.data;
  const platforms = result.platforms;

  return (
    <div className="space-y-16">
      <ContentIntro />
      <CategoryFilter currentCategory={category} selectedPlatform={platform} />
      <ReadingPathsSection category={category} platform={platform} insights={insights} />
      <FormatsSection selectedCategory={category} platforms={platforms} />
      <VideoGrid insights={insights} />
      <FeaturedVideo insights={insights} />
    </div>
  );
}
