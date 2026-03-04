import Link from "next/link";
import type { Insight } from "@/types/insights";
import { Section } from "@/components/layout/Section";
import { getVideoSeriesItems } from "@/lib/insights/selectors";

interface VideoGridProps {
  insights: Insight[];
}

export function VideoGrid({ insights }: VideoGridProps) {
  const videos = getVideoSeriesItems(insights);
  if (videos.length === 0) return null;

  return (
    <Section className="pt-0">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Video Series
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Visual stories: From Antigua to Cincinnati, building wealth with purpose.
        </h2>
      </div>
      <div className="grid gap-6 pt-6 md:grid-cols-3">
        {videos.map((video) => (
          <div
            key={video.id}
            className="space-y-3 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm"
          >
            <div className="rounded-2xl bg-slate-900/90 p-8 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">
                {video.categories?.[0] ?? "Video"}
              </p>
              <p className="mt-3 text-xl font-semibold">{video.title}</p>
              <p className="mt-2 text-sm text-white/60">{video.length ?? "—"}</p>
            </div>
            <Link
              href={video.url || "#"}
              className="text-left text-sm font-semibold text-slate-900"
            >
              Watch trailer →
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}
