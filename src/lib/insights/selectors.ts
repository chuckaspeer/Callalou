import type { Insight } from "@/types/insights";

const READING_PATH_SLOTS = ["sm-links", "reading-path"] as const;

/**
 * Items that belong in the Reading Paths section (sm-links or legacy reading-path).
 */
export function getReadingPathItems(insights: Insight[] | undefined | null): Insight[] {
  const list = insights ?? [];
  return list.filter(
    (i) =>
      i.featuredSlot != null &&
      (i.featuredSlot === "sm-links" || i.featuredSlot === "reading-path")
  );
}

/**
 * Items for the Video Series grid: featuredSlot === "video-series" and type === "video".
 * Sorted by order asc, then id asc.
 */
export function getVideoSeriesItems(insights: Insight[] | undefined | null): Insight[] {
  const list = insights ?? [];
  const items = list.filter(
    (i) => i.featuredSlot === "video-series" && i.type === "video"
  );
  const safeOrder = (i: Insight) =>
    typeof i.order === "number" && !Number.isNaN(i.order) ? i.order : 9999;
  return [...items].sort((a, b) => {
    const oA = safeOrder(a);
    const oB = safeOrder(b);
    if (oA !== oB) return oA - oB;
    return (a.id ?? "").localeCompare(b.id ?? "");
  });
}

/**
 * Single item for the Why Home Matters section: featuredSlot === "why-home-matters" and type === "video".
 */
export function getWhyHomeMattersItem(insights: Insight[] | undefined | null): Insight | undefined {
  const list = insights ?? [];
  return list.find(
    (i) => i.featuredSlot === "why-home-matters" && i.type === "video"
  );
}
