import Link from "next/link";
import { Section } from "@/components/layout/Section";
import {
  getInsightsForPathFromList,
  type InsightCategory,
  type Insight,
  type InsightPlatform,
} from "@/content/insights";
import { getReadingPathItems } from "@/lib/insights/selectors";
import { READING_PATH_LABELS, type ReadingPath } from "@/types/insights";

function InsightItem({ item }: { item: Insight }) {
  return (
    <li className="border-b border-slate-100 py-2 last:border-0">
      <Link
        href={item.url}
        className="text-sm font-medium text-slate-900 hover:text-slate-600"
      >
        {item.title}
      </Link>
      {item.summary && (
        <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">
          {item.summary}
        </p>
      )}
    </li>
  );
}

interface ReadingPathsSectionProps {
  category: InsightCategory | "All";
  platform?: InsightPlatform;
  insights: Insight[];
}

export function ReadingPathsSection({ category, platform, insights }: ReadingPathsSectionProps) {
  const readingPathItems = getReadingPathItems(insights);
  const getItems = (path: ReadingPath) =>
    getInsightsForPathFromList(readingPathItems, path, category, 10, platform);

  return (
    <Section id="reading-paths">
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Reading Paths
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            Curated lists. Stable order.
          </h2>
        </div>
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-3">
          {READING_PATH_LABELS.map((path) => {
            const items = getItems(path);
            return (
              <div key={path} className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700">
                  {path}
                </h3>
                <ul className="space-y-0">
                  {items.length === 0 ? (
                    <li className="py-2 text-xs text-slate-500">
                      No items in this category.
                    </li>
                  ) : (
                    items.map((item) => (
                      <InsightItem key={item.id} item={item} />
                    ))
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
