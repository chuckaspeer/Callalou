import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { CATEGORIES, type InsightCategory, type InsightPlatform } from "@/content/insights";

function buildMediaHref(category: InsightCategory | "All", platform?: InsightPlatform): string {
  const params = new URLSearchParams();
  if (category !== "All") params.set("category", category);
  if (platform) params.set("platform", platform);
  const q = params.toString();
  return q ? `/media?${q}` : "/media";
}

interface CategoryFilterProps {
  currentCategory: InsightCategory | "All";
  selectedPlatform?: InsightPlatform;
}

export function CategoryFilter({ currentCategory, selectedPlatform }: CategoryFilterProps) {
  return (
    <Section className="pt-0" padding="none">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={buildMediaHref("All", selectedPlatform)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            currentCategory === "All"
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={buildMediaHref(cat, selectedPlatform)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              currentCategory === cat
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>
    </Section>
  );
}
