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
import type { Insight } from "@/types/insights";
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

async function fetchMedia(): Promise<Insight[]> {
  try {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const base = host ? `${protocol}://${host}` : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
    if (!base) return getAllInsights();
    const res = await fetch(`${base}/api/insights/media`, { next: { revalidate: 300 } });
    const data = await res.json();
    if (data?.ok === true && Array.isArray(data.items)) {
      const normalized = (data.items as Partial<Insight>[])
        .map(normalizeInsight)
        .filter((i): i is Insight => i != null);
      return sortInsights(normalized);
    }
  } catch {
    // fallback
  }
  const fallback = getAllInsights();
  const normalizedFallback = fallback
    .map((i) => normalizeInsight(i))
    .filter((i): i is Insight => i != null);
  return sortInsights(normalizedFallback);
}

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const category = parseCategory(params.category);
  const platform = parsePlatform(params.platform);
  const insights = await fetchMedia();

  return (
    <div className="space-y-16">
      <ContentIntro />
      <CategoryFilter currentCategory={category} selectedPlatform={platform} />
      <ReadingPathsSection category={category} platform={platform} insights={insights} />
      <FormatsSection selectedCategory={category} />
      <VideoGrid />
      <FeaturedVideo />
    </div>
  );
}
