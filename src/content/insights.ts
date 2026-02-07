/**
 * Static insights config for Media/Insights library. No backend.
 */

export type InsightType = "video" | "article" | "post";
export type InsightPlatform =
  | "YouTube"
  | "LinkedIn"
  | "Instagram"
  | "Facebook"
  | "Site";
export type InsightCategory =
  | "Transparency"
  | "Risk"
  | "Allocation"
  | "Patience"
  | "Platform Build";
export type ReadingPath = "Start Here" | "Underwriting" | "Stewardship";
export type FeaturedSlot =
  | "start-here"
  | "underwriting"
  | "stewardship"
  | "wildcard";

export interface Insight {
  id: string;
  title: string;
  type: InsightType;
  url: string;
  platform: InsightPlatform;
  categories: InsightCategory[];
  readingPaths: ReadingPath[];
  featuredSlot?: FeaturedSlot;
  summary?: string;
  length?: string;
}

/** Stable order for Reading Paths. Do not sort by date. */
export const READING_PATH_ORDER: ReadingPath[] = [
  "Start Here",
  "Underwriting",
  "Stewardship",
];

export const CATEGORIES: InsightCategory[] = [
  "Transparency",
  "Risk",
  "Allocation",
  "Patience",
  "Platform Build",
];

/** Supported for ?platform= URL param. Validation uses this. */
export const VALID_PLATFORMS: InsightPlatform[] = [
  "LinkedIn",
  "YouTube",
  "Instagram",
  "Facebook",
  "Site",
];

const insights: Insight[] = [
  {
    id: "why-home-matters-video",
    title: "Why Home Matters: Creating Dignity Through Housing",
    type: "video",
    url: "#",
    platform: "YouTube",
    categories: ["Patience", "Platform Build"],
    readingPaths: ["Start Here", "Stewardship"],
    featuredSlot: "stewardship",
    summary:
      "Housing is more than an asset class. It's where lives stabilize and communities take shape.",
    length: "10 min",
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
  },
];

export function getAllInsights(): Insight[] {
  return insights;
}

export function getInsightsByReadingPath(
  path: ReadingPath
): Insight[] {
  return insights.filter((i) => i.readingPaths.includes(path));
}

export function getInsightsByCategory(
  category: InsightCategory | "All"
): Insight[] {
  if (category === "All") return insights;
  return insights.filter((i) => i.categories.includes(category));
}

export function getInsightsFilteredByCategory(
  category: InsightCategory | "All"
): Insight[] {
  return getInsightsByCategory(category);
}

export function getFeaturedForHome(): Insight[] {
  const bySlot: Record<FeaturedSlot, Insight | undefined> = {
    "start-here": undefined,
    underwriting: undefined,
    stewardship: undefined,
    wildcard: undefined,
  };
  for (const i of insights) {
    if (i.featuredSlot && !bySlot[i.featuredSlot]) bySlot[i.featuredSlot] = i;
  }
  return [
    bySlot["start-here"],
    bySlot["underwriting"],
    bySlot["stewardship"],
    bySlot["wildcard"],
  ].filter((i): i is Insight => i != null);
}

export function getInsightsByPlatform(
  platform: InsightPlatform
): Insight[] {
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
