import Link from "next/link";
import type { Insight } from "@/types/insights";
import { Section } from "@/components/layout/Section";
import { getWhyHomeMattersItem } from "@/lib/insights/selectors";

interface FeaturedVideoProps {
  insights: Insight[];
}

export function FeaturedVideo({ insights }: FeaturedVideoProps) {
  const item = getWhyHomeMattersItem(insights);
  if (!item) return null;

  return (
    <Section>
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-slate-900">
          {item.title}
        </h2>
        <p className="text-slate-600">
          {item.summary ?? ""}
        </p>
      </div>
      <Link
        href={item.url || "#"}
        className="relative mt-6 block aspect-video overflow-hidden rounded-3xl border border-slate-200 bg-slate-900"
      >
        <div className="absolute inset-0 grid place-items-center text-center text-white">
          <p className="text-lg font-semibold">▶︎ Watch the video</p>
        </div>
      </Link>
    </Section>
  );
}
