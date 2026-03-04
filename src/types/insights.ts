/**
 * Single source of truth for Insight shape and constants.
 * See docs/insights-data-contract.md.
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
export const READING_PATH_ORDER = [
  "Start Here",
  "Underwriting",
  "Stewardship",
  "Wildcard",
] as const;

export type ReadingPath = (typeof READING_PATH_ORDER)[number];

export const READING_PATH_KEY_TO_LABEL: Record<string, ReadingPath> = {
  "start-here": "Start Here",
  underwriting: "Underwriting",
  stewardship: "Stewardship",
  wildcard: "Wildcard",
};

export const READING_PATH_KEYS = ["start-here", "underwriting", "stewardship", "wildcard"] as const;
export type ReadingPathKey = (typeof READING_PATH_KEYS)[number];

export function isValidReadingPathKey(s: string): s is ReadingPathKey {
  return (READING_PATH_KEYS as readonly string[]).includes(s);
}

export const READING_PATH_LABELS = [...READING_PATH_ORDER];

export function normalizeReadingPath(input: unknown): ReadingPath | null {
  if (typeof input !== "string") return null;
  const raw = input.trim();
  if (!raw) return null;
  if ((READING_PATH_LABELS as readonly string[]).includes(raw)) {
    return raw as ReadingPath;
  }
  const key = raw
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/_+/g, "-")
    .replace(/-+/g, "-");
  return READING_PATH_KEY_TO_LABEL[key] ?? null;
}

export type FeaturedSlot =
  | "reading-path"
  | "sm-links"
  | "video-series"
  | "why-home-matters";
export type InsightStatus = "draft" | "published" | "archived";

export interface Insight {
  id: string;
  title: string;
  type: InsightType;
  url: string;
  platform: InsightPlatform;
  categories: InsightCategory[];
  readingPaths: ReadingPath[];
  featuredSlot?: FeaturedSlot | ReadingPathKey;
  summary?: string;
  length?: string;
  featured?: boolean;
  order?: number;
  published_at?: string | null;
  status?: InsightStatus;
  youtubeId?: string;
  thumbnailUrl?: string;
}

/** Defaults applied during normalization. */
export const INSIGHT_DEFAULTS = {
  featured: false,
  order: 9999,
  published_at: null as string | null,
  status: "draft" as InsightStatus,
} as const;

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

const VALID_FEATURED_SLOTS: FeaturedSlot[] = [
  "reading-path",
  "sm-links",
  "video-series",
  "why-home-matters",
];

const VALID_STATUSES: InsightStatus[] = ["draft", "published", "archived"];

const VALID_TYPES: InsightType[] = ["video", "article", "post"];

function isValidCategory(s: string): s is InsightCategory {
  return CATEGORIES.includes(s as InsightCategory);
}

function isValidReadingPath(s: string): s is ReadingPath {
  return READING_PATH_ORDER.includes(s as ReadingPath);
}

function isValidPlatform(s: string): s is InsightPlatform {
  return VALID_PLATFORMS.some((p) => p.toLowerCase() === s.toLowerCase());
}

function isValidFeaturedSlot(s: string): s is FeaturedSlot {
  return VALID_FEATURED_SLOTS.includes(s as FeaturedSlot);
}

function isValidStatus(s: string): s is InsightStatus {
  return VALID_STATUSES.includes(s as InsightStatus);
}

function isValidType(s: string): s is InsightType {
  return VALID_TYPES.includes(s as InsightType);
}

/** Parse published_at: valid ISO → ISO string, invalid → null. */
function parsePublishedAt(value: string | null | undefined): string | null {
  if (value === undefined || value === null) return INSIGHT_DEFAULTS.published_at;
  const s = String(value).trim();
  if (!s) return null;
  const date = new Date(s);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

/**
 * Normalize raw/partial insight: apply defaults, validate and filter
 * platform/categories/readingPaths, coerce order, normalize status.
 * Returns a full Insight safe for UI, or null if platform is invalid (drop item on public fetch).
 */
export function normalizeInsight(raw: Partial<Insight>): Insight | null {
  const platformStr = raw.platform != null ? String(raw.platform).trim() : "";
  if (platformStr && !isValidPlatform(platformStr)) return null;
  const platform: InsightPlatform = platformStr && isValidPlatform(platformStr)
    ? (VALID_PLATFORMS.find((p) => p.toLowerCase() === platformStr.toLowerCase()) as InsightPlatform)
    : "Site";

  const categories = Array.isArray(raw.categories)
    ? raw.categories.filter((c): c is InsightCategory => isValidCategory(String(c).trim()))
    : [];
  const readingPaths = (Array.isArray(raw.readingPaths) ? raw.readingPaths : [])
    .map((p: unknown) => normalizeReadingPath(p))
    .filter((v): v is ReadingPath => v != null);

  const orderNum = Number(raw.order);
  const order = Number.isNaN(orderNum) ? INSIGHT_DEFAULTS.order : orderNum;

  const status =
    raw.status != null && isValidStatus(String(raw.status).trim())
      ? (String(raw.status).trim() as InsightStatus)
      : INSIGHT_DEFAULTS.status;

  const featured = raw.featured === true;
  const published_at = parsePublishedAt(raw.published_at);

  const video = resolveVideoFields({
    url: raw.url,
    youtubeId: raw.youtubeId,
    youtube_url: (raw as Partial<Insight> & { youtube_url?: string }).youtube_url,
    thumbnailUrl: raw.thumbnailUrl,
  });

  const featuredSlotRaw = raw.featuredSlot != null ? String(raw.featuredSlot).trim() : "";
  const featuredSlotKey = featuredSlotRaw
    ? featuredSlotRaw.toLowerCase().replace(/\s+/g, "-")
    : "";

  const featuredSlot =
    featuredSlotKey && (isValidFeaturedSlot(featuredSlotKey) || isValidReadingPathKey(featuredSlotKey))
      ? (featuredSlotKey as FeaturedSlot | ReadingPathKey)
      : undefined;

  const typeStr = raw.type != null ? String(raw.type).trim().toLowerCase() : "";
  const type: InsightType = isValidType(typeStr) ? typeStr : "video";

  return {
    id: String(raw.id ?? "").trim() || "unknown",
    title: String(raw.title ?? "").trim(),
    type,
    url: video.url,
    platform,
    categories,
    readingPaths,
    featuredSlot,
    summary:
      raw.summary != null ? String(raw.summary).trim() || undefined : undefined,
    length: raw.length != null ? String(raw.length).trim() || undefined : undefined,
    featured,
    order,
    published_at,
    status,
    youtubeId: video.youtubeId,
    thumbnailUrl: video.thumbnailUrl,
  };
}

/**
 * YouTube/video URL resolution order:
 * 1. If url exists → use it.
 * 2. Else if youtubeId exists → build url from youtubeId.
 * 3. Else if youtube_url exists → use youtube_url and derive youtubeId.
 * 4. Else → url is empty string.
 * Thumbnail: if thumbnailUrl missing and youtubeId exists → use YouTube mqdefault.
 */
export function resolveVideoFields(row: {
  url?: string;
  youtubeId?: string;
  youtube_url?: string;
  thumbnailUrl?: string;
}): { url: string; youtubeId?: string; thumbnailUrl?: string } {
  const url = row.url != null ? String(row.url).trim() : "";
  const youtubeId = row.youtubeId != null ? String(row.youtubeId).trim() : "";
  const youtube_url =
    row.youtube_url != null ? String(row.youtube_url).trim() : "";

  if (url) {
    const derivedId = youtubeId || (youtube_url ? extractYouTubeId(youtube_url) : undefined);
    const thumb =
      row.thumbnailUrl != null && String(row.thumbnailUrl).trim()
        ? String(row.thumbnailUrl).trim()
        : derivedId
          ? `https://img.youtube.com/vi/${derivedId}/mqdefault.jpg`
          : undefined;
    return { url, youtubeId: derivedId || undefined, thumbnailUrl: thumb };
  }
  if (youtubeId) {
    const u = `https://www.youtube.com/watch?v=${youtubeId}`;
    const thumb =
      row.thumbnailUrl != null && String(row.thumbnailUrl).trim()
        ? String(row.thumbnailUrl).trim()
        : `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
    return { url: u, youtubeId, thumbnailUrl: thumb };
  }
  if (youtube_url) {
    const id = extractYouTubeId(youtube_url);
    const thumb =
      row.thumbnailUrl != null && String(row.thumbnailUrl).trim()
        ? String(row.thumbnailUrl).trim()
        : id
          ? `https://img.youtube.com/vi/${id}/mqdefault.jpg`
          : undefined;
    return { url: youtube_url, youtubeId: id, thumbnailUrl: thumb };
  }
  return { url: "", youtubeId: undefined, thumbnailUrl: undefined };
}

function extractYouTubeId(url: string): string | undefined {
  const m = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:\?|&|$)/);
  return m ? m[1] : undefined;
}

const ORDER_DEFAULT = 9999;

/** Parse to timestamp; null/invalid → 0 (oldest). */
function publishedAtTime(insight: Insight): number {
  const s = insight.published_at;
  if (s === undefined || s === null || !String(s).trim()) return 0;
  const t = new Date(s).getTime();
  return Number.isNaN(t) ? 0 : t;
}

/**
 * Sort insights: featured first, order ascending (undefined → 9999),
 * published_at descending (null treated as oldest, compare as Date),
 * stable fallback by id (localeCompare).
 */
export function sortInsights(list: Insight[]): Insight[] {
  const withIndex = list.map((item, index) => ({ item, index }));
  withIndex.sort((a, b) => {
    const ai = a.item;
    const bi = b.item;
    const aFeatured = ai.featured === true;
    const bFeatured = bi.featured === true;
    if (aFeatured !== bFeatured) return aFeatured ? -1 : 1;
    const aOrder = ai.order ?? ORDER_DEFAULT;
    const bOrder = bi.order ?? ORDER_DEFAULT;
    if (aOrder !== bOrder) return aOrder - bOrder;
    const aTime = publishedAtTime(ai);
    const bTime = publishedAtTime(bi);
    if (aTime !== bTime) return bTime - aTime; // descending
    const idCmp = (ai.id ?? "").localeCompare(bi.id ?? "");
    if (idCmp !== 0) return idCmp;
    return a.index - b.index;
  });
  return withIndex.map(({ item }) => item);
}
