/**
 * Fallback insights data and helpers. Types and constants from @/types/insights.
 * When proxy is available, insights page uses API; on failure falls back to this.
 */

import type { Insight, InsightCategory, InsightPlatform, ReadingPath, ReadingPathKey } from "@/types/insights";
import {
  CATEGORIES,
  isValidReadingPathKey,
  READING_PATH_ORDER,
  VALID_PLATFORMS,
} from "@/types/insights";

// Re-export types and constants for consumers that import from @/content/insights
export type { Insight, InsightCategory, InsightPlatform, ReadingPath };
export type { InsightType, FeaturedSlot, InsightStatus } from "@/types/insights";
export {
  CATEGORIES,
  READING_PATH_LABELS,
  READING_PATH_ORDER,
  VALID_PLATFORMS,
  normalizeInsight,
  sortInsights,
  resolveVideoFields,
} from "@/types/insights";

const insights: Insight[] = [
  {
    id: "why-home-matters-video",
    title: "Why Home Matters: Creating Dignity Through Housing",
    type: "video",
    url: "#",
    platform: "YouTube",
    categories: ["Patience", "Platform Build"],
    readingPaths: ["Start Here", "Stewardship"],
    featuredSlot: "why-home-matters",
    summary:
      "Housing is more than an asset class. It's where lives stabilize and communities take shape.",
    length: "10 min",
    featured: true,
    order: 0,
    published_at: null,
    status: "published",
  },
  {
    id: "antigua-to-opportunity",
    title: "From Antigua to Opportunity: The Emil Brown Story",
    type: "video",
    url: "#",
    platform: "YouTube",
    categories: ["Platform Build", "Patience"],
    readingPaths: ["Start Here"],
    summary: "Origin and approach.",
    length: "12 min",
    featured: false,
    order: 1,
    published_at: null,
    status: "published",
  },
  {
    id: "burn-the-boats-video",
    title: "Burn the Boats: Building Wealth with Purpose",
    type: "video",
    url: "#",
    platform: "YouTube",
    categories: ["Risk", "Patience"],
    readingPaths: ["Underwriting"],
    featuredSlot: "underwriting",
    summary: "Commitment, discipline, and preparation.",
    length: "15 min",
    featured: true,
    order: 2,
    published_at: null,
    status: "published",
  },
  {
    id: "article-antigua-cincinnati",
    title: "From Antigua to Cincinnati: Building Wealth with Purpose",
    type: "article",
    url: "#",
    platform: "Site",
    categories: ["Platform Build", "Patience"],
    readingPaths: ["Start Here"],
    featuredSlot: "start-here",
    summary:
      "How cultural roots and long-term thinking shape approach to real estate and community.",
    featured: true,
    order: 3,
    published_at: null,
    status: "published",
  },
  {
    id: "article-burn-the-boats",
    title: "Burn the Boats: A Philosophy of Radical Commitment",
    type: "article",
    url: "#",
    platform: "Site",
    categories: ["Risk", "Patience"],
    readingPaths: ["Underwriting"],
    summary:
      "Why removing the option of retreat leads to bold action and full belief in the path ahead — preparation, discipline, purpose.",
    featured: false,
    order: 4,
    published_at: null,
    status: "published",
  },
  {
    id: "article-why-home-matters",
    title: "Why Home Matters: Creating Dignity Through Housing",
    type: "article",
    url: "#",
    platform: "Site",
    categories: ["Allocation", "Patience"],
    readingPaths: ["Stewardship"],
    summary:
      "How stable housing transforms lives and why we steward properties that serve all tenants with respect and dignity.",
    featured: false,
    order: 5,
    published_at: null,
    status: "published",
  },
  {
    id: "standards-and-transparency",
    title: "Standards and the Transparency Trail",
    type: "article",
    url: "#",
    platform: "Site",
    categories: ["Transparency"],
    readingPaths: ["Start Here", "Underwriting"],
    featuredSlot: "wildcard",
    summary: "How we document and publish expectations so behavior is auditable.",
    featured: true,
    order: 6,
    published_at: null,
    status: "published",
  },
  {
    id: "downside-first",
    title: "Downside First: What We Stress-Test",
    type: "article",
    url: "#",
    platform: "Site",
    categories: ["Risk", "Transparency"],
    readingPaths: ["Underwriting"],
    summary: "Leverage, operating assumptions, and liquidity before upside.",
    featured: false,
    order: 7,
    published_at: null,
    status: "published",
  },
  {
    id: "stewardship-structures",
    title: "Structures That Favor Stewardship",
    type: "article",
    url: "#",
    platform: "Site",
    categories: ["Transparency", "Patience"],
    readingPaths: ["Stewardship"],
    summary: "Durability and alignment over speed.",
    featured: false,
    order: 8,
    published_at: null,
    status: "published",
  },
  {
    id: "start-here-trust",
    title: "Trust, Judgment, and Temperament",
    type: "article",
    url: "#",
    platform: "Site",
    categories: ["Patience", "Transparency"],
    readingPaths: ["Start Here"],
    summary: "What we mean by judgment and long-horizon discipline.",
    featured: false,
    order: 9,
    published_at: null,
    status: "published",
  },
  {
    id: "start-here-expectations",
    title: "Clear Reporting Expectations",
    type: "article",
    url: "#",
    platform: "Site",
    categories: ["Transparency"],
    readingPaths: ["Start Here"],
    summary: "Designed for calm periods and difficult ones.",
    featured: false,
    order: 10,
    published_at: null,
    status: "published",
  },
  {
    id: "underwriting-criteria",
    title: "Underwriting Criteria in Practice",
    type: "article",
    url: "#",
    platform: "Site",
    categories: ["Risk", "Transparency"],
    readingPaths: ["Underwriting"],
    summary: "Competence and downside reasoning.",
    featured: false,
    order: 11,
    published_at: null,
    status: "published",
  },
  {
    id: "allocation-principles",
    title: "Allocation and Margin of Safety",
    type: "article",
    url: "#",
    platform: "Site",
    categories: ["Allocation", "Risk"],
    readingPaths: ["Underwriting", "Stewardship"],
    summary: "How we think about concentration and downside.",
    featured: false,
    order: 12,
    published_at: null,
    status: "published",
  },
  {
    id: "stewardship-signals",
    title: "Long-Term Behavior Signals",
    type: "article",
    url: "#",
    platform: "Site",
    categories: ["Patience", "Transparency"],
    readingPaths: ["Stewardship"],
    summary: "What we look for in partners and structures.",
    featured: false,
    order: 13,
    published_at: null,
    status: "published",
  },
  {
    id: "platform-build",
    title: "Platform Build: Operating Assumptions",
    type: "article",
    url: "#",
    platform: "Site",
    categories: ["Platform Build", "Transparency"],
    readingPaths: ["Start Here"],
    summary: "How we document how we operate.",
    featured: false,
    order: 14,
    published_at: null,
    status: "published",
  },
];

export function getAllInsights(): Insight[] {
  return insights;
}

export function getInsightsByReadingPath(path: ReadingPath): Insight[] {
  return insights.filter((i) => i.readingPaths.includes(path));
}

export function getInsightsByCategory(category: InsightCategory | "All"): Insight[] {
  if (category === "All") return insights;
  return insights.filter((i) => i.categories.includes(category));
}

export function getInsightsFilteredByCategory(category: InsightCategory | "All"): Insight[] {
  return getInsightsByCategory(category);
}

export function getFeaturedForHome(): Insight[] {
  const bySlot: Record<ReadingPathKey, Insight | undefined> = {
    "start-here": undefined,
    underwriting: undefined,
    stewardship: undefined,
    wildcard: undefined,
  };
  for (const i of insights) {
    if (i.featuredSlot && isValidReadingPathKey(i.featuredSlot) && !bySlot[i.featuredSlot]) bySlot[i.featuredSlot] = i;
  }
  return [
    bySlot["start-here"],
    bySlot["underwriting"],
    bySlot["stewardship"],
    bySlot["wildcard"],
  ].filter((i): i is Insight => i != null);
}

export function getInsightsByPlatform(platform: InsightPlatform): Insight[] {
  return insights.filter((i) => i.platform === platform);
}

export function getInsightsForPath(
  path: ReadingPath,
  category: InsightCategory | "All",
  limit = 10,
  platform?: InsightPlatform
): Insight[] {
  let list = insights.filter(
    (i) =>
      i.readingPaths.includes(path) &&
      (category === "All" || i.categories.includes(category)) &&
      (platform === undefined || i.platform === platform)
  );
  return list.slice(0, limit);
}

export function getFilteredInsights(
  category: InsightCategory | "All",
  platform?: InsightPlatform
): Insight[] {
  return insights.filter(
    (i) =>
      (category === "All" || i.categories.includes(category)) &&
      (platform === undefined || i.platform === platform)
  );
}

/** Run getInsightsForPath against an arbitrary list (e.g. from API). */
export function getInsightsForPathFromList(
  list: Insight[],
  path: ReadingPath,
  category: InsightCategory | "All",
  limit = 10,
  platform?: InsightPlatform
): Insight[] {
  return list
    .filter(
      (i) =>
        i.readingPaths.includes(path) &&
        (category === "All" || i.categories.includes(category)) &&
        (platform === undefined || i.platform === platform)
    )
    .slice(0, limit);
}

/** Run getFeaturedForHome against an arbitrary list (e.g. from API). */
export function getFeaturedForHomeFromList(list: Insight[]): Insight[] {
  const bySlot: Record<ReadingPathKey, Insight | undefined> = {
    "start-here": undefined,
    underwriting: undefined,
    stewardship: undefined,
    wildcard: undefined,
  };
  for (const i of list) {
    if (i.featuredSlot && isValidReadingPathKey(i.featuredSlot) && !bySlot[i.featuredSlot]) bySlot[i.featuredSlot] = i;
  }
  return [
    bySlot["start-here"],
    bySlot["underwriting"],
    bySlot["stewardship"],
    bySlot["wildcard"],
  ].filter((i): i is Insight => i != null);
}
