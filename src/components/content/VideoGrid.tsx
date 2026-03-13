"use client";

import Link from "next/link";
import { useState } from "react";
import type { Insight } from "@/types/insights";
import { Section } from "@/components/layout/Section";
import { getVideoSeriesItems } from "@/lib/insights/selectors";

interface VideoGridProps {
  insights: Insight[];
}

export function VideoGrid({ insights }: VideoGridProps) {
  const videos = getVideoSeriesItems(insights);
  const [selectedVideo, setSelectedVideo] = useState<Insight | null>(null);

  if (videos.length === 0) return null;

  const handleClose = () => {
    setSelectedVideo(null);
  };

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
            {video.youtubeId ? (
              <Link
                href={video.url || "#"}
                className="text-left text-sm font-semibold text-slate-900"
                onClick={(event) => {
                  event.preventDefault();
                  setSelectedVideo(video);
                }}
              >
                Watch trailer →
              </Link>
            ) : (
              <Link
                href={video.url || "#"}
                className="text-left text-sm font-semibold text-slate-900"
              >
                Watch trailer →
              </Link>
            )}
          </div>
        ))}
      </div>
      {selectedVideo && selectedVideo.youtubeId ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-3xl p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-sm font-medium text-white"
              onClick={handleClose}
            >
              Close
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                title={selectedVideo.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </Section>
  );
}
