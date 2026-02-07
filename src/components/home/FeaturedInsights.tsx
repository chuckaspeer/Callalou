import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { getFeaturedForHome } from "@/content/insights";

export function FeaturedInsights() {
  const items = getFeaturedForHome();

  if (items.length === 0) return null;

  return (
    <Section>
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Featured Insights
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Where to begin
        </h2>
        <p className="max-w-2xl text-slate-600">
          Curated entry points: Start Here, Underwriting, Stewardship, and one institutional overview.
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 bg-white/80 p-4"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              {item.type}
            </p>
            <h3 className="mt-2 font-semibold text-slate-900">
              <Link href={item.url} className="hover:text-slate-600">
                {item.title}
              </Link>
            </h3>
            {item.summary && (
              <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                {item.summary}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Link
          href="/media"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-slate-600"
        >
          Explore full library →
        </Link>
      </div>
    </Section>
  );
}
